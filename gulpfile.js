const { src, dest, series, parallel } = require('gulp');
const minify = require('gulp-clean-css');
const terser = require('gulp-terser');

const defaultTask = () => {
  return src('src/*.html').pipe(dest('dist'));
};

const scripts = () => {
  return src('src/scripts/*.js')
  .pipe(terser())
  .pipe(dest('dist/scripts'));
};

const styles = () => {
  return src('src/*.css')
  .pipe(minify())
  .pipe(dest('dist'));
};

exports.default = defaultTask;
exports.build = series(defaultTask, scripts, styles);
