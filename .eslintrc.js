module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: { 
    'linebreak-style': 0,
    'object-curly-newline': ['error', { 'multiline': true, 'minProperties': 10 }]},
};
