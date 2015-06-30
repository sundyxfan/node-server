
var url = require('url');
var qs = require('querystring');

function query(req, res, next) {
    var queryString = url.parse(req.url).query;
    if (queryString) {
        var queryObj = qs.parse(queryString);
        req.query = queryObj || {};
    }
    next();
}

module.exports = query;