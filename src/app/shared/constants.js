/**
 * Common constants needs in whole app
 */
module.exports = function () {
  'use strict';

  this.constant('STATES', {
    CITIES: 'cities',
    CITY_TO_PREVIEW: 'cityToPreviewOfWeather'
  });

  this.constant('ERROR_TYPES', {
    TYPE_ERROR: 'error',
    TYPE_INFO: 'info',
    TYPE_WARN: 'warn'
  });

  this.constant('STRINGS', {
    WEATHER_ERROR: 'Weather error',
    UNNOWN_ERROR: 'Unknown error'
  });
};
