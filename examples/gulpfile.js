
var gulp 	= require('gulp'),
	Tmaker = require('../index');
/** USE ME **/ // var replace = require('gulp-Tmaker');

gulp.task('enp', function() {
	return gulp.src("*.html")
		.pipe(Tmaker({isPreview:true,lang:'en'}))
		.pipe(gulp.dest('./output'));
});

gulp.task('html', function() {
	return gulp.src("*.html")
		.pipe(Tmaker({isPreview:true}))
		.pipe(gulp.dest('./output'));
});

gulp.task('default', ['enp']);
