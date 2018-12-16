// Clock It Controller

const model = require('../models/clockIt-model.js');
var session = require('express-session');
var moment = require('moment');

function verifyUser(request, response) {
	if (request.session.userId) {
		response.redirect("home.html");
	} else {
		response.redirect("login.html");
	}
}

function getEntries(request, response) {
	console.log("Retrieving time entries. . .");
	// if (typeof request.session.isClockedIn === 'undefined') {
	// 	request.session.isClockedIn = false;
	// }

	// Set this to the user id which will be set in the session.
	let user_id = request.session.userId;
	model.getEntriesFromDB(user_id, (error, result) => {
		if (error) {
			console.log(error.message);
		} else {
			console.log(`Got time entries for the user with the id of ${user_id}.`);
			let newResults = result.map(e => {
				if (!e.endtime) {
					request.session.entry_id = e.id;
				}
				
				var startDate = moment(e.starttime);
				var endDate = moment(e.endtime);
				var total = e.endtime - e.starttime;
				return {
					date: moment(startDate).format("ddd, MMM D"),
					start: moment(startDate).format("h:mm A"),
					end: e.endtime ? moment(endDate).format("h:mm A") : "",
					total: e.endtime ? moment.duration(total).asMilliseconds() : 0,
					notes: e.notes ? e.notes : ""
				};
			})
			response.json(newResults);
		}
	});
}

function createEntry(request, response) {

	console.log("Sending time entry to the server. . .");
	
	// Set this to the user id which will be set in the session.
	let user_id = request.session.userId;
	let startDate = request.body.startDate;
	model.createEntryInDB(user_id, startDate, (error, result) => {
		if (error) {
			console.log(error.message);
		} else {
			console.log("Successfully inserted new time entry.");
			// request.session.isClockedIn = true;
			response.json(result);
		}
	});
}

function updateEntry(request, response) {
	console.log("Updating time entries");
	
	// Set this to the user id which will be set in the session.
	let user_id = request.session.userId;
	let entry_id = request.session.entry_id;
	let endDate = request.body.endDate;
	model.updateEntryInDB(entry_id, endDate, (error, result) => {
		if (error) {
			console.log(error.message);
		} else {
			// request.session.isClockedIn = false;
			response.json(result);
		}
	});
}

module.exports = {
	getEntries: getEntries,
	createEntry: createEntry,
	updateEntry: updateEntry,
	verifyUser: verifyUser
	// clockIn: clockIn,
	// clockOut: clockOut,
	// isClockedIn: isClockedIn
}