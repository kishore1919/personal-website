<?php
    function displayHeader($isHeader) {
        define('OTHER_PHP', $isHeader ? 'php/' : '');
        define('OTHER_FILE', $isHeader ? '' : '../');

        echo '<!DOCTYPE html>';
        echo '<html lang="en">';
        echo '<head>';
            echo '<meta charset="UTF-8">';
            echo '<meta name="viewport" content="width = device-width, initial-scale = 1.0">';
            echo '<title>Header</title>';
            echo '<link rel="manifest" href="'.OTHER_FILE.'manifest.json">';
            echo '<link rel="stylesheet" href="'.OTHER_FILE.'css/font/Orbitron/stylesheet.css" type="text/css" charset="utf-8" />';
            echo '<link rel="stylesheet" href="'.OTHER_FILE.'css/styles.css">';

            echo '<meta name="theme-color" content="#000d0d"/>';

            echo '<link rel="icon" href="'.OTHER_FILE.'favicon.ico" type="image/x-icon"/>';

            echo '<meta name="mobile-web-app-capable" content="yes">';
            echo '<meta name="apple-mobile-web-app-capable" content="yes">';
            echo '<meta name="application-name" content="PoolOfDeath20">';
            echo '<meta name="apple-mobile-web-app-title" content="PoolOfDeath20">';
            echo '<meta name="theme-color" content="#000d0d">';
            echo '<meta name="msapplication-navbutton-color" content="#000d0d">';
            echo '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">';
            echo '<meta name="msapplication-starturl" content="'.OTHER_FILE.'index.php">';

            echo '<link rel="icon" sizes="128x128" href="'.OTHER_FILE.'images/appIcon/icon128.png">';
            echo '<link rel="icon" sizes="128x128" href="'.OTHER_FILE.'images/appIcon/icon144.png">';
            echo '<link rel="icon" sizes="128x128" href="'.OTHER_FILE.'images/appIcon/icon152.png">';
            echo '<link rel="icon" sizes="128x128" href="'.OTHER_FILE.'images/appIcon/icon192.png">';
            echo '<link rel="icon" sizes="128x128" href="'.OTHER_FILE.'images/appIcon/icon256.png">';
            echo '<link rel="icon" sizes="128x128" href="'.OTHER_FILE.'images/appIcon/icon512.png">';

            echo '<link rel="apple-touch-icon" sizes="128x128" href="'.OTHER_FILE.'images/appIcon/icon128.png">';
            echo '<link rel="apple-touch-icon" sizes="128x128" href="'.OTHER_FILE.'images/appIcon/icon144.png">';
            echo '<link rel="apple-touch-icon" sizes="128x128" href="'.OTHER_FILE.'images/appIcon/icon152.png">';
            echo '<link rel="apple-touch-icon" sizes="128x128" href="'.OTHER_FILE.'images/appIcon/icon192.png">';
            echo '<link rel="apple-touch-icon" sizes="128x128" href="'.OTHER_FILE.'images/appIcon/icon256.png">';
            echo '<link rel="apple-touch-icon" sizes="128x128" href="'.OTHER_FILE.'images/appIcon/icon512.png">';

        echo '</head>';
        echo '<body>';
            echo '<div id="nav-wrapper">';
                echo '<div id="left-side">';
                    echo '<div class="nav-link-wrapper">';
                        echo '<a href="'.OTHER_FILE.'index.php" rel="canonical" >Home</a>';
                    echo '</div>';
                    echo '<div class="nav-link-wrapper">';
                        echo '<a href="'.OTHER_PHP.'portfolio.php" rel="canonical" >Portfolio</a>';
                    echo '</div>';
                    echo '<div class="nav-link-wrapper">';
                        echo '<a href="'.OTHER_PHP.'about.php" rel="canonical" >About</a>';
                    echo '</div>';
                    echo '<div class="nav-link-wrapper">';
                        echo '<a href="'.OTHER_PHP.'contact.php" rel="canonical" >Contact</a>';
                    echo '</div>';
                echo '</div>';
                echo '<div id="right-side">';
                    echo '<div class="brand">';
                        echo '<a href="#footer" rel="canonical" >PoolOfDeath20</a>';
                    echo '</div>';
                echo '</div>';
            echo '</div>';
        echo '</body>';
        echo '<script src="'.OTHER_FILE.'js/allPage.js"> </script>';
        echo '</html>';
    }
?>