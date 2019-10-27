module.exports = {
    env: {
      node: true,
      es6: true,
      mocha: true,
    },
    extends: [
      'airbnb-base',
    ],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    rules: {
      "no-useless-escape": 0,
      "consistent-return": 0,
    },
  };
 
  