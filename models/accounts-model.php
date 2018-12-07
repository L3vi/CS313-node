<?php

// Acounts Model

function loginUser($userEmail, $userPassword) {
    $db = getDatabase();
    // The SQL statement
    $sql = 'SELECT id, email, password FROM users WHERE email=:email';
    // Create the prepared statement using the acme connection
    $statement = $db->prepare($sql);
    $statement->bindValue(':email', $userEmail, PDO::PARAM_STR);
    // Get the data
    $statement->execute();
    $user = $statement->fetch();
    $statement->closeCursor();
    $hashedPassword = $user[password];
    session_start();
    $_SESSION['userId'] = $user[id];
    $_SESSION['email'] = $user[email];
    // Returns true if the hashed version of the input password matches the hashed password
    return password_verify($userPassword, $hashedPassword);
}

function registerUser($userEmail, $userPassword) {
    // Create a connection object using the acme connection function
    $db = getDatabase();
    // The SQL statement
    $sql = 'INSERT INTO users (email, password)
     VALUES (:email, :password)';
    // Create the prepared statement using the acme connection
    $statement = $db->prepare($sql);
    // Bound values
    $statement->bindValue(':email', $userEmail, PDO::PARAM_STR);
    $statement->bindValue(':password', $userPassword, PDO::PARAM_STR);
    
    // Insert the data
    $statement->execute();
    // Ask how many rows changed as a result of our insert
    $rowsChanged = $statement->rowCount();
    // Close the database interaction
    $statement->closeCursor();
    // Return the indication of success (rows changed)
    return $rowsChanged;
}