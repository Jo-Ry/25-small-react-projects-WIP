export type playerType = {
    id: number;
    name: string;
    symbol: string;
};

export type boardTileType = {
    id: number;
    player: string;
    symbol: string;
};

type sharedComponentPropsType = {
    isGameStarted: boolean;
    currentPlayer: playerType | undefined;
    board: boardTileType[];
    players: playerType[];
    setBoard: React.Dispatch<React.SetStateAction<boardTileType[]>>;
    setCurrentPlayer: React.Dispatch<React.SetStateAction<playerType | undefined>>;
    setIsGameEnded: React.Dispatch<React.SetStateAction<boolean>>;
};

export type menuPropsType = sharedComponentPropsType & {
    setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
};

export type boardPropsType = sharedComponentPropsType & { isGameEnded: boolean };
