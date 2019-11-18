const gulp = require('gulp');
const gulp_less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const gulp_autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const gcmq = require('gulp-group-css-media-queries');
const watcher = require('gulp-watch');		
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');

function html() {
	return gulp.src('./build/*.html')
	.pipe(browserSync.stream());
};

function js() {
	return gulp.src('./static/js/main.js')
		.pipe(gulp.dest('./build/js'))
		// .pipe(uglify()) не работает с ES2015
		.pipe(browserSync.stream());
}

function less() {
	return gulp.src('./static/styles/*.less')
					.pipe(sourcemaps.init())
					.pipe(gulp_less('main.css'))
					.pipe(gulp_autoprefixer({
			            overrideBrowserslist: ['> 0.1%'],
			            cascade: false
		        	}))
		        	.pipe(gcmq())
		        	.pipe(cleanCSS({level:2}))
		        	.pipe(sourcemaps.write())
					.pipe(gulp.dest('./build/css'))
					.pipe(browserSync.stream());
};

function watch () {
	browserSync.init({
        server: {
            baseDir: "./build"
        }
    });

    gulp.watch('./build/*.html',html).on('change', browserSync.reload);

    gulp.watch('./static/styles/*.less',less).on('change', browserSync.reload);
    gulp.watch('./static/styles/bem/components/*.less',less).on('change', browserSync.reload);
    gulp.watch('./static/styles/src/*.less',less).on('change', browserSync.reload);

	gulp.watch('./static/js/main.js',js).on('change', browserSync.reload);
	gulp.watch('./static/js/modules/custom_cursor.js',js).on('change', browserSync.reload);
};

gulp.task('less',less);
gulp.task('js',js);
gulp.task('watch',watch);