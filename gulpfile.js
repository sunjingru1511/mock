const gulp = require('gulp');
const webserver = require('gulp-webserver');

gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(webserver({
            host: "localhost",
            port: 8090,
            open: true,
            callback: "index.html",
            livereload: true
        }))
})

gulp.task('userinfo', function() {
    gulp.src('./')
    .pipe(webserver({
        host: "localhost",
        port: 8080,
        middleware: function (req, res,next) {
            if (req.url === '/userinfo') {
                var data = {
                    name: "zs",
                    age: 10,
                    address: "beijing"
                }
                res.writeHead(200, {
                    "content-type": "text/json;chartset=utf-8",
                    "Access-control-Allow-Origin":"*"
                })
                res.end(JSON.stringify(data));  
            }
            next();
        }
        
    }))
})


gulp.task('default', function () {
    gulp.start('webserver');
})