const express = require('express');

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

app.listen(3000, function () {
    console.log('listen on ' + 3000);
});