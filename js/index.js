import {Board} from './Connect4JS/board/Board.js';
import League from './Connect4JS/piece/League.js';
import Minimax from './Connect4JS/player/ai/Minimax.js';

const td = document.getElementsByTagName('td');
const msg = document.getElementById('message-to-player');
const restartBtn = document.getElementById('restart');
const redAI = document.getElementById('redCheck');
const blackAI = document.getElementById('blackCheck');
const tdLen = td.length;

let board = Board.createStandardBoard();
let gameOver = false;

function tdAddEventListener() {
    for (let i = 0; i < tdLen; i++) {
        const element = td[i];
        element.addEventListener('click', () => {

            if (board.getTileAt(i).isTileOccupied() || gameOver) { return; }

            const col = i % Board.DEFAULT_COL;
            const moveFound = board.getCurrentPlayer().getLegalMoves().find(move => move.getIndex() % Board.DEFAULT_COL === col);
            td[moveFound.getIndex()].className = League.isBlack(board.getCurrentPlayer().getLeague()) ? 'black piece' : 'red piece';

            board = moveFound.execute(board);

            currentPlayerIsAI() ? aiMakeMove() : checkEndGame();
        })
    }
}

function aiMakeMove() {
    checkEndGame();
    if (gameOver) { return; }
    const move = new Minimax(board.getCurrentPlayer().getLeague()).makeMove(board);
    td[move.getIndex()].className = League.isBlack(board.getCurrentPlayer().getLeague()) ? 'black piece' : 'red piece';
    board = move.execute(board);
    if (currentPlayerIsAI()) { aiMakeMove(); }
}

function checkEndGame() {
    if (gameOver) { return; }
    if (board.getCurrentPlayer().isInCheckmate(board)) {
        gameOver = true;
        msg.innerHTML = `${board.getCurrentPlayer().getOpponent(board).toString()} has won!`;
    } else if (board.getCurrentPlayer().isStalemate(board)) {
        gameOver = true;
        msg.innerHTML = 'Game Drawn!';
    }
}

function restartGame() {
    restartBtn.addEventListener('click', () => {
        if (confirm('Confirmation to restart game')) {
            board = Board.createStandardBoard();
            for (let i = 0; i < tdLen; i++) {
                td[i].className = '';
            }
            msg.innerHTML = '';
        }
    })
}

function currentPlayerIsAI() {
    if (League.isBlack(board.getCurrentPlayer().getLeague()) && blackAI.checked) {
        return true;
    } else if (!League.isBlack(board.getCurrentPlayer().getLeague()) && redAI.checked) {
        return true;
    }
}

function checkBoxAddListener() {
    const listener = () => {
        if (currentPlayerIsAI()) {
            aiMakeMove()
        }
    };
    redAI.addEventListener('click', listener);
    blackAI.addEventListener('click', listener);
}

tdAddEventListener();
restartGame();
checkBoxAddListener();