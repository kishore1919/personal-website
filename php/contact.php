<?php
    $nameErr = $emailErr = $messageErr = $name = $email = $message = '';

    $submitSuccessful = FALSE;

    if (isset($_POST['submit']) && $_SERVER['REQUEST_METHOD'] === 'POST') {

        $name = $_POST['name'];
        $email = $_POST['email'];
        $message = $_POST['message'];

        if (nameValid($name, $nameErr) && emailValid($email, $emailErr) && messageValid($message, $messageErr)) {

            define('MY_EMAIL', 'gervinfungdaxuen@gmail.com');//please dont abuse my email

            ini_set('SMTP', "aspmx.l.google.com");
            ini_set('sendmail_from', MY_EMAIL);

            $email_subject = 'Contact form submission from:'.$name;

            $email_body = 'You have received a new message.\n'.

            'Here are the details:\n Name:'.$name.'\n '.

            'Email: '.$email.'\n Message \n'.$message;

            $headers = 'From: '.MY_EMAIL.'\n'.'\r\n'.'Reply-To: '.$email.'Context-Type: text/html\r\n';

            echo $email_subject.'\n';
            echo $email_body.'\n';
            echo $headers.'\n';

            if(mail(MY_EMAIL, $email_subject, $email_body, $headers)) {
                $submitSuccessful = TRUE;
                echo 'SUCCESS';
                // header('Location: contact-form-thank-you.html');
            } else {
                echo 'FAILED';
            }
        }
    }

    function nameValid($name, &$nameErr) {
        if ($name === '' || $name === NULL) {
            $nameErr = 'Please do not leave name section empty';
            return FALSE;
        } else if (checkStringIsBlank($name)) {
            $nameErr = 'Please do not leave name section blank';
            return FALSE;
        } return TRUE;
    }

    function checkStringIsBlank($str) {
        $count = 0;
        $len = strlen($str);
        for ($i = 0; $i < $len; $i++){
            if ($str[$i] === ' ') {
                $count++;
            }
        }
        return $len === $count;
    }

    function emailValid($email, &$emailErr) {
        if ($email === '' || $email === NULL) {
            $emailErr = 'Please do not leave email section empty';
            return FALSE;
        } else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $emailErr = 'Please enter valid email format';
            return FALSE;
        } return TRUE;
    }

    function messageValid($message, &$messageErr) {
        if ($message === '' || $message === NULL) {
            $messageErr = 'Please do not leave message section empty';
            return FALSE;
        } else if (checkStringIsBlank($message)) {
            $messageErr = 'Please do not leave message section blank';
            return FALSE;
        } else if (strlen($message) < 10) {
            $messageErr = 'At least 10 words are required';
            return FALSE;
        } return TRUE;
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width = device-width, initial-scale=1.0">
    <title>Contact</title>
    <link rel="stylesheet" href="../css/contact.css">
    <link rel="stylesheet" href="../css/font/Allura/stylesheet.css" type="text/css" charset="utf-8" />
    <?php require_once
        'header.php';
        displayHeader(FALSE);
    ?>
</head>
<body>
    <div class="container">
        <div class="content-wrapper">
            <div class="contact-wrapper">
                <div class = "contact-us-panel">
                    <p><b>Got a question?</b></p>
                </div>

                <div class = "contact-form">
                    <form method="POST" action="<?php echo $_SERVER["PHP_SELF"];?>" id ="my-contact-form">

                        <label class = "input-info" for="name">Name</label>
                        <span class="error" id = "nameErr"><?php echo $nameErr;?></span>
                        <label>
                            <div class="input-div">
                                <input type="text" name="name" id = "name" placeholder="What is your name?" value="<?php echo $name;?>" required>
                            </div>
                        </label>

                        <label class = "input-info" for="email">Email</label>
                        <span class="error" id = "emailErr"><?php echo $emailErr;?></span>
                        <label>
                            <div class="input-div">
                                <input type="email" name="email" id = "email" placeholder="Where can we email you back?" value="<?php echo $email;?>" required>
                            </div>
                        </label>

                        <label class = "input-info" for="message">Message</label>
                        <span class="error" id = "messageErr"><?php echo $messageErr;?></span>
                        <label>
                            <div class="input-div">
                                <textarea name="message" id = "message" placeholder="What is on your mind?" rows="8" required><?php echo $message;?></textarea>
                            </div>
                        </label>

                        <div id = "submit-button-wrapper">
                            <input class="submit-btn" name="submit" type = "submit" value = "Submit" id = "submit-button">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <?php require_once 'footer.php';?>
</body>
<script src="../js/contactFormValidation.js"></script>
</html>