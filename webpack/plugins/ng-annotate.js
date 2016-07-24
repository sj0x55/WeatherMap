'use strict';

module.exports = (function() {
  var
    pluginFactory = require('./plugin'),
    ngAnnotate = require('ng-annotate'),
    webpackSourceMapSource = require('webpack-core/lib/SourceMapSource'),
    webpackOriginalSource = require('webpack-core/lib/OriginalSource');

  return pluginFactory({
    init: function (options) {
      this.options = this.options || {
        add: true,
        singleQuotes: true,
        sourceMap: false
      };
    },
    optimizeChunkAssetsCallback: function (asset, filePath) {
      var value, sourceAndMap, map, input;

      if (this.options.sourceMap) {
        this.options.map = {
          inFile: filePath,
          sourceRoot: ''
        };
      }

      value = ngAnnotate(asset.source(), this.options);

      if (this.options.sourceMap && asset.sourceAndMap) {
        sourceAndMap = asset.sourceAndMap();
        map = sourceAndMap.map;
        input = sourceAndMap.source;
      } else {
        map = asset.map();
      }

      if (!value.errors) {
        if (this.options.sourceMap && asset.sourceAndMap) {
          return new webpackSourceMapSource(value.src, filePath, JSON.parse(value.map), input, map);
        } else {
          return new webpackOriginalSource(value.src, filePath, map);
        }
      }
    }
  });
})();
