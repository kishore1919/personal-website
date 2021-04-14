<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width = device-width, initial-scale = 1.0">
    <title>Portfolio</title>
    <link rel="stylesheet" href="../css/index.css">
</head>

<body>

    <div class="container">

        <?php

            require_once 'header.php';

            require_once 'readFile.php';

            echo '<div style="text-align:center">';

            for ($i = 0; $i < NUMBER_OF_PAGE; $i++) {
                $index = $i + 1;
                echo '<span class="dot" onclick="currentSlide('.$index.')"></span>';
            }

            echo '</div>';


            echo '<div class="content-wrapper">';

                for ($i = 0; $i < NUMBER_OF_PAGE; $i++) {

                    echo '<div class="portfolio-items-wrapper">';

                    $page = NUMBER_OF_PORTFOLIO_PER_PAGE * $i;

                    for ($j = 0; $j < $maxPortfolioAPage[$i]; $j++) {

                        $data = $PORTFOLIO_DATA[$page + $j];

                        echo '<div class="portfolio-item-wrapper">';
                            echo '<div class="portfolio-img-background" style="background-image:url(../images/portfolio_background/'.$data->getBackgroundImagePath().')"> </div>';
                            echo '<div class="img-text-wrapper">';
                                echo '<div class="logo-wrapper">';
                                    echo '<a href="https://github.com/GervinFung/'.$data->getLinkToGithub().'" target="_blank">';
                                        echo '<img src="../images/logos/'.$data->getLogo().'" alt="'.$data->getAlt().'">';
                                    echo '</a>';
                                echo '</div>';
                                echo '<div class="subtitle">'.$data->getCaption().'</div>';
                            echo '</div>';
                        echo '</div>';
                    }

                    echo '</div>';
                    
                }

            echo '</div>';

        ?>

        <div class="button">
            <div class="prev">
                <img src="../images/previousButton.png" alt="" onclick="plusSlides(-1)">
            </div>
            <div class="next">
                <img src="../images/nextButton.png" alt="" onclick="plusSlides(1)">
            </div>
        </div>


    </div>

</body>
<script src="../js/index.js"> </script>
</html>