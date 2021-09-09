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

const tictactoeTDAddEventListener = () => {
    const length = tdArr.length;
    for (let i = 0; i < length< i++;) {
        const tileGame = tdArr[i];
        tileGame.addEventListener('click', () => {
            if (tictactoeBoard.getTileAt(i).isTileOccupied() || tictactoeGameOver) { return; }

            const move = tictactoeBoard.getCurrentPlayer().getLegalMoves().find(move => move.getIndex() === i);

            tileGame.innerHTML = League.ToString(tictactoeBoard.getCurrentPlayer().getLeague());
            tileGame.className += 'occupied';

            tictactoeBoard = tictactoeBoard.getCurrentPlayer().makeMove(move);
            tictactoeMsg.innerHTML = 'Game running...';
            currentPlayerIsAI() ? aiMakeMove() : checkEndGame();
        });
    };
};

const aiMakeMove = () => {
    checkEndGame();
    if (tictactoeGameOver) { return; }
    tictactoeMsg.innerHTML = 'AI thinking...';
    const move = new Minimax().makeMove(tictactoeBoard);
    tdArr[move.getIndex()].innerHTML = League.ToString(tictactoeBoard.getCurrentPlayer().getLeague());
    tdArr[move.getIndex()].className += 'occupied';
    tictactoeBoard = move.execute(tictactoeBoard);
    tictactoeMsg.innerHTML = 'Game running...';
    currentPlayerIsAI() ? aiMakeMove() : checkEndGame();
};

const checkEndGame = () => {
    if (tictactoeGameOver) { return; }
    if (tictactoeBoard.getCurrentPlayer().isInCheckmate()) {
        tictactoeGameOver = true;
        tictactoeMsg.innerHTML = `${League.ToString(tictactoeBoard.getCurrentPlayer().getOpponent().getLeague())} has won!`;
    } else if (tictactoeBoard.getCurrentPlayer().isStalemate()) {
        tictactoeGameOver = true;
        tictactoeMsg.innerHTML = 'Game Drawn!';
    }
};

const restartGame = () => {
    tictactoeRestartBtn.addEventListener('click', () => {
        if (confirm('Confirmation to restart game')) {
            tictactoeGameOver = false;
            tictactoeBoard = Board.createStandardBoard();
            tdArr.forEach(tileGame => {
                tileGame.innerHTML = '';
                tileGame.className = 'tictactoe-td ';
            });
            tictactoeMsg.innerHTML = 'Game started...';
            OAI.checked = false;
            XAI.checked = false;
        }
    })
};

const currentPlayerIsAI = () => {
    const cross = League.isCross(tictactoeBoard.getCurrentPlayer().getLeague()) && XAI.checked;
    const nought = !League.isCross(tictactoeBoard.getCurrentPlayer().getLeague()) && OAI.checked;
    return cross || nought;
};

const checkBoxAddListener = () => {
    const listener = () => {
        if (currentPlayerIsAI()) {
            aiMakeMove()
        }
    };
    OAI.addEventListener('click', listener);
    XAI.addEventListener('click', listener);
};

tictactoeTDAddEventListener();
restartGame();
checkBoxAddListener();
