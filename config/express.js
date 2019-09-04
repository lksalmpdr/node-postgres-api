const express = require('express');
const load = require('express-load');
const bodyParser = require('body-parser');
const path = require('path');

module.exports = function(){
	const app = express();

	
	app.use(express.static(path.join(__dirname, 'public')));
    app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
        extended: true,
    }));

	load('routes', {cwd: 'app'})
		.then('infra')
		.into(app);
	return app;
}