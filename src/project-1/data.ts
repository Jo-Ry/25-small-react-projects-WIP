export type winnieThePoohStoriesType = {
    id: number;
    open: boolean | undefined;
    summary: string;
    content: string;
};

export const winnieThePoohStories: winnieThePoohStoriesType[] = [
    {
        id: 1,
        open: undefined,
        summary: 'Pooh and the Honey Tree',
        content:
            'Pooh climbs a tree to get honey but gets stuck. He then asks Christopher Robin for help, and they come up with a plan to get him down safely.',
    },
    {
        id: 2,
        open: undefined,
        summary: 'Tigger Bounces In',
        content:
            'Tigger arrives in the Hundred Acre Wood and makes new friends. His bouncy nature causes some trouble, but he eventually learns to control his bouncing and becomes a beloved member of the community.',
    },
    {
        id: 3,
        open: undefined,
        summary: 'Eeyore Loses a Tail',
        content:
            'Eeyore loses his tail and Pooh helps him find it. They search all over the Hundred Acre Wood, and with the help of their friends, they eventually find the tail and reattach it to Eeyore.',
    },
];
