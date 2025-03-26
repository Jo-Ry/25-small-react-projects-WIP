import { useState } from 'react';
import { emojis } from './initialData';
import { menuPropsType } from './types';

/**
 * Menu component for managing the game state and settings in a Tic-Tac-Toe game.
 *
 * @param {Object} props - The props object.
 * @param {Function} props.setBoard - Function to update the game board state.
 * @param {Array} props.players - Array of player objects containing player details.
 * @param {Object} props.currentPlayer - The current player object.
 * @param {Function} props.setCurrentPlayer - Function to update the current player.
 * @param {boolean} props.isGameStarted - Boolean indicating if the game has started.
 * @param {Function} props.setIsGameStarted - Function to toggle the game start state.
 * @param {Function} props.setIsGameEnded - Function to toggle the game end state.
 *
 * @description
 * This component provides controls for starting, restarting, and configuring the game.
 * It includes the following functionalities:
 * - Start the game: Toggles the game state and resets the current player to the first player.
 * - Restart the game: Resets the game state, clears the board, and resets the current player.
 * - Open/Close settings: Toggles the settings menu visibility.
 * - Player selection: Allows selecting a player from the list of players.
 * - Emoji selection: Allows assigning an emoji to the current player, ensuring no duplicate emojis are assigned.
 *
 * @returns Tic tac toe menu component
 */
const Menu = ({
    setBoard,
    players,
    currentPlayer,
    setCurrentPlayer,
    isGameStarted,
    setIsGameStarted,
    setIsGameEnded,
}: menuPropsType ) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const startGame = () => {
        // Starts the game by toggling the game state and closing the settings menu.
        setIsGameStarted(!isGameStarted);
        setIsSettingsOpen(false);

        // default current player back to the first player in the players array.
        setCurrentPlayer(players[0]);
    };

    const resetGame = () => {
        setIsGameStarted(false);
        setIsGameEnded(false)

        // handle cleanup off all tiles on the board
        setBoard(prevBoard => prevBoard.map(tile => ({ ...tile, player: '', symbol: '' })));

        // default current player back to the first player in the players array.
        setCurrentPlayer(players[0]);
    };

    const openSettings = () => {
        setIsSettingsOpen(currentPlayer ? !isSettingsOpen : false);
    };

    return (
        <aside>
            <menu>
                <li onClick={() => startGame()} aria-disabled={isGameStarted}>
                    Start game
                </li>
                <li onClick={() => resetGame()} aria-disabled={!isGameStarted}>
                    Restart game
                </li>
                <li onClick={() => openSettings()} aria-disabled={isGameStarted}>
                    {isSettingsOpen ? 'Close settings' : 'Open settings'}
                </li>

                {isSettingsOpen && currentPlayer ? (
                    <div className="tic-tac-toe__settings">
                        <div className="tic-tac-toe__settings-radio">
                            <p>Choose player</p>
                            {players.map(player => (
                                <label key={player.id}>
                                    <input
                                        type="radio"
                                        id={String(player.id)}
                                        name={player.name}
                                        className="tic-tac-toe__settings-controls"
                                        onChange={() => setCurrentPlayer(player)}
                                        checked={currentPlayer.id === player.id}
                                    />
                                    <p>{player.name}</p>
                                </label>
                            ))}
                        </div>

                        <select
                            className="tic-tac-toe__settings-select"
                            onChange={e => {
                                const selectedEmoji = emojis.find(emoji => emoji.name === e.target.value);
                                if (selectedEmoji) {
                                    setCurrentPlayer(prevPlayer => ({
                                        symbol: selectedEmoji.symbol || '',
                                        name: selectedEmoji.name || '',
                                        id: prevPlayer?.id || 0,
                                    }));
                                }
                            }}
                            value={currentPlayer.name}
                        >
                            {emojis.map(emoji => (
                                <option
                                    key={emoji.id}
                                    value={emoji.name}
                                    className="tic-tac-toe__settings-option"
                                    aria-label={`Select emoji ${emoji.name} for player ${currentPlayer.name}`}
                                    disabled={players.some(player => player.name === emoji.name)}
                                >
                                    {emoji.symbol} {emoji.name}
                                </option>
                            ))}
                        </select>
                    </div>
                ) : null}
            </menu>
        </aside>
    );
};

export default Menu;
