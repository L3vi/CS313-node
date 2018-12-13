// Clock-It Model

// Implement pg for postgres SQL access
const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL || "postgres://clockituser:time@localhost:5432/clockit";;
const pool = new Pool({connectionString: connectionString});


function getEntriesFromDB(id, callback) {
    let sql = 'SELECT * FROM timeentries WHERE activity_id = $1::int';
    let params = [id];

    pool.query(sql, params, (error, result) => {
        if (error) {
            console.log("Error in query");
            callback(error);
        } else {
            console.log(`Found ${JSON.stringify(result.rowCount)} items!`);
            callback(null, result.rows);
        }
    })
}

function createEntryInDB(id, startDate, callback) {
    let sql = 'INSERT INTO timeentries (starttime, activity_id) VALUES ($2, $1)';
    let params = [id, startDate];

    pool.query(sql, params, (error, result) => {
        if (error) {
            console.log("Error in query");
            callback(error);
        } else {
            // result.row?
            callback(null, result.rowCount);
        }
    })
}

function updateEntryInDB(entry_id, endDate, callback) {
    console.log("Doing DB stuff. . .");

    let sql = 'UPDATE timeentries SET endtime=$2 WHERE id=$1';
    let params = [entry_id, endDate];

    pool.query(sql, params, (error, result) => {
        if (error) {
            console.log("Error in query");
            callback(error);
        } else {
            // result.row?
            callback(null, result.rowCount);
        }
    })
}

module.exports = {
    getEntriesFromDB: getEntriesFromDB,
    createEntryInDB: createEntryInDB,
    updateEntryInDB: updateEntryInDB
}