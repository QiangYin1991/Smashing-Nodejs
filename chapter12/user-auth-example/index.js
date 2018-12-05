const express      = require('express');
const mongodb      = require('mongodb');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const session      = require('express-session');

const app = express();

app.use(bodyParser);
app.use(cookieParser);
app.use(session({secret: 'my secret'}));

app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.render('index', {authenticated: false});
});

app.listen(3000, function() {
  console.log("server listened on 3000");
})