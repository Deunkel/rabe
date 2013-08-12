'use strict';

angular.module('clientApp')
  .filter('selectedBuilding', function () {
    return function (input) {
      return 'selectedBuilding filter: ' + input;
    };
  });
