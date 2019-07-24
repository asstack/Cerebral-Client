module.exports = exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['react', 'import', 'jest'],
  extends: ['airbnb', 'plugin:jest/recommended'],
  rules: {
    'arrow-body-style': [0],
    'arrow-parens': [0],
    'class-methods-use-this': [0, 'always'],
    'comma-dangle': [0],
    'import/no-named-as-default': [0],
    'import/no-unresolved': [1],
    'jsx-a11y/label-has-for': [0],
    'max-len': [1, 165],
    'no-unused-expressions': [2, { allowShortCircuit: true }],
    'object-curly-newline': [2, { minProperties: 5, multiline: true, consistent: true }],
    'react/destructuring-assignment': [0],
    'react/forbid-prop-types': [0],
    'react/jsx-filename-extension': [0],
    'react/jsx-one-expression-per-line': [0],
    'jsx-a11y/click-events-have-key-events': [0],
    'jsx-a11y/no-noninteractive-element-interactions': [0],
    'jsx-a11y/no-static-element-interactions': [0],
    'react/require-default-props': [0],
    'react/sort-comp': [0],
    'react/no-unused-prop-types': [0],
    'react/prop-types': [2, { ignore: ['children', 'className'] }],
    'prefer-promise-reject-2s': [0],
    'react/no-array-index-key': [1],
    'no-nested-ternary': [1],
    'react/no-unused-state': [1],
    'jsx-a11y/label-has-associated-control': [1],
    'import/prefer-default-export': [1],
    'import/no-cycle': [1],
    'no-param-reassign': [1],
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
    camelcase: [0],
    'prefer-destructuring': [1],
    'react/prop-types': [0]
  },
  env: {
    browser: true,
    es6: true
  }
};
