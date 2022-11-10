const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const variable = require('./utils/variable');
const resolveConfig = require('./utils/resolve');
const plugins = require('./utils/plugins');

const { SRC_PATH, DIST_PATH, IS_DEV, IS_PRO, getCDNPath, getRootPath } = variable;

const config = {
  entry: {
    index: path.join(SRC_PATH, 'core/index.tsx'),
  },
  output: {
    path: DIST_PATH,
    filename: IS_DEV ? 'js/[name].bundle.js' : 'js/[name].[contenthash:8].bundle.js',
    publicPath: getCDNPath(),
    globalObject: 'this',
    chunkFilename: IS_DEV ? 'js/[name].chunk.js' : 'js/[name].[contenthash:8].chunk.js',
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true,
  },
  // loader 的执行顺序默认从右到左，多个 loader 用[],字符串只用一个 loader，也可以是对象的格式
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        include: [SRC_PATH, getRootPath('node_modules')],
        use: [
          {
            // 可以使用缓存进行优化
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
        exclude: [/node_modules/, /public/, /(.|_)min\.js$/],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          'thread-loader',
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
              modules: {
                mode: 'global',
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              lessOptions: {
                importLoaders: true,
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(less)$/,
        include: /node_modules/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          'thread-loader',
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              lessOptions: {
                javascriptEnabled: true,
                // modifyVars: theme,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg)$/,
        type: 'asset/resource',
        generator: {
          publicPath: '../',
          filename: './assets/images/[hash][ext][query]',
        },
      },
    ],
  },
  resolve: resolveConfig,
  plugins: plugins.getPlugins(),
};

module.exports = config;
