module.exports = function(config) {
  var path = require('path');
  var webpack = require('webpack');
  var settings = require('./settings');
  var webpackConfig = require('./webpack/config.js');
  var preprocessors = {};

  preprocessors[settings.srcPath.concat('app/main-test.js')] = ['webpack', 'sourcemap'];

  config.set({
    files: [
      settings.srcPath.concat('app/main-test.js')
    ],
    reporters: ['mocha'],
    frameworks: ['mocha', 'chai', 'sinon'],
    browsers: ['PhantomJS'],
    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-chai',
      'karma-sinon',
      'karma-phantomjs-launcher',
      'karma-mocha-reporter',
      'karma-sourcemap-loader'
    ],
    preprocessors: preprocessors,
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    },
    webpackMiddleware: {
      stats: {
        chunks: false,
      },
      noInfo: true
    },
    port: 9876,
    colors: true,
    autoWatch: true,
    singleRun: true
  });
};
