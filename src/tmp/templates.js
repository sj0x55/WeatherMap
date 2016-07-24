module.exports = function() {this.run(function ($templateCache) { 'use strict';
$templateCache.put('components/app/template', "<div class=main-container><div class=city-list><city-form></city-form><city-list></city-list></div><div class=weather-info><weather-info></weather-info></div></div>");
$templateCache.put('components/city-form/template', "<h2>Add new city:</h2><form><p ng-if=\"$ctrl.errors.cityName && !$ctrl.cityName\">{{$ctrl.errors.cityName}}</p><div class=input-field><input name=cityName ng-model=$ctrl.cityName></div><button ng-click=$ctrl.createNew()>Add new city</button></form>");
$templateCache.put('components/city-list-item/template', "<div class=city-name>{{ $ctrl.item.name }}</div><div class=city-buttons><button ng-click=$ctrl.showWeather()>Check weather</button> <button ng-click=$ctrl.remove()>X</button></div>");
$templateCache.put('components/city-list/template', "<h2>Cities:</h2><ul><li ng-repeat=\"item in $ctrl.items track by $index\"><city-list-item item=item></city-list-item></li></ul>");
$templateCache.put('components/weather-info/template', "<div ng-if=$ctrl.cityName ng-class=\"{ loading: $ctrl.loading }\"><h2>City: {{$ctrl.cityDetails || $ctrl.cityName}}</h2><div ng-if=\"$ctrl.weatherDetails && !$ctrl.error\"><p><strong>Observation time:</strong> <span>{{$ctrl.weatherDetails.time}}</span></p><p><strong>Temperature (C):</strong> <span>{{$ctrl.weatherDetails.temperature}}</span></p><p><strong>Description:</strong> <span>{{$ctrl.weatherDetails.description}}</span></p><p><strong>Wind speed (km/h):</strong> <span>{{$ctrl.weatherDetails.windspeed}} km/h</span></p><p><strong>Humidity:</strong> <span>{{$ctrl.weatherDetails.humidity}}</span></p><p><strong>Pressure:</strong> <span>{{$ctrl.weatherDetails.pressure}} hPa</span></p></div><div class=error ng-if=$ctrl.error>{{$ctrl.error}}</div></div>");});};