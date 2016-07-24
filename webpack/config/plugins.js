module.exports = (function() {
  'use strict';

  var
    NODE_ENV,
    path = require('path'),
    webpack = require('webpack'),
    settings = require('../../settings'),
    NgAnnotatePlugin = require('../plugins/ng-annotate'),
    NgTemplatesPlugin = require('../plugins/ng-templates'),
    plugins = [
      new webpack.optimize.DedupePlugin(),
      new webpack.WatchIgnorePlugin([
        path.resolve(settings.basePath, settings.srcPath.concat('tmp'))
      ]),
      new NgTemplatesPlugin({
        processPath: function (path) {
          return path.replace('.html', '');
        },
        targets: (function () {
          var targets = {};

          targets[settings.srcPath + '/tmp/templates.js'] = {
            cwd: path.resolve(settings.basePath, settings.srcPath.concat('app')),
            src: ['components/**/*.html']
          };

          return targets;
        })()
      }),
      new NgAnnotatePlugin({
        add: true,
        singleQuotes: true,
        sourceMap: false
      })
    ];

  if (process.argv.indexOf('--production') !== -1) {
    NODE_ENV = 'production';

    plugins.push(new webpack.optimize.UglifyJsPlugin({
      mangle: {except: ['exports', 'require']},
      output: {comments: false}
    }));
  } else if (process.argv.indexOf('--test') !== -1) {
    NODE_ENV = 'test';
  } else {
    NODE_ENV = 'development';
  }

  plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
  }));

  return plugins;
})();
