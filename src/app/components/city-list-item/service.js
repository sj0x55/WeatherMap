module.exports = function () {
  'use strict';

  this.service('cityListItemService', function cityListItemService(stateService, STATES) {
    /**
     * Change state data with current city to needs to show the weather.
     * When state will be changed, the suitable component will use a observer to execute specified callback.
     */
    this.showWeather = function showWeather(city) {
      stateService.set(STATES.CITY_TO_PREVIEW, city);
    };

    this.removeById = function removeById(id) {
      removeCitiesById(id);
      removeCurrentCitiesById(id);
    };

    /** PRIVATE */
    /**
     * Remove city by id from the specified state data.
     *
     * @param {Integer} id
     * @return {void}
     */
    function removeCitiesById(id) {
      var cityList = stateService.get(STATES.CITIES);

      if (cityList) {
        cityList = cityList.filter(function (city) {
          return (city.id !== id);
        });

        stateService.set(STATES.CITIES, cityList);
      }
    }

    /**
     * Remove current city to preview weather, when id is the same like removing city.
     *
     * @param {Integer} id
     * @return {void}
     */
    function removeCurrentCitiesById(id) {
      var currentCityWeather = stateService.get(STATES.CITY_TO_PREVIEW);

      if (currentCityWeather && currentCityWeather.id === id) {
        stateService.set(STATES.CITY_TO_PREVIEW, undefined);
      }
    }

    // Needs for test the private API - make private fucntions visible for test.
    if (process.env.NODE_ENV === 'test') {
      this.privates = {
        removeCitiesById: removeCitiesById,
        removeCurrentCitiesById: removeCurrentCitiesById
      };
    }
  });
};
