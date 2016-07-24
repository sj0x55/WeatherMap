
module.exports = (function () {
  'use strict';

  var path = require('path');

  return {
    basePath: path.resolve(process.cwd()).concat('/'),
    srcPath: './src/',
    distPath: './dist/',
    webpackConfigFile: './webpack/config.js',
    webpackLoadersPath: './webpack/loaders/'
  };
})();
