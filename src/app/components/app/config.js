module.exports = function () {
  'use strict';

  this.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        template: '<app>Loading app...</app>',
        resolve: {}
      });
  });
};
