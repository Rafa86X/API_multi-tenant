module.exports = {
  root: true,
  env: {
      node: true,
      es2021: true,
  },
  extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
  },
  rules: {
      "indent": [
          "error",
          4
      ],
      "quotes": [
          "error",
          "single"
      ],
      "semi": [
          "error",
          "always"
      ]
  },
  ignorePatterns: [
      'node_modules/',
      'dist/'
  ],
};
