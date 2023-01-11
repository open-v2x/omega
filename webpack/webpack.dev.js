const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const variable = require('./utils/variable');

const { DIST_PATH } = variable;

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
  devServer: {
    open: '/',
    static: {
      publicPath: DIST_PATH,
    },
    compress: true, //是否启用gzip压缩
    host: 'localhost',
    port: 2333,
    historyApiFallback: {
      disableDotRule: true,
    },
    allowedHosts: 'all',
    hot: true,
    proxy: {
      '/api/omega': {
        target: 'http://47.100.126.13:28300/api',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: { '^/api/omega': '' },
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
