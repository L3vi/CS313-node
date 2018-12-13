// Clock-It Model

// Implement pg for postgres SQL access
const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL;// || "postgres://clockituser:time@localhost:5432/clockit";;
const pool = new Pool({connectionString: connectionString});


function getEntriesFromDB(id, callback) {
    let sql = 'SELECT * FROM timeentries WHERE activity_id = $1::int';
    let params = [id];

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

function createEntryInDB(id, startDate, callback) {
    // let sql = 'INSERT INTO timeentries (starttime, activity_id) VALUES ($2, $1) WHERE activity_id = $1::int';
    // let params = [id, startDate];

    // pool.query(sql, params, (error, result) => {
    //     if (error) {
    //         console.log("Error in query");
    //         callback(error);
    //     } else {
    //         console.log("Created new time entry!" + JSON.stringify(result.rows));
    //         callback(null, result.rows);
    //     }
    // })
}

function updateEntryInDB(id, callback) {
    
}

/*
function startTimeEntry(activity_id) {
    // Create a connection object using the acme connection function
    session_start();
    $db = getDatabase();
    $startTime = date('M-d-Y') . ' ' . date('h:i:s');
    $sql = 'INSERT INTO timeentries (starttime, activity_id) VALUES (:starttime, :activity_id)';
    $statement = $db->prepare($sql);
    $statement->bindValue(':starttime', $startTime, PDO::PARAM_STR);
    $statement->bindValue(':activity_id', $activity_id, PDO::PARAM_STR);
    $statement->execute();
    $rowsChanged = $statement->rowCount();
    $statement->closeCursor();

    $getEntryId = 'SELECT id FROM timeentries WHERE starttime=:starttime';
    $statement2 = $db->prepare($getEntryId);
    $statement2->bindValue(':starttime', $startTime, PDO::PARAM_STR);
    $statement2->execute();
    $entryId = $statement2->fetch();
    $statement2->closeCursor();
    $_SESSION['currentEntryId'] = $entryId['id'];

    // Return the indication of success (rows changed)
    return $rowsChanged;
}

function endTimeEntry() {
    // Create a connection object using the acme connection function
    session_start();
    $db = getDatabase();
    $endTime = date('M-d-Y') . ' ' . date('h:i:s');
    $sql = 'UPDATE timeentries SET endtime = :endtime WHERE id = :entryId';
    $statement = $db->prepare($sql);
    $statement->bindValue(':endtime', $endTime, PDO::PARAM_STR);
    $statement->bindValue(':entryId', $_SESSION['currentEntryId'], PDO::PARAM_INT);
    $statement->execute();
    $rowsChanged = $statement->rowCount();
    $statement->closeCursor();

    // Return the indication of success (rows changed)
    return $rowsChanged;
}
*/

module.exports = {
    getEntriesFromDB: getEntriesFromDB,
    createEntryInDB: createEntryInDB,
    updateEntryInDB: updateEntryInDB
}
