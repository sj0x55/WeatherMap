module.exports = function () {
  'use strict';

  this.component('cityList', {
    templateUrl: 'components/city-list/template',
    controller: function CityListController(stateObserverService, stateService, STATES) {
      this.$onInit = function() {
        this.items = [];
      };

      /**
       * Registered observer to update items when state will be changed
       */
      stateObserverService.register(function () {
        if (stateService.isChanged(STATES.CITIES)) {
          this.items = stateService.get(STATES.CITIES);
        }
      }.bind(this));
    }
  });
};
