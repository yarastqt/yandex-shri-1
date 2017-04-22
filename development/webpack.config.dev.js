/* eslint-disable strict */

'use strict';

const path = require('path');
const {
    HotModuleReplacementPlugin,
    NoEmitOnErrorsPlugin,
    DefinePlugin,
    LoaderOptionsPlugin
} = require('webpack');

const webpackConfiguration = {
    devtool: 'cheap-module-source-map',
    entry: [
        'webpack-hot-middleware/client',
        path.join(__dirname, '../src/js/index.js'),
        path.join(__dirname, '../src/styles/index.sass')
    ],
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.sass$/,
                loaders: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|svg)$/,
                loader: 'file-loader?name=[name].[ext]'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.sass'],
        modules: [
            path.join(__dirname, '../src/js'),
            path.join(__dirname, '../node_modules')
        ]
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new NoEmitOnErrorsPlugin(),
        new LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]
};

module.exports = webpackConfiguration;
