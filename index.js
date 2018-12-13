/**
* Main Clock-It Controller
*/
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

const path = require('path');
const parse = require('body-parser');

// Controllers
const activities = require('/cs313-node/controllers/activities-controller.js');
const accounts = require('/cs313-node/controllers/accounts-controller.js');
const clockit = require('/cs313-node/controllers/clockIt-controller.js');

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
	.listen(process.env.PORT || 5000);
	// .listen(PORT, () => console.log(`Listening on ${ PORT }`));
