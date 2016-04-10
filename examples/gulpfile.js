
var gulp 	= require('gulp'),
	includer		= require('gulp-html-ssi');
/** REMOVE ME **/ var Tmaker = require('../index');
/** USE ME **/ // var replace = require('gulp-replace');

gulp.task('enp', function() {
	// Do an in-place replace on file.txt
	return gulp.src("*.html")
		.pipe(Tmaker({isPreview:false}))
		// .pipe(Tmaker())
		.pipe(gulp.dest('./output'));
});

gulp.task('html', function() {
	// Do an in-place replace on file.txt
	return gulp.src("*.html")
		.pipe(Tmaker({isPreview:true}))
		// .pipe(Tmaker())
		.pipe(gulp.dest('./output'));
});

gulp.task('ssi', function() {
	gulp.src('*.html')
		.pipe(includer())
		.pipe(gulp.dest('./build/'));
});

gulp.task('default', ['html']);
