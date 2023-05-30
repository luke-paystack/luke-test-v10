module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    env: {
      amd: true,
      node: true,
      es6: true,
    },
    ignorePatterns: ['node_modules', 'build', 'coverage', 'dist'],
    plugins: ['@typescript-eslint', 'import', 'eslint-comments'],
    extends: [
      'eslint:recommended',
      'plugin:eslint-comments/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:import/typescript',
    ],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'import/no-unresolved': 'error',
      'import/order': ['error', { 'newlines-between': 'always', alphabetize: { order: 'asc' } }],
      'sort-imports': ['error', { ignoreDeclarationSort: true, ignoreCase: true }],
    },
  };
