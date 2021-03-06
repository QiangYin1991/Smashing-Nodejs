const express      = require('express');
const mongoose     = require('mongoose');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const session      = require('express-session');

const app = express();
const Schema = mongoose.Schema;
const User = mongoose.model('User', new Schema({
    first: String,
    last: String,
    email: {type: String, unique: true},
    password: {type: String, index: true}
}));

/***********************************************************/

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: true
}));

app.use(function(req, res, next){
  if (req.session.loggedIn) {
    res.locals.authenticated = true;
    console.log('loggedIn:' + req.session.loggedIn);
    User.findById(req.session.loggedIn, function (err, doc) {
      if (err) throw next(err);
      console.log('doc:' + JSON.stringify(doc));
      res.locals.me = {};
      res.locals.me.name = doc.first + ' ' + doc.last;
      next();
    })
  }else {
    res.locals.authenticated = false;
    next();
  }
});

app.set('view engine', 'jade');


app.get('/', function (req, res) {
  console.log('[Get /]');
  res.render('index');
});

app.get('/login', function (req, res) {
  console.log('[Get /login]');
  res.render('login');
});

app.get('/login/:signupEmail', function (req, res) {
  console.log('[Get /login]');
  res.render('login', {signupEmail: req.params.signupEmail});
});

app.get('/logout', function (req, res) {
  req.session.loggedIn = null;
  res.redirect('/');
});

app.get('/signup', function (req, res) {
  res.render('signup');
});

app.post('/signup', function (req, res, next) {
  console.log('[POST /signup]');
  const user = new User(req.body.user).save(function (err){
    if (err) return next(err);
    res.redirect('/login/' + user.email);
  })
});

app.post('/login', function (req, res, next) {
  User.findOne({email: req.body.user.email, password:req.body.user.password}, function (err, doc) {
    if (err) return next(err);
    if (!doc) return res.send('<p>User not found. Go back and try again</p>');
    console.log('[POST /login] doc:', JSON.stringify(doc));
    req.session.loggedIn = doc._id.toString();
    res.redirect('/');
  });
});

/**************************************************/

const options = {
  user: 'yq',
  pass: 'yq911101',
  useNewUrlParser: true,
  auth: {authdb: 'admin'}
};

mongoose.connect('mongodb://59.110.230.92:27017/smashingnode?authSource=admin', options, function (err){
    if (err) throw err;
})

app.listen(3000, function() {
  console.log("server listened on 3000");
})
