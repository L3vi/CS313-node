<?php

// Clock-It Controller

require_once('library/dbConnect.php');
require_once('models/clockIt-model.php');
require_once('library/functions.php');
session_start();

// Bad naming, but the right variables are being pulled from the activities page

$action = filter_input(INPUT_POST, 'action');
if ($action == NULL) {
    $action = filter_input(INPUT_GET, 'action');
}

// Create variable timeEntries from database
$timeEntries = getTimeEntries($_SESSION['activity_id']);
// Create timesheet (html table) with timeEntries
$timeSheet = createTimesheet($timeEntries);

$workWeek = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday"
];
// if screen is smaller use this array instead
$workWeekSmall = ["M", "Tu", "W", "Th", "F"];

// Create week navigation based on arrays above. Will be dynamic in future according to user settings.
// Will have the ability to show different days of the week in the future.
$weekNav = createWeekNav($workWeek);
// $totalTime = getTotalTime($timeEntries);

switch ($action) {
    case 'clockIn':
        if(isset($_SESSION['activity_id'])) {
            $successfulClockIn = startTimeEntry($_SESSION['activity_id']);
        } else {
            // Please select an activity.
            header('Location: activities');
        }

        if ($successfulClockIn) {
            $message = "<p>Successfully clocked in!</p>";
            $_SESSION['clocked_in'] = true;
            header('Location: .');
            exit;
        } else {
            $message = "<p>Did not successfully clock in...</p>";
            header('Location: .');
            exit;
        }
        break;
    case 'clockOut':
        if(isset($_SESSION['activity_id'])) {
            $successfulClockOut = endTimeEntry();
        } else {
            // Please select an activity.
            header('Location: activities');
        }

        if ($successfulClockOut) {
            $message = "<p>Successfully clocked out!</p>";
            $_SESSION['clocked_in'] = false;
            header('Location: .');
            exit;
        } else {
            $message = "<p>Did not successfully clock out...</p>";
            header('Location: .');
            exit;
        }
        break;

    default:
        if(isset($_SESSION['userId'])) {
            if(isset($_SESSION['activity_id'])) {
                include 'views/home.php';
            } else {
                header('Location: activities');
            }
        } else {
            header('Location: accounts');
        }
        break;
}