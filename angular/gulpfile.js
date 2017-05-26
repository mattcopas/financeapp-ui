var gulp = require('gulp');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var Server = require('karma').Server;

gulp.task('concatJS', function() {
  gulp.start('cleanBuiltFolder');
  return gulp.src(['./app/*.js', './app/**/*.js'])
  .pipe(concat('built.js'))
  .pipe(gulp.dest('./built/'))
});

gulp.task('cleanBuiltFolder', function() {
  return gulp.src('built', {read: false})
    .pipe(clean());
});

gulp.task('test', function(done) {
  gulp.start('concatJS');
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});
