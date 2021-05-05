<?php
    function getData() {
        $file_handle = fopen('../files/portfolio.txt', 'r') or die('path wrong OR file content corrupted');
        $data = array();
        while (!feof($file_handle) ) {
            $data[] = explode(',', fgets($file_handle));
        }
        fclose($file_handle);
        return $data;
    }

    define('PORTFOLIO_DATA', getData());

    define('NUMBER_OF_PORTFOLIO_PER_PAGE', 9);
    define('TOTAL_NUMBER_OF_PORTFOLIO', sizeof(PORTFOLIO_DATA));
    define('NUMBER_OF_PAGE', ceil(TOTAL_NUMBER_OF_PORTFOLIO / NUMBER_OF_PORTFOLIO_PER_PAGE));

    function getNumberOfPortfolioInAPage() {
        $number = array();
        $TEMP = TOTAL_NUMBER_OF_PORTFOLIO;
        while (true) {
            $TEMP -= NUMBER_OF_PORTFOLIO_PER_PAGE;
            if ($TEMP > 0) {
                $number[] = NUMBER_OF_PORTFOLIO_PER_PAGE;
            } else {
                $number[] = NUMBER_OF_PORTFOLIO_PER_PAGE + $TEMP;
                return $number;
            }
        }
    }

    define ('MAX_PORTFOLIO_A_PAGE', getNumberOfPortfolioInAPage());
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width = device-width, initial-scale = 1.0">
    <title>Portfolio</title>
    <link rel="stylesheet" href="../css/portfolio.css">
    <?php
        require_once 'header.php';
        displayHeader(FALSE);
    ?>
</head>
<body>
    <div class="container">
        <?php
            echo '</div>';
            echo '<div class="content-wrapper">';
                for ($i = 0; $i < NUMBER_OF_PAGE; $i++) {
                    echo '<div class="portfolio-items-wrapper">';
                    $page = NUMBER_OF_PORTFOLIO_PER_PAGE * $i;
                    for ($j = 0; $j < MAX_PORTFOLIO_A_PAGE[$i]; $j++) {
                        $data = PORTFOLIO_DATA[$page + $j];
                        $path = $data[0];
                        $caption = $data[1];
                        echo '<div class="portfolio-item-wrapper">';
                            echo '<a class = "portfolio-link" rel="noreferrer" href="https://github.com/GervinFung/'.$path.'" target="_blank">';
                                echo '<div class="portfolio-img-background" style="background-image:url(../images/portfolio_background/'.$path.'.jpg)"> </div>';
                                echo '<div class="img-text-wrapper">';
                                    echo '<div class="logo-wrapper">';
                                        echo '<img src="../images/logos/'.$path.'.jpg" alt="'.$path.'.jpg">';
                                    echo '</div>';
                                    echo '<div class="subtitle">'.$caption.'</div>';
                                echo '</div>';
                            echo '</a>';
                        echo '</div>';
                    }
                    echo '</div>';
                }
            echo '</div>';
            echo '<div id="dots" style="text-align:center">';
            for ($i = 0; $i < NUMBER_OF_PAGE; $i++) {
                echo '<span class="dot" onclick="currentSlide('.($i + 1).')"></span>';
            }
        ?>
        <div class="button">
            <div class="prev">
                <img src="../images/previousButton.jpg" alt="" onclick="plusSlides(-1)">
            </div>
            <div class="next">
                <img src="../images/nextButton.jpg" alt="" onclick="plusSlides(1)">
            </div>
        </div>
    </div>
    <?php require_once 'footer.php';?>
</body>
<script src="../js/portfolio.js"> </script>
</html>