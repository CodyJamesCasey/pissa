var path        = require('path');

var baseDir = path.join(__dirname, '..');

module.exports = function(gulp) {
    gulp.task('image', function() {
        gulp.src(path.join(baseDir, 'images', '*'))
        .pipe(gulp.dest(path.join(baseDir, 'dist', 'images')));
    });
}