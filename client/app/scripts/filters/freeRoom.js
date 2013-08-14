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
		
		var timeStrToDate = function(timeString, date){
			var hour = timeString.substr(0,2);
			var minute = timeString.substr(3,2);

			var d = date;
			d.setHours(hour);
			d.setMinutes(minute);
			d.setSeconds(0);
			d.setMilliseconds(0);

			return d;
		};

		from = timeStrToDate(from, new Date());
		to = timeStrToDate(to, new Date());

		if(to < from){ //Falls das "bis" Datum kleiner "von" Datum dann "bis" auf nächsten Tag datieren
			to.setDate(to.getDate() + 1);
		}

		angular.forEach(input, function(room, roomKey){
			var isFree = true;
			
			angular.forEach(room.events[0], function(event, eventKey){
				/*console.log('event.end: ' + event.end.getTime() + ' ' + event.end);
				console.log('from: ' + from.getTime() + ' ' + from);
				console.log(event.end.getTime()<=from.getTime());
				console.log('event.start: ' + event.start.getTime() + ' ' + event.start);
				console.log('to: ' + to.getTime() + ' ' + to);
				console.log(event.start.getTime()>=to.getTime());*/
			
				if((event.end.getTime()<=from.getTime() || event.start.getTime()>=to.getTime() ) && isFree) {
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
