// Variables with all technologies.
// ----------------------------------------------------------------------
var gulp					= require('gulp'),
    plumber				= require('gulp-plumber'),
		cssmin				= require('gulp-cssmin'),
		imagemin			= require('gulp-imagemin'),
		htmlmin				= require('gulp-htmlmin'),
		uglify				= require('gulp-uglify'),
		watch					= require('gulp-watch'),
		browsersync		= require('browser-sync').create();

// Constants with all directories and files path.
// ----------------------------------------------------------------------
var SRC_PATH = {
	css				: 'src/assets/css/**/*.css',
	html			: 'src/**/*.html',
	js				: 'src/assets/js/*.js',
	img				: 'src/assets/img/*'
};

var BUILD_PATH = {
	index			: 'build',
	html			: 'build/',
	css				: 'build/assets/css/',
	js				: 'build/assets/js/',
	img				: 'build/assets/img/'
};

// Imagemin
// ----------------------------------------------------------------------
	gulp.task('optIMG', function() {
		gulp.src(SRC_PATH.img)
			.pipe(plumber())
			.pipe(imagemin())
			.pipe(gulp.dest(BUILD_PATH.img))
			.pipe(browsersync.stream());
	});

// HTML minify
// ----------------------------------------------------------------------
	gulp.task('minifyHTML', function() {
		gulp.src(SRC_PATH.html)
			.pipe(plumber())
			.pipe(htmlmin({collapseWhitespace: true}))
			.pipe(gulp.dest(BUILD_PATH.html))
			.pipe(browsersync.stream());
	});

// JS minify
// ----------------------------------------------------------------------
	gulp.task('minifyJS', function() {
		gulp.src(SRC_PATH.js)
			.pipe(plumber())
			.pipe(uglify())
			.pipe(gulp.dest(BUILD_PATH.js))
			.pipe(browsersync.stream());
	});

// CSS minify
// ----------------------------------------------------------------------
	gulp.task('minifyCSS', function () {
		gulp.src(SRC_PATH.css)
			.pipe(plumber())
			.pipe(cssmin())
			.pipe(gulp.dest(BUILD_PATH.css))
			.pipe(browsersync.stream());
	});

// Watch
// ----------------------------------------------------------------------
	gulp.task('watch', function(){
		gulp.watch(SRC_PATH.html,			['minifyHTML']);
		gulp.watch(SRC_PATH.js,				['minifyJS']);
		gulp.watch(SRC_PATH.img,			['optIMG']);
		gulp.watch(SRC_PATH.css,			['minifyCSS']);
	});

// Browser Sync
// ----------------------------------------------------------------------
	gulp.task('browser-sync', ['minifyCSS'], function() {
		browsersync.init({
			server: BUILD_PATH.index
		});

		gulp.watch(BUILD_PATH.css, ['minifyCSS']);
		gulp.watch(BUILD_PATH.html).on('change', browsersync.reload);
	});

// Task Default
// ----------------------------------------------------------------------
gulp.task('default', ['watch', 'optIMG', 'minifyHTML', 'minifyJS', 'minifyCSS', 'browser-sync']);

