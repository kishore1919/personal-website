<?php
    function getData() {
        $file_handle = fopen('files/sphere.txt', 'r') or die('path wrong OR file content corrupted');
        $data = array();
        $DEGREE = 4;
        while (!feof($file_handle) ) {
            $temp = explode(',', fgets($file_handle));
            $data[] = '<li class="ring" style = "color:'.$temp[0].'; transform: rotateY('.$DEGREE.'deg); animation-delay: '.$temp[1].'s;"></li>';
            $DEGREE += 4;
        }
        fclose($file_handle);
        return $data;
    }
    define('SPHERE', getData());
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width = device-width, initial-scale = 1.0">
    <title>Home</title>
    <link rel="stylesheet" href="css/index.css">
    <link rel="stylesheet" href="css/font/Allura/stylesheet.css" type="text/css" charset="utf-8" />
    <?php require_once 
        'php/header.php';
        displayHeader(TRUE);
    ?>
</head>
<body>
    <div class="container">
        <div class="two-row-wrapper">
            <div class="home-page-message">
                <p>Hello</p><p>I am</p><p id="name">Gervin</p>
            </div>
            <div class="sphere-wrapper">
                <div class="scene">
                    <div class="wrapper">
                        <ul id="ball">
                            <?php foreach(SPHERE as $value){echo $value;}?>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php require_once 'php/footer.php';?>
</body>
<script src="js/index.js"></script>
</html>