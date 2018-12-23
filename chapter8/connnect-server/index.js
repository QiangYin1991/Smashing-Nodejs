const connect = require('connect');
const time = require('./request-time');

const server = connect();

server.use(time({time: 500}));
/**
 * 慢速响应
 */
server.use(function (req, res, next) {
    if ('/b' === req.url) {
        setTimeout(function() {
            res.writeHead(200);
            res.end('Slow');
        }, 1000);
    } else {
        next();
    }
});

/**
 * 快速响应
 */
server.use(function (req, res, next) {
    if ('/a' === req.url) {
        res.writeHead(200);
        res.end('Fast');
    } else {
        next();
    }
});

server.listen(3000, function() {
    console.log('listening on ' + 3000);
})