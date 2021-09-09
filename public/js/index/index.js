const connect4option = document.getElementById('connect4-button');
const tictactoeOption = document.getElementById('tictactoe-button');

const connect4 = document.getElementById('connect4');
const tictactoe = document.getElementById('tictactoe');

const gameOptions = document.getElementById('game-options');

const backMenu = document.getElementsByClassName('backBtn');


const hideGameOptions = (game) => {
    gameOptions.style.display = 'none';
    game.style.display = 'flex';
};

const addGameListener = () => {
    for (let i = 0; i < backMenu.length; i++) {
        backMenu[i].addEventListener('click', () => {
            gameOptions.style.display = 'block';
            connect4.style.display = 'none';
            tictactoe.style.display = 'none';
        });
    };
    connect4option.addEventListener('click', () => {
        hideGameOptions(connect4)
    });
    tictactoeOption.addEventListener('click', () => {
        hideGameOptions(tictactoe)
    });
};

addGameListener();