'use strict';

angular.module('clientApp')
  .controller('MainCtrl', function ($scope, $http, $routeParams) {
	$scope.showSearch = true;
	$scope.showTime = false;
	$scope.showMap = true;
	$scope.query = '';

	$scope.GeoWatcherId = null;
	var marker;

	$scope.allBuildingsSelected = false;

	//Einlesen der JSON Datei mit den Raum und Event Informationen
	$http.get('json/rooms.json').success(function(data) {
		$scope.rooms = data;
	});

	//Ausgewähter Raum für Info Window
	$scope.chooseObject = function(objName) {
		$scope.choice = objName;
	};

// ----- Gebäude Definition --------

	//Gebäude Style festlegen	
	$scope.buildingFillColor = '#ddd';
	$scope.buildingFillOpacity = 1.0;
	$scope.buildingStrokeColor = '#333';
	$scope.buildingStrokeOpacity = 0.8;
	$scope.buildingStrokeWeight = 2;
	//Gebäudeauswahl Style festlegen
	$scope.selectionFillColor = '#f77f00';
	$scope.selectionfillOpacity = 1.0;
	$scope.selectionStrokeColor = $scope.buildingStrokeColor;
	$scope.selectionStrokeOpacity = $scope.buildingStrokeOpacity;
	$scope.selectionStrokeWeight = $scope.buildingStrokeWeight;

	//Gebäude Liste
	$scope.buildings = {
		'A': {
			'name': 'A',
			'path': [
				new google.maps.LatLng(49.768642, 6.62721),
				new google.maps.LatLng(49.768572, 6.627602),
				new google.maps.LatLng(49.76825, 6.627462),
				new google.maps.LatLng(49.768326,6.62706),
				new google.maps.LatLng(49.768642, 6.62721)
			],
			'polygon': null,
			'strokeColor': $scope.buildingStrokeColor,
			'strokeOpacity': $scope.buildingStrokeOpacity,
			'strokeWeight': $scope.buildingStrokeWeight,
			'fillColor': $scope.buildingFillColor,
			'fillOpacity': $scope.buildingFillOpacity,
			'labelPos': new google.maps.LatLng(49.768452,6.627343),
			'label': null,
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
			'polygon': null,
			'strokeColor': $scope.buildingStrokeColor,
			'strokeOpacity': $scope.buildingStrokeOpacity,
			'strokeWeight': $scope.buildingStrokeWeight,
			'fillColor': $scope.buildingFillColor,
			'fillOpacity': $scope.buildingFillOpacity,
			'labelPos': new google.maps.LatLng(49.768307,6.628118),
			'label': null,
			'selected': false
		},
		'C': {
			'name': 'C',
			'path': [
				new google.maps.LatLng(49.768356,6.628758),
				new google.maps.LatLng(49.768281,6.62916),
				new google.maps.LatLng(49.767962,6.629015),
				new google.maps.LatLng(49.768037,6.628616),
				new google.maps.LatLng(49.768356,6.628758)
			],
			'polygon': null,
			'strokeColor': $scope.buildingStrokeColor,
			'strokeOpacity': $scope.buildingStrokeOpacity,
			'strokeWeight': $scope.buildingStrokeWeight,
			'fillColor': $scope.buildingFillColor,
			'fillOpacity': $scope.buildingFillOpacity,
			'labelPos': new google.maps.LatLng(49.768166,6.628890),
			'label': null,
			'selected': false
		},

		'D': {
			'name': 'D',
			'path': [
				new google.maps.LatLng(49.768212,6.629528),
				new google.maps.LatLng(49.768137,6.629922),
				new google.maps.LatLng(49.76782,6.629785),
				new google.maps.LatLng(49.767898,6.629388),
				new google.maps.LatLng(49.768212,6.629528)
			],
			'polygon': null,
			'strokeColor': $scope.buildingStrokeColor,
			'strokeOpacity': $scope.buildingStrokeOpacity,
			'strokeWeight': $scope.buildingStrokeWeight,
			'fillColor': $scope.buildingFillColor,
			'fillOpacity': $scope.buildingFillOpacity,
			'labelPos': new google.maps.LatLng(49.768021,6.629652),
			'label': null,
			'selected': false
		},

		'E': {
			'name': 'E',
			'path': [
				new google.maps.LatLng(49.768078,6.630901),
				new google.maps.LatLng(49.767961,6.63103),
				new google.maps.LatLng(49.767999,6.631142),
				new google.maps.LatLng(49.767663,6.631512),
				new google.maps.LatLng(49.767396,6.630944),
				new google.maps.LatLng(49.767753,6.630563),
				new google.maps.LatLng(49.767784,6.630627),
				new google.maps.LatLng(49.767905,6.630504),
				new google.maps.LatLng(49.768078,6.630901)

			],
			'polygon': null,
			'strokeColor': $scope.buildingStrokeColor,
			'strokeOpacity': $scope.buildingStrokeOpacity,
			'strokeWeight': $scope.buildingStrokeWeight,
			'fillColor': $scope.buildingFillColor,
			'fillOpacity': $scope.buildingFillOpacity,
			'labelPos': new google.maps.LatLng(49.767754,6.630972),
			'label': null,
			'selected': false
		},

		'F': {
			'name': 'F',
			'path': [
				new google.maps.LatLng(49.767649,6.6303),
				new google.maps.LatLng(49.76776,6.630557),
				new google.maps.LatLng(49.767377,6.630973),
				new google.maps.LatLng(49.767262,6.630713),
				new google.maps.LatLng(49.767656,6.630305),
				new google.maps.LatLng(49.767649,6.6303)

			],
			'polygon': null,
			'strokeColor': $scope.buildingStrokeColor,
			'strokeOpacity': $scope.buildingStrokeOpacity,
			'strokeWeight': $scope.buildingStrokeWeight,
			'fillColor': $scope.buildingFillColor,
			'fillOpacity': $scope.buildingFillOpacity,
			'labelPos': new google.maps.LatLng(49.767520,6.630634),
			'label': null,
			'selected': false
		},


		'G': {
			'name': 'G',
			'path': [
				new google.maps.LatLng(49.767353,6.630217),
				new google.maps.LatLng(49.767474,6.63049),
				new google.maps.LatLng(49.767264,6.63071),
				new google.maps.LatLng(49.767302,6.630796),
				new google.maps.LatLng(49.767214,6.630893),
				new google.maps.LatLng(49.767025,6.630474),
				new google.maps.LatLng(49.767087,6.630415),
				new google.maps.LatLng(49.767112,6.630466),
				new google.maps.LatLng(49.767351,6.63022),
				new google.maps.LatLng(49.767353,6.630217)

			],
			'polygon': null,
			'strokeColor': $scope.buildingStrokeColor,
			'strokeOpacity': $scope.buildingStrokeOpacity,
			'strokeWeight': $scope.buildingStrokeWeight,
			'fillColor': $scope.buildingFillColor,
			'fillOpacity': $scope.buildingFillOpacity,
			'labelPos': new google.maps.LatLng(49.767331,6.630443),
			'label': null,
			'selected': false
		},

		'H': {
			'name': 'H',
			'path': [
				new google.maps.LatLng(49.767332,6.629989),
				new google.maps.LatLng(49.767406,6.630152),
				new google.maps.LatLng(49.767112,6.630469),
				new google.maps.LatLng(49.767036,6.630305),
				new google.maps.LatLng(49.767332,6.629989)

			],
			'polygon': null,
			'strokeColor': $scope.buildingStrokeColor,
			'strokeOpacity': $scope.buildingStrokeOpacity,
			'strokeWeight': $scope.buildingStrokeWeight,
			'fillColor': $scope.buildingFillColor,
			'fillOpacity': $scope.buildingFillOpacity,
			'labelPos': new google.maps.LatLng(49.767208,6.630242),
			'label': null,
			'selected': false
		},

		'J': {
			'name': 'J',
			'path': [
				new google.maps.LatLng(49.767176,6.629501),
				new google.maps.LatLng(49.767212,6.629688),
				new google.maps.LatLng(49.766904,6.629839),
				new google.maps.LatLng(49.766866,6.62964),
				new google.maps.LatLng(49.767176,6.629501)

			],
			'polygon': null,
			'strokeColor': $scope.buildingStrokeColor,
			'strokeOpacity': $scope.buildingStrokeOpacity,
			'strokeWeight': $scope.buildingStrokeWeight,
			'fillColor': $scope.buildingFillColor,
			'fillOpacity': $scope.buildingFillOpacity,
			'labelPos': new google.maps.LatLng(49.767040,6.629668),
			'label': null,
			'selected': false
		},

		'K': {
			'name': 'K',
			'path': [
				new google.maps.LatLng(49.767169,6.628951),
				new google.maps.LatLng(49.767157,6.629149),
				new google.maps.LatLng(49.766833,6.629133),
				new google.maps.LatLng(49.766841,6.628932),
				new google.maps.LatLng(49.767169,6.628951)

			],
			'polygon': null,
			'strokeColor': $scope.buildingStrokeColor,
			'strokeOpacity': $scope.buildingStrokeOpacity,
			'strokeWeight': $scope.buildingStrokeWeight,
			'fillColor': $scope.buildingFillColor,
			'fillOpacity': $scope.buildingFillOpacity,
			'labelPos': new google.maps.LatLng(49.767009,6.629043),
			'label': null,
			'selected': false
		},

		'L': {
			'name': 'L',
			'path': [
				new google.maps.LatLng(49.767262,6.628363),
				new google.maps.LatLng(49.767221,6.628551),
				new google.maps.LatLng(49.766902,6.628436),
				new google.maps.LatLng(49.766947,6.628221),
				new google.maps.LatLng(49.767262,6.628363)

			],
			'polygon': null,
			'strokeColor': $scope.buildingStrokeColor,
			'strokeOpacity': $scope.buildingStrokeOpacity,
			'strokeWeight': $scope.buildingStrokeWeight,
			'fillColor': $scope.buildingFillColor,
			'fillOpacity': $scope.buildingFillOpacity,
			'labelPos': new google.maps.LatLng(49.767089,6.628408),
			'label': null,
			'selected': false
		},
		
		'N': {
			'name': 'N',
			'path': [
				new google.maps.LatLng(49.767297,6.628066),
				new google.maps.LatLng(49.767265,6.628227),
				new google.maps.LatLng(49.767085,6.628152),
				new google.maps.LatLng(49.767116,6.627985),
				new google.maps.LatLng(49.767297,6.628066)
			],
			'polygon': null,
			'strokeColor': $scope.buildingStrokeColor,
			'strokeOpacity': $scope.buildingStrokeOpacity,
			'strokeWeight': $scope.buildingStrokeWeight,
			'fillColor': $scope.buildingFillColor,
			'fillOpacity': $scope.buildingFillOpacity,
			'labelPos': new google.maps.LatLng(49.767191,6.628099),
			'label': null,
			'selected': false
		},

		'O': {
			'name': 'O',
			'path': [
				new google.maps.LatLng(49.767375,6.627755),
				new google.maps.LatLng(49.767335,6.62794),
				new google.maps.LatLng(49.767025,6.627824),
				new google.maps.LatLng(49.767065,6.627631),
				new google.maps.LatLng(49.767375,6.627755)

			],
			'polygon': null,
			'strokeColor': $scope.buildingStrokeColor,
			'strokeOpacity': $scope.buildingStrokeOpacity,
			'strokeWeight': $scope.buildingStrokeWeight,
			'fillColor': $scope.buildingFillColor,
			'fillOpacity': $scope.buildingFillOpacity,
			'labelPos': new google.maps.LatLng(49.767191,6.627791),
			'label': null,
			'selected': false
		},

		'T': {
			'name': 'T',
			'path': [
				new google.maps.LatLng(49.767678,6.626585),
				new google.maps.LatLng(49.768111,6.626768),
				new google.maps.LatLng(49.768065,6.627038),
				new google.maps.LatLng(49.767626,6.626853),
				new google.maps.LatLng(49.767678,6.626585)

			],
			'polygon': null,
			'strokeColor': $scope.buildingStrokeColor,
			'strokeOpacity': $scope.buildingStrokeOpacity,
			'strokeWeight': $scope.buildingStrokeWeight,
			'fillColor': $scope.buildingFillColor,
			'fillOpacity': $scope.buildingFillOpacity,
			'labelPos': new google.maps.LatLng(49.767872,6.626814),
			'label': null,
			'selected': false
		},

		'M': {
			'name': 'M',
			'path': [
				new google.maps.LatLng(49.768595,6.627079),
				new google.maps.LatLng(49.768409,6.626655),
				new google.maps.LatLng(49.768804,6.626258),
				new google.maps.LatLng(49.768972,6.6267),
				new google.maps.LatLng(49.768595,6.627079)

			],
			'polygon': null,
			'strokeColor': $scope.buildingStrokeColor,
			'strokeOpacity': $scope.buildingStrokeOpacity,
			'strokeWeight': $scope.buildingStrokeWeight,
			'fillColor': $scope.buildingFillColor,
			'fillOpacity': $scope.buildingFillOpacity,
			'labelPos': new google.maps.LatLng(49.768705,6.626672),
			'label': null,
			'selected': false
		},

		'X': {
			'name': 'X',
			'path': [
				new google.maps.LatLng(49.767354,6.628296),
				new google.maps.LatLng(49.767305,6.628565),
				new google.maps.LatLng(49.767737,6.628739),
				new google.maps.LatLng(49.767788,6.628476),
				new google.maps.LatLng(49.767354,6.628296)

			],
			'polygon': null,
			'strokeColor': $scope.buildingStrokeColor,
			'strokeOpacity': $scope.buildingStrokeOpacity,
			'strokeWeight': $scope.buildingStrokeWeight,
			'fillColor': $scope.buildingFillColor,
			'fillOpacity': $scope.buildingFillOpacity,
			'labelPos': new google.maps.LatLng(49.767556,6.628534),
			'label': null,
			'selected': false
		}
	};

// ---------------------------------

	//Wählt Gebäude nach übergebenenm Gebäude Buchstaben (buildingName) aus
	$scope.selectBuilding = function(buildingName, map){

		//Wechsel den Selected Status des Objekts
		$scope.buildings[buildingName].selected = !$scope.buildings[buildingName].selected;

		//Notwendig um bei manueller Selection aller Gebäude, den Alle-Gebäude Button 
		$scope.allBuildingsSelected = true;
		angular.forEach($scope.buildings, function(building, key){
			if(!building.selected) {
				$scope.allBuildingsSelected = false;
			}
		});
		
		$scope.$apply();
		$scope.paintBuildings(map);
	};

	//Funktion um Alle Gebäude zu wählen oder kein Gebäude zu wählen
	$scope.selectDeselectAllBuildings = function (selectDeselectAll) {
		
		$scope.allBuildingsSelected = selectDeselectAll;
		
		//selectDeselectAll --> true=select all,  false=deselect all
		angular.forEach($scope.buildings, function(building, key){
			building.selected = $scope.allBuildingsSelected;
		});

		$scope.paintBuildings($scope.map);
	};

	//Prüft ob Button für Alle oder keine Gebäudeauswahl aktiv ist oder nicht
	$scope.areAllBuildingsSelected = function () {
		var token = 'danger';
		if($scope.allBuildingsSelected) {
			token = 'success';
		}

		return token;
	};

	//Zeichnen der Gebäude auf die Karte und registrieren der Click Events.
	$scope.paintBuildings = function(map){
		angular.forEach($scope.buildings, function(building, key){

			//Wenn polygon zu Gebäude existiert nimm es von der Karte Runtern
			if(building.polygon){
				building.polygon.setMap(null);
			}

			//Erzeuge neues Polygon mit Werten aus JSON
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

			//Platziere neues Polygon auf der Karte
			building.polygon.setMap(map);


			if(!building.label){
				building.label = new Label({
					position: building.labelPos,
					map: map,
					text: building.name
				});
			}
			//Platziere neues Label auf der Karte
			building.label.setMap(map);

			//Füge Klick Ereignis hinzu
			google.maps.event.addListener(building.polygon, 'click', function() {
				if(!$scope.GeoWatcherId){
					$scope.selectBuilding(building.name, map);
				}
				else {
					alert('Manuelle Gebäudeauswahl in Location Modus nicht möglich!');
				}
			});

			//Wenn GeoWatcher Aktiv und Marker innerhalb des aktuellen Gebäudes und Gebäude nicht ausgewählt, dann wähle Gebäude
			if($scope.GeoWatcherId && google.maps.geometry.poly.containsLocation($scope.myPos, building.polygon) && !building.selected){
				$scope.selectBuilding(building.name, map);
			}
		});
	};


	//QR-Code Weiterleitung ermöglichen
	$scope.checkQRCode = function (){
		//Notwendig für QR-Code, ließt GET Variable für Gebäude und Raum
		if($routeParams.building) {
			$scope.selectBuilding($routeParams.building, $scope.map);
			$scope.query = $routeParams.room;
		}
		else {
			$scope.paintBuildings($scope.map);
		}
	};

	function initializeMap(){
		$scope.myPos = new google.maps.LatLng(49.767850, 6.628745);

		var options = {
			zoom: 17,
			center: new google.maps.LatLng(49.767850, 6.628745),
			disableDefaultUI:true,
			scrollwheel: false,
			draggable: false,
			disableDoubleClickZoom: true,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		$scope.map = new google.maps.Map(document.getElementById('map_canvas'), options);
		
		//Prüfen ob per QRCode Seite aufgerufen wurde, wenn ja Seite entsprechend aufbauen
		$scope.checkQRCode();

	}
	initializeMap();

	$scope.startStopGeoWatcher = function () {
		if($scope.GeoWatcherId){
			navigator.geolocation.clearWatch($scope.GeoWatcherId);
			$scope.GeoWatcherId = null;
			marker.setMap(null);
			$scope.selectDeselectAllBuildings(false);
		}
		else {
			if (navigator.geolocation) {
				var timeoutVal = 5000;//10 * 1000 * 1000;
				$scope.GeoWatcherId = navigator.geolocation.watchPosition(
					displayPosition,
					displayError,
					{ enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
				);
			}
			else {
				alert('Geolocation is not supported by this browser');
			}
		}
	};

	//Google Maps & Geolocation API NEW
	function displayPosition(position) {
		$scope.myPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

		if (marker) {
			marker.setMap(null);
		}

		marker = new google.maps.Marker({
			position: $scope.myPos,
			map: $scope.map,
			title: 'Das bist du!',
			icon: 'http://archiv.rabeneltern.biz/images/smilies/vogel.gif',
			optimized: false
		});


		$scope.selectDeselectAllBuildings(false);
	}

	function displayError(error) {
		var errors = {
			1: 'Permission denied',
			2: 'Position unavailable',
			3: 'Request timeout'
		};
		console.log('Error: ' + errors[error.code]);
	}

	//Geolocation AN/AUS Button Farbe ändern
	$scope.isGeoWatcherActive = function () {
		var token = 'danger';
		if($scope.GeoWatcherId) {
			token = 'success';
		}

		return token;
	};

});