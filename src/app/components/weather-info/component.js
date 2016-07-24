module.exports = function () {
  'use strict';

  this.component('weatherInfo', {
    templateUrl: 'components/weather-info/template',
    controller: function WeatherInfoController(
    $log,
    STATES,
    STRINGS,
    stateObserverService,
    stateService,
    weatherInfoService) {
      this.$onInit = function() {
        init.call(this);
      };

      /**
       * Registered observer to observing current city to preview weather
       */
      stateObserverService.register(function () {
        if (stateService.isChanged(STATES.CITY_TO_PREVIEW)) {
          init.call(this, stateService.get(STATES.CITY_TO_PREVIEW));

          if (this.cityName) {
            showLoading.call(this);

            weatherInfoService.fetchWeather(this.cityName).then(
              onSuccessCallback.bind(this)
            ).catch(function (error) {
              onErrorCallback.call(this, STRINGS.WEATHER_ERROR);
              $log([error, '@@MODULE_PATH/WeatherInfoController()']);
            });
          }
        }
      }.bind(this));


      // Needs for test the private API - make private fucntions visible for test.
      if (process.env.NODE_ENV === 'test') {
        this.privates = {
          init: init,
          onSuccessCallback: onSuccessCallback,
          onErrorCallback: onErrorCallback,
          showLoading: showLoading,
          hideLoading: hideLoading
        };
      }
    }
  });

  /** PRIVATE  */
  /**
   * Reset all datas to specified city object.
   *
   * @param {Object} city
   * @return {void}
   */
  function init(city) {
    hideLoading.call(this);
    this.cityName = city && city.name;
    this.error = undefined;
    this.cityDetails = undefined;
    this.weatherDetails = undefined;
  }

  /**
   * Callback when request of data returned a correct response.
   *
   * @param {Object} city
   * @return {void}
   */
  function onSuccessCallback(data) {
    hideLoading.call(this);
    this.error = data.error;
    this.cityDetails = data.cityDetails;
    this.weatherDetails = data.weatherDetails;
  }

  /**
   * Callback when request of data returned a error response.
   *
   * @param {String} error
   * @return {void}
   */
  function onErrorCallback(error) {
    hideLoading.call(this);
    this.error = error;
  }

  /**
   * Just show loader
   *
   * @return {void}
   */
  function showLoading() {
    this.loading = true;
  }

  /**
   * Just hide loader
   *
   * @return {void}
   */
  function hideLoading() {
    this.loading = false;
  }
};
