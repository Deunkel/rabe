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
			
			angular.forEach(room.events, function(event, eventKey){
			console.log(event.start + " " + to);
			console.log(event.start>=to);
			console.log(event.end<=from);
				if((event.end<=from || event.start>=to ) && isFree) {
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
