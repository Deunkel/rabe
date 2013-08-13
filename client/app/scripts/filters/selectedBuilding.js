'use strict';

angular.module('clientApp')
  .filter('selectedBuilding', function () {
	return function (input, buildingList) {
	  if(!input){
			return [];
		}
		
		var out = [];
		var selectedBuildings = [];

		angular.forEach(buildingList, function(building, buildingKey){
			if(building.selected){
				selectedBuildings.push(building.name);
			}
		});

		angular.forEach(input, function(room, roomKey){
			if(selectedBuildings.indexOf(room.name.substr(0,1)) !== -1){
				out.push(room);
			}
		});
		return out;
	};
});
