module.exports = (function() {
  'use strict';

  /**
   * Angular dependencies
   */
  require('angular');
  require('angular-route');
  require('angular-module');

  /**
   * Create main module of app
   */
  angular.module('app', ['ngRoute', 'Shared', 'Components']).extendAll([
    require('config'),
    require('templates'),
    require('run')
  ]);

  /**
   * Components module
   */
  angular.module('Components').extendAll([
    require('./components/app'),
    require('./components/city-form'),
    require('./components/city-list'),
    require('./components/city-list-item'),
    require('./components/weather-info')
  ]);

  /**
   * Shared module
   */
  angular.module('Shared').extendAll([
    require('./shared/constants'),
    require('./shared/observers'),
    require('./shared/state')
  ]);
})();
