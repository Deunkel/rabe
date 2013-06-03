'use strict';

angular.module('clientApp')
  .filter('freeRoom', function () {
	return function (input, from, to) {
		if(!input){
			return [];
		}
		if(!from || !to){
			return input;
		}
		var out = [];
		
		angular.forEach(input, function(room, roomKey){
			var isFree = true;
			
			angular.forEach(room.occupancys, function(occupancy, occupancyKey){
			console.log(occupancy.begin + " " + to);
			console.log(occupancy.begin>=to);
			console.log(occupancy.end<=from);
				if((occupancy.end<=from || occupancy.begin>=to ) && isFree) {
					isFree = true;
				}
				else{
					isFree = false;
				}
			});
			if(isFree){
				out.push(room);
				//console.log(out);
			}
		});
		return out;
	};
});
