'use strict';

angular.module('clientApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

require.config({

  baseUrl: 'scripts/',

  shim: {
  },

  paths: {
    d3: '../components/d3/d3.min'
  }
});
