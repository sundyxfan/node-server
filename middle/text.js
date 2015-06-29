/**
 * 文本渲染插件
 */
function text(req, res, next) {
    res.text = function(txt) {
        res.writeHead(200, {
            'Content-type': 'text/plain'
        });
        res.write(txt);
        res.end();
    }
    next();
}

module.exports = text;