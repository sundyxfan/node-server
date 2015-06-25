var qs = require("querystring");

function post(req, res, next) {

    var body_data = '';
    req.files = {};
    req.body = {};

    req.on('data', function(chunk) {
        body_data += chunk;
    })

    req.on('end', function() {

        var contentType = req.headers["content-type"];
        // isMulti 如果是true，表示是设置了enctype="multipart/form-data" 属性
        var isMulti = /(boundary=)/gi.test(contentType);

        if (isMulti) {

            var boundary = RegExp["$'"]; // ----WebKitFormBoundaryZ1lIcEoVIq7BCdpP
            var boundaryStandard = '--' + boundary + '\r\n'; // ------WebKitFormBoundaryZ1lIcEoVIq7BCdpP\r\n
            var boundaryEnd = boundaryStandard + '--';

            //删除头尾边界字符串
            body_data = body_data.substring(boundaryStandard.length, body_data.length - boundaryEnd.length);
            var fields = body_data.split(boundaryStandard);

            // 头信息和体信息的之间分割字符串
            var RN = '\r\n\r\n';

            fields.forEach(function(field) {
                // field: Content-Disposition: form-data; name="uploadfile"; filename="aa.txt" \r\n\r\n
                var index = field.indexOf(RN);

                // 解析出头信息块
                var header = field.substring(0, index);

                // 从头信息中解析出表单字段的名称，也就是表单的name属性值。
                /name=\"(.*?)\"/g.test(header);
                var fieldName = RegExp.$1;

                // 判断是上传的文件，还是一般的表单字段。
                var isFile = /filename/g.test(header);

                // 解析出数据体  Content-Disposition: form-data; name="uploadfile"; filename="aa.txt" \r\n\r\n 后面数据提\r\n
                var body = field.substring(index + RN.length);
                body = body.substring(0, body.length - RN.length / 2);

                if (isFile) {
                    req.files[fieldName] = new Buffer(body);
                } else {
                    req.body[fieldName] = body;
                }

            })
        } else {
            req.body = qs.parse(body_data);
        }

        next();
    });
}

module.exports = post;