<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">

    <!--     The head is where you store information about the document.-->

    <head>
        <meta charset="utf-8">
        <link rel="stylesheet" media="screen" href="../styling.css">
        <link rel="stylesheet" href="../bootstrap-4.1.3-dist/css/bootstrap.min.css" type="text/css">
        <meta name="viewport" content="width=device-width">
        <title>Account</title>
    </head>

    <!--    The body contains the actual bulk of the content.-->

    <body>
        <main>
            <h1>Your Account</h1>
            <br/>
            <?php
            echo "Email address: <br/>" . $_SESSION['email'] . "<br/>";
            ?>
            <br/>
            <form action="../accounts/index.php" method="post">
                <input type="submit" value="Logout">
                <input type="hidden" name="action" value="logout">
            </form>
            <br/>
            <a href="../">Back to Clock It!</a>
        </main>

        <footer>
        </footer>

    </body>

</html>