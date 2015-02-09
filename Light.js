'use strict';

function Light(gpio, powerPin, buttonPin , color) {
	this.powerPin = powerPin;
	this.buttonPin = buttonPin;
	this.color = color;
	/**
	 * Stores the state of the light. Valid values are: high, low, off.
	 */
	this.state;

	// initalize pin to high.
	gpio.open(powerPin, 'output', function(err) {
		gpio.write(powerPin, 1, function(){
			this.state = 'off';
			gpio.close(powerPin);
		});
	});
};

Light.prototype.onButtonPress = function() {

};

/*
 * Cycles the power pin for this object.
 */
Light.prototype.cyclePower = function() {
	gpio.open(powerPin, 'output', function(err) {
		gpio.write(powerPin, 0);
		setTimeout(function() {
			gpio.write(powerPin, 1);
		}, 500);
		gpio.close(powerPin);	
	});
};

/*
 * change state from high > low > off > high
 * both in the state var and on the light.
 */
Light.prototype.stateRotate = function() {
	cyclePower();
	if (getState() === 'high') {
		this.state = 'low';
	} else if (getState() === 'low') {
		this.state = 'off';
	} else {
		this.state = 'high';
	};
};

Light.prototype.getPowerPin = function() {
	return this.powerPin;
};

Light.prototype.getButtonPin = function() {
	return this.buttonPin;
};

Light.prototype.getColor = function() {
	return this.color;
};

Light.prototype.getState = function() {
	return this.state;
};

/*
 * Sets the light state to desired state.
 * @ param string state valid params: high, low, off
 */
Light.prototype.setState = function(desiredState) {
	// determine the number of power cycles the light needs to reache desiredState.
	var numOfJumps = (nameToNumber(getState) - nameToNumber(desiredState));
	if (numOfJumps === -1) {
		numOfJumps = 2;
	};
	for (var i = 0; i < numOfJumps; i++) {
		stateRotate();
		if (numOfJumps - 1 !== i) { 
			setTimeout(function() {}, 1000);
		};
	};
};

/*
 * Translates name into number to help determine number of state rotations.
 */
Light.prototype.nameToNumber = function(name) {
	if (name === 'high') {
		return 2;
	} else if (name === 'low') {
		return 1;
	} else {
		return 0;
	};
};