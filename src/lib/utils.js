'use strict';

module.exports = {
  isPrimitive: function(arg) {
    return !angular.isObject(arg) && !angular.isArray(arg) && !angular.isFunction(arg);
  }
};
