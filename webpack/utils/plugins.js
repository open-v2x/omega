const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const webpack = require('webpack');

const variable = require('./variable');
const DotenvPlugin = require('dotenv-webpack');
const path = require('path');

const { PUBLIC_PATH, DIST_PATH, ENV_CONFIG_PATH, IS_DEV, SRC_PATH } = variable;

function getHTMLPlugins() {
  const indexHtmlPlugin = new HtmlWebpackPlugin({
    template: path.join(PUBLIC_PATH, 'index.html'),
    // filename: path.join(DIST_PATH, 'index.html'),
    filename: 'index.html',
    inject: true, //true 插入body底部，head:插入head标签，false:不生成js文件
    favicon: path.join(PUBLIC_PATH, 'favicon.ico'),
    // hash: true, // 会在打包好的bundle.js后面加上hash串
    title: '',
    minify: {
      removeComments: true, // 删除注释
      collapseWhitespace: true,
      minifyCSS: true, // 压缩 HTML 中出现的 CSS 代码
      minifyJS: true, // 压缩 HTML 中出现的 JS 代码
    },
  });

  return [indexHtmlPlugin];
}

function getPlugins() {
  const miniCssPlugin = new MiniCssExtractPlugin({
    filename: IS_DEV ? 'css/[name].css' : 'css/[name].[contenthash:8].css',
    chunkFilename: IS_DEV ? 'css/[name].chunk.css' : 'css/[name].[contenthash:8].chunk.css',
    // 常遇到如下警告，Conflicting order. Following module has been added:…。
    // 此警告意思为在不同的js中引用相同的css时，先后顺序不一致。也就是说，在1.js中先后引入a.css和b.css，而在2.js中引入的却是b.css和a.css，此时会有这个warning。
    ignoreOrder: true,
  });

  const dotenvPlugin = new DotenvPlugin({
    path: ENV_CONFIG_PATH,
  });

  const copyPlugin = new CopyPlugin({
    patterns: [
      {
        from: path.join(PUBLIC_PATH, 'assets'),
        to: path.join(DIST_PATH, 'assets'),
      },
    ],
  });

  const nodePolyfillPlugin = new NodePolyfillPlugin();

  const providePlugin = new webpack.ProvidePlugin({
    Buffer: ['buffer', 'Buffer'],
  });

  return [
    ...getHTMLPlugins(),
    dotenvPlugin,
    miniCssPlugin,
    copyPlugin,
    nodePolyfillPlugin,
    providePlugin,
  ];
}

module.exports = {
  getPlugins,
};
