<?php ?>
<!DOCTYPE html>
<html lang="en">

    <!--     The head is where you store information about the document.-->

    <head>
        <meta charset="utf-8">
        <link rel="stylesheet" media="screen" href="../styling.css">
        <link rel="stylesheet" href="../bootstrap-4.1.3-dist/css/bootstrap.min.css" type="text/css">
        <meta name="viewport" content="width=device-width">
        <title>Activities</title>
    </head>

    <!--    The body contains the actual bulk of the content.-->
    <body>
        <main>
            <h1>Activities</h1>

            <!--Dynamically display activities-->
            <?php
                if (isset($message)) {
                    echo $message;
                }
                echo $activitiesList;
            ?>
            <br/>
            <a href="../activities/index.php?action=createActivityView">Create a new Activity</a>


        </main>

        <footer>
        </footer>

    </body>

</html>