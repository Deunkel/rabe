'use strict';

angular.module('clientApp')
  .controller('MainCtrl', function ($scope, $http) {
	$scope.showSearch = true;
	$scope.showTime = true;
	$scope.showMap = true;
	$scope.query = "";

	$http.get('json/raum.json').success(function(data) {
		$scope.rooms = data;
	});

	$scope.chooseObject = function(objName) {
		$scope.choice = objName;
	};

	//Google Maps Api
	function initialize(coords) {
		var latlng = new google.maps.LatLng(coords.latitude, coords.longitude);
		var myOptions = {
			zoom: 17,
			center: new google.maps.LatLng(49.767719, 6.628745),
			disableDefaultUI:true,
			mapTypeId: google.maps.MapTypeId.SATELLITE
		};
		var map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);

		var marker = new google.maps.Marker({
			position: latlng,
			map: map,
			title: 'Hier bist du :)'
		});
	}

	navigator.geolocation.getCurrentPosition(function(position){
		initialize(position.coords);
	}, function(){
		document.getElementById('map_canvas').innerHTML = 'Deine Position konnte leider nicht ermittelt werden';
	});
});