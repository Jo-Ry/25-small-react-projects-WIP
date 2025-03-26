import { useCallback, useEffect } from 'react';
import { boardPropsType, boardTileType } from './types';

/**
 * Represents the Tic-Tac-Toe game board component.
 *
 * @param {boolean} isGameStarted - Indicates whether the game has started.
 * @param {React.Dispatch<React.SetStateAction<boardTileType[]>>} setBoard - Function to update the board state.
 * @param {boardTileType[]} board - The current state of the game board.
 * @param {playerType | null} currentPlayer - The player whose turn it currently is.
 * @param {playerType[]} players - Array of players participating in the game.
 * @param {React.Dispatch<React.SetStateAction<playerType | null>>} setCurrentPlayer - Function to update the current player.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsGameEnded - Function to update the game-ended state.
 * @param {boolean} isGameEnded - Indicates whether the game has ended.
 *
 * @returns Tic-Tac-Toe board component.
 */
const Board = ({
    isGameStarted,
    setBoard,
    board,
    currentPlayer,
    players,
    setCurrentPlayer,
    setIsGameEnded,
    isGameEnded,
}: boardPropsType) => {
    
    const turn = (pressedTile: boardTileType) => {
        if (!currentPlayer) return;

        // Update the board with the current player's symbol and name
        setBoard(prevBoard =>
            prevBoard.map(tile =>
                tile.id === pressedTile.id
                    ? { ...tile, player: currentPlayer.name, symbol: currentPlayer.symbol }
                    : tile,
            ),
        );

        // Switch to the next player
        setCurrentPlayer(currentPlayer.id === 1 ? players[1] : players[0]);
    };

    /**
     * Checks the board for any winning conditions.
     *
     * The function iterates through a predefined set of winning conditions
     * and checks if any of them are met by the current state of the board.
     * If a winning condition is met, update the state to disable players from playing anymore.
     * If no winning condition is met, nothing happends.
     */
    const checkWinningConditions = useCallback(() => {
        if (!isGameStarted && !currentPlayer) return;

        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];

            if (
                board[a].symbol &&
                board[a].symbol === board[b].symbol &&
                board[a].symbol === board[c].symbol
            ) {
                setIsGameEnded(true);
            }
        }
    }, [isGameStarted, currentPlayer, board, setIsGameEnded]);

    const checkForDraw = useCallback(() => {
        const emptyTiles = board.filter(tile => tile.symbol === '');

        if (emptyTiles.length === 0) {
            return true;
        }

        return false;
    }, [board]);

    useEffect(() => {
        checkWinningConditions();
    }, [checkWinningConditions]);

    useEffect(() => {
        checkForDraw();
    }, [checkForDraw]);

    return (
        <div className={`tic-tac-toe__board${isGameStarted ? ' tic-tac-toe__board--started' : ''}`}>
            {currentPlayer && (
                <p
                    className={`tic-tac-toe__board-current-player-name${
                        isGameStarted ? '' : ' tic-tac-toe__board-current-player-name--hide'
                    }`}
                    aria-label={`${
                        isGameStarted
                            ? 'Current user is </div>' + currentPlayer.name
                            : 'Should display current user, but game has not started, hence no user is displayed'
                    } `}
                >
                    {checkForDraw() ? (
                        <span>It's a draw!</span>
                    ) : (
                        <>
                            {currentPlayer.name}
                            <span>{isGameEnded ? ' won' : 's turn'}</span>
                        </>
                    )}
                </p>
            )}
            <div className="tic-tac-toe__board-container">
                {board.map(tile => (
                    <button
                        key={tile.id}
                        aria-label={`Tile position ${tile.id}, ${
                            tile.player == '' ? 'empty, clickable' : tile.player + ' has taken this tile'
                        }`}
                        role="gridcell"
                        className={`tic-tac-toe__board-tile`}
                        onClick={() => turn(tile)}
                        disabled={tile.player !== '' || isGameEnded}
                    >
                        <p className={tile.player !== '' ? ' pop-in' : ''}>{tile.symbol}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Board;
