var App = require('./lib/App');
var query = require('./middle/query');
/*var middle01 = require('./middle/middle01');
var middle02 = require('./middle/middle02');*/
var static = require('./middle/static');

var PORT = process.env.PORT || 3000;

var app = new App();

// 加入中间件
app.use(query);
/*app.use(middle01);
app.use(middle02);*/
app.use(static(__dirname + '/public/'));

app.get('/getroute', function (req, res) {
    res.write('test get request');
    res.end();
});

app.get('/test/:id/ok', function (req, res) {
    res.write('test ok' + req.query.jj + req.params.id);
    res.end();
});

app.post('/postroute', function (req, res) {
    res.write('test post request');
    res.end();
});

// 监听端口
app.listen(PORT, function () {
    console.log('this server port is:' + PORT);
});