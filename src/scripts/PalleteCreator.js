'use strict';
/*jslint white: true */
/*global window */
/*jshint unused: false */

/*
* Class to create Palletes
*/
function PalleteCreator(){

	var self = this,
		container,
		arrayPallete = [];

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
	* Creates a new DOM elements
	* return returns the newly created DOM element
	*/
	function create(elem) {
		return document.createElement(elem);
	}

	/*
	* Validates Hex colours
	* return returns the hex colour of the input
	*/
	self.validateHex = function() {
		var grabHex = document.getElementsByName('hex')[0].value,
			regex = /^#([0-9A-Fa-f]{6}){1}$/m;

		if(regex.test(grabHex)) {
			return grabHex;
		} else {
			window.alert('Please enter a valid hex value');
			return false;
		}
	};

	/*
	* Creates DOM elements
	*/
	self.readyDOM = function() {
		var resetBtn = document.getElementById('reset');
		container = document.getElementsByTagName('section')[0];

		addEvent(resetBtn, 'click', resetPallete);
	};

	/*
	* Creates begin state
	*/
	self.beginState = function() {
		var startingColours = ["#343434", "#232323", "#111111"];
		generatePallete(startingColours);
	};


	/*
	* Attach eventhandler to createPallete()
	*/
	self.triggerBtn = function(createBtn) {
		addEvent(createBtn, 'click', createPallete);
		
	};

	/*
	* Creates pallete element
	* Calls storePallete() and passes hex value
	* Calls returnPalleteValue() and passes pallete element
	*/
	function createPallete() {
		var pallete = create('article'),
		hexCode = self.validateHex();
		
		if (hexCode) {
			pallete.style.backgroundColor = hexCode;
			container.appendChild(pallete);
			storePallete(hexCode);
			returnPalleteValue(pallete);
		}
	}

	/*
	* Add event listener to pallets created
	*@params elem, receives pallet element
	*/

	function returnPalleteValue(elem) {
		var returnValue = elem.style.backgroundColor;

		elem.onclick = function() {
			copyToClipboard(returnValue);
		};
	}
	
	/*
	* Grabs values of pallete and prompt its to user
	*/
	function copyToClipboard(text) {
		window.prompt('Copy to clipboard: Ctrl+C, Enter', text);
	}

	/*
	* Stores pallete on client's browsers
	* @params value, hexcode of the pallete created
	*/
	function storePallete(value) {
		arrayPallete.push(value);

		localStorage.setItem('pallete', JSON.stringify(arrayPallete));
	}

	/*
	* Checks to see if user has created pallete before
	* Calls generatePallete() passes stored values
	*/
	self.retrievePallete = function() {
		var retrieveValue = localStorage.getItem('pallete');

		if (retrieveValue) {
			var parsedValue = JSON.parse(retrieveValue);
			generatePallete(parsedValue);
		}

	};

	/*
	* Generated Pallete from browser cache
	*@params retrieveValue, object stored in cache
	*/
	function generatePallete(parsedValue) {
		var a, storedPallete, generatedPallets = [];

		for (a = 0; a < parsedValue.length; a++) {
			storedPallete = create('article');
			storedPallete.style.backgroundColor = parsedValue[a];
			container.appendChild(storedPallete);
			returnPalleteValue(storedPallete);
		}

	}

	/*
	* Resets workspace and clears local storage
	*/
	function resetPallete() {
		var allPalletes = document.getElementsByTagName('article'),
			b;

		for (b = allPalletes.length; b--;) {
			container.removeChild(allPalletes[b]);
		}

		localStorage.clear();
	}
}