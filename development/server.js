/* eslint-disable strict */

'use strict';

const path = require('path');
const express = require('express');
const browserSync = require('browser-sync');

const webpack = require('webpack');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfiguration = require('./webpack.config.dev');

const browserSyncServer = browserSync.create();
const bs = browserSyncServer.init({ logSnippet: false });
const browserSyncConnect = require('connect-browser-sync')(bs);

const app = express();
const webpackCompiler = webpack(webpackConfiguration);
const webpackDevMiddlewareOptions = {
    stats: {
        colors: true,
        assets: false,
        timings: true,
        chunks: false,
        version: false
    }
};

app.set('port', process.env.PORT || 8080);

/** Use development middlewares */
app.use(express.static(path.join(__dirname, '../src')));
app.use(webpackDevMiddleware(webpackCompiler, webpackDevMiddlewareOptions));
app.use(webpackHotMiddleware(webpackCompiler));
app.use(browserSyncConnect);

app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, '../src/index.dev.html'));
});

app.listen(app.get('port'), () => {
    /* eslint-disable no-console */
    console.log(`Server is running and listening on http://localhost:${app.get('port')}`);
});
