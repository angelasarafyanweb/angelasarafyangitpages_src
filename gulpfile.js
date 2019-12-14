/*
Gulp 4 build flow
NPM Setup:
npm i gulp --global
npm i -D gulp
npm i -D gulp-sass
npm i -D gulp-uglifycss
npm i -D gulp-uglify
npm i -D pump
npm i -D gulp-babel@next @babel/core @babel/preset-env
*/

const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss');
var uglify = require('gulp-uglify');
var pump = require('pump');
const babel = require('gulp-babel');

/* functions */

/*
  Transpile modern ES6+ from /js into ES5 and place in /src_js
*/
const transpilejs = () => {
  return src('./gulpsrc/js/*.js')
    .pipe(babel({
            presets: ['@babel/env']
        }))
    .pipe(dest('./gulpsrc/src_js'));
};

/*
Transpile SCSS from /scss into CSS and place in /src_css
*/
const transpilescss = () => {
    return src('./gulpsrc/scss/*.scss')
    .pipe(sass())
    .pipe(dest('./gulpsrc/src_css'));
};

/*
Minify CSS from /src_css and place in /css
*/
const compresscss = () => {
  return src('./gulpsrc/src_css/**/*.css')
    .pipe(uglifycss({
      "maxLineLen": 0,
      "uglyComments": true
    }))
    .pipe(dest('./public/css'));
};

/*
Minify JS from /src_js and place in /js
*/
const compressjs = () => {
  return pump([
       src('./gulpsrc/src_js/**/*.js'),
       uglify(),
       dest('./public/js')
      ]
    );
};

/*
copy html files created by eleventy to /public
*/
const copy = () => {
    return src(
      [
        './gulpsrc/**/*.html',
        './gulpsrc/**/*.jpg',
        './gulpsrc/**/*.gif',
        './gulpsrc/**/*.png'
      ], 
      {base: './gulpsrc'})
    .pipe(dest('./public'));
};


// const watcher = () => {
// 	return watch('./gulpsrc/**/*.*', copy);
// };

// exports.monitor = watcher;
exports.all = series(transpilescss, compresscss, transpilejs, compressjs, copy);











