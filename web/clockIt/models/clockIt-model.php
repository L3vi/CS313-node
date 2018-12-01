<?php

// Clock-It Model

function startTimeEntry($activity_id) {
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

// Gets list of projects
function getTimeEntries($activity_id) {
    $database = getDatabase();
    $sql = 'SELECT starttime, endtime, notes FROM timeentries WHERE activity_id=:activity_id';
    $statement = $database->prepare($sql);
    $statement->bindValue(':activity_id', $activity_id, PDO::PARAM_INT);
    $statement->execute();
    $timeEntries = $statement->fetchAll();
    $statement->closeCursor();
    return $timeEntries;
}
