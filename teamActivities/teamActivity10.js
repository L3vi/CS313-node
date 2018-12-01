var express = require('express');
var router = express.Router();
const app = express();

const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL || "postgres://familyhistoryuser:elijah@localhost:5432/familyhistory";
const pool = new Pool({connectionString: connectionString});

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), () => {
	console.log("Now listening on connections for port ", app.get('port'));
});

app.get('/getPerson', getPerson);

function getPersonFromDatabase(id, callback) {
	console.log("Accessing user from database with id of: " + id);
	
	var sql = 'SELECT id, firstname, lastname, dateOfBirth FROM persons WHERE id = $1::int';
	var params = [id];

	pool.query(sql, params, (error, result) => {
		if (error) {
			console.log("Error in query");
			callback(error);
		} else {
			console.log("Found it! " + JSON.stringify(result.rows));
			callback(null, result.rows);
		}
	})
}

function getPerson(request, response) {

	var id = request.query.id;
	console.log("Getting person from the database with an ID of " + id);

	// response.json(result);
	getPersonFromDatabase(id, (error, result) => {
		if (error || result == null || result.length != 1) {
			console.log(error.message);
		} else {
			console.log("Got result from database: " + result[0]);
			response.json(result[0]);
		}
		
	});
}