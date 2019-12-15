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

/*
This is for use with EleventyJS.
Run 'eleventy' then run 'gulp all'.
Eleventy renders from /src into /gulp_src.
Gulp transpiles scss and js from /gulp_src into /gulp_tmp,
then compresses css and js from /gulp_tmp into /public,
then copies other files from /gulp_src into /public also.
To browse /public, http-server can be used.
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
  return src('./gulp_src/es/*.js')
    .pipe(babel({
            presets: ['@babel/env']
        }))
    .pipe(dest('./gulp_tmp/src_js'));
};

/*
Minify JS from /src_js and place in /js
*/
const compressjs = () => {
  return pump([
       src('./gulp_tmp/src_js/**/*.js'),
       uglify(),
       dest('./public/js')
      ]
    );
};

/*
Transpile SCSS from /scss into CSS and place in /src_css
*/
const transpilescss = () => {
    return src('./gulp_src/scss/*.scss')
    .pipe(sass())
    .pipe(dest('./gulp_tmp/src_css'));
};

/*
Minify CSS from /src_css and place in /css
*/
const compresscss = () => {
  return src('./gulp_tmp/src_css/**/*.css')
    .pipe(uglifycss({
      "maxLineLen": 0,
      "uglyComments": true
    }))
    .pipe(dest('./public/css'));
};


/*
copy html files created by eleventy to /public
*/
const copy = () => {
    return src(
      [
        './gulp_src/**/*.html',
        './gulp_src/**/*.jpg',
        './gulp_src/**/*.gif',
        './gulp_src/**/*.png'
      ], 
      {base: './gulp_src'})
    .pipe(dest('./public'));
};

exports.all = series(transpilescss, compresscss, transpilejs, compressjs, copy);


