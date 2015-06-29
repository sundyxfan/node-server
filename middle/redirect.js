/**
 * 跳转插件
 */
function redirect(req, res, next) {
    res.redirect = function (url) {
        res.writeHead(302, {
            'Location': location(req, url)
        });
        res.end();
    }

    function location(req, url) {
        // http://wwww.baidu.com
        if (/^http:\/\//.test(url)) {
             return url;
        }
        // /test
        else if(/^\//.test(url)) {
            return 'http://' + req.headers.host + url;
        }
        // test
        else {
            return 'http://' + req.headers.host + '/' + req.url + '/' + url;
        }
    }

    next();
}
module.exports = redirect;