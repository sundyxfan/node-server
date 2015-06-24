var qs = require('querystring');


function post(req, res, next) {
    var body_data = '';
    req.on('data', function (chunk) {
        body_data += chunk;
    });

    req.on('end', function () {
        // 将请求体转为json格式
        req.body = qs.parse(body_data);
        next();
    });
}

module.exports = post;