// Clock It Controller

const model = require('../models/clockIt-model.js');

function getEntries(request, response) {
	console.log("Retrieving time entries");
	
	// Set this to the activity id which will be set in the session.
	let activity_id = 1;

	model.getEntriesFromDB(activity_id, (error, result) => {
		if (error) {
			console.log(error.message);
		} else {
			console.log(`Got time entries for the activity with the id of ${activity_id}: ${result}`);
			response.json(result);
		}
	});
}

function createEntry(request, response) {
	console.log("Posting time entries");
	
	// Set this to the activity id which will be set in the session.
	let activity_id = 1;
	console.log(request);
	// let startDate = request.body;
	// console.log(JSON.stringify(startDate));
	model.createEntryInDB(activity_id, (error, result) => {
		if (error) {
			console.log(error.message);
		} else {
			console.log(`Successfully inserted new time entry.`);
			response.json(result);
		}
	});
}

function updateEntry(request, response) {
	console.log("Updating time entries");
	
	// Set this to the activity id which will be set in the session.
	let activity_id = 1;

	model.updateEntryInDB(activity_id, (error, result) => {
		if (error) {
			console.log(error.message);
		} else {
			console.log(`Got time entries for the activity with the id of ${activity_id}: ${result}`);
			response.json(result);
		}
	});
}

module.exports = {
	getEntries: getEntries,
	createEntry: createEntry,
	updateEntry: updateEntry
}