module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': 'plugin:react/recommended',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 13,
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'react/prop-types': 'off',
    'no-cond-assign': 'error',
    'no-debugger': 'warn',
    'no-console': 'warn',
    'no-template-curly-in-string': 'warn',
    'consistent-return': [
      'error'
    ],
    'curly': [
      'error',
      'all'
    ],
    'eqeqeq': [
      'error',
      'always'
    ],
    'no-dupe-else-if': 'error',
    'no-eq-null': 'warn',
    'no-eval': 'error',
    'no-multi-spaces': 'error',
    'yoda': 'warn',
    'no-undef': 'error',
    'no-unused-vars': 'off',
    'brace-style': [
      'error',
      '1tbs',
      {
        'allowSingleLine': false
      }
    ],
    'indent': [
      'error',
      2,
      {
        'SwitchCase': 1,
        'VariableDeclarator': 2
      }
    ],
    'quotes': [
      'error',
      'single',
      {
        'avoidEscape': true,
        'allowTemplateLiterals': true
      }
    ],
    'semi': [
      'error',
      'always'
    ],
    'semi-style': [
      'error',
      'last'
    ]
  }
};
