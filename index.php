<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width = device-width, initial-scale = 1.0">
    <title>Home</title>
    <link rel="stylesheet" href="css/index.css">
    <?php require_once 
        'php/header.php';
        displayHeader(TRUE);
    ?>
</head>
<body>
    <div class="container">
        <div class="two-col-wrapper">
            <div class="home-page-message">
                <p>Hello</p><p>I am</p><p id="name">Gervin</p>
            </div>
            <div id="connect4">
                <div>
                    <div class="panel">
                        <div><label for="redAI" class="aiBtn">Red as AI:<input type="checkbox" id="redCheck"></label></div>
                        <div><label for="blackAI" class="aiBtn">Black as AI:<input type="checkbox" id="blackCheck"></label></div>
                    </div>
                    <table style="border-spacing: 10px;" id="game_board" cellpadding="0">
                        <?php
                            $html_game_board = '';
                            for ($i = 0; $i < 6; $i++) { 
                                $html_game_board .= '<tr>';
                                for ($j = 0; $j < 7; $j++) {
                                    $html_game_board .= '<td></td>';
                                }
                                $html_game_board .= '</tr>';
                            }
                            echo $html_game_board;
                        ?>
                    </table>
                    <div class="panel">
                        <div><button id="restart">Restart</button></div>
                        <div><p id="message-to-player"></p></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="portfolio-button-wrapper">
            <a href="php/portfolio" class="portfolio-button">View My Work</a>
        </div>
    </div>
    <?php require_once 'php/footer.php';?>
</body>
<script src="js/Connect4JS/board/Board.js" charset="utf-8" defer type="module"></script>
<script src="js/index.js" charset="utf-8" defer type="module"></script>
</html>