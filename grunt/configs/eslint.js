'use strict';

module.exports = (function(grunt) {
  var
    path = require('path'),
    settings = require('../../settings'),
    files = [
      '<%= settings.srcPath %>/app/**/*.js',
      '<%= settings.srcPath %>/lib/**/*.js'
    ],
    filesProcessed = undefined;

  return {
    options: {
      configFile: path.resolve(settings.basePath.concat('.eslintrc.js')),
      format: 'stylish'
    },
    files: files,
    watchFiles: []
  };
})();
