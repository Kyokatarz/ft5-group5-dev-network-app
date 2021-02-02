module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    //Suppress missing React Import errors - Not required in NextJS
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }], //should add ".ts" if typescript project
    "semi": ["error", "never"],
    "@typescript-eslint/explicit-module-boundary-types": 'off',
    "@typescript-eslint/no-explicit-any": "off",
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
