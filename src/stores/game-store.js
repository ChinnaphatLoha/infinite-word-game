import { reactive, computed } from "vue";
import { toCharArray, shuffleArray, buildMap } from '@/utils/array-utils';
import { getJsonFromLocalStorage, setJsonToLocalStorage } from "@/utils/json-utils";

// configs: { MODE_COMPLETED_PRIZE: { HINTS: number }, WORDS_PER_ROUND: { [mode: string]: number } }
const useGameStore = (book, configs = {}) => {
    const _initMap = buildMap(
        book.map((group) => group.mode),
        book.map(() => [])
    );

    const state = reactive({
        completedWordsMap: getJsonFromLocalStorage("completedWordsMap") || _initMap,
        numberOfHints: getJsonFromLocalStorage("numberOfHints") || 100,
        volumeOn: true,
        VOCAB_BOOK: _buildVocabBook(book, getJsonFromLocalStorage("completedWordsMap") || _initMap, configs),
        onPage: getJsonFromLocalStorage("onPage") || { mode: '', index: 0 },
        letterBoxes: getJsonFromLocalStorage("letterBoxes") || [],
    });

    const actions = {
        resetInGameState: () => {
            state.onPage.mode = '';
            state.onPage.index = 0;
            state.letterBoxes.length = 0;
            localStorage.removeItem("onPage");
            localStorage.removeItem("letterBoxes");
        },
        turnToPage: ({ mode = state.onPage.mode, index = state.onPage.index + 1 }) => {
            console.log(mode, state.onPage.index);
            state.onPage.mode = mode;
            state.onPage.index = index;
            setJsonToLocalStorage("onPage", state.onPage);
        },
        stackLetter: (...letters) => {
            state.letterBoxes.push(...letters);
        },
        clearStack: () => {
            state.letterBoxes.length = 0;
        },
        validateLetter: () => {
            const currentVocab = _getCurrentVocab(state);
            const isCorrect = state.letterBoxes.join('') === currentVocab;
            return isCorrect;
        },
        saveCompletedWord: () => {
            console.log(state.completedWordsMap);
            const idsInMode = state.completedWordsMap.get(state.onPage.mode);
            state.completedWordsMap.set(state.onPage.mode,
                idsInMode.concat(_getCurrentVocabId(state))
            );
            setJsonToLocalStorage("completedWordsMap", state.completedWordsMap);
        },
        receiveHint: () => {
            state.numberOfHints += configs.MODE_COMPLETED_PRIZE.HINTS;
            setJsonToLocalStorage("numberOfHints", state.numberOfHints);
        },
        useHint: (clickedLetters) => {
            if (state.numberOfHints > 0) {
                state.numberOfHints--;
                setJsonToLocalStorage("numberOfHints", state.numberOfHints);
                const currentVocab = _getCurrentVocab(state);
                const hintIndex = Math.floor(Math.random() * currentVocab.length);
                const correctLetter = currentVocab[hintIndex];
                state.letterBoxes[hintIndex] = correctLetter;
                clickedLetters[hintIndex] = true;
            }
        },
    }

    const getters = {
        isLastPage: () => {
            return state.onPage.index + 1 === _getNumberOfPageByMode(state, state.onPage.mode);
        },
        isBookCompleted: () => {
            // all modes and all words in each mode are completed
            return state.VOCAB_BOOK.every(
                (group) => group.collection.every(
                    (word) => state.completedWordsMap.set(group.mode, word.id)
                )
            );
        },
        currentCharArray: computed(() => shuffleArray(
            toCharArray(
                _getCurrentVocab(state)
            )
        )),
    }

    return { ...state, ...actions, ...getters };
}

// 1. filter all completed words
// 2. shuffle the rest
// 3. take the first n words
// Note: the data structure of vocab book is the same as the input
// Note: completedWordsMap: { [mode: string]: number[] }
const _buildVocabBook = (book, completedWordsMap, configs) => {
    return book.map(
        (group) => {
            const completedWords = group.collection.filter(
                (word) => completedWordsMap[group.mode]?.includes(word.id)
            );
            const restWords = group.collection.filter(
                (word) => !completedWords.includes(word)
            );
            const shuffledRestWords = shuffleArray(restWords);
            const wordsPerRound = configs.WORDS_PER_ROUND[group.mode];
            return {
                mode: group.mode,
                collection: completedWords.concat(shuffledRestWords.slice(0, wordsPerRound))
            }
        }
    );
}

const _getCurrentVocab = (state) => {
    return state.VOCAB_BOOK.find(
        (group) => group.mode === state.onPage.mode
    )?.collection[state.onPage.index].word.toUpperCase();
}

const _getCurrentVocabId = (state) => {
    return state.VOCAB_BOOK.find(
        (group) => group.mode === state.onPage.mode
    )?.collection[state.onPage.index].id;
}

const _getNumberOfPageByMode = (state, mode) => {
    return state.VOCAB_BOOK.find(
        (group) => group.mode === mode
    )?.collection.length;
}

export default useGameStore;