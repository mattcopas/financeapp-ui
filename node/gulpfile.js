var gulp = require('gulp');
var jasmineNode = require('gulp-jasmine-node');

gulp.task('test', function() {
  return gulp.src(['tests/**/*.spec.js']).pipe(jasmineNode({
    timeout: 10000
  }));
})
