module.exports = function () {
  'use strict';

  /**
   * Design pattern: Observer
   * Required for communication between all components.
   */
  this.service('observerService', function observerService($q, $log) {
    var observers = {};

    this.name = undefined;

    /**
     * Registering observer callback added them to array by name
     *
     * @param {Function} callback
     * @return {void}
     */
    this.register = function register(callback) {
      observers[this.name] = observers[this.name] || [];
      observers[this.name].push(callback);
    };

    /**
     * Execute all registered callbacks by observer name
     *
     * @return {Promise}
     */
    this.notify = function notify() {
      if (observers[this.name]) {
        return $q.all(observers[this.name].map(function (callback) {
          callback();
        }));
      } else {
        $log(['Observer named '.concat(this.name).concat(' doesn\'t exists'), '@@MODULE_PATH/notify()']);
        return $q.reject();
      }
    };

    /**
     * Required to create specified observer by name
     *
     * @param {Object} target
     * @param {String} name
     * @return {void}
     */
    this.extend = function extend(target, name) {
      for (var key in this) {
        if (this.hasOwnProperty(key)) {
          target[key] = this[key];
        }
      }

      target.name = name;
    };
  });

  /**
   * Specified observer by name, required to communicate between different states
   */
  this.service('stateObserverService', function stateObserverService(observerService) {
    observerService.extend(this, 'state');
  });
}
