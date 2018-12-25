const express = require('express');
const search = require('./search');

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('view options', {layout:false});

/**
 * 路由
 */
app.get('/', function (req, res) {
    res.render('index');
});

app.get('/search', function (req, res, next) {
    search(req.query.q, function (err, tweets) {
        if (err) return next(err);
        res.render('search', {results: tweets, search: req.query.q});
    });
});

app.listen(3000, function () {
    console.log('listen on ' + 3000);
});