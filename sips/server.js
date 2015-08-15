var path		= require('path'),
	nodemon     = require('gulp-nodemon');

var baseDir = path.join(__dirname, '..');

module.exports = function(gulp) {
	gulp.task('server', function() {
	    nodemon({
	        script: path.join(baseDir, 'backend', 'index.js'),
	        ignore: ['frontend/*', 'gulpfile.js']
	    });
	});
}