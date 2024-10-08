module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    '@electron-toolkit/eslint-config-ts/recommended',
    '@electron-toolkit/eslint-config-prettier'
  ],
  rules: {
    '@typescript-eslint/no-use-before-define': 'off', //调用前使用方法，为了ref调用表单妥协
    'prefer-const': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    eqeqeq: 'off',
    'no-use-before-define': 'off',
    'no-empty-pattern': 'off',
    'array-callback-return': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/display-name': 'off',
    'react/prop-types': 'off'
  }
}
