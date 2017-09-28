var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');


gulp.task('build', function(){
	return browserify({entries: 'source/front/component/App.jsx', extensions: ['.jsx'], debug: true})
		.transform('babelify', {presets: ['es2015', 'react']})
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('dist'))
})

gulp.task('watchjs', function() {
	gulp.watch('source/front/component/*.jsx', ['build']);
})

gulp.task('default', ['build', 'watchjs'])