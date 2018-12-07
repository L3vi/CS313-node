const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const path = require('path');
const parse = require('body-parser');

// Implement pg for postgres SQL access
// const { Pool } = require('pg');
// const connectionString = process.env.DATABASE_URL;
// const pool = new Pool({connectionString: connectionString});

app.use(express.static(path.join(__dirname, 'public')))
	.set('views', path.join(__dirname, 'views'))
	.set('view engine', 'ejs')
	.get('/', (request, response) => {
		response.send("Hello World!");
	})
	.get('/account', (request, response) => {
		response.send("Hello World!");
	})
	.get('/activities', (request, response) => {
		response.send("Hello World!");
	})
	.listen(PORT, () => console.log(`Listening on ${ PORT }`));