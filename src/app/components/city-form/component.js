module.exports = function () {
  'use strict';

  this.component('cityForm', {
    templateUrl: 'components/city-form/template',
    controller: function CityFormController(stateService, cityFormService) {
      this.createNew = function () {
        this.errors = {};

        if (cityFormService.isValid(this.cityName, this.errors)) {
          cityFormService.createNew(this.cityName);
          this.cityName = '';
          this.errors = {};
        }
      };
    }
  });
};
