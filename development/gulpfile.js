/* eslint-disable strict */

'use strict';

const path = require('path');
const gulp = require('gulp');
const clean = require('gulp-clean');
const webpack = require('webpack');
const sequence = require('run-sequence');

const webpackConfig = require('./webpack.config.prod');

gulp.task('clean', () => (
    gulp.src(path.join(__dirname, '../build'), { read: false })
        .pipe(clean({ force: true }))
));

gulp.task('webpack', (callback) => (
    webpack(webpackConfig, callback)
));

gulp.task('copy-icons', () => (
    gulp.src(path.join(__dirname, '../src/assets/i/icon*.png'))
        .pipe(gulp.dest(path.join(__dirname, '../build/assets/i')))
));

gulp.task('copy-manifest', () => (
    gulp.src(path.join(__dirname, '../src/manifest.json'))
        .pipe(gulp.dest(path.join(__dirname, '../build')))
));

gulp.task('default', () => (
    sequence('clean', 'webpack', 'copy-icons', 'copy-manifest')
));
