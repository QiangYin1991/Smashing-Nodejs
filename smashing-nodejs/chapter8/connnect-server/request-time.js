module.exports = function (opts) {
    const time = opts.time || 100;

    return function (req, res, next) {
        const timer = setTimeout(() => {
            console.log('%s %s mis take too long', req.method, req.url);
        }, time);
        
        const end = res.end;
        res.end = function (chunk, encoding) {
            res.end = end;
            res.end(chunk, encoding);
            clearTimeout(timer);
        }
        next();
    }
}