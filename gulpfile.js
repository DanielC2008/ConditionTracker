"use strict";

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');

gulp.task('default', ['lint', 'watch']);

gulp.task('lint', function() {
  return gulp.src(['app/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .on('error', function() {}
  );
});

gulp.task('watch', function() {
  gulp.watch(['app/**/*.js'], ['lint']);

  gutil.log(gutil.colors.bgGreen('Watching for changes...'));
});