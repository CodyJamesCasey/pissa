var path        = require('path'),
    sourcemaps  = require('gulp-sourcemaps'),
    less        = require('gulp-less'),
    livereload  = require('gulp-livereload');

var baseDir = path.join(__dirname, '..');

module.exports = function(gulp) {
    gulp.task('less:build', function() {
        gulp.src(path.join(baseDir, 'frontend', 'less', 'main.less'))
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.join(baseDir, 'dist')))
        .pipe(livereload());
    });

    gulp.task('less:watch', function() {
        livereload.listen({ basePath: 'dist',});
        gulp.watch(path.join(baseDir, 'frontend', 'less', '**', '*'), ['less:build']);
    });

    gulp.task('less', ['less:build', 'less:watch']);
}