/**
 * 下载插件
 */
function download(req, res, next) {
    res.download = function(filename, buf) {
        // 判断是buf是否是buffer对象
        if (Buffer.isBuffer(buf)) {
            res.writeHead(200, {
                // 设置下载名称
                'Content-disposition': 'attachment; filename=' + filename,
                // 保证是二进制类型，浏览器可用下载方式
                'Content-Type': 'application/octet-stream',
                'Content-length': buf.length
            });

            res.write(buf);
        }
        res.end();
    }
    next();
}

module.exports = download;