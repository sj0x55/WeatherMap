module.exports = (function() {
  'use strict';

  var
    path = require('path'),
    webpack = require('webpack'),
    settings = require('../settings');

  return {
    devtool: 'source-map',
    cache: true,
    entry: path.resolve(settings.basePath, settings.srcPath.concat('app/main.js')),
    output: {
      path: path.resolve(settings.basePath, settings.distPath),
      publicPath: path.resolve(settings.basePath, settings.distPath),
      filename: 'app.js',
      sourceMapFilename: '[file].map'
    },
    module: {
      noParse: [
        /node_modules\/\.js/
      ],
      preLoaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }],
      loaders: [{
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'replace-loader'
      }, {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }]
    },
    resolveLoader: {
      alias: {
        'replace-loader': path.resolve(settings.basePath, settings.webpackLoadersPath.concat('replace'))
      }
    },
    resolve: {
      root: path.resolve(settings.basePath, settings.srcPath),
      alias: {
        'config': 'app/config.js',
        'run': 'app/run.js',
        'templates': 'tmp/templates.js'
      },
      modulesDirectories: [
        path.resolve(settings.basePath, 'node_modules'),
        'lib'
      ],
    },
    eslint: {
      configFile: '.eslintrc.js',
      ignorePath: '.eslintignore'
    },
    plugins: require('./config/plugins')
  };
})();
