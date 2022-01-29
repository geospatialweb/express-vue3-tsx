module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:jest/recommended',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    project: './tsconfig.json',
    sourceType: 'module',
    tsconfigRootDir: __dirname
  },
  plugins: ['@typescript-eslint', 'jest'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off'
  }
}
