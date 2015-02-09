function Light(gpio, pin, color) {
	this.pin = pin;
	this.color = color;
	this.state = off;

} 

Light.prototype.getPin = function() {
	return this.pin;
};

Light.prototype.getColor = function() {
	return this.color;
};

Light.prototype.getState() {
	return this.state;
};

Light.prototype.setState(state) {
	
};
