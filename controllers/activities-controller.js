// Activities Controller

function getActivities(request, response) {
	console.log("Activities Gotten");
	response.send("Activities GotteN");
}

module.exports = {
	getActivities: getActivities
}