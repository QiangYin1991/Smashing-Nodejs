const redis = require('redis');
const db = redis.createClient();

class Entry {
    constructor(obj) {
        for (let key in obj) {
            this[key] = obj[key];
        }
    }

    save (cb) {
        const entryJson = JSON.stringify(this);
        db.lpush('entries', entryJson, (err) => {
            if (err) return cb(err);
            cb();
        })
    }

    static getRange(from, to, cb) {
        db.lrange('entries', from, to, (err, items) => {
            if (err) return cb(err);
            let entries = [];
            items.forEach(item => {
                entries.push(JSON.parse(item));
            });
            cb(null, entries);
        });
    }
}

module.exports = Entry;