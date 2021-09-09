import {Board} from '../Connect4JS/board/Board.js';
import League from '../Connect4JS/piece/League.js';
import Minimax from '../Connect4JS/player/ai/Minimax.js';

const td = document.getElementsByClassName('connect4-td');
const connect4Msg = document.getElementById('connect4-message-to-player');
const connect4RestartBtn = document.getElementById('connect4-restart');
const redAI = document.getElementById('redCheck');
const blackAI = document.getElementById('blackCheck');

let connect4Board = Board.createStandardBoard();
let connect4Gameover = false;

const tdAddEventListener = () => {
    const length = td.length;
    for (let i = 0; i < length < i++;) {
        td[i].addEventListener('click', () => {

            if (connect4Board.getTileAt(i).isTileOccupied() || connect4Gameover) { return; }

            connect4Msg.innerHTML = 'Game running...';

            const col = i % Board.DEFAULT_COL;
            const moveFound = connect4Board.getCurrentPlayer().getLegalMoves().find(move => move.getIndex() % Board.DEFAULT_COL === col);
            td[moveFound.getIndex()].className += League.isBlack(connect4Board.getCurrentPlayer().getLeague()) ? 'black piece' : 'red piece';

            connect4Board = moveFound.execute(connect4Board);

            currentPlayerIsAI() ? aiMakeMove() : checkEndGame();
        });
    };
};

const checkEndGame = () => {
    if (connect4Gameover) { return; }
    if (connect4Board.getCurrentPlayer().isInCheckmate(connect4Board)) {
        connect4Gameover = true;
        connect4Msg.innerHTML = `${connect4Board.getCurrentPlayer().getOpponent(connect4Board).toString()} has won!`;
    } else if (connect4Board.getCurrentPlayer().isStalemate(connect4Board)) {
        connect4Gameover = true;
        connect4Msg.innerHTML = 'Game Drawn!';
    }
};

const aiMakeMove = () => {
    checkEndGame();
    if (connect4Gameover) { return; }
    connect4Msg.innerHTML = 'AI Thinking...';
    const move = new Minimax(connect4Board.getCurrentPlayer().getLeague()).makeMove(connect4Board);
    td[move.getIndex()].className += League.isBlack(connect4Board.getCurrentPlayer().getLeague()) ? 'black piece' : 'red piece';
    connect4Msg.innerHTML = 'Game running...';
    connect4Board = move.execute(connect4Board);
    currentPlayerIsAI() ? aiMakeMove() : checkEndGame();
};

const restartGame = () => {
    connect4RestartBtn.addEventListener('click', () => {
        if (confirm('Confirmation to restart game')) {
            connect4Gameover = false;
            connect4Board = Board.createStandardBoard();
            td.forEach(tileGame => {
                tileGame.className = 'connect4-td ';
            });
            connect4Msg.innerHTML = 'Game started...';
            blackAI.checked = false;
            redAI.checked = false;
        }
    })
};

const currentPlayerIsAI = () => {
    const black = League.isBlack(connect4Board.getCurrentPlayer().getLeague()) && blackAI.checked;
    const red = !League.isBlack(connect4Board.getCurrentPlayer().getLeague()) && redAI.checked;
    return black || red;
};

const checkBoxAddListener = () => {
    const listener = () => {
        if (currentPlayerIsAI()) {
            aiMakeMove();
        }
    };
    redAI.addEventListener('click', listener);
    blackAI.addEventListener('click', listener);
};

tdAddEventListener();
restartGame();
checkBoxAddListener();