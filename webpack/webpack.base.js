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
    publicPath: '/',
    // publicPath: getCDNPath(),
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
        exclude: /node_modules/,
        use: [
          IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: false,
              sourceMap: !IS_PRO,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.css$/,
        exclude: [SRC_PATH],
        use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]___[hash:base64:5]',
              },
              sourceMap: !IS_PRO,
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
                globalVars: {
                  'header-height': '56px',
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      // {
      //   test: /\.(png|jpg|jpeg|gif|bmp)$/,
      //   loader: 'url-loader',
      //   // options: {
      //   // limit: 14 * 1024,
      //   // },
      // },
    ],
  },
  resolve: resolveConfig,
  plugins: plugins.getPlugins(),
};

module.exports = config;
