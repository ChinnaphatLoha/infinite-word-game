export const difficulties = [
    { name: "easy", wordsPerRound: 35, primaryColor: "#19C3B2", secondaryColor: "#135751" },
    { name: "medium", wordsPerRound: 35, primaryColor: "#FFCB77", secondaryColor: "" },
    { name: "hard", wordsPerRound: 35, primaryColor: "#FE6D73", secondaryColor: "" },
]

export const MODE_COMPLETED_PRIZE = {
    HINTS: 5,
}

export const DIFFICULTY = difficulties.reduce((acc, difficulty) => {
    acc[difficulty.name.toUpperCase()] = difficulty.name;
    return acc;
}, {});

// { 'mode': wordsPerRound }
export const WORDS_PER_ROUND = difficulties.reduce((acc, difficulty) => {
    acc[difficulty.name] = difficulty.wordsPerRound;
    return acc;
});
