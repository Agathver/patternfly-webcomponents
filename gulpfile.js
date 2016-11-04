var gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  eslint = require('gulp-eslint'),
  ignore = require('gulp-ignore'),
  karma = require('karma').Server,
  path = require('path'),
  sass = require('gulp-sass'),
  $ = require('gulp-load-plugins')(),
  webpack = require('webpack-stream');

gulp.task('font', function(){
  return gulp.src([
      'node_modules/font-awesome/fonts/*',
      'node_modules/patternfly-css/source/fonts/*'
    ])
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('js', ['lint'], function () {
  return gulp.src(['src/*/*.js', '!src/*/*.spec.js'])
    .pipe($.plumber())
    .pipe($.babel(
      {presets: ['es2015']}
    ))
    // .pipe($.uglify())
    .pipe(gulp.dest('dist/es2015'));
});

gulp.task('lint', function () {
  return gulp.src(['src/*/*.js'])
    .pipe(eslint('eslint.json'))
    .pipe(eslint.failOnError());
});

gulp.task('scss', function() {
  return gulp.src(['src/scss/*.scss'])
    .pipe($.plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('test', function (done) {
  new karma({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('test-debug', function (done) {
  new karma({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false,
    browsers: ['Chrome']
  }, done).start();
});

gulp.task('webpack', ['js'], function() {
  return gulp.src(['dist/es2015/*/*.js'])
    .pipe(webpack({
      resolve: {
        root: [
          path.join(__dirname, "dist/es2015/pf-alert"),
          path.join(__dirname, "dist/es2015/pf-tabs"),
          path.join(__dirname, "dist/es2015/pf-utilization-bar-chart"),
          path.join(__dirname, "dist/es2015/pf-utils")
      ]}
    }))
    .pipe($.rename('patternfly.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('build', ['font', 'js', 'scss', 'webpack']);

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch('index.html', ['build']);
  gulp.watch('app/*.html', ['build']);
  gulp.watch('src/*.js', ['build']);
  gulp.watch('src/*.html', ['build']);
  gulp.watch("dist/**/*").on('change', browserSync.reload);
});