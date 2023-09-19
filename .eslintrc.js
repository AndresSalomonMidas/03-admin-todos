module.exports = {
  extends: ['next/core-web-vitals', 'airbnb-base'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'linebreak-style': process.platform === 'win32' ? [0, 'windows'] : [0, 'unix'],
    indent: ['error', 2],
    'import/prefer-default-export': [0],
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
    // For Redux slices
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state',
        'action',
      ],
    }],
  },
};
