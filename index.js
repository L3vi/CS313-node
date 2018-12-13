/**
* Main Clock-It Controller
*/
const express = require('express');
var session = require('express-session');
const app = express();

const PORT = process.env.PORT || 5000;

const path = require('path');
const bodyParser = require('body-parser');

// Controllers
const activities = require('./controllers/activities-controller.js');
const accounts = require('./controllers/accounts-controller.js');
const clockit = require('./controllers/clockIt-controller.js');

app.use(express.static(path.join(__dirname, '/public/')))
	.use(session({
		secret: "tacocat",
		resave: true,
		saveUninitialized: true,
		cookie: {
			secure: false
		}
	}))
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: true }))
	// .set('views', path.join(__dirname, 'views'))
	.get('/', (request, response) => {
		// response.render('home');
	})
	.get('/entries', clockit.getEntries)
	.post('/entries', clockit.createEntry)
	.get('/clockIn', (request, response) => {
		request.session.isClockedIn = true;
		console.log(request.session);
	})
	.get('/clockOut', (request, response) => {
		request.session.isClockedIn = false;
		console.log(request.session);
	})
	.get('/isClockedIn', (request, response) => {
		console.log(request.session);
	})
	.put('/entries', clockit.updateEntry)
	.get('/account', (request, response) => {
		response.send("Hello World!");
	})
	.get('/activities', activities.getActivities)
	.listen(PORT, () => console.log(`Listening on ${ PORT }`));
