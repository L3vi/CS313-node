// Switch to session variable later
var clockedIn = false;

var workWeek = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday"
];
// if screen is smaller use this array instead
var workWeekSmall = ["M", "Tu", "W", "Th", "F"];

window.addEventListener("load", () => {
	getEntries();
});

function clockIt() {
	// Grab the button itself. . .
	var button = document.querySelector("#clockIt");

	// Check to see if the user is clocked in or not
	if (!clockedIn) {
		displayClockOutButton(button);
		createEntry();
		clockedIn = true;
	} else {
		displayClockInButton(button);
		completeEntry();
		clockedIn = false;
	}
}

function displayClockOutButton(button) {
	button.classList.replace("clockIn", "clockOut");
	button.innerHTML = "Clock Out";
}

function displayClockInButton(button) {
	button.classList.replace("clockOut", "clockIn");
	button.innerHTML = "Clock In";
}

function getEntries() {
	var xhr = new XMLHttpRequest();
	// FIND OUT URL TO ACCESS DATABASE
	xhr.open('GET', '/entries', true);
	
	// Ajax function
	xhr.onreadystatechange = function() {
		let DONE = 4;
		let OK = 200;
		if (xhr.readyState === DONE) {
			if (xhr.status === OK) {
				var results = JSON.parse(xhr.responseText);
				console.log(results);
				let timeSheet = createTimeSheet(results);
				document.querySelector(".weekContent").innerHTML = timeSheet;
			} else {
				console.log('Error: ' + xhr.status);
			}
		}
	};

	xhr.send(null);
}

function createTimeSheet(entries) {
	let timeSheet = "<table class='table table-striped table-dark table-hover'>";
	timeSheet += "\n<thead>\n<tr>";
	timeSheet += "<th scope='col'>Date</th>\n<th scope='col'>Start Time</th>\n<th scope='col'>End Time</th>\n<th scope='col'>Total Time</th>\n<th scope='col'>Notes</th>";
	timeSheet += "\n</tr>\n</thead>\n<tbody>";

	// entries.sort();

	entries.forEach(entry => {
		
		let startDate = new Date(entry.starttime);
		let endDate = new Date(entry.endtime);
		let totalTime = endDate.getHours() - startDate.getHours();

		let dateOptions = { weekday: 'short', month: 'short', day: 'numeric' };
		let timeOptions = { hour: 'numeric', minute: '2-digit' };
		let date = new Date(entry.starttime).toLocaleDateString('en-US', dateOptions);
		let startTime = new Date(entry.starttime).toLocaleTimeString('en-US', timeOptions);
		let endTime = new Date(entry.endtime).toLocaleTimeString('en-US', timeOptions);
		
		
		// Display actual date
		timeSheet += `<tr>\n<td>${date}</td>\n`;
		// Displays starting and ending TIMEs
		timeSheet += `<td>${startTime}</td>\n`;
		timeSheet += `<td>${endTime}</td>\n`;
		// Calculate total hours/minutes worked
		timeSheet += `<td>${totalTime} Hours</td>\n`;
		timeSheet += `<td>${entry.notes}</td>\n`;
	})
	timeSheet += "\n</tbody>\n</table>";
	return timeSheet;
}

function createEntry() {
	let startDate = new Date();
	let jsonDate = startDate.toJSON();
	console.log(`Creating time entry at ${startDate}`);

	var xhr = new XMLHttpRequest();
	// FIND OUT URL TO ACCESS DATABASE
	xhr.open('POST', '/entries', true);
	
	// Ajax function
	xhr.onreadystatechange = function() {
		let DONE = 4;
		let OK = 200;
		if (xhr.readyState === DONE) {
			if (xhr.status === OK) {
				var results = JSON.parse(xhr.responseText);
				console.log(results);
				console.log("By george, it worked!");
			} else {
				console.log('Error: ' + xhr.status);
			}
		}
	};

	let data = startDate.toISOString();
	xhr.send(`startDate=${data}`);
}

function completeEntry() {
	console.log("Completing time entry. . .");
}