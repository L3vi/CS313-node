// Switch to session variable later
var clockedIn = false;
var startTime;
var update;

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
	document.querySelector("#clockIt").addEventListener("click", clockIt);
	getEntries();
});

var update = setInterval(displayTimeClockedIn, 100);

function clockIt() {
	// Grab the button itself. . .
	var button = document.querySelector("#clockIt");

	// Check to see if the user is clocked in or not
	if (!clockedIn) {
		displayClockOutButton(button);
		createEntry();
		clockIn();
		clockedIn = true;
		isClockedIn();
	} else {
		displayClockInButton(button);
		update = '';
		completeEntry();
		clockOut();
		clockedIn = false;
		isClockedIn();
	}
}
function pad(time) {
	return time<10 ? '0' + time : time;
}
function displayTimeClockedIn() {
	var now = new Date().getTime();

	// Find the distance between now and the count down date
	if (typeof startTime != 'undefined') {
		var distance = now - startTime.getTime();
	}
	

	// Time calculations for days, hours, minutes and seconds
	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((distance % (1000 * 60)) / 1000);
	// var milliseconds = ((distance % (1000)) / 10);

	// Display the result in the element with id="timer"

	if (clockedIn) {
		document.querySelector("#timer").innerHTML = pad(hours) + ":"
	+ pad(minutes) + ":" + pad(seconds);// + ":" + milliseconds + "ms ";
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
	xhr.open('GET', '/entries', true);
	xhr.onreadystatechange = function() {
		let DONE = 4;
		let OK = 200;
		if (xhr.readyState === DONE) {
			if (xhr.status === OK) {
				var results = JSON.parse(xhr.responseText);
				let timeSheet = createTimeSheet(results);
				displayTotalHours(results);
				document.querySelector("#weekContent").innerHTML = timeSheet;
			} else {
				console.log('Error: ' + xhr.status);
			}
		}
	};

	xhr.send(null);
}

function displayTotalHours(entries) {
	var hours = entries.reduce((acc, entry) => {
		if(isNaN(entry.total)) {
			return acc + 0;
		} else {
			let entryHours = Math.floor((((entry.total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))) * 10) / 10;
			return acc + entryHours;
		}
	}, 0);
	document.querySelector("#total").innerHTML = `<p>${hours} Hours <img id='shareImg' class="rounded-circle" src='images/share.png'>`;
}

function createTimeSheet(entries) {
	let timeSheet = "<table class='table table-striped table-dark table-hover'>";
	timeSheet += "\n<thead>\n<tr>";
	timeSheet += "<th scope='col'>Date</th>\n<th scope='col'>Start Time</th>\n<th scope='col'>End Time</th>\n<th scope='col'>Total Time</th>\n<th scope='col'>Notes</th>";
	timeSheet += "\n</tr>\n</thead>\n<tbody>";

	// entries.sort();
	

	entries.forEach(entry => {

		var hours = Math.floor((entry.total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((entry.total % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((entry.total % (1000 * 60)) / 1000);
		var total = 0;
		if (minutes < 1 && hours < 1) {
	        total = (seconds + " Second" + ((parseInt(seconds) == 1) ? '' : 's'));
	    } else if (hours < 1) {
	        total = (minutes + " Minute" +
	                ((minutes > 2) ? 's' : ''));
	    } else if (hours >= 1) {
	        total = (hours + " Hour" +
	                ((hours > 2) ? 's' : ''));
	    }

		// Display actual date
		timeSheet += `<tr>\n<td>${entry.date}</td>\n`;
		// Displays starting and ending TIMEs
		timeSheet += `<td>${entry.start}</td>\n`;
		timeSheet += `<td>${entry.end}</td>\n`;
		// Calculate total hours/minutes worked
		timeSheet += `<td>${total}</td>\n`;
		timeSheet += `<td>${entry.notes}</td>\n`;
	})
	timeSheet += "\n</tbody>\n</table>";
	return timeSheet;
}

function createEntry() {
	let startDate = new Date();
	startTime = startDate;
	// Formats the date properly while also setting it to the local time
	let formattedDate = new Date(startDate.getTime() - (startDate.getTimezoneOffset() * 60000)).toISOString();
	console.log(`Creating time entry at ${startDate}`);

	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/entries', true);
	xhr.onreadystatechange = function() {
		let DONE = 4;
		let OK = 200;
		if (xhr.readyState === DONE) {
			if (xhr.status === OK) {
				var results = JSON.parse(xhr.responseText);
				console.log("Time entry created.");
				getEntries();
			} else {
				console.log('Error: ' + xhr.status);
			}
		}
	};

	xhr.setRequestHeader("Content-type", "application/json");
	xhr.send(JSON.stringify({startDate:formattedDate}));
}

function completeEntry() {
	let endDate = new Date();
	// Formats the date properly while also setting it to the local time
	let formattedDate = new Date(endDate.getTime() - (endDate.getTimezoneOffset() * 60000)).toISOString();

	var xhr = new XMLHttpRequest();
	xhr.open('PUT', '/entries', true);
	xhr.onreadystatechange = function() {
		let DONE = 4;
		let OK = 200;
		if (xhr.readyState === DONE) {
			if (xhr.status === OK) {
				var results = JSON.parse(xhr.responseText);
				console.log("Time entry updated.");
				getEntries();
			} else {
				console.log('Error: ' + xhr.status);
			}
		}
	};

	xhr.setRequestHeader("Content-type", "application/json");
	xhr.send(JSON.stringify({endDate:formattedDate}));
}

function isClockedIn() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/isClockedIn', true);
	xhr.onreadystatechange = function() {
		let DONE = 4;
		let OK = 200;
		if (xhr.readyState === DONE) {
			if (xhr.status === OK) {
				// var results = JSON.parse(xhr.responseText);
				console.log(xhr.responseText);
				// let button = document.querySelector("#clockIt");
				// if (!clockedIn) {
				// 	displayClockOutButton(button);
				// } else {
				// 	displayClockInButton(button);
				// }
			} else {
				console.log('Error: ' + xhr.status);
			}
		}
	};

	xhr.send(null);
}

function clockIn() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/clockIn', true);
	xhr.onreadystatechange = function() {
		let DONE = 4;
		let OK = 200;
		if (xhr.readyState === DONE) {
			if (xhr.status === OK) {
				var results = JSON.parse(xhr.responseText);
			} else { 
				console.log('Error: ' + xhr.status);
			}
		}
	};
	xhr.send(null);
}

function clockOut() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/clockOut', true);
	xhr.onreadystatechange = function() {
		let DONE = 4;
		let OK = 200;
		if (xhr.readyState === DONE) {
			if (xhr.status === OK) {
				var results = JSON.parse(xhr.responseText);
			} else { console.log('Error: ' + xhr.status); }
		}
	};
	xhr.send(null);
}