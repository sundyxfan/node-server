var http = require('http');

function App() {

    var self = this;
    var middleList = this._middleList = [];

    // get处理函数
    this._getHandle = null;
    this._postHandle = null;

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
                else {
                    switch(req.method) {
                        case 'GET':
                            if (self._getHandle) {
                                self._getHandle(req, res);
                            }
                        break;
                        case 'POST': 
                            if (self._postHandle) {
                                self._postHandle(req, res);
                            }
                        break;
                    }
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

// 处理post 请求方式
App.prototype.post = function (handle) {
    this._postHandle = handle;
}

// 处理get 请求方式
App.prototype.get = function (handle) {
    this._getHandle = handle;
}

// 监听端口
App.prototype.listen = function () {
    this._server.listen.apply(this._server, arguments);
}

module.exports = App;
