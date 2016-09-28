var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');

var browserify = require('browserify');
var source = require('vinyl-source-stream');

var rename = require('gulp-rename');
var webserver = require('gulp-webserver');

/**
 *  compile jade
 */

gulp.task('jade', () => {
  return gulp.src(['./src/jade/**/*.jade', '!./src/jade/**/_*.jade'])
    .pipe(jade({
      pretty: true
    }))
    .pipe(rename(function (path) {
      if ("index" != path.basename) {
        path.dirname = path.basename.replace("_", "/");
        path.basename = "index";
      }
    }))
    .pipe(gulp.dest('./dist'));
});

/**
 *  compile sass
 */

gulp.task('sass',function(){
  return gulp.src('./src/sass/style.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass({outputStyle : 'compressed'})) 
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css'));
});

/**
 *  compile js
 */

gulp.task('js', function(){
  return browserify({
    entries: ['./src/js/app.js']
  })
  .bundle()
  .pipe(source('main.js'))
  .pipe(gulp.dest('./dist/js'));
});

/**
 *  build webserver
 */

gulp.task('webserver', function () {
  return gulp.src('./dist')
    .pipe(webserver({
      host: 'localhost',
      port: 3000,
      livereload: true
    }));
});

gulp.task('watch', function () {
  gulp.watch(['./src/jade/**/*.jade', '!./src/jade/**/_*.jade'], ['jade']);
  gulp.watch('./src/sass/**/*.scss', ['sass']);
  gulp.watch('./src/js/**/*.js', ['js']);
});
gulp.task('default', ['webserver','watch']);
