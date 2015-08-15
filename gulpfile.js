var gulp        = require('gulp');

require('./sips/clean')(gulp);
require('./sips/html')(gulp);
require('./sips/less')(gulp);
require('./sips/image')(gulp);
require('./sips/browserify')(gulp);
require('./sips/server')(gulp);

gulp.task('default', ['clean', 'html', 'less', 'image', 'watchify', 'server']);