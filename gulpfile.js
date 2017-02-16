var gulp = require('gulp');
var uglify = require('gulp-uglify');
var webpack = require('gulp-webpack');
var webpackConfig = require('./webpack.config');

gulp.task('scripts',function(){
  return gulp.src('public/js/main.js')
  .pipe(webpack(webpackConfig))
  .pipe(uglify())
  .pipe(gulp.dest('public/dist/js'));
});

gulp.task('default',['scripts'],function(){
  gulp.watch(['public/js/main.js','public/modules/**/*.js','webpack.config.js'],['scripts']);
})
