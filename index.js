/**
* Main Clock-It Controller
*/
const express = require('express');
const app = express();

const PORT = process.env.PORT || 80;

const path = require('path');
const parse = require('body-parser');

// Controllers
const activities = require('./controllers/activities-controller.js');
const accounts = require('./controllers/accounts-controller.js');
const clockit = require('./controllers/clockIt-controller.js');

app.use(express.static(path.join(__dirname, '/public/')))
	// .set('views', path.join(__dirname, 'views'))
	.get('/', (request, response) => {
		// response.render('home');
	})
	.get('/entries', clockit.getEntries)
	.post('/entries', clockit.createEntry)
	.get('/account', (request, response) => {
		response.send("Hello World!");
	})
	.get('/activities', activities.getActivities)
	.listen(PORT, () => console.log(`Listening on ${ PORT }`));
