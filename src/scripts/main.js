'use strict';
/*jslint white: true */
/*global window */
/*jshint unused: false */
/*global PalleteCreator:false */

/*
* Cross-browser event handler
* @params htmlElement, element to attach even to 
* @params eventName, event handler name
* @params eventFunction, function to be called
*/
function addEvent(htmlElement, eventName, eventFunction) {
	if (htmlElement.addEventListener) { // Modern
		htmlElement.addEventListener(eventName, eventFunction, false);
	} else if (htmlElement.attachEvent) { // Internet Explorer
		htmlElement.attachEvent('on' + eventName, eventFunction);
	} else { // others
		htmlElement['on' + eventName] = eventFunction;
	}
}

/*
* Instantiating PalleteCreator
* creates DOM
*/
function init () {
	var actionBtn = document.getElementById('submit'),
		myPallete = new PalleteCreator();

	myPallete.readyDOM();
	myPallete.triggerBtn(actionBtn);
	myPallete.retrievePallete();
}


//Load init() on load
addEvent(window, 'load', init);