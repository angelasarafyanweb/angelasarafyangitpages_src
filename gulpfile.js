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
Transpile and minify SCSS from /scss into CSS and place in /punlic
*/
const proccss = () => {
    return src('./gulp_src/scss/*.scss')
    .pipe(sass())
    .pipe(uglifycss({
      "maxLineLen": 0,
      "uglyComments": true
    }))
    .pipe(dest('./public/css'));
};

/*
  Transpile and minify modern ES6+ from /js into ES5 and place in /public
*/
const procjs = () => {
  return pump([
       src('./gulp_src/js/*.js'),
       babel({
            presets: ['@babel/env']
       }),
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
        './gulp_src/**/*.html',
        './gulp_src/**/*.jpg',
        './gulp_src/**/*.gif',
        './gulp_src/**/*.png'
      ],
      {base: './gulp_src'})
    .pipe(dest('./public'));
};

exports.all = series(proccss, procjs, copy);
