'use strict'

var del = require('del')
var gulp = require('gulp')
var autoprefixer = require('gulp-autoprefixer')
var concat = require('gulp-concat')
var imagemin = require('gulp-imagemin')
var less = require('gulp-less')
var postcss = require('gulp-postcss')
var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')
var uglify = require('gulp-uglify')
var cssmin = require('gulp-cssmin')
var salad = require('postcss-salad')(require('./salad.config.json'))
var inject = require('gulp-inject')
var htmlReplace = require('gulp-html-replace')
var cache = require('gulp-cache')
var hash = require('gulp-hash')

// 清空打包
 gulp.task('del', function () {
  del.sync([
    'dist/assets/css'
  ])
})

/* css */ 
gulp.task('compile:css', ['compile:less', 'compile:sass'], function(){
  var postProcess = [
    salad,
    autoprefixer
  ]
  return gulp.src('src/assets/css/**/*.css')
    .pipe(concat('style.css'))
    .pipe(postcss(postProcess))
    .pipe(sourcemaps.init())
    .pipe(cssmin())
    .pipe(sourcemaps.write())
    .pipe(hash({
      hashLength: 32,
      template: '<%= name %>.<%= hash %><%= ext %>'
    }))
    .pipe(gulp.dest('dist/assets/css'))
})

/* less */
gulp.task('compile:less', function(){
  return gulp.src('src/assets/less/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('src/assets/css'))
})

/* sass */
gulp.task('compile:sass', function () {
  return gulp.src('src/assets/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/assets/css'));
});

/* watch */
gulp.task('less:watch', function(){
  gulp.watch('src/assets/less/**/*.less', ['compile:less']);
})

gulp.task('sass:watch', function(){
  gulp.watch('src/assets/sass/**/*.scss', ['compile:sass']);
})

/* fonts */
/* gulp.task('copyFont', function () {
  return gulp.src('src/assets/fonts/**')
    .pipe(gulp.dest('dist/assets/fonts'))
}) */

/* 压缩 image */
gulp.task('copyImage', function () {
  return gulp.src('dist/assets/imgs/**')
    .pipe(cache(imagemin({
        optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
        progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
        interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
        multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
    })))
    .pipe(gulp.dest('dist/assets/imgs'))
})

/* js */


/* inject css in html */
gulp.task('replace', function() {
  gulp.src('./dist/index.html')
    .pipe(htmlReplace({
        'css': ''
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('inject', ['compile:css', 'replace'], function(){
  return gulp.src('./dist/*.html')
    .pipe(inject(gulp.src('./dist/**/*.css', {read: false}), { transform: function(filepath){
      if(filepath.indexOf('/dist') > -1) {
        return '<link rel="stylesheet" href="'+ filepath.split('/dist/')[1] +'">'
      }
      return inject.transform.apply(inject.transform, arguments);
    }}))
    .pipe(gulp.dest('./dist'));
})

gulp.task('watch', ['less:watch', 'sass:watch', 'compile:css'])
gulp.task('default', ['del', 'compile:css', 'copyImage', 'inject', 'replace'])
