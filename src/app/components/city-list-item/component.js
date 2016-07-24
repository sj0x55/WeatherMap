module.exports = function () {
  'use strict';

  this.component('cityListItem', {
    templateUrl: 'components/city-list-item/template',
    require: {
      parent: '^cityList'
    },
    bindings: {
      item: '<'
    },
    controller: function CityListItemController(cityListItemService) {
      this.showWeather = function showWeather() {
        cityListItemService.showWeather(this.item);
      };

      this.remove = function remove() {
        cityListItemService.removeById(this.item.id);
      };
    }
  });
};
