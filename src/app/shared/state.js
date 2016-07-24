module.exports = function () {
  'use strict';

  var utils = require('utils');

  /**
   * Service keeps all globals data needs for all components.
   * When any state will changed. Thanks observer all components will be notified.
   */
  this.service('stateService', function stateService(stateObserverService) {
    var dataContainer = {};

    /**
     * Create state for sopecified data by name
     *
     * @param {String} name
     * @param {Mix} data
     * @return {void}
     */
    this.set = function set(name, data) {
      if (angular.isUndefined(data)) {
        buildDataElement(name, undefined)
      } else {
        buildDataElement(name, copyIfReference(data));
      }

      updateChangedFlag(name, true);
      notifyObservers();
    };

    /**
     * Only append a element to exists array state data
     *
     * @param {String} name
     * @param {Mix} data
     * @return {void}
     */
    this.append = function append(name, data) {
      (dataContainer[name] || buildDataElement(name, [])).data.push(copyIfReference(data));
      updateChangedFlag(name, true);
      notifyObservers();
    };

    /**
     * Get state data
     *
     * @param {String} name
     * @return {Mix}
     */
    this.get = function get(name) {
      return dataContainer[name] && copyIfReference(dataContainer[name].data);
    };

    /**
     * Checking if state data has been changed
     * When state data will be changed all components will be notified about that.
     *
     * @param {String} name
     * @return {Boolean}
     */
    this.isChanged = function isChanged(name) {
      return dataContainer[name] && dataContainer[name].changed || false;
    };

    /** PRIVATE */
    /**
     * If state data is not privitive type, heeds to create copy to avoid side effects by references
     *
     * @param {Mix} data
     * @return {Mix}
     */
    function copyIfReference(data) {
      return utils.isPrimitive(data) ? data : angular.copy(data);
    }

    /**
     * Create state data element by name
     *
     * @param {String} name
     * @param {Mix} data
     * @return {Object}
     */
    function buildDataElement(name, data) {
      return dataContainer[name] = {
        data: data,
        changed: false
      };
    }

    /**
     * Notified all registered state observer callbacks
     * Typically happens after changed the state.
     * After notofied needs to change updated flag in each state data to false.
     *
     * @return {void}
     */
    function notifyObservers() {
      stateObserverService.notify().then(function () {
        updateAllChangedFlags(false);
      });

      removeAllDeletedData();
    }

    /**
     * Updated flag in each state data
     *
     * @param {Boolean} flag
     * @return {void}
     */
    function updateAllChangedFlags(flag) {
      for (var name in dataContainer) {
        updateChangedFlag(name, flag);
      }
    }

    /**
     * Removed all state data, without data to keep a clean container.
     *
     * @return {void}
     */
    function removeAllDeletedData() {
      for (var name in dataContainer) {
        if (dataContainer[name].hasOwnProperty('data') && angular.isUndefined(dataContainer[name].data)) {
          delete dataContainer[name];
        }
      }
    }

    /**
     * Updated flag in state data by name
     *
     * @param {String} name
     * @param {Boolean} flag
     * @return {void}
     */
    function updateChangedFlag(name, flag) {
      dataContainer[name].changed = flag;
    }

    // Needs for test the private API - make private fucntions visible for test.
    if (process.env.NODE_ENV === 'test') {
      this.privates = {
        copyIfReference: copyIfReference,
        buildDataElement: buildDataElement,
        notifyObservers: notifyObservers,
        updateAllChangedFlags: updateAllChangedFlags,
        removeAllDeletedData: removeAllDeletedData
      };
    }
  });
}
