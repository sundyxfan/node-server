var http = require('http');

function App() {
    var middleList = this._middleList = [];

    // request事件响应
    function handle(req, res){
        if (middleList.length === 0) {

        }
        else {
            // 循环执行插件 (全局)
            var middleIndex = 0;

            function next() {
                middleIndex += 1;
                execMiddle();
            }

            function execMiddle() {
                var middle = middleList[middleIndex];
                if (middle) {
                    middle(req, res, next);
                }
            }

            // 执行中间件
            execMiddle();
        }
    }

    this._server = http.createServer(handle);
}

// 加入中间件
App.prototype.use = function (middle) {
    this._middleList.push(middle);
}

// 监听端口
App.prototype.listen = function () {
    this._server.listen.apply(this._server, arguments);
}

module.exports = App;
