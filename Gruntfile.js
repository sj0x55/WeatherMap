'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  var gruntConfigs = {
    data: {
      pkg: grunt.file.readJSON('package.json'),
      settings: require('./settings'),
      eslint: require('./grunt/configs/eslint'),
      karma: require('./grunt/configs/karma'),
      webpack: require('./grunt/configs/webpack'),
      'webpack-dev-server': require('./grunt/configs/webpack-dev-server')
    }
  };

  for (var name in gruntConfigs.data) {
    grunt.config.set(name, gruntConfigs.data[name]);
  }

  grunt.loadTasks('./grunt/tasks/');
};
