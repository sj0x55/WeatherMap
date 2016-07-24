'use strict';

module.exports = (function() {
  var
    path = require('path'),
    settings = require('../../settings'),
    grunt = require('grunt'),
    webpackConfig = require(path.resolve(settings.basePath, settings.webpackConfigFile));

  return {
    options: {
      contentBase: path.resolve(settings.basePath),
      webpack: webpackConfig,
      port: 1234,
      historyApiFallback: {
        index: 'dist/index.html'
      }
    },
    start: {
      keepAlive: true,
      webpack: {
        cache: true,
        debug: true
      }
    }
  };
})();
