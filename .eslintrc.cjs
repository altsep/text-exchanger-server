module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:json/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier', 'import', '@typescript-eslint', 'json'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    tsconfigRootDir: __dirname,
    project: ['tsconfig.json'],
  },
  rules: {
    'no-console': 0,
    'no-param-reassign': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    'import/prefer-default-export': 0,
    'func-names': 0,
    'no-underscore-dangle': 0,
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.js'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.mts', '*.cts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 2,
        '@typescript-eslint/explicit-member-accessibility': [
          2,
          { accessibility: 'explicit', overrides: { constructors: 'no-public' } },
        ],
        '@typescript-eslint/explicit-function-return-type': 2,
        '@typescript-eslint/explicit-member-accessibility': [
          2,
          {
            accessibility: 'explicit',
            overrides: { constructors: 'no-public' },
          },
        ],
      },
    },
  ],
};
