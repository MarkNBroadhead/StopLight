'use strict';

var express 	= require('express');
	app 		= express(),
	gpio 		= require('pi-gpio'),
	config 		= require('./setup'),

	Light 		= require('./Light'),
	red 		= new Light(gpio, config.RED_POWER, config.RED_BUTTON, 'red'),
	yellow 		= new Light(gpio, config.YELLOW_POWER, config.YELLOW_BUTTON, 'yellow'),
	green  		= new Light(gpio, config.GREEN_POWER, config.GREEN_BUTTON, 'green'),


	router = express.router();

router.route('/light')
	.get(function(req, res) {

	});

app.use('/api', router);

app.listen(config.port);
console.log('StopLight started on port ' + config.port);
