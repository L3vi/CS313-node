<?php

// Activities Controller

require_once('../models/activities-model.php');
require_once('../library/dbConnect.php');
require_once('../library/functions.php');
session_start();

$action = filter_input(INPUT_POST, 'action');
if ($action == NULL) {
    $action = filter_input(INPUT_GET, 'action');
}


$userId = $_SESSION['userId'];

$activities = getActivities($userId);
if (empty($activities)) {
    $message = "<p>Looks like you don't have any activities, go ahead and create one!</p>";
} else {
    $message = "<p>Choose an activity!</p>";
    $activitiesList = createActivitiesList($activities);
}


switch($action) {
    case 'displayActivities':
        include '../views/display-activities.php';
        break;
    case 'setActivity':
        $_SESSION['activity_name'] = filter_input(INPUT_POST, 'activityName', FILTER_SANITIZE_STRING);
        $_SESSION['activity_id'] = filter_input(INPUT_POST, 'activityId', FILTER_SANITIZE_STRING);
        // $activityId = array_search($_POST['activityName'], $activities);
        header('Location: ../');
        break;
    case 'createActivityView':
        include '../views/create-activity.php';
        break;
    case 'createActivity':
        $activityName = filter_input(INPUT_POST, 'activityName', FILTER_SANITIZE_STRING);
        $createOutcome = createActivity($activityName);
        if ($createOutcome) {
            // Assuming it successfully created, send them back to the activities page
            header('Location: ../activities');
        } else {
            echo "Please try creating the activity again.";
        }
        
        break;
    default:
        if(isset($_SESSION['userId'])) {
            include '../views/display-activities.php';
        } else {
            header('Location: ../accounts');
        }
        break;
}