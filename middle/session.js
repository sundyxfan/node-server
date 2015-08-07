/**
 * session 插件
 */

var cache = {};
var sid = Date.now();

function session(req, res, next) {
    // 设置req.session
 /*   Object.defineProperty(req, 'session', {
        get: function () {
            return cache[this.sessionId] || (cache[this.sessionId] = {});
        },
        set: function (value) {
            console.log('value:' + value);
            return cache[this.sessionId] = value;
        }
    });*/
    if (!(req.headers.cookie && (req.sessionId = parse(req.headers.cookie).sessionId))) {
        req.sessionId = sid + 1;
        res.setHeader('Set-Cookie', ['sessionId=' + req.sessionId]);
    }
    // 把cookie字符转化为json对象
    function parse(str) {
        var arr = str.split(';');
        var obj = {};

        arr.forEach(function (el) {
            var o = el.split('=');
            obj[o[0].trim()] = o[1];
        });

        return obj;
    }

    next();
}

module.exports = session;