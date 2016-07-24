'use strict';

module.exports = (function() {
  var
    pluginFactory = require('./plugin'),
    grunt = require('grunt'),
    minify = require('html-minifier').minify;

  return pluginFactory({
    init: function(options) {
      this.options = options || {};
    },
    onStartCallback: function(done) {
      var
        options = this.options,
        templates = {},
        minifierSettings = {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        };

      for (var target in options.targets) {
        if (options.targets.hasOwnProperty(target)) {
          var item = options.targets[target];

          templates[target] = {};

          grunt.file.expand({ cwd: item.cwd },  item.src).forEach(function(filePath) {
            var fileName = filePath.substring(filePath.lastIndexOf('/') + 1);

            if (fileName.substring(0, 1) !== '_') {
              templates[target][options.processPath(filePath)] = minify(grunt.file.read(item.cwd + '/' + filePath), minifierSettings);
            }
          });
        }
      }

      for (var target in templates) {
        var lines = [];
        if (templates.hasOwnProperty(target)) {
          for (var filePath in templates[target]) {
            lines.push('$templateCache.put(\'' + filePath + '\', ' + JSON.stringify(templates[target][filePath]) + ');');
          }

          grunt.file.write(target,
            'module.exports = function() {this.run(function ($templateCache) { \'use strict\';\n'
              .concat(lines.join('\n'))
            .concat('});};'));
        }
      }

      done();
    }
  });
})();
