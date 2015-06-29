/**
 * 动态渲染模版
 */

var fs = require('fs');
var path = require('path');

/**
 * 过滤 \r \n
 * 目的是保证函数体能正常执行 ，因为如果不过滤就会出现 result += ' 
 *      <head>
 *            <p>
 *   '
 *  这是错误的，javascipt 不支持这种写法。所以转换后的是 result += '\n<head>\n<p>\n';
 */
/**
 * \r'是回车，'\n'是换行，前者使光标到行首，后者使光标下移一格，通常敲一个回车键，即是回车，又是换行（\r\n）
 *  Unix中每行结尾只有“<换行>”，即“\n”；
 *  Windows中每行结尾是“<换行><回车>”，即“\n\r”；
 *  Mac中每行结尾是“<回车>”
 *  http://www.studyofnet.com/news/285.html
 */
function filterRN(s) {
    s = s.replace('\'', '\"');
    s = s.replace(/\n/g, '\\n');
    s = s.replace(/\r/g, '\\r');
    return "result += \'" + s + "\'; \n\r";
}

function view(viewPath) {
    var viewCache = {};

    fs.readdir(viewPath, function (err, files) {
        files.forEach(function (fn) {
            var filePath = path.join(viewPath, fn);

            fs.readFile(filePath, function (err, data) {

                var str = data.toString();
                var buf = [];
                buf.push('var result = "";');
                var htmlPart = '';

                for (var i = 0, len = str.length; i < len;) {

                    // js 部分
                    if (str.slice(i, i+2) === '<%') {
                        var end = str.indexOf('%>', i);

                        var jsPart = str.slice(i+2, end);

                        i = end + 2;
                        buf.push(filterRN(htmlPart));
                        htmlPart = '';

                        // 支持简单赋值 <%= data.name %>
                        if (jsPart.slice(0, 1) === '=') {
                            buf.push("\r\nresult +=" + jsPart.slice(1) + ";\r\n");
                        }
                        // <% js代码 %>  eg:支持模版中使用循环
                        else {
                            buf.push('\r\n' + jsPart + '\r\n');
                        }

                    }
                    // html 部分
                    else {
                        htmlPart += str.slice(i, i+1);
                        i += 1;
                    }
                }

                buf.push(filterRN(htmlPart));
                buf.push('return result;');

                console.log('bufAA:' + buf.join(''));
                viewCache[fn] = new Function('data', buf.join(''));

            });
        });
    });

    return function (req, res, next) {
        res.view = function (fileName, locals) {
            res.write(viewCache[fileName](locals));
            res.end();
        }
        next();
    }
}

module.exports = view;
