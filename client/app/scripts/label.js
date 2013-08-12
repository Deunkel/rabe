'use strict';

// Define the overlay, derived from google.maps.OverlayView
function Label(optOptions) {
	// Initialization
	this.setValues(optOptions);

	// Label specific
	var span = this.spanElem = document.createElement('span');
	span.style.cssText =
		'position: relative;' +
		'left: -50%;' +
		'top: -10px;' +
		'font-weight: bold;' +
		'white-space: nowrap;' +
		//'border: 1px solid blue;' +
		'padding: 0px;' +
		'z-index: 1000;' +
		//'background-color: white'
		'';

	var div = this.divElem = document.createElement('div');
	div.appendChild(span);
	div.style.cssText = 'position: absolute; display: none';
}

Label.prototype = new google.maps.OverlayView();

// Implement onAdd
Label.prototype.onAdd = function() {
	var pane = this.getPanes().overlayLayer;
	pane.appendChild(this.divElem);

	// Ensures the label is redrawn if the text or position is changed.
	var me = this;
	this.listeners = [
		google.maps.event.addListener(this, 'position_changed',
			function() { me.draw(); }),
		google.maps.event.addListener(this, 'text_changed',
			function() { me.draw(); })
	];
};

// Implement onRemove
Label.prototype.onRemove = function() {
	this.divElem.parentNode.removeChild(this.divElem);

	// Label is removed from the map, stop updating its position/text.
	for (var i = 0, I = this.listeners.length; i < I; ++i) {
		google.maps.event.removeListener(this.listeners[i]);
	}
};

// Implement draw
Label.prototype.draw = function() {
	var projection = this.getProjection();
	var position = projection.fromLatLngToDivPixel(this.get('position'));

	var div = this.divElem;
	div.style.left = position.x + 'px';
	div.style.top = position.y + 'px';
	div.style.display = 'block';

	this.spanElem.innerHTML = this.get('text').toString();
};