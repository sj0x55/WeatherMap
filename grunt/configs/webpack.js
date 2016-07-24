'use strict';

module.exports = (function() {
  var
    path = require('path'),
    settings = require('../../settings'),
    grunt = require('grunt'),
    webpackConfig = require(path.resolve(settings.basePath, settings.webpackConfigFile));

  return {
    options: webpackConfig,
    build: {}
  };
})();
