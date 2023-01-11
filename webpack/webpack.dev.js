const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const variable = require('./utils/variable');
const util = require('./utils/util');
const path = require('path');

const { DIST_PATH, PUBLIC_PATH } = variable;
const { getPackageName } = util;
console.log('packageName:', getPackageName());

const config = {
  mode: 'development',
  cache: { type: 'memory' },
  devtool: 'eval-cheap-module-source-map',
  stats: 'errors-only',
  watchOptions: {
    aggregateTimeout: 500,
    poll: 1000,
    ignored: /node_modules/,
  },
  output: {
    // library: `${getPackageName()}`,
    library: 'v2x-omega',
    libraryTarget: 'umd',
    chunkLoadingGlobal: `webpackJsonp_${getPackageName()}`,
  },
  devServer: {
    open: '/',
    static: [
      {
        publicPath: DIST_PATH,
      },
      {
        directory: path.join(PUBLIC_PATH, 'assets'),
      },
    ],
    compress: true, //是否启用gzip压缩
    host: 'localhost',
    port: 2333,
    historyApiFallback: {
      disableDotRule: true,
    },
    allowedHosts: 'all',
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/api': {
        target: 'http://47.100.126.13:28300',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: { '^/api': '/api/omega' },
      },
    },
    devMiddleware: {
      publicPath: '/',
      stats: 'errors-only',
    },
  },
};
const mergedConfig = webpackMerge.merge(baseConfig, config);

// mergedConfig.plugins = mergedConfig.plugins.filter(Boolean);

module.exports = mergedConfig;
