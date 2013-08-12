'use strict';

angular.module('clientApp')
  .controller('MainCtrl', function ($scope, $http) {
	$scope.showSearch = true;
	$scope.showTime = true;
	$scope.showMap = true;
	$scope.query = '';

	$http.get('json/rooms.json').success(function(data) {
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
	

	//Google Maps & Geolocation API NEW
	var marker;
		var infoWindow;
		if (navigator.geolocation) {
			var timeoutVal = 10 * 1000 * 1000;
			navigator.geolocation.watchPosition(
				displayPosition, 
				displayError,
				{ enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
			);
		}
		else {
			alert("Geolocation is not supported by this browser");
		}
		function displayPosition(position) {			
			var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			//var imageBounds = new google.maps.LatLngBounds(
      		//new google.maps.LatLng(49.766111, 6.6253), //49.7663, 6.6254
      		//new google.maps.LatLng(49.769399, 6.6318) //49.7692, 6.6318
      		//);
			var options = {
				zoom: 17,
				center: new google.maps.LatLng(49.767719, 6.628745),
				disableDefaultUI:true,
				scrollwheel: false,
				draggable: false,
				disableDoubleClickZoom: true,
				mapTypeId: google.maps.MapTypeId.SATELLITE
			};
			
			var map = new google.maps.Map(document.getElementById("map_canvas"), options);
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
                'strokeColor': '#f77f00',
                'strokeOpacity': 0.8,
                'strokeWeight': 2,
                'fillColor': '#F7D900',
                'fillOpacity': 0.50,
                'polygon': null,
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
                'strokeColor': '#f77f00',
                'strokeOpacity': 0.8,
                'strokeWeight': 2,
                'fillColor': '#F7D900',
                'fillOpacity': 0.50,
                'polygon': null,
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
                'strokeColor': '#f77f00',
                'strokeOpacity': 0.8,
                'strokeWeight': 2,
                'fillColor': '#F7D900',
                'fillOpacity': 0.50,
                'polygon': null,
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
                'strokeColor': '#f77f00',
                'strokeOpacity': 0.8,
                'strokeWeight': 2,
                'fillColor': '#F7D900',
                'fillOpacity': 0.50,
                'polygon': null,
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
                'strokeColor': '#f77f00',
                'strokeOpacity': 0.8,
                'strokeWeight': 2,
                'fillColor': '#F7D900',
                'fillOpacity': 0.50,
                'polygon': null,
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
                'strokeColor': '#f77f00',
                'strokeOpacity': 0.8,
                'strokeWeight': 2,
                'fillColor': '#F7D900',
                'fillOpacity': 0.50,
                'polygon': null,
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
                'strokeColor': '#f77f00',
                'strokeOpacity': 0.8,
                'strokeWeight': 2,
                'fillColor': '#F7D900',
                'fillOpacity': 0.50,
                'polygon': null,
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
                'strokeColor': '#f77f00',
                'strokeOpacity': 0.8,
                'strokeWeight': 2,
                'fillColor': '#F7D900',
                'fillOpacity': 0.50,
                'polygon': null,
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
                'strokeColor': '#f77f00',
                'strokeOpacity': 0.8,
                'strokeWeight': 2,
                'fillColor': '#F7D900',
                'fillOpacity': 0.50,
                'polygon': null,
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
                'strokeColor': '#f77f00',
                'strokeOpacity': 0.8,
                'strokeWeight': 2,
                'fillColor': '#F7D900',
                'fillOpacity': 0.50,
                'polygon': null,
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
                'strokeColor': '#f77f00',
                'strokeOpacity': 0.8,
                'strokeWeight': 2,
                'fillColor': '#F7D900',
                'fillOpacity': 0.50,
                'polygon': null,
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
                'strokeColor': '#f77f00',
                'strokeOpacity': 0.8,
                'strokeWeight': 2,
                'fillColor': '#F7D900',
                'fillOpacity': 0.50,
                'polygon': null,
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
                'strokeColor': '#f77f00',
                'strokeOpacity': 0.8,
                'strokeWeight': 2,
                'fillColor': '#F7D900',
                'fillOpacity': 0.50,
                'polygon': null,
                'selected': false
            },





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




			//var newmap = new google.maps.GroundOverlay('./img/CampMapOld.png',imageBounds);
  	  		//newmap.setMap(map);
			// Remove the current marker, if there is one
			if (typeof(marker) != "undefined") marker.setMap(null);
			marker = new google.maps.Marker({
				position: pos,
				map: map,
				title: "User location"
			});
			var contentString = "<b>Timestamp:</b> " + parseTimestamp(position.timestamp) + "<br/><b>User location:</b> lat " + position.coords.latitude + ", long " + position.coords.longitude + ", accuracy " + position.coords.accuracy;
			// Remove the current infoWindow, if there is one
			if (typeof(infoWindow) != "undefined") infoWindow.setMap(null);
			infoWindow = new google.maps.InfoWindow({
				content: contentString
			});
			google.maps.event.addListener(marker, 'click', function() {
				infoWindow.open(map,marker);
			});
		}
		function displayError(error) {
			var errors = { 
				1: 'Permission denied',
				2: 'Position unavailable',
				3: 'Request timeout'
			};
			alert("Error: " + errors[error.code]);
		}
		function parseTimestamp(timestamp) {
			var d = new Date(timestamp);
			var day = d.getDate();
			var month = d.getMonth() + 1;
			var year = d.getFullYear();
			var hour = d.getHours();
			var mins = d.getMinutes();
			var secs = d.getSeconds();
			var msec = d.getMilliseconds();
			return day + "." + month + "." + year + " " + hour + ":" + mins + ":" + secs + "," + msec;
		}

	//Alte Google Maps & Geolocation API OLD
	//function initialize(coords) {
		//var latlng = new google.maps.LatLng(coords.latitude, coords.longitude);
		//var imageBounds = new google.maps.LatLngBounds(
      	//new google.maps.LatLng(49.7663, 6.6254), //49.7663, 6.6254
      	//new google.maps.LatLng(49.7692, 6.6318) //49.7692, 6.6319
      	//);
		//var myOptions = {
			//zoom: 17,
			//center: new google.maps.LatLng(49.767719, 6.628745),
			//disableDefaultUI:true,
			//scrollwheel: false,
			//draggable: false,
			//disableDoubleClickZoom: true,
			//mapTypeId: google.maps.MapTypeId.SATELLITE
		//};
		//var map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);
		//var newmap = new google.maps.GroundOverlay('./img/CampMapOld.png',imageBounds);
  	  	//newmap.setMap(map);

		//var marker = new google.maps.Marker({
			//position: latlng,
			//map: map,
			//title: 'Hier bist du :)'
		//});

		//var marker2 = new google.maps.Marker({
		//position: new google.maps.LatLng(49.767719, 6.628745),
		//map: map,
		//draggable:true,
		//animation:google.maps.Animation.DROP
		//});


		//var image= './img/legende.jpg';
		//var marker3 = new google.maps.Marker({
		//position: new google.maps.LatLng(49.767497,6.624653),
		//map: map,
		//draggable:false,
		//icon: image
		//});

	//}

	//navigator.geolocation.getCurrentPosition(function(position){
		//initialize(position.coords);
	//}, function(){
		//document.getElementById('map_canvas').innerHTML = 'Deine Position konnte leider nicht ermittelt werden';
	//});

});