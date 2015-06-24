var http = require('http');
var url = require('url');
var pathRegexp = require('./pathRegexp');

function App() {

    var self = this;
    var middleList = this._middleList = [];

    // get处理函数
    this.route_get_handles = [];
    this.route_post_handles = [];

    // request事件响应
    function handle(req, res){
         // 循环执行插件 (全局)
        var middleIndex = 0;
        req.params = {};

        function next() {
            middleIndex += 1;
            execMiddle();
        }

        function execMiddle() {
            var middle = middleList[middleIndex];
            if (middle) {
                // 处理中间件
                middle(req, res, next);
            }
            else {
                var handle = null;
                var path = url.parse(req.url).pathname;  // /abc?age=12 转为 /abc
                
                // 获取对应的请求方式处理函数
                function findHandle(route_handles) {
                    for (var i = 0, len = route_handles.length; i < len; i++) {
                        var route_handle = route_handles[i];
                        var pass = route_handle.route.test(path);
                        /**
                         * /^\/test\/[0-9a-zA-Z-_]*\/ok\/?$/
                         * /test/:id/ok
                         * /test/12/ok
                         */
                        if (pass) {
                            // route_handle.route::: { /^\/test\/[0-9a-zA-Z-_]*\/[0-9a-zA-Z-_]*\/ok\/?$/ paramNames: [ 'id', 'name' ] }
                            route_handle.route.paramNames.forEach(function(name, index) {
                                req.params[name] = RegExp["$" + (index + 1)];
                            });
                            handle = route_handle.handle;
                            break;
                        }
                    }
                }

                // 处理请求
                switch(req.method) {
                    case 'GET':
                        // handle = self.route_getHandle[req.url];
                        findHandle(self.route_get_handles);
                    break;
                    case 'POST':
                        // handle = self.route_postHandle[req.url];
                        findHandle(self.route_post_handles);
                    break;
                }
                if (handle) {
                    handle(req, res);
                }
                else {
                    res.statusCode = 404;
                    res.end();
                }
            }
        }

        // 执行中间件
        execMiddle();
    }

    this._server = http.createServer(handle);
}

// 加入中间件
App.prototype.use = function (middle) {
    this._middleList.push(middle);
}

// 处理post 请求方式
App.prototype.post = function(route, handle) {
    // this.route_post_handles[route] = handle;
    this.route_post_handles.push({
        route: pathRegexp(route),
        handle: handle
    });
}

// 处理get 请求方式
App.prototype.get = function (route, handle) {
    // this.route_get_handle[route] = route;
    console.log(pathRegexp(route));
    this.route_get_handles.push({
        route: pathRegexp(route),
        handle: handle
    });
}

// 监听端口
App.prototype.listen = function () {
    this._server.listen.apply(this._server, arguments);
}

module.exports = App;
