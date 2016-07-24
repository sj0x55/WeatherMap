module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'mocha': true,
    'protractor': true,
    'jquery': true,
    'node': true
  },
  'globals': {
    '_': true,
    'Microsoft': true,
    'angular': true,
    'debug': true,
    'google': true
  },
  'extends': 'eslint:recommended',
  'rules': {
    'no-unused-vars' : 1,
    'no-console': 1,
    'indent': [2, 2, {
      'SwitchCase': 1
    }],
    // 'linebreak-style': [2, 'unix'],
    'quotes': [2, 'single'],
    'complexity': [2, 12],
    'max-statements': [2, 24],
    'max-depth': [2, 5],
    'max-len': [1, 120],
    'max-params': [1, 6],
    'max-nested-callbacks': [2, 2],
  }
};
