module.exports = {
    env: {
      browser: true,
      es6: true,
      jest: true,
      node: true, 
    },
    extends: [
      'eslint:recommended',
      'plugin:jest/recommended', 
      'plugin:react/recommended',
    ],
    parser: '@babel/eslint-parser',
    parserOptions: {
      requireConfigFile: false,
      ecmaVersion: 2020, 
      sourceType: 'module', 
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: ['jest', 'react'], 
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'no-undef': 'error', 
      'react/prop-types': 'off', 
    },
  };
  