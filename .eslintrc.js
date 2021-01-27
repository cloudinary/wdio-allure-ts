module.exports = {
  env: {
    node: true,
    mocha: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:wdio/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/no-inferrable-types': 0,
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/no-namespace': 0,
    '@typescript-eslint/array-type': ['error', { default: 'generic' }],
    '@typescript-eslint/no-explicit-any': ['error'],
  },
};
