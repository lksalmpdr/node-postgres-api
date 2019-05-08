var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');

module.exports = function(){
	var app = express();

    app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
        extended: true,
    }));

	load('routes', {cwd: 'app'})
		.then('infra')
		.into(app);
	return app;
}