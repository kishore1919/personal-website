import React, { useState, useEffect, Dispatch, SetStateAction, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { BoardType, createStandardConnectFourBoard, createStandardTicTacToeBoard } from '../../game/board/Board';
import { checkmate, stalemate } from '../../game/endgame/EndgameChecker';
import { minimaxMakeMove } from '../../game/minimax/Minimax';
import { isFirstPlayer } from '../../game/piece/League';
import { primaryTheme } from '../../util/theme/colorTheme';

type GameType = 0 | 1 | null;
type ColorType = typeof primaryTheme.blackPiece | typeof primaryTheme.redPiece | 'transparent';
type GeneralMessage = 'Game Started...' | 'Game Running...' | 'Game Drawn!' | 'AI Thinking...';
type TicTacToeMessage = 'O Has Won!' | 'X Has Won!' | GeneralMessage;
type ConnectFourMessage = 'Black Has Won!' | 'Red Has Won!' | GeneralMessage;

interface GameOptionsProps {
    readonly setGameToConnectFour: () => void;
    readonly setGameToTicTacToe: () => void;
}

const GameOptions = ({ setGameToConnectFour, setGameToTicTacToe }: GameOptionsProps) => (
    <div>
        <ConnectFourGameOptionContainer onClick={setGameToConnectFour}>
            <GameOption>Connect4</GameOption>
        </ConnectFourGameOptionContainer>
        <GameOptionContainer onClick={setGameToTicTacToe}>
            <GameOption>Tic Tac Toe</GameOption>
        </GameOptionContainer>
    </div>
);

interface GameTileListener {
    readonly updateBoard: (index: number) => void;
    readonly board: BoardType;
}

interface TileNumber {
    readonly tileNumber: number;
}

interface ConnectFourTileProps {
    readonly color: ColorType;
}

const ConnectFour = ({ updateBoard, board }: GameTileListener): JSX.Element => {
    const CreateColumns = ({ tileNumber }: TileNumber): JSX.Element => {
        const columns = [];
        for (let i = 0; i < 7; i++) {
            const index = tileNumber * 7 + i;
            const tile = board.tileList[index];
            if (tile.isTileOccupied && tile.getPiece !== null) {
                const color = isFirstPlayer(tile.getPiece.league) ? primaryTheme.blackPiece : primaryTheme.redPiece;
                columns.push(<ConnectFourTile key={index} onClick={() => updateBoard(index)} color={color} />);
            } else {
                columns.push(<ConnectFourTile key={index} onClick={() => updateBoard(index)} color={'transparent'} />);
            }
        }
        return <tr key={tileNumber * tileNumber}>{columns}</tr>;
    };

    const CreateRows = (): JSX.Element => {
        const rows = [];
        for (let i = 0; i < 6; i++) {
            rows.push(<CreateColumns key={i} tileNumber={i}/>);
            rows.push(<tr key={`${i}${i}${i}`}/>);
        }
        return <tbody>{rows}</tbody>;
    };

    return (
        <CreateRows/>
    );
};

const TicTacToe = ({ updateBoard, board }: GameTileListener): JSX.Element => {
    const CreateColumns = ({ tileNumber }: TileNumber): JSX.Element => {
        const columns = [];
        for (let i = 0; i < 3; i++) {
            const index = tileNumber * 3 + i;
            const tile = board.tileList[index];
            if (tile.isTileOccupied && tile.getPiece !== null) {
                const word = isFirstPlayer(tile.getPiece.league) ? 'X' : 'O';
                columns.push(<TicTacToeTile key={index} onClick={() => updateBoard(index)}>{word}</TicTacToeTile>);
            } else {
                columns.push(<TicTacToeTile key={index} onClick={() => updateBoard(index)}/>);
            }
        }
        return <tr key={tileNumber * tileNumber}>{columns}</tr>;
    };

    const CreateRows = (): JSX.Element => {
        const rows = [];
        for (let i = 0; i < 3; i++) {
            rows.push(<CreateColumns key={i} tileNumber={i}/>);
            rows.push(<tr key={`${i}${i}${i}`}/>);
        }
        return <tbody>{rows}</tbody>;
    };

    return (
        <CreateRows/>
    );
}

interface GameTableProps {
    readonly gameType: GameType;
}

interface GameSectionProps extends GameTileListener {
    readonly secondPlayerLabel: 'Red' | 'O';
    readonly firstPlayerLabel: 'Black' | 'X';
    readonly gameType: GameType;
    readonly onBack: () => void;
    readonly restartBoard: () => void;
    readonly gameMessage: TicTacToeMessage | ConnectFourMessage;
    readonly changeFirstPlayerAI: () => void;
    readonly changeSecondPlayerAI: () => void;
    readonly firstPlayerAI: boolean;
    readonly secondPlayerAI: boolean;
}

const GameSection = ({ secondPlayerLabel,
                       firstPlayerLabel,
                       gameType,
                       onBack,
                       updateBoard,
                       restartBoard,
                       board,
                       gameMessage,
                       changeFirstPlayerAI,
                       changeSecondPlayerAI,
                       firstPlayerAI,
                       secondPlayerAI }: GameSectionProps): JSX.Element => {

    const ShowGameSection = () => gameType === 1 ? <ConnectFour updateBoard={updateBoard} board={board}/> : <TicTacToe updateBoard={updateBoard} board={board}/>;

    return (
        <div>
            <div>
                <Panel>
                    <div><AiLabel>{secondPlayerLabel} as AI:<input type='checkbox' checked={secondPlayerAI} onChange={changeSecondPlayerAI}/></AiLabel></div>
                    <div><BackButton onClick={onBack}>Back</BackButton></div>
                    <div><AiLabel>{firstPlayerLabel} as AI:<input type='checkbox' checked={firstPlayerAI} onChange={changeFirstPlayerAI}/></AiLabel></div>
                </Panel>
                <Panel>
                    <GameTable gameType={gameType}>
                        <ShowGameSection/>
                    </GameTable>
                </Panel>
                <Panel>
                    <div><RestartButton onClick={restartBoard}>Restart</RestartButton></div>
                    <div><MessagesToPlayerParagraph>{gameMessage}</MessagesToPlayerParagraph></div>
                </Panel>
            </div>
        </div>
    );
};

const Game = (): JSX.Element => {

    const [connectFourFirstPlayerAI, setConnectFourFirstPlayerAI] = useState(false);
    const [connectFourSecondPlayerAI, setConnectFourSecondPlayerAI] = useState(false);

    const [ticTacToeFirstPlayerAI, setTicTacToeFirstPlayerAI] = useState(false);
    const [ticTacToeSecondPlayerAI, setTicTacToeSecondPlayerAI] = useState(false);

    const [gameType, setGameType] = useState<GameType>(null);

    const [connectFourBoard, setConnectFourBoard] = useState(createStandardConnectFourBoard());
    const [ticTacToeBoard, setTicTacToeBoard] = useState(createStandardTicTacToeBoard());

    const updateBoard = (tileNumber: number, board: BoardType, dispatch: Dispatch<SetStateAction<BoardType>>) => {
        if (checkmate(board) || stalemate(board) || board.tileList[tileNumber].isTileOccupied) {
            return;
        }
        const newBoard = board.currentPlayer.makeMoveFromTileNumber(tileNumber, board);
        dispatch(newBoard);
    };


    const restartBoard = (board: BoardType, 
                          boardDispatch: Dispatch<SetStateAction<BoardType>>,
                          firstPlayer: Dispatch<SetStateAction<boolean>>,
                          secondPlayer: Dispatch<SetStateAction<boolean>>) => {
        if (window.confirm('confirmation to restart game')) {
            boardDispatch(board);
            firstPlayer(false);
            secondPlayer(false);
        }
    };

    const restartTicTacToeBoard = useCallback(() => restartBoard(createStandardTicTacToeBoard(), setTicTacToeBoard, setTicTacToeFirstPlayerAI, setTicTacToeSecondPlayerAI), []);
    const restartConnectFourBoard = useCallback(() => restartBoard(createStandardConnectFourBoard(), setConnectFourBoard, setConnectFourFirstPlayerAI, setConnectFourSecondPlayerAI), []);

    const updateTicTacToeBoard = useCallback((tileNumber: number) => updateBoard(tileNumber, ticTacToeBoard, setTicTacToeBoard), [ticTacToeBoard]);
    const updateConnectFourBoard = useCallback((tileNumber: number) => updateBoard(tileNumber, connectFourBoard, setConnectFourBoard), [connectFourBoard]);

    const formNewVirtualConnectFourBoard = useCallback((connectFourMessage: ConnectFourMessage): JSX.Element => {
        return <GameSection
            key={'ConnectFour'}
            secondPlayerLabel={'Red'}
            firstPlayerLabel={'Black'}
            gameType={1} 
            onBack={() => setGameType(null)}
            updateBoard={updateConnectFourBoard}
            restartBoard={restartConnectFourBoard}
            board={connectFourBoard}
            gameMessage={connectFourMessage}
            changeFirstPlayerAI={() => setConnectFourFirstPlayerAI(prev => !prev)}
            changeSecondPlayerAI={() => setConnectFourSecondPlayerAI(prev => !prev)}
            firstPlayerAI={connectFourFirstPlayerAI}
            secondPlayerAI={connectFourSecondPlayerAI}
        />;
    }, [connectFourBoard, connectFourFirstPlayerAI, connectFourSecondPlayerAI, restartConnectFourBoard, updateConnectFourBoard]);

    const formNewVirtualTicTacToeBoard = useCallback((ticTacToeMessage: TicTacToeMessage): JSX.Element => {
        return <GameSection
            key={'TicTacToe'}
            secondPlayerLabel={'O'}
            firstPlayerLabel={'X'}
            gameType={0}
            onBack={() => setGameType(null)}
            updateBoard={updateTicTacToeBoard}
            restartBoard={restartTicTacToeBoard}
            board={ticTacToeBoard}
            gameMessage={ticTacToeMessage}
            changeFirstPlayerAI={() => setTicTacToeFirstPlayerAI(prev => !prev)}
            changeSecondPlayerAI={() => setTicTacToeSecondPlayerAI(prev => !prev)}
            firstPlayerAI={ticTacToeFirstPlayerAI}
            secondPlayerAI={ticTacToeSecondPlayerAI}
        />;
    }, [restartTicTacToeBoard, ticTacToeBoard, ticTacToeFirstPlayerAI, ticTacToeSecondPlayerAI, updateTicTacToeBoard]);

    const [virtualConnectFourBoard, setVirtualConnectFourBoard] = useState(formNewVirtualConnectFourBoard('Game Running...'));
    const [virtualTicTacToeBoard, setVirtualTicTacToeBoard] = useState(formNewVirtualTicTacToeBoard('Game Running...'));

    const formConnectFourMessage = useCallback((): ConnectFourMessage => {
        if (checkmate(connectFourBoard)) {
            const word = isFirstPlayer(connectFourBoard.currentPlayer.opponentLeague) ? 'Black' : 'Red';
            return `${word} Has Won!`;
        } else if (stalemate(connectFourBoard)) {
            return 'Game Drawn!';
        } return 'Game Running...';
    }, [connectFourBoard]);

    const formTicTacToeMessage = useCallback((): TicTacToeMessage => {
        if (checkmate(ticTacToeBoard)) {
            const word = isFirstPlayer(ticTacToeBoard.currentPlayer.opponentLeague) ? 'X' : 'O';
            return `${word} Has Won!`;
        } else if (stalemate(ticTacToeBoard)) {
            return 'Game Drawn!';
        } return 'Game Running...';
    }, [ticTacToeBoard]);

    useEffect(() => {
        setVirtualConnectFourBoard(formNewVirtualConnectFourBoard(formConnectFourMessage()));
        if (checkmate(connectFourBoard) || stalemate(connectFourBoard)) {
            return;
        }
        if (currentPlayerIsAI(connectFourBoard, connectFourFirstPlayerAI, connectFourSecondPlayerAI)) {
            setVirtualConnectFourBoard(formNewVirtualConnectFourBoard('AI Thinking...'));
            setConnectFourBoard(minimaxMakeMove(connectFourBoard));
            setVirtualConnectFourBoard(formNewVirtualConnectFourBoard(formConnectFourMessage()));
        }
    }, [connectFourBoard, connectFourFirstPlayerAI, connectFourSecondPlayerAI, formConnectFourMessage, formNewVirtualConnectFourBoard]);

    useEffect(() => {
        setVirtualTicTacToeBoard(formNewVirtualTicTacToeBoard(formTicTacToeMessage()));
        if (checkmate(ticTacToeBoard) || stalemate(ticTacToeBoard)) {
            return;
        }
        if (currentPlayerIsAI(ticTacToeBoard, ticTacToeFirstPlayerAI, ticTacToeSecondPlayerAI)) {
            setVirtualTicTacToeBoard(formNewVirtualTicTacToeBoard('AI Thinking...'));
            setTicTacToeBoard(minimaxMakeMove(ticTacToeBoard));
            setVirtualTicTacToeBoard(formNewVirtualTicTacToeBoard(formTicTacToeMessage()));
        }
    }, [formNewVirtualTicTacToeBoard, formTicTacToeMessage, ticTacToeBoard, ticTacToeFirstPlayerAI, ticTacToeSecondPlayerAI]);

    const ShowGame = (): JSX.Element | null => {
        if (gameType === 1) {
            return virtualConnectFourBoard;
        } else if (gameType === 0) {
            return virtualTicTacToeBoard;
        } else if (gameType === null) {
            return null;
        }
        throw new Error('gameType is only 0, 1, or null');
    };

    const currentPlayerIsAI = (board: BoardType, firstPlayerChecked: boolean, secondPlayerChecked: boolean) => {
        const first = isFirstPlayer(board.currentPlayer.league) && firstPlayerChecked;
        const second = !isFirstPlayer(board.currentPlayer.league) && secondPlayerChecked;
        return first || second;
    };

    const ShowGameOption = () => {
        if (gameType === null) {
            return <GameOptions setGameToConnectFour={() => setGameType(1)} setGameToTicTacToe={() => setGameType(0)}/>;
        } return null;
    };

    return (
        <GameContainer>
            <div>
                <ShowGameOption/>
                <ShowGame/>
            </div>
        </GameContainer>
    );
}

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
    border-spacing: ${({ gameType }: GameTableProps) => gameType === 1 ? '10px'  : '0px'};
`;

const ConnectFourTile = styled.td`
    border: 1px solid #808080;
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    cursor: ${({ color }: ConnectFourTileProps) => color === 'transparent' ? 'cursor' : 'default'};
    background: ${({ color }: ConnectFourTileProps) => color};
    &:hover {
        background-color: ${({ color }: ConnectFourTileProps) => color === 'transparent' ? ({ theme }) => theme.theme.hoverColor : color};
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