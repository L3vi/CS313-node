// Accounts Controller

const model = require('../models/accounts-model.js');

function login(request, response) {
	let email = request.body.userEmail;
	let password = request.body.userPassword;
	if (!email || !password) {
		response.send("Please enter an email and password!");
		return;
	}

	model.loginUser(email, password, (error, result) => {
		if (error) {
			response.send(`Error: ${error}`);
		} else if (result.rowCount) {
			// Set data to the data passed from the database
			let data = result.rows[0];
			// If they got the password right, send them to the home page
			if (data.password === password) {
				request.session.userId = result.rows[0].id;
				console.log("Successfully logged in!");
				response.redirect("home.html");
			} else {
				response.send("That email/password combination does not exist.");
			}
		} else {
			response.send("That email does not exist in our database.");
		}
	});
}

function register(request, response) {
	let email = request.body.userEmail;
	let password = request.body.userPassword;
	if (!email || !password) {
		response.send("Please enter an email and password!");
		return;
	}

	model.registerUser(email, password, (error, result) => {
		if (error) {
			response.send(`Error: ${error}`);
		} else if (result) {
			console.log("Successfully created account!");
			response.redirect("login.html");
		}
	});
}

module.exports = {
	login: login,
	register: register
}