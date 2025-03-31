export type dummyApiResponseType = typeof dummyApiResponse | undefined;
export type dummyApiResponseKeys = keyof typeof dummyApiResponse;

// I dont want a duplicate, hence all are false for now
const dummyApiResponse = {
    showlightAndDarkMode: false,
    showTicTacToe: false,
    showRandomColorGenerator: false,
    showAccordion: false,
    showTreeView: false,
} as const;

const featureFlagsDataServiceCall = () => {
    return new Promise((resolve, reject) => {
        if (dummyApiResponse) setTimeout(() => resolve(dummyApiResponse), 1000);
        else reject('Some error occured, please try again');
    });
};

export default featureFlagsDataServiceCall
