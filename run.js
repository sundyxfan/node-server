var App = require('./lib/App');
var middle01 = require('./middle/middle01');
var middle02 = require('./middle/middle02');
var static = require('./middle/static');

var PORT = process.env.PORT || 3000;

var app = new App();

// 加入中间件
app.use(middle01);
app.use(middle02);
app.use(static(__dirname + '/public/'));

app.get(function (req, res) {
    res.write('test get request');
    res.end();
});

app.post(function (req, res) {
    res.write('test post request');
    res.end();
});

// 监听端口
app.listen(PORT, function () {
    console.log('this server port is:' + PORT);
});