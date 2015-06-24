/**
 * 泛式路由规则
 */
function pathRegexp(path) {
    var paramNames = [];

    path = path

    // 这个方法用把 * 替换成正则表达式的 [0-9a-zA-Z\-_]* 形式。
    .replace(/((\*{1}(?=\/))|(\*{1}(?=$)))/g, '[0-9a-zA-Z\-_]*')

    // 这个方法是把 :xxx 的形式替换成  [0-9a-zA-Z\-_]*  正则表达式形式。
    .replace(/(:(.*?(?=\/)))|(:(.*?(?=$)))/g, function () {
        var len = arguments.length - 3;
        for (var i = 0; i < len; i++) {
            var arg = arguments[i + 1];
            if (typeof arg === 'string' && arg[0] !== ':') {
                paramNames.push(arg);
            }
        }
        return '([0-9a-zA-Z\-_]*)';
    })

    // 把 /article/:id/ 的转换为 /article/:id
    .replace(/\/$/g, '')

    // 把 / 转换为 \/ ，因为这是字符串形式，最后通过 new RegExp(path)
    // 生成时，必须要经过这个转换。
    .replace(/\//g, '\\\/');

    var regexp = new RegExp('^' + path + '\\/?$');
    // paramNames 对应的是/:id  /:name 参数部分
    regexp.paramNames = paramNames;
    return regexp;
}

module.exports = pathRegexp;