<?php

    require_once 'data.php';

    function getData() {
        $file_handle = fopen("../files/data.txt", "r") or die("path wrong OR file content corrupted");

        $data = array();

        while (!feof($file_handle) ) {

            $line_of_text = fgets($file_handle);
            $parts = explode(",", $line_of_text);
            $backgroundImagePath = $parts[0];
            $linkToGithub = $parts[1];
            $logo = $parts[2];
            $alt = $parts[3];
            $caption = $parts[4];
            $data[] = new Data($backgroundImagePath, $linkToGithub, $logo, $alt, $caption);
        }

        fclose($file_handle);

        return $data;
    }

    $PORTFOLIO_DATA = getData();
    define('NUMBER_OF_PORTFOLIO_PER_PAGE', 9);
    define('TOTAL_NUMBER_OF_PORTFOLIO', sizeof($PORTFOLIO_DATA));
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

    $maxPortfolioAPage = getNumberOfPortfolioInAPage();

?>