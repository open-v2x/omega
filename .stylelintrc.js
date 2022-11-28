module.exports = {
  processors: [],
  plugin: ['stylelint-less'],
  extends: 'stylelint-config-standard',
  rules: {
    'no-missing-end-of-source-newline': null,
    'declaration-block-no-duplicate-properties': true,
    'no-invalid-double-slash-comments': null,
  },
};
