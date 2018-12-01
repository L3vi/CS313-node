<?php

// Accounts Controller

require_once('../models/accounts-model.php');
require_once('../library/dbConnect.php');
session_start();

$action = filter_input(INPUT_POST, 'action');
if ($action == NULL) {
    $action = filter_input(INPUT_GET, 'action');
}

switch($action) {
    case 'loginView':
        include '../views/login.php';
        break;
    case 'login':
        // Actually logs in user
        $userEmail = filter_input(INPUT_POST, 'userEmail', FILTER_SANITIZE_EMAIL);
        $userPassword = filter_input(INPUT_POST, 'userPassword', FILTER_SANITIZE_STRING);
        if (empty($userEmail) || empty($userPassword)) {
            $message = "<p>Please enter a valid username and password.</p><br/>";
            include '../views/login.php';
            exit;
        }
        $loginOutcome = loginUser($userEmail, $userPassword);
        if ($loginOutcome) {
            header("Location: ../index.php");
        } else {
            $message = "<p>Sorry, but the username or password you entere were invalid. Please try again.</p><br/>";
            include '../views/login.php';
            exit;
        }
        break;
    case 'registerView':
        // Display register screen
        include '../views/register.php';
        break;
    case 'register':
        // Actually registers user in database
        $userEmail = filter_input(INPUT_POST, 'userEmail', FILTER_SANITIZE_EMAIL);
        $userPassword = filter_input(INPUT_POST, 'userPassword', FILTER_SANITIZE_STRING);
        if (empty($userEmail) || empty($userPassword)) {
            $message = "Please enter a valid email address and password.";
        }
        // Hash the password
        $hashedPassword = password_hash($userPassword, PASSWORD_DEFAULT);
        
        $registrationOutcome = registerUser($userEmail, $hashedPassword);
        if ($registrationOutcome) {
            $message = "<p>Thanks for registering! Please use your email and password to login.</p><br/>";
            include '../views/login.php';
            exit;
        } else {
            $message = "<p>Sorry, but the registration failed. Please try again.</p><br/>";
            include '../view/registration.php';
            exit;
        }
        break;
    case 'account':
        include '../views/account.php';
        break;
    case 'logout':
        session_destroy();
        include '../views/login.php';
        break;
    default:
        include '../views/login.php';
        break;
}