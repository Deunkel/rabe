'use strict';

angular.module('clientApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

/* Controllers */
function PhoneListCtrl($scope, $http) {
  $http.get('json/raum.json').success(function(data) {
    $scope.phones = data;
  });

  $scope.orderProp = 'age';

  $scope.chooseObject = function(objName) {
                    $scope.choice = objName;
  };
}