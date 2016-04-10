
var gulp 	= require('gulp'),
	includer		= require('gulp-html-ssi');
/** REMOVE ME **/ var Tmaker = require('../index');
/** USE ME **/ // var replace = require('gulp-Tmaker');

gulp.task('enp', function() {
	return gulp.src("*.html")
		.pipe(Tmaker({isPreview:false}))
		.pipe(gulp.dest('./output'));
});

gulp.task('html', function() {
	return gulp.src("*.html")
		.pipe(Tmaker({isPreview:true}))
		.pipe(gulp.dest('./output'));
});

gulp.task('default', ['html']);
