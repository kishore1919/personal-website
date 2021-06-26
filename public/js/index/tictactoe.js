import {Board} from '../TicTacToe/board/Board.js';
import Minimax from '../TicTacToe/player/ai/Minimax.js';
import League from '../TicTacToe/piece/League.js';

const tictactoeMsg = document.getElementById('tictactoe-message-to-player');
const tictactoeRestartBtn = document.getElementById('tictactoe-restart');
const OAI = document.getElementById('OCheck');
const XAI = document.getElementById('XCheck');

let tictactoeBoard = Board.createStandardBoard();
let tictactoeGameOver = false;

const tdArr = document.getElementsByClassName('tictactoe-td ');
const tdArrLen = tdArr.length;
tictactoeTDAddEventListener();
restartGame();
checkBoxAddListener();

function tictactoeTDAddEventListener() {
    for (let i = 0; i < tdArrLen; i++) {
        const td = tdArr[i];
        td.addEventListener('click', () => {
            if (tictactoeBoard.getTileAt(i).isTileOccupied() || tictactoeGameOver) { return; }

            const move = tictactoeBoard.getCurrentPlayer().getLegalMoves().find(move => move.getIndex() === i);

            td.innerHTML = League.ToString(tictactoeBoard.getCurrentPlayer().getLeague());
            td.className += 'occupied';
            tictactoeBoard = tictactoeBoard.getCurrentPlayer().makeMove(move);
            tictactoeMsg.innerHTML = 'Game running...';
            currentPlayerIsAI() ? aiMakeMove() : checkEndGame();
        })
    }
}

function aiMakeMove() {
    checkEndGame();
    if (tictactoeGameOver) { return; }
    tictactoeMsg.innerHTML = 'AI thinking...';
    const move = new Minimax().makeMove(tictactoeBoard);
    tdArr[move.getIndex()].innerHTML = League.ToString(tictactoeBoard.getCurrentPlayer().getLeague());
    tdArr[move.getIndex()].className += 'occupied';
    tictactoeBoard = move.execute(tictactoeBoard);
    tictactoeMsg.innerHTML = 'Game running...';
    currentPlayerIsAI() ? aiMakeMove() : checkEndGame();
}

function checkEndGame() {
    if (tictactoeGameOver) { return; }
    if (tictactoeBoard.getCurrentPlayer().isInCheckmate()) {
        tictactoeGameOver = true;
        tictactoeMsg.innerHTML = `${League.ToString(tictactoeBoard.getCurrentPlayer().getOpponent().getLeague())} has won!`;
    } else if (tictactoeBoard.getCurrentPlayer().isStalemate()) {
        tictactoeGameOver = true;
        tictactoeMsg.innerHTML = 'Game Drawn!';
    }
}

function restartGame() {
    tictactoeRestartBtn.addEventListener('click', () => {
        if (confirm('Confirmation to restart game')) {
            tictactoeGameOver = false;
            tictactoeBoard = Board.createStandardBoard();
            for (let i = 0; i < tdArrLen; i++) {
                tdArr[i].innerHTML = '';
                tdArr[i].className = 'tictactoe-td ';
            }
            tictactoeMsg.innerHTML = 'Game started...';
            OAI.checked = false;
            XAI.checked = false;
        }
    })
}

function currentPlayerIsAI() {
    if (League.isCross(tictactoeBoard.getCurrentPlayer().getLeague()) && XAI.checked) {
        return true;
    } else if (!League.isCross(tictactoeBoard.getCurrentPlayer().getLeague()) && OAI.checked) {
        return true;
    }
}

function checkBoxAddListener() {
    const listener = () => {
        if (currentPlayerIsAI()) {
            aiMakeMove()
        }
    };
    OAI.addEventListener('click', listener);
    XAI.addEventListener('click', listener);
}