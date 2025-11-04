module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    browser: true,
    'react-native/react-native': true,
  },
  extends: [
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // Deve ser o último para desativar regras conflitantes
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    'react',
    'react-native',
    '@typescript-eslint',
    'prettier',
    'react-hooks',
    'import',
  ],
  rules: {
    // Regras de estilo de código do Guia de Estilo
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'import/prefer-default-export': 'off', // Permite export nomeados
    'react/react-in-jsx-scope': 'off', // Não é necessário no React 17+ (Expo/RN)
    'react/prop-types': 'off', // Desativado pois usamos TypeScript
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Desativado para componentes funcionais
    '@typescript-eslint/no-explicit-any': 'warn', // Usar 'warn' em vez de 'error' para 'any'
    'no-use-before-define': 'off', // Desativado para React Native
    '@typescript-eslint/no-use-before-define': ['error', { variables: false }],
    'react-native/no-unused-styles': 'error',
    'react-native/split-platform-components': 'error',
    'react-native/no-inline-styles': 'warn',
    'react-native/no-color-literals': 'warn',
    'react-native/no-raw-text': 'error',
    'react-native/no-single-element-style-arrays': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@ui-kitten/**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: '../*',
            group: 'parent',
            position: 'before',
          },
          {
            pattern: './*',
            group: 'sibling',
            position: 'before',
          },
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    react: {
      version: 'detect',
    },
  },
};
