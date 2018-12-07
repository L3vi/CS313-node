<?php

?>
<!DOCTYPE html>
<html lang="en">

    <!--     The head is where you store information about the document.-->

    <head>
        <meta charset="utf-8">
        <link rel="stylesheet" media="screen" href="../styling.css">
        <link rel="stylesheet" href="../bootstrap-4.1.3-dist/css/bootstrap.min.css" type="text/css">
        <meta name="viewport" content="width=device-width">
        <title>Register</title>
    </head>

    <!--    The body contains the actual bulk of the content.-->

    <body>
        <main>
            <h1>Create an Account</h1>
            
            <?php
            if (isset($message)) {
                echo $message;
            }
            ?>

            <form action="../accounts/index.php" method="post">
                Email:<br/><input type="email" name="userEmail" required>
                <br/>
                
                Password:<br/><input type="password" name="userPassword" pattern="(?=^.{8,}$)(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" required/>
                <br/><span>Passwords must be at least 8 characters and contain at least 1 number, 1 capital letter and 1 special character</span><br/>
                <br/>
                <input type="submit" value="Create Account">
                <input type="hidden" name="action" value="register">
            </form>
            <br/>
            Already have an account? <a href="../accounts/index.php?action=loginView">Login</a>
        </main>

        <footer>
        </footer>

    </body>

</html>