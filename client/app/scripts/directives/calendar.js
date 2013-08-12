'use strict';

angular.module('clientApp')
  .directive('calendar', function () {
	return {
		//template: '<div></div>',
		restrict: 'E',
		require: 'ngModel',
		link: function postLink(scope, element, attrs, ngModel) {
			require(['d3'], function() {

				//var taskNames = [ 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag' ];
				var margin = {top: 20, right: 20, bottom: 30, left: 40},
					width = 960 - margin.left - margin.right,
					height = 200 - margin.top - margin.bottom;

				var x = d3.scale.ordinal()
					.domain([ 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag' ])
					.rangeRoundBands([0, width], 0.1);
				var testDate = new Date("2013-01-01 23:00");
				console.log(testDate);
				var y = d3.time.scale()	
					.domain([0,300])//d3.time.hours(new Date("2013-01-01 00:00"), new Date("2013-01-01 23:00")))
					.range([height, 0]);

				var color = d3.scale.ordinal()
					.range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);

				var xAxis = d3.svg.axis()
					.scale(x)
					.orient('bottom');

				var yAxis = d3.svg.axis()
					.scale(y)
					.orient('right')
					.ticks(d3.time.minutes, 15)
    				.tickFormat(d3.time.format("%H:%M"));

				var svg = d3.select(element[0]).append('svg')
					.attr('width', width + margin.left + margin.right)
					.attr('height', height + margin.top + margin.bottom)
				  .append('g')
					.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

				svg.append('g')
					.attr('class', 'x axis')
					.attr('transform', 'translate(0,' + height + ')')
					.call(xAxis);

				svg.append('g')
					.attr('class', 'y axis')
					.call(yAxis);

				var data = ngModel.$modelValue;
				
				var color = d3.scale.linear()
	                .domain([0, 5])
	                .range(['#555', '#A9D03F']);

	            svg.selectAll('rect')
	                    .data(data)
	                    .enter().append('rect')
	                    .attr('x', function(value, index) { 
	                    	
	                    	return x("Dienstag") - 0.5; 
	                    })
	                    .attr('y', function(d) { return y(new Date(d.start)); })
	                    .attr('width', 20)
	                    .attr('height', function(d) { 
	                    	console.log(y(new Date(d.start)));
	                    	console.log(y(new Date(d.end)));
	                    	return -(y(new Date(d.end)) - y(new Date(d.start))); 
	                    })
	                    .attr('fill', function(d, i) { return color(i); })
	                    .style('stroke', '#000');


				//d3.csv('data.csv', function(error, data) {
				/*
				console.log(data);
				function bla (data) {
					color.domain(d3.keys(data[0]).filter(function(key) { return key !== 'State'; }));

					data.forEach(function(d) {
						var y0 = 0;
						d.ages = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
						d.total = d.ages[d.ages.length - 1].y1;
					});

					data.sort(function(a, b) { return b.total - a.total; });

					x.domain(data.map(function(d) { return d.State; }));
					y.domain([0, d3.max(data, function(d) { return d.total; })]);

					svg.append('g')
						.attr('class', 'x axis')
						.attr('transform', 'translate(0,' + height + ')')
						.call(xAxis);

					svg.append('g')
						.attr('class', 'y axis')
						.call(yAxis)
						.append('text')
						.attr('transform', 'rotate(-90)')
						.attr('y', 6)
						.attr('dy', '.71em')
						.style('text-anchor', 'end')
						.text('Population');

					var state = svg.selectAll('.state')
						.data(data)
						.enter().append('g')
						.attr('class', 'g')
						.attr('transform', function(d) { return 'translate(' + x(d.State) + ',0)'; });

					state.selectAll('rect')
						.data(function(d) { return d.ages; })
						.enter().append('rect')
						.attr('width', x.rangeBand())
						.attr('y', function(d) { return y(d.y1); })
						.attr('height', function(d) { return y(d.y0) - y(d.y1); })
						.style('fill', function(d) { return color(d.name); });

					var legend = svg.selectAll('.legend')
						.data(color.domain().slice().reverse())
						.enter().append('g')
						.attr('class', 'legend')
						.attr('transform', function(d, i) { return 'translate(0,' + i * 20 + ')'; });

					legend.append('rect')
						.attr('x', width - 18)
						.attr('width', 18)
						.attr('height', 18)
						.style('fill', color);

					legend.append('text')
						.attr('x', width - 24)
						.attr('y', 9)
						.attr('dy', '.35em')
						.style('text-anchor', 'end')
						.text(function(d) { return d; });
				}
				bla();*/

			});
		}
	};
});
