var gulp = require('gulp');
var mocha = require('gulp-mocha');
var env = require('gulp-env');
var nodemon = require('gulp-nodemon');


gulp.task('nodemon', function() {
  env({
    file: './devEnvironment.json'
  })
  nodemon({
    script: './server.js',
    ext: 'js less html'
  })
})

gulp.task('test', function() {
  env({
    file: './testEnvironment.json'
  })
  return gulp.src(['tests/**/*.spec.js'])
    .pipe(mocha({

    }));
});
