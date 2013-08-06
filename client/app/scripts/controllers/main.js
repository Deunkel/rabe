'use strict';

angular.module('clientApp')
  .controller('MainCtrl', function ($scope, $http) {
	$scope.showSearch = true;
	$scope.showTime = true;
	$scope.showMap = true;
	$scope.query = '';

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

		var buildings = {
			'A': {
				'name': 'A',
				'path': [
					new google.maps.LatLng(49.768642, 6.62721),
					new google.maps.LatLng(49.768572, 6.627602),
					new google.maps.LatLng(49.76825, 6.627462),
					new google.maps.LatLng(49.768326,6.62706),
					new google.maps.LatLng(49.768642, 6.62721)
				],
				'strokeColor': '#f77f00',
				'strokeOpacity': 0.8,
				'strokeWeight': 2,
				'fillColor': '#F7D900',
				'fillOpacity': 0.50,
				'polygon': null,
				'selected': false
			},
			'B': {
				'name': 'B',
				'path': [
					new google.maps.LatLng(49.768496, 6.627983),
					new google.maps.LatLng(49.768427, 6.62838),
					new google.maps.LatLng(49.768108, 6.628235),
					new google.maps.LatLng(49.768184, 6.627832),
					new google.maps.LatLng(49.768496, 6.627983)
				],
				'strokeColor': '#f77f00',
				'strokeOpacity': 0.8,
				'strokeWeight': 2,
				'fillColor': '#F7D900',
				'fillOpacity': 0.50,
				'polygon': null,
				'selected': false
			}
		};

		

		//Zeichnen der Gebäude auf die Karte und registrieren der Click Events.
		$scope.paintBuildings = function(){
			angular.forEach(buildings, function(building, key){
				//Gebäudeauswahl Style festlegen
				$scope.selectionStrokeColor = building.strokeColor;
				$scope.selectionStrokeOpacity = building.strokeOpacity;
				$scope.selectionStrokeWeight = building.strokeWeight;
				$scope.selectionFillColor = '#f77f00';
				$scope.selectionfillOpacity = 0.70;

				//Wenn polygon zu Gebäude existiert nimm es von der Karte Runtern
				if(building.polygon){
					building.polygon.setMap(null);
				}

				//Erzeuge neues mit Werten aus JSON
				if(building.selected){
					building.polygon = new google.maps.Polygon({
						paths: building.path,
						strokeColor: $scope.selectionStrokeColor,
						strokeOpacity: building.strokeOpacity,
						strokeWeight: $scope.selectionStrokeWeight,
						fillColor: $scope.selectionFillColor,
						fillOpacity: $scope.selectionfillOpacity
					});
				}
				else {
					building.polygon = new google.maps.Polygon({
						paths: building.path,
						strokeColor: building.strokeColor,
						strokeOpacity: building.strokeOpacity,
						strokeWeight: building.strokeWeight,
						fillColor: building.fillColor,
						fillOpacity: building.fillOpacity
					});	
				}

				//Platziere es auf der Karte
				building.polygon.setMap(map);

				//Füge Klick Ereignis hinzu
				google.maps.event.addListener(building.polygon, 'click', function() {

					//Wechsel den Selected Status des Objekts
					building.selected = !building.selected;
					$scope.paintBuildings();
					
				});
				
				
			});
		};
		$scope.paintBuildings();
		
		

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