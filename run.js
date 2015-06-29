// node
var fs = require('fs');

// core
var App = require('./lib/App');

// middle
var query = require('./middle/query');
var post = require('./middle/post_1');
var text = require('./middle/text');
var redirect = require('./middle/redirect');
var download = require('./middle/download');
var static = require('./middle/static');
var view = require('./middle/view');

var PORT = process.env.PORT || 3000;


var app = new App();

// 加入中间件
app.use(query);
// app.use(post);  // 不支持二进制文件
app.use(post);
/*app.use(middle01);
app.use(middle02);*/
app.use(text);
app.use(redirect);
app.use(download);
app.use(static(__dirname + '/public/'));
app.use(view(__dirname + '/views'));

// 动态模版＋数据
app.get('/' ,function (req, res) {
    res.view('index.html', {
        title: '动态模版渲染',
        name: 'fxp test name',
        list: [{
            name: 'fxp',
            age: 100
        }, {
            name: 'zhangsan',
            age: 112
        }]
    });
});
// get
app.get('/getroute', function (req, res) {
    res.write('test get request');
    res.end();
});
// 返回文本
app.get('/gettext', function (req, res) {
    res.text('test text');
});

// 跳转
app.get('/testRedirect', function (req, res) {
    res.redirect('getroute');
});

// 下载
app.get('/download', function (req, res) {
    var buf = new Buffer('hello world');
    res.download('file.txt', buf);
});

 // 泛式路由 
app.get('/test/:id/ok', function (req, res) {
    res.write('test ok' + req.query.jj + req.params.id);
    res.end();
});

// post
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