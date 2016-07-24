/**
 * Extending a standard angular.module function to a new mechanisms like:
 * - added new extend() function - shorter form to extend each module with using shorter syntax
 * - protection against re-creating already created module
 */
module.exports = (function () {
  'use strict';

  var
    angularModule = angular.module,
    registeredModules = {};

  angular.module = function(name, reqs, configFn) {
    if (registeredModules[name]) {
      return registeredModules[name];
    }
    else {
      return createModule(name, reqs, configFn);
    }
  };

  function createModule(name, reqs, configFn) {
    var module = angularModule(name, reqs || [], configFn);

    module.extend = function (extendFn) {
      extendFn.call(this);
      return module;
    };

    module.extendAll = function (dependencies) {
      if (angular.isArray(dependencies)) {
        dependencies.forEach(function (extendFn) {
          module.extend(extendFn);
        });
      }

      return module;
    };

    return registeredModules[name] = module;
  }
})();
