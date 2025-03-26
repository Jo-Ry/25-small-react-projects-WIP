import { useEffect, useState } from 'react';
import ComponentWrapper from '../components/ComponentWrapper';
import Menu from './Menu';
import Board from './Board';
import { emptyboard, playersArray } from './initialData';
import { playerType } from './types';

/**
 * TicTacToe component represents the main game logic and UI for a Tic Tac Toe game.
 *  
 * @description
 * This component manages the state and logic for a Tic Tac Toe game. It initializes the game board,
 * players, and handles the current player state. It also updates the players array whenever the 
 * current player changes. The component renders a `ComponentWrapper` that includes a `Menu` and 
 * `Board` component, passing down shared properties to both.
 * 
 * @state {Array<{id: number, player: string, symbol: string}>} board - The state of the game board, 
 * represented as an array of objects with id, player, and symbol properties.
 * 
 * @state {Array<playerType>} players - The state of the players, represented as an array of playerType objects.
 * 
 * @state {playerType | undefined} currentPlayer - The state of the current player.
 * 
 * @state {boolean} isGameStarted - The state indicating whether the game has started or not.
 * 
 * @state {boolean} isGameEnded - The state indicating whether the game has ended or not.
 * 
 * @effect Updates the players array whenever the currentPlayer changes.
 * 
 * @returns the rendered Tic Tac Toe game component.
 */
const TicTacToe = () => {
    const [board, setBoard] = useState(emptyboard);
    const [players, setPlayers] = useState<playerType[]>(playersArray);
    const [currentPlayer, setCurrentPlayer] = useState<playerType | undefined>(undefined);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isGameEnded, setIsGameEnded] = useState(false);

    useEffect(() => {
        setPlayers(prevPlayers => {
            const updatedPlayers = prevPlayers.map(player =>
                player.id === currentPlayer?.id ? currentPlayer : player,
            );
    
            return updatedPlayers;
        });
    }, [currentPlayer, players.length]);

    const sharedProps = {
        setBoard,
        board,
        players,
        currentPlayer,
        setCurrentPlayer,
        isGameStarted,
        setIsGameStarted,
        setIsGameEnded,
    };

    return (
        <ComponentWrapper
            view="" // Intentionally left empty
            title="Tic tac toe"
            titleClassname="tic-tac-toe--title"
            className="viewport tic-tac-toe"
            style={{ backgroundColor: '#14bdac' }}
        >
            <Menu {...sharedProps} />
            <Board {...sharedProps} isGameEnded={isGameEnded} />
        </ComponentWrapper>
    );
};
export default TicTacToe;
