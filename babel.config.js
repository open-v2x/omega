var isDev = false;
if (process.env.NODE_ENV === 'dev') {
  isDev = true;
}

module.exports = function (api) {
  api.cache(true);
  const presets = [
    [
      '@babel/preset-react',
      {
        development: isDev,
      },
    ],
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['>0.25%', 'not ie 11', 'not op_mini all'],
        },
      },
    ],
    [
      '@babel/preset-typescript',
      {
        isTSX: true,
        allExtensions: true,
      },
    ],
  ];
  const plugins = [
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3,
        regenerator: true,
      },
    ],
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es', // 这条加了可以再少20k左右
        style: true, // 也可以配置为'css'。配置true可以减少30k
      },
    ],
  ];

  return {
    // 这个不设置的话，webpack 魔法注释会被删除，魔法注释用于分包
    comments: true,
    presets,
    plugins,
  };
};
