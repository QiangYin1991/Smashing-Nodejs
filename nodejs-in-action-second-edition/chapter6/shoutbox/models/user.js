const redis = require('redis');
const bcrypt = require('bcrypt');
const db = redis.createClient(16379, '59.110.230.92');

db.AUTH('minigame2019', (msg) => {
  console.log('connect redis success: ' + msg);
});

class User {
  constructor(obj) {
    for (let key in obj) {
      this[key] = obj[key];
    }
  }

  save(cb) {
    if (this.id) {
      this.update(cb);
    } else {
      db.incr('user:ids', (err, id) => {
        if (err) return cb(err);
        this.id = id;
        this.hasPassword((err) => {
          if (err) return cb(err);
          this.update(cb);
        })
      })
    }
  }

  update(cb) {
    const id = this.id;
    db.set(`user:id:${this.name}`, id, (err) => {
      if (err) return cb(err);
      db.hmset(`user:${id}`, this, (err) => {
        cb(err);
      });
    });
  }

  hasPassword(cb) {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) return cb(err);
      this.salt = salt;
      bcrypt.hash(this.pass, salt, (err, hash) => {
        if (err) return cb(err);
        this.pass = hash;
        cb();
      });
    })
  }
}

module.exports = User;