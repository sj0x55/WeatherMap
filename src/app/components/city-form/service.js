module.exports = function () {
  'use strict';

  /**
   * Required to define a unique ID for each city
   * Will be increased by one for each new city.
   */
  var cityListIndex = 1;

  this.service('cityFormService', function cityFormService(stateService, STATES) {
    /**
     * Create new city saved in state data
     *
     * @param {String} cityName
     * @return {Boolean}
     */
    this.createNew = function createNew(cityName) {
      stateService.append(STATES.CITIES, {
        id: cityListIndex++,
        name: cityName
      });

      return true;
    };

    /**
     * Validate city name if is correct to add. If is not errors objexct will be populated by error messages.
     *
     * @param {String} cityName
     * @param {Object} errors
     * @return {Boolean}
     */
    this.isValid = function isValid(cityName, errors) {
      errors = errors || {};

      if (!cityName) {
        errors.cityName = 'City field is required.';
      }

      return !Object.keys(errors).length;
    }
  });
};
