var path        = require('path'),
	del         = require('del');

var baseDir = path.join(__dirname, '..');

module.exports = function(gulp){
	gulp.task('clean', function() {
	    del.sync([path.join(baseDir, "dist")]);
	});
}