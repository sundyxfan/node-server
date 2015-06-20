/**
 * 中间层
 */

var url = require('url');
var fs = require('fs');

function parsePath (url_str) {
    var urlPath = url.parse(url_str);
    return urlPath.path;
}

module.exports = function static(parent_path) {
    return function (req, res, next) {
        
        var path = parsePath(req.url);

        fs.readFile(parent_path + path, function (err, data) {
            if (err) {
                next();
            }
            else {
                res.write(data);
            }
            res.end();
        });

    }
}