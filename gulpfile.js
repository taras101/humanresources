var gulp = require('gulp');

gulp.task('css', function() {
  // Transform contents of one.styl and two.styl to CSS
});
var jsSource = './assets/javascript/';
gulp.task('javascript', function() {
  return gulp.src([jsSource + 'mainapp.js',
  jsSource + 'edit_controller.js',
  jsSource + 'view_controller.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./public/javascript'))
});

gulp.task('default', function() {
  gulp.start('javascript');
  gulp.start('css');
});
var stylus = require('gulp-stylus');

gulp.task('css', function() {
  gulp.src('./assets/style/*.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest('./public/css'));
});
var concat = require('gulp-concat');

gulp.task('css', function() {
  gulp.src('./assets/style/*.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(concat('main.min.css', {
      newLine: ''
    }))
    .pipe(gulp.dest('./public/css'));
});
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var jsSource = './assets/javascript/';

gulp.task('javascript', function() {
  gulp.src([jsSource + 'mainapp.js',
  jsSource + 'edit_controller.js',
  jsSource + 'view_controller.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./public/javascript'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./public/javascript'))
});
var wrap = require('gulp-wrap');
var jshint = require('gulp-jshint');
var jsSource = './assets/javascript/';

gulp.task('javascript', function() {
  gulp.src([jsSource + 'mainapp.js',
  jsSource + 'edit_controller.js',
  jsSource + 'view_controller.js'])
    .pipe(concat('main.js'))
    .pipe(wrap('(function(a, window){<%= contents %>}(angular,window));'))
    .pipe(jshint({
      predef: ['window', 'angular']
    }))
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest('./public/javascript'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./public/javascript'))
});
gulp.task('watch', function() {
  gulp.watch('./assets/javascript/*.js', ['javascript']);
  gulp.watch('./assets/style/*.styl', ['css']);
});