'use strict';

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  cssnext = require('postcss-cssnext'),
  cssnano = require('gulp-cssnano'),
  livereload = require('gulp-livereload'),
  modernizr = require('gulp-modernizr'),
  plumber = require('gulp-plumber'),
  postcss = require('gulp-postcss'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  scsslint = require('gulp-scss-lint'),
  uglify = require('gulp-uglify'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream');

var paths = {
  npm: './node_modules',
  assets: './app/Resources/assets',
  sass: './app/Resources/assets/scss',
  entryJs: './app/Resources/assets/js/entry-app.js',
  css: './web/css',
  buildJs: './web/js',
};

var watch = {
  sass: './app/Resources/assets/scss/**/*.scss',
  js: './app/Resources/assets/js/**/*.js',
};

// Plumber error function
function onError(err) {
  console.log(err);
  this.emit('end');
}

gulp.task('scss-lint', function () {
  return gulp.src([
    watch.sass,
    '!' + paths.sass + '/base/_reset.scss',
    '!' + paths.sass + '/base/_grid.scss'
  ])
    .pipe(plumber({
      errorHandler: onError
    }))
});

gulp.task('sass', ['scss-lint'], function () {
  return gulp.src(paths.sass + '/*.scss')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(postcss([cssnext]))
    .pipe(gulp.dest(paths.css))
    .pipe(livereload());
});

gulp.task('sass:prod', function () {
  return gulp.src(paths.sass + '/*.scss')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sass())
    .pipe(postcss([cssnext]))
    .pipe(cssnano({
      keepSpecialComments: 1,
      rebase: false
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.css));
});

gulp.task('modernizr', function () {
  return gulp.src(paths.entryJs)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(modernizr({
      'options': [
        'setClasses', 'addTest', 'html5printshiv', 'testProp', 'fnBind'
      ],
      'tests': ['objectfit', 'flexbox']
    }))
    .pipe(gulp.dest(paths.buildJs))
});

gulp.task('js', ['modernizr'], function () {
  return browserify(paths.entryJs)
    .transform('babelify', {presets: ['es2015', 'stage-2'], comments: false})
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest(paths.buildJs));
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(watch.sass, ['sass']);
  gulp.watch(watch.js, ['js']);
});

gulp.task('default', ['sass', 'modernizr', 'js']);

gulp.task('prod', ['sass:prod', 'modernizr', 'js']);
