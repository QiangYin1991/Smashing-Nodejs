const http = require('http');
const fs = require('fs');

const server = http.createServer(function (req, res) {
    if ('GET' === req.method && '/image' === req.url.substr(0, 7) && '.jpg' === req.url.substr(-4)) {

    } else if ('GET' == req.method && '/' === req.url) {

    } else {
        res.writeHead(404);
        res.end('Not found');
    }
});

server.listen(3000, function () {
    console.log('listening on ' + 3000);
});