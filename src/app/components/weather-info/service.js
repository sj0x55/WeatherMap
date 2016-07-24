module.exports = function () {
  'use strict';

  this.service('weatherInfoService', function weatherInfoService($http, $log, worldWeatherOnlineService) {
    this.fetchWeather = function fetchWeather(cityName) {
      try {
        return $http({
          method: 'GET',
          url: worldWeatherOnlineService.getApiUrl({ query: cityName })
        }).then(fetchWeatherSuccess);
      } catch (err) {
        $log([err, '@@MODULE_PATH/fetchWeather()']);
      }
    };

    /** PRIVATE */
    function fetchWeatherSuccess(response) {
      try {
        return worldWeatherOnlineService.translateResponse(response);
      } catch (err) {
        $log([err, '@@MODULE_PATH/fetchWeatherSuccess()']);
      }
    }

    // Needs for test the private API - make private fucntions visible for test.
    if (process.env.NODE_ENV === 'test') {
      this.privates = {
        fetchWeatherSuccess: fetchWeatherSuccess
      };
    }
  });

  /** WEATHER PROVIDERS */
  /**
   * WorldWeatherOnline provider API
   */
  this.service('worldWeatherOnlineService', function (STRINGS) {
    var CONST = {
      API_URL: 'http://api.worldweatheronline.com/premium/v1/weather.ashx?',
      API_KEY: '3a0f85fc84c648e8905161741162307'
    };

    this.getApiUrl = function getApiUrl(data) {
      return CONST.API_URL.concat([
        'key='.concat(CONST.API_KEY),
        'q='.concat(data.query),
        'num_of_days=1',
        'tp=24',
        'format=json'
      ].join('&'));
    };
    this.translateResponse = function translateResponse(response) {
      var data = response && response.data && response.data.data || {};

      if (data.error) {
        return {
          error: data.error[0] && data.error[0].msg || STRINGS.UNNOWN_ERROR
        };
      }
      else {
        var currentCondition = data.current_condition && data.current_condition[0] || {};
        var weatherDesc = currentCondition.weatherDesc && currentCondition.weatherDesc[0];

        return {
          cityDetails: data.request && data.request[0].query,
          weatherDetails: {
            time: currentCondition.observation_time,
            temperature: currentCondition.temp_C,
            description: weatherDesc.value,
            windspeed: currentCondition.windspeedKmph,
            humidity: currentCondition.humidity,
            pressure: currentCondition.pressure
          }
        };
      }
    };
  });
};
