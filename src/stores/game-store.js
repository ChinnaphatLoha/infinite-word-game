import { reactive, computed } from "vue";
import { toCharArray, shuffleArray } from '@/utils/array-utils';

// configs: { LEVELS_PER_MODE, MODE_COMPLETED_PRIZE, DIFFICULTY }
const useGameStore = (book, configs = {}) => {
    const state = reactive({
        numberOfHints: localStorage.getItem("numberOfHints") || 0,
        volumeOn: true,
        VOCAB_BOOK: book,
        onPage: { mode: '', index: 0 },
        letterBoxes: [],
    });

    const actions = {
        resetInGameState: () => {
            state.onPage.mode = '';
            state.onPage.index = 0;
            state.letterBoxes.length = 0;
        },
        turnToPage: ({ mode = state.onPage.mode, index = state.onPage.index + 1 }) => {
            state.onPage.mode = mode;
            state.onPage.index = index;
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
    }

    const getters = {
        isLastPage: () => {
            return state.onPage.index + 1 === _getNumberOfPageByMode(state, state.onPage.mode);
        },
        currentCharArray: computed(() => shuffleArray(
            toCharArray(
                _getCurrentVocab(state)
            )
        )),
        isLevelCompleted: () => {
            return state.onPage.index >= configs.LEVELS_PER_MODE
                ? state.onPage.index % configs.LEVELS_PER_MODE === 0
                : false;
        },
    }

    return { ...state, ...actions, ...getters };
}

const _getCurrentVocab = (state) => {
    return state.VOCAB_BOOK.find(
        (group) => group.mode === state.onPage.mode
    )?.collection[state.onPage.index].toUpperCase();
}

const _getNumberOfPageByMode = (state, mode) => {
    return state.VOCAB_BOOK.find(
        (group) => group.mode === mode
    )?.collection.length;
}

export default useGameStore;