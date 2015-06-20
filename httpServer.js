var http = require('http');
var fs = require('fs');
var url = require('url');

var server = http.createServer();

server.on('request', function (req, res) {
    var path = parsePath(req.url);
    fs.readFile(__dirname + '/public/' + path, function (err, data) {
        if (err) {
            res.statusCode = 404;
        }
        else {
            res.write(data);
        }
        res.end();
    });
});

function parsePath (url_str) {
    var urlPath = url.parse(url_str);
    return urlPath.path;
}


server.listen(3000, function () {
    console.log('this server 127.0.0.1 ^^^');
});

