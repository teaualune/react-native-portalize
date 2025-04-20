module.exports = {
  extends: [
    '@react-native',
    'plugin:jest/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
    ecmaFeatures: {jsx: true},
  },
  plugins: ['prettier'],
  rules: {
    camelcase: 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'react/display-name': 'off',
  },
  ignorePatterns: ['node_modules/**/*'],
};
