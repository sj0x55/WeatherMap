'use strict';

module.exports = (function() {
  var pluginFactory = function(config) {
    var
      WebpackPlugin = function() {
        this.optimizeChunkAssetsCallback = config.optimizeChunkAssetsCallback && config.optimizeChunkAssetsCallback.bind(this);
        this.onStartCallback = config.onStartCallback && config.onStartCallback.bind(this);
        config.init.apply(this, arguments);
      };

    WebpackPlugin.prototype.apply = function(compiler) {
      compiler.plugin('run', startCallback.bind(this));
      compiler.plugin('watch-run', startCallback.bind(this));

      compiler.plugin('compilation', (compilation) => {
        compilation.plugin('optimize-chunk-assets', optimizeChunkAssetsCallback.call(this, compilation));
      });
    };

    return WebpackPlugin;
  };

  function optimizeChunkAssetsCallback(compilation) {
    return (chunks, done) => {
      if (this.optimizeChunkAssetsCallback) {
        var files = [], compiledAsset;

        chunks.forEach(function(chunk) {
          files = files.concat(chunk.files);
        });

        files = files.concat(compilation.additionalChunkAssets);

        files.forEach((file) => {
          compiledAsset = this.optimizeChunkAssetsCallback(compilation.assets[file], file);
          if (compiledAsset) {
            compilation.assets[file] = compiledAsset;
          }
        });
      }

      done();
    };
  }

  function startCallback(compiler, done) {
    if (this.onStartCallback) {
      this.onStartCallback(done);
    } else {
      done();
    }
  }

  return function WebpackPluginFactory(config) {
    return pluginFactory(config);
  };
})();
