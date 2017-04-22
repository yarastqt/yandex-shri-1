/* eslint-disable strict */

'use strict';

const path = require('path');
const sorting = require('./postcss.sorting');

module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: ['last 2 versions']
        }),
        require('postcss-inline-svg')({
            path: path.join(__dirname, 'src/assets/i/svg')
        }),
        require('postcss-sorting')(sorting)
    ]
};
