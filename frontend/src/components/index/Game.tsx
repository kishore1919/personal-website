import * as React from 'react';
import styled, { css } from 'styled-components';
import {
    Board,
    createStandardConnectFourBoard,
    createStandardTicTacToeBoard,
} from '../../game/board/Board';
import { checkmate, stalemate } from '../../game/endgame/EndgameChecker';
import { minimaxMakeMove } from '../../game/minimax/Minimax';
import { isFirstPlayer } from '../../game/piece/League';

type GameType = Board['type'] | undefined;
type GeneralMessage =
    | 'Game Started...'
    | 'Game Running...'
    | 'Game Drawn!'
    | 'AI Thinking...';
type TicTacToeMessage = 'O Has Won!' | 'X Has Won!' | GeneralMessage;
type ConnectFourMessage = 'Black Has Won!' | 'Red Has Won!' | GeneralMessage;

const GameOptions = ({
    setGameToConnectFour,
    setGameToTicTacToe,
}: Readonly<{
    setGameToConnectFour: () => void;
    setGameToTicTacToe: () => void;
}>) => (
    <div>
        <ConnectFourGameOptionContainer onClick={setGameToConnectFour}>
            <GameOption>Connect4</GameOption>
        </ConnectFourGameOptionContainer>
        <GameOptionContainer onClick={setGameToTicTacToe}>
            <GameOption>Tic Tac Toe</GameOption>
        </GameOptionContainer>
    </div>
);

type GameTileListener = Readonly<{
    updateBoard: (index: number) => void;
    board: Board;
}>;

type ConnectFourTileProps = Readonly<{
    isTransparent: boolean;
    isFirstPlayer: boolean;
}>;

const ConnectFour = ({ updateBoard, board }: GameTileListener) => (
    <tbody>
        {Array.from(
            {
                length: 6,
            },
            (_, tileNumber) => (
                <>
                    <tr key={`${tileNumber}${tileNumber}`}>
                        {Array.from({ length: 7 }, (_, i) => {
                            const index = tileNumber * 7 + i;
                            const tile = board.tileList[index];
                            if (!tile) {
                                throw new Error(`Tile: ${tile} is undefined`);
                            }
                            return (
                                <ConnectFourTile
                                    key={index}
                                    onClick={() => updateBoard(index)}
                                    isTransparent={!tile.isTileOccupied}
                                    isFirstPlayer={Boolean(
                                        tile.isTileOccupied &&
                                            tile.getPiece &&
                                            isFirstPlayer(tile.getPiece.league)
                                    )}
                                />
                            );
                        })}
                    </tr>
                    <tr key={`${tileNumber}${tileNumber}${tileNumber}`} />
                </>
            )
        )}
    </tbody>
);

const TicTacToe = ({ updateBoard, board }: GameTileListener) => (
    <tbody>
        {Array.from(
            {
                length: 3,
            },
            (_, tileNumber) => (
                <>
                    <tr key={tileNumber * tileNumber}>
                        {Array.from(
                            {
                                length: 3,
                            },
                            (_, i) => {
                                const index = tileNumber * 3 + i;
                                const tile = board.tileList[index];
                                if (!tile) {
                                    throw new Error(
                                        `Tile: ${tile} is undefined`
                                    );
                                }
                                return (
                                    <TicTacToeTile
                                        key={index}
                                        onClick={() => updateBoard(index)}
                                    >
                                        {tile.isTileOccupied && tile.getPiece
                                            ? isFirstPlayer(
                                                  tile.getPiece.league
                                              )
                                                ? 'X'
                                                : 'O'
                                            : ''}
                                    </TicTacToeTile>
                                );
                            }
                        )}
                    </tr>
                    <tr key={tileNumber * tileNumber * tileNumber} />
                </>
            )
        )}
    </tbody>
);

const GameSection = ({
    secondPlayerLabel,
    firstPlayerLabel,
    gameType,
    onBack,
    updateBoard,
    restartBoard,
    board,
    gameMessage,
    changeFirstPlayerAI,
    changeSecondPlayerAI,
    isFirstPlayerAI,
    isSecondPlayerAI,
}: Readonly<{
    secondPlayerLabel: 'Red' | 'O';
    firstPlayerLabel: 'Black' | 'X';
    gameType: GameType;
    onBack: () => void;
    restartBoard: () => void;
    gameMessage: TicTacToeMessage | ConnectFourMessage;
    changeFirstPlayerAI: () => void;
    changeSecondPlayerAI: () => void;
    isFirstPlayerAI: boolean;
    isSecondPlayerAI: boolean;
}> &
    GameTileListener) => (
    <div>
        <div>
            <Panel>
                <div>
                    <AiLabel>
                        {secondPlayerLabel} as AI:
                        <input
                            type="checkbox"
                            checked={isSecondPlayerAI}
                            onChange={changeSecondPlayerAI}
                        />
                    </AiLabel>
                </div>
                <div>
                    <BackButton onClick={onBack}>Back</BackButton>
                </div>
                <div>
                    <AiLabel>
                        {firstPlayerLabel} as AI:
                        <input
                            type="checkbox"
                            checked={isFirstPlayerAI}
                            onChange={changeFirstPlayerAI}
                        />
                    </AiLabel>
                </div>
            </Panel>
            <Panel>
                <GameTable gameType={gameType}>
                    {gameType === 'ConnectFour' ? (
                        <ConnectFour updateBoard={updateBoard} board={board} />
                    ) : (
                        <TicTacToe updateBoard={updateBoard} board={board} />
                    )}
                </GameTable>
            </Panel>
            <Panel>
                <div>
                    <RestartButton onClick={restartBoard}>
                        Restart
                    </RestartButton>
                </div>
                <div>
                    <MessagesToPlayerParagraph>
                        {gameMessage}
                    </MessagesToPlayerParagraph>
                </div>
            </Panel>
        </div>
    </div>
);

type BoardState = Readonly<{
    isFirstPlayerAI: boolean;
    isSecondPlayerAI: boolean;
    board: Board;
}>;

type TicTacToeState = BoardState &
    Readonly<{
        gameMessage: TicTacToeMessage;
        type: 'ticTacToe';
    }>;

type ConnectFourState = BoardState &
    Readonly<{
        gameMessage: ConnectFourMessage;
        type: 'connectFour';
    }>;

const Game = () => {
    const [state, setState] = React.useState({
        connectFour: {
            type: 'connectFour',
            isFirstPlayerAI: false,
            isSecondPlayerAI: false,
            board: createStandardConnectFourBoard(),
            gameMessage: 'Game Running...',
        } as ConnectFourState,
        ticTacToe: {
            type: 'ticTacToe',
            isFirstPlayerAI: false,
            isSecondPlayerAI: false,
            board: createStandardTicTacToeBoard(),
            gameMessage: 'Game Running...',
        } as TicTacToeState,
        gameType: undefined as GameType,
    });

    const { connectFour, gameType, ticTacToe } = state;

    const restartBoard = (gameState: ConnectFourState | TicTacToeState) => {
        if (window.confirm('confirmation to restart game')) {
            setState((prevState) => ({
                ...prevState,
                [gameState.type]: gameState,
            }));
        }
    };

    const restartTicTacToeBoard = () =>
        restartBoard({
            type: 'ticTacToe',
            isFirstPlayerAI: false,
            isSecondPlayerAI: false,
            board: createStandardTicTacToeBoard(),
            gameMessage: 'Game Running...',
        });

    const restartConnectFourBoard = () =>
        restartBoard({
            type: 'connectFour',
            isFirstPlayerAI: false,
            isSecondPlayerAI: false,
            board: createStandardConnectFourBoard(),
            gameMessage: 'Game Running...',
        });

    const updateBoard = ({
        tileNumber,
        gameState,
    }: Readonly<{
        tileNumber: number;
        gameState: TicTacToeState | ConnectFourState;
    }>) => {
        const { type, board } = gameState;
        if (checkmate(board) || stalemate(board)) {
            const tile = board.tileList[tileNumber];
            if (tile) {
                return;
            }
            throw new Error(`Tile: ${tile} is undefined`);
        }
        setState((prev) => {
            const game = prev[type];
            return {
                ...prev,
                [type]: {
                    ...game,
                    board: board.currentPlayer.makeMoveFromTileNumber(
                        tileNumber,
                        board
                    ),
                },
            };
        });
    };
    const updateTicTacToeBoard = (tileNumber: number) =>
        updateBoard({
            tileNumber,
            gameState: ticTacToe,
        });

    const updateConnectFourBoard = (tileNumber: number) =>
        updateBoard({
            tileNumber,
            gameState: connectFour,
        });

    const formConnectFourMessage = (): ConnectFourMessage => {
        const { board } = connectFour;
        if (checkmate(board)) {
            const word = isFirstPlayer(board.currentPlayer.opponentLeague)
                ? 'Black'
                : 'Red';
            return `${word} Has Won!`;
        } else if (stalemate(board)) {
            return 'Game Drawn!';
        }
        return 'Game Running...';
    };

    const formTicTacToeMessage = (): TicTacToeMessage => {
        const { board } = ticTacToe;
        if (checkmate(board)) {
            const word = isFirstPlayer(board.currentPlayer.opponentLeague)
                ? 'X'
                : 'O';
            return `${word} Has Won!`;
        } else if (stalemate(board)) {
            return 'Game Drawn!';
        }
        return 'Game Running...';
    };

    React.useEffect(() => {
        const { board, isFirstPlayerAI, isSecondPlayerAI } = connectFour;
        if (
            !(checkmate(board) || stalemate(board)) &&
            currentPlayerIsAI(board, isFirstPlayerAI, isSecondPlayerAI)
        ) {
            setState((prev) => ({
                ...prev,
                connectFour: {
                    ...prev.connectFour,
                    board: minimaxMakeMove(board),
                    gameMessage: 'AI Thinking...',
                },
            }));
        }
    }, [connectFour]);

    React.useEffect(() => {
        const { board, isFirstPlayerAI, isSecondPlayerAI } = ticTacToe;
        if (
            !(checkmate(board) || stalemate(board)) &&
            currentPlayerIsAI(board, isFirstPlayerAI, isSecondPlayerAI)
        ) {
            setState((prev) => ({
                ...prev,
                ticTacToe: {
                    ...prev.ticTacToe,
                    board: minimaxMakeMove(board),
                    gameMessage: 'AI Thinking...',
                },
            }));
        }
    }, [ticTacToe]);

    const setGameType = (gameType: GameType) =>
        setState((prev) => ({
            ...prev,
            gameType,
        }));

    const changePlayerAI = (
        type: ConnectFourState['type'] | TicTacToeState['type'],
        playerType: 'isFirstPlayerAI' | 'isSecondPlayerAI'
    ) =>
        setState((prev) => {
            const game = prev[type];
            const playerAI = game[playerType];
            return {
                ...prev,
                [type]: {
                    ...game,
                    [playerType]: !playerAI,
                },
            };
        });

    const currentPlayerIsAI = (
        board: Board,
        firstPlayerChecked: boolean,
        secondPlayerChecked: boolean
    ) =>
        (isFirstPlayer(board.currentPlayer.league) && firstPlayerChecked) ||
        (!isFirstPlayer(board.currentPlayer.league) && secondPlayerChecked);

    return (
        <GameContainer>
            <div>
                {gameType ? null : (
                    <GameOptions
                        setGameToConnectFour={() => setGameType('ConnectFour')}
                        setGameToTicTacToe={() => setGameType('TicTacToe')}
                    />
                )}
                {gameType === 'ConnectFour' ? (
                    <GameSection
                        key={gameType}
                        secondPlayerLabel="Red"
                        firstPlayerLabel="Black"
                        gameType={gameType}
                        onBack={() => setGameType(undefined)}
                        updateBoard={updateConnectFourBoard}
                        restartBoard={restartConnectFourBoard}
                        board={connectFour.board}
                        gameMessage={formConnectFourMessage()}
                        changeFirstPlayerAI={() =>
                            changePlayerAI('connectFour', 'isFirstPlayerAI')
                        }
                        changeSecondPlayerAI={() =>
                            changePlayerAI('connectFour', 'isSecondPlayerAI')
                        }
                        isFirstPlayerAI={connectFour.isFirstPlayerAI}
                        isSecondPlayerAI={connectFour.isSecondPlayerAI}
                    />
                ) : gameType === 'TicTacToe' ? (
                    <GameSection
                        key={gameType}
                        secondPlayerLabel="O"
                        firstPlayerLabel="X"
                        gameType={gameType}
                        onBack={() => setGameType(undefined)}
                        updateBoard={updateTicTacToeBoard}
                        restartBoard={restartTicTacToeBoard}
                        board={ticTacToe.board}
                        gameMessage={formTicTacToeMessage()}
                        changeFirstPlayerAI={() =>
                            changePlayerAI('ticTacToe', 'isFirstPlayerAI')
                        }
                        changeSecondPlayerAI={() =>
                            changePlayerAI('ticTacToe', 'isSecondPlayerAI')
                        }
                        isFirstPlayerAI={ticTacToe.isFirstPlayerAI}
                        isSecondPlayerAI={ticTacToe.isSecondPlayerAI}
                    />
                ) : null}
            </div>
        </GameContainer>
    );
};

const GameStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const GameContainer = styled.div`
    ${GameStyle};
`;

const GameOptionContainer = styled.div`
    padding: 35px;
    ${GameStyle};
`;

const ConnectFourGameOptionContainer = styled(GameOptionContainer)`
    border-bottom: 3px solid ${({ theme }) => theme.theme.secondaryColor};
`;

const GameOption = styled.span`
    color: ${({ theme }) => theme.theme.secondaryColor};
    font-size: 2.5em;
    &:hover {
        cursor: pointer;
        transition: 0.5s ease all;
        transform: scale(1.1);
    }
`;

const Panel = styled.div`
    margin: 25px 0 25px 0;
    ${GameStyle};
    justify-content: space-between;
`;

const BottomPanelStyled = css`
    background-color: transparent;
    color: ${({ theme }) => theme.theme.secondaryColor};
    font-size: 1.1em;
    @media (max-width: 506px) {
        font-size: 1em;
    }
    @media (max-width: 388px) {
        font-size: 0.85em;
    }
    @media (max-width: 304px) {
        font-size: 0.65em;
    }
`;

const ClickableStyle = css`
    ${BottomPanelStyled};
    border: none;
    cursor: pointer;
    outline: none;
    overflow: hidden;
    letter-spacing: 1.5px;
    font-family: 'Orbitron', sans-serif !important;
`;

const RestartButton = styled.button`
    ${ClickableStyle};
`;

const MessagesToPlayerParagraph = styled.p`
    ${BottomPanelStyled};
`;

const AiLabel = styled.label`
    ${BottomPanelStyled};
`;

const BackButton = styled.button`
    ${ClickableStyle};
`;

const GameTable = styled.table`
    border-spacing: ${({ gameType }: Readonly<{ gameType: GameType }>) =>
        gameType === 'ConnectFour' ? '10px' : '0px'};
`;

const ConnectFourTile = styled.td`
    border: 1px solid #808080;
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    cursor: ${({ isTransparent: transparent }: ConnectFourTileProps) =>
        transparent ? 'pointer' : 'default'};
    background: ${({
        isTransparent: transparent,
        isFirstPlayer,
    }: ConnectFourTileProps) =>
        transparent
            ? 'transparent'
            : ({ theme }) =>
                  isFirstPlayer ? theme.blackPiece : theme.redPiece};
    &:hover {
        background-color: ${({
            isTransparent: transparent,
            isFirstPlayer,
        }: ConnectFourTileProps) =>
            transparent
                ? ({ theme }) => theme.theme.hoverColor
                : ({ theme }) =>
                      isFirstPlayer ? theme.blackPiece : theme.redPiece};
    }
    @media (max-width: 506px) {
        width: 40px;
        height: 40px;
    }
    @media (max-width: 388px) {
        width: 30px;
        height: 30px;
    }
    @media (max-width: 341px) {
        width: 25px;
        height: 25px;
    }
    @media (max-width: 304px) {
        width: 20px;
        height: 20px;
    }
`;

const TicTacToeTile = styled.td`
    border: 1px solid ${({ theme }) => theme.theme.secondaryColor};
    padding: 8px;
    width: 100px;
    height: 100px;
    cursor: pointer;
    font-size: 5em;
    text-align: center;
    color: ${({ theme }) => theme.theme.secondaryColor};
    &:hover {
        background-color: ${({ theme }) => theme.theme.hoverColor};
    }
    @media (max-width: 377px) {
        width: 80px;
        height: 80px;
        font-size: 4em;
    }
    @media (max-width: 329px) {
        width: 60px;
        height: 60px;
        font-size: 3em;
    }
    @media (max-width: 255px) {
        width: 40px;
        height: 40px;
        font-size: 2em;
    }
`;

export default Game;
