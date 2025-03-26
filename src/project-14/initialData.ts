export const emojis = [
    { id: 1, symbol: '😀', name: 'Happy Hero' },
    { id: 2, symbol: '😂', name: 'Laughing Legend' },
    { id: 3, symbol: '😎', name: 'Cool Captain' },
    { id: 4, symbol: '🤔', name: 'Thinking Titan' },
    { id: 5, symbol: '😜', name: 'Winking Warrior' },
    { id: 6, symbol: '🥳', name: 'Party Pro' },
    { id: 7, symbol: '😱', name: 'Surprised Superstar' },
];

export const playersArray = [
    { id: 1, name: emojis[0].name, symbol: emojis[0].symbol },
    { id: 2, name: emojis[1].name, symbol: emojis[1].symbol },
];

export const emptyboard = Array(9).fill(null).map((_, index) => ({ id: index, player: '', symbol: '' }));
