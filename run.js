var fs = require('fs');

var App = require('./lib/App');
var query = require('./middle/query');
var post = require('./middle/post_1');
/*var middle01 = require('./middle/middle01');
var middle02 = require('./middle/middle02');*/
var static = require('./middle/static');

var PORT = process.env.PORT || 3000;

var app = new App();

// 加入中间件
app.use(query);
// app.use(post);  // 不支持二进制文件
app.use(post);
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
    res.write('test post request: name: ' + req.body.name + '  age:' + req.body.age);
    res.end();
});

//上传文件
app.post('/uplodfile', function (req, res) {
    console.log('title:' + req.body.title + '  id:' + req.body.id);
    console.log('上传文件开始FILES内容:' + req.files['uploadfile'] + ' name:' + req.files['name'] + 'END');
    fs.writeFileSync('./data/' + req.files['name'], req.files['uploadfile']);
});

// 监听端口
app.listen(PORT, function () {
    console.log('this server port is:' + PORT);
});