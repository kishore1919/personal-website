<?php

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    $nameErr = $emailErr = $messageErr = $name = $email = $message = '';

    $submitSuccessful = FALSE;

    if (isset($_POST['submit']) && $_SERVER['REQUEST_METHOD'] === 'POST') {

        $name = $_POST['name'];
        $email = $_POST['email'];
        $message = $_POST['message'];

        if (nameValid($name, $nameErr) && emailValid($email, $emailErr) && messageValid($message, $messageErr)) {
    
            require_once 'PHPMailer-6.4.1/src/Exception.php';
            require_once 'PHPMailer-6.4.1/src/PHPMailer.php';
            require_once 'PHPMailer-6.4.1/src/SMTP.php';

            // passing true in constructor enables exceptions in PHPMailer
            $mail = new PHPMailer(true);

            try {
                // Server settings
                // $mail->SMTPDebug = SMTP::DEBUG_SERVER; // for detailed debug output
                $mail->isSMTP();
                $mail->Host = 'smtp.gmail.com';
                $mail->SMTPAuth = true;
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                $mail->Port = 587;

                define('MY_EMAIL', 'poolofdeath20@gmail.com');//please dont abuse my email

                $mail->Username = MY_EMAIL;
                $mail->Password = 'Qh9ehdDdyzTTRg9';//please dont hack me

                // Sender and recipient settings
                $mail->setFrom($email, $name);
                $mail->addAddress(MY_EMAIL, 'PoolOfDeath20');
                $mail->addReplyTo($email, $name);

                // Setting the email content
                $mail->Subject = 'Portfolio Contact Form From:'.$name;
                $newLine = "\n";
                $mail->Body = 'You have received a new message.'.$newLine.

                'Here are the details: Name:'.$name.$newLine.

                'Email: '.$email.$newLine.'Message'.$newLine.$message;

                $mail->send();
                $submitSuccessful = TRUE;
            } catch (Exception $e) {
                echo 'Error in sending email. Mailer Error: {'.$mail->ErrorInfo.'}';
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

    function displayPopUp($name) {
        echo '<div id="messageBackground">';
            echo '<div class="message-content">';
                echo '<span id="close">&times;</span>';
                echo '<img src="../images/tick.jpg" alt="tick.jpg">';
                echo '<p>Your Message Has Been Successfully Sent!</p>';
                echo '<p>Thank You '.$name.'!</p>';
            echo '</div>';
        echo '</div>';
        echo '<script src="../js/contactPopUp.js" charset="utf-8" defer> </script>';
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
        <?php if ($submitSuccessful){displayPopUp($name);}?>
        <div class="content-wrapper">
            <div class="contact-wrapper">
                <div class = "contact-us-panel">
                    <p><b>Got something to ask or tell me?</b></p>
                    <p><b>Just contact me!</b></p>
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
                                <input type="email" name="email" id = "email" placeholder="Where can I email you back?" value="<?php echo $email;?>" required>
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
                            <input class="submit-btn" name="submit" type = "submit" value = "Send" id = "submit-button">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <?php require_once 'footer.php';?>
</body>
<script src="../js/contactFormValidation.js" charset="utf-8" defer></script>
</html>