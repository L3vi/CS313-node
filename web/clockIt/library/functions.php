<?php

// Compares the dates startimes (for sorting)
function date_compare($a, $b) {
    $t1 = strtotime($a['starttime']);
    $t2 = strtotime($b['starttime']);
    return $t1 - $t2;
}    

function createTimesheet($timeEntries) {
	$totalTime = 0;
	date_default_timezone_set("America/Denver");
	$timeSheet = "<table class='table table-striped table-dark table-hover'>";
	$timeSheet .= "\n<thead>\n<tr>";
	$timeSheet .= "<th scope='col'>Date</th>\n<th scope='col'>Start Time</th>\n<th scope='col'>End Time</th>\n<th scope='col'>Total Time</th>\n<th scope='col'>Notes</th>";
	$timeSheet .= "\n</tr>\n</thead>\n<tbody>";
	// Uses the custom function above to sort the timeEntries by date.
	usort($timeEntries, 'date_compare');
	foreach ($timeEntries as $entry) {
		$startTime = new DateTime($entry['starttime']);
		$entryHours = $startTime->diff(new DateTime($entry['endtime']));
		// Creates Date
		$timeSheet .= "<tr>\n<td>" . date('M d, Y', strtotime($entry['starttime'])) . "</td>\n";
		// Creates starting time
		$timeSheet .= "<td>" . date('g:i A', strtotime($entry['starttime'])) . "</td>\n";
		// Creates ending time
		$endDate = '';
		$entryHoursString = '';
		if (isset($entry['endtime'])) {
			$endDate = date('g:i A', strtotime($entry['endtime']));
			$entryHoursString = $entryHours->format('%h Hours %i Minutes');
		}
		$timeSheet .= "<td>$endDate</td>\n<td>$entryHoursString</td>\n<td>$entry[notes]</td></tr>";
		// Adds this entries' time to the total time variable.
		$totalTime = $totalTime + (int)$entryHours->format('%h');
	}
	$_SESSION['totalTime'] = $totalTime;
	$timeSheet .= "\n</tbody>\n</table>";

	return $timeSheet;
}

function createWeekNav($workWeek) {
	$weekNav = "<div class='weekNav'>\n<ul class='nav nav-tabs'>";
	foreach ($workWeek as $workDay) {
		$weekNav .= "<li class='nav-item'>\n<a class='nav-link' href='#'>$workDay</a>\n</li>";
	}
	$weekNav .= "</ul>\n</div>";

	return $weekNav;
}

function getTotalTime($timeEntries) {
	foreach ($timeEntries as $entry) {
		$today = getdate($entry[starttime]);
	}
}

function createActivitiesList($activities) {
	$activitiesList = '<div id="activitiesList">';
	foreach ($activities as $activity) {
		$activitiesList .= '<form method="post">';
		$activitiesList .= "<input type='submit' name='activityName' value='" . ucfirst($activity['name']) . "'>";
		$activitiesList .= "<input type='hidden' name='activityId' value='" . urlencode($activity['id']) . "'><br/>";
		$activitiesList .= "<input type='hidden' name='action' value='setActivity'>";
		$activitiesList .= '</form>';
	};
	$activitiesList .= '</div>';
	
	return $activitiesList;
}