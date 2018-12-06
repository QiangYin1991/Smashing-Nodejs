const express      = require('express');
const mongodb      = require('mongodb');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const session      = require('express-session');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: true
}));

app.set('view engine', 'jade');

/***************************************************/

app.get('/', function (req, res) {
  console.log('[Get /]');
  res.render('index', {authenticated: false});
});

app.get('/login', function (req, res) {
  console.log('[Get /login]');
  res.render('login');
});

app.get('/signup', function (req, res) {
  res.render('signup');
});

/**************************************************/

app.listen(3000, function() {
  console.log("server listened on 3000");
})