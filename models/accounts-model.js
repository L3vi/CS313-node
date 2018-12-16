// Accounts Model

const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL || "postgres://clockituser:time@localhost:5432/clockit";
const pool = new Pool({connectionString: connectionString});

function loginUser(userEmail, userPassword, callback) {
    let sql = 'SELECT id, email, password FROM users WHERE email=$1';
    let params = [userEmail];
    // Check hashed password

    pool.query(sql, params, (error, result) => {
        if (error) {
            console.log("Error in query.");
            callback(error);
        } else {
            console.log("Successfully ran query.");
            callback(null, result);
        }
    })
}

function registerUser(userEmail, userPassword, callback) {

    let sql = 'INSERT INTO users (email, password) VALUES ($1, $2)';
    let params = [userEmail, userPassword];

    pool.query(sql, params, (error, result) => {
        if (error) {
            console.log("Error in query.");
            callback(error);
        } else {
            console.log("Successfully ran query.");
            callback(null, result.rowCount);
        }
    })
}

module.exports = {
    loginUser: loginUser,
    registerUser: registerUser
}