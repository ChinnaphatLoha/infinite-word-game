export const difficulties = [
    { name: "easy", primaryColor: "#19C3B2", secondaryColor: "#135751" },
    { name: "medium", primaryColor: "#FFCB77", secondaryColor: "" },
    { name: "hard", primaryColor: "#FE6D73", secondaryColor: "" },
]

export const LEVELS_PER_MODE = 2;

export const MODE_COMPLETED_PRIZE = {
    HINTS: 5,
}

export const DIFFICULTY = difficulties.reduce((acc, difficulty) => {
    acc[difficulty.name.toUpperCase()] = difficulty.name;
    return acc;
}, {});