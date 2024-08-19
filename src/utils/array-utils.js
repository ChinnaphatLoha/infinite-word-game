export const toCharArray = (str) => {
    return str ? str.split('') : [];
}

export const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

export const buildMap = (keys, values) => {
    const source = keys.reduce((acc, key, index) => {
        acc[key] = values[index];
        return acc;
    }, {});
    return new Map(Object.entries(source));
}