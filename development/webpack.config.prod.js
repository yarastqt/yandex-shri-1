/* eslint-disable strict */

'use strict';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');
const {
    NoEmitOnErrorsPlugin,
    DefinePlugin,
    LoaderOptionsPlugin,
    optimize: {
        UglifyJsPlugin,
        CommonsChunkPlugin
    }
} = require('webpack');

const webpackConfiguration = {
    entry: {
        common: [
            path.join(__dirname, '../src/js/index.js'),
            path.join(__dirname, '../src/styles/index.sass')
        ]
    },
    output: {
        filename: 'assets/js/[name].bundle.[chunkhash].js',
        path: path.join(__dirname, '../build'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.sass$/,
                use: ExtractTextPlugin.extract([
                    'css-loader',
                    'csso-loader',
                    'postcss-loader',
                    'sass-loader'
                ])
            },
            {
                test: /\.(png|jpg|svg)$/,
                loaders: [
                    'file-loader?name=assets/i/[hash].[ext]',
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            mozjpeg: {
                                progressive: true
                            },
                            optipng: {
                                optimizationLevel: 4
                            },
                            pngquant: {
                                quality: '75-90',
                                speed: 4
                            },
                            svgo: {
                                plugins: [
                                    { removeTitle: true },
                                    { convertColors: { shorthex: true } },
                                    { convertPathData: false }
                                ]
                            }
                        }
                    }
                ]
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
        new WebpackChunkHash(),
        new NoEmitOnErrorsPlugin(),
        new LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new UglifyJsPlugin({
            beautify: false,
            comments: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true,
                sequences: true,
                booleans: true,
                loops: true,
                unused: true,
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        }),
        new CommonsChunkPlugin({
            name: 'runtime',
            minChunks: Infinity
        }),
        new ExtractTextPlugin('assets/css/[name].bundle.[chunkhash].css'),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../src/index.prod.html'),
            minify: {
                collapseBooleanAttributes: true,
                collapseWhitespace: true,
                removeComments: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: true,
                sortAttributes: true,
                useShortDoctype: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                minifyJS: true
            }
        })
    ]
};

module.exports = webpackConfiguration;
