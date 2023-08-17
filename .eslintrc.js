module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'airbnb-base',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  env: {
    commonjs: true,
    node: true,
    es6: true,
  },
  rules: {
    'no-bitwise': 'off',
    'no-plusplus': 'off',
    'import/extensions': 'off',
    'max-classes-per-file': 'off',
    'no-shadow': 'off',
    'class-methods-use-this': 'off',
    "no-restricted-syntax": ["error", "ForInStatement", "LabeledStatement", "WithStatement"],
    'no-useless-constructor': 'off',
    'import/prefer-default-export': 'off'
  },
};
