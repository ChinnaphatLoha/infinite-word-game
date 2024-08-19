<script setup>
import { ref, watch } from 'vue';
import useRouter from './libs/router';
import useGameStore from './stores/game-store';

import { pages, PAGE, FIRST_PAGE_NAME } from './configs/page-config';
import {
	difficulties,
	MODE_COMPLETED_PRIZE,
	WORDS_PER_ROUND,
} from './configs/game-config';
import { book } from './vocabulary.json';

const { navigate, playRoutes, on } = useRouter(pages, FIRST_PAGE_NAME);
const {
	onPage,
	letterBoxes,
	resetInGameState,
	turnToPage,
	stackLetter,
	clearStack,
	validateLetter,
	saveCompletedWord,
	receiveHint,
	useHint,
	isLastPage,
	isBookCompleted,
	currentCharArray,
} = useGameStore(book, { MODE_COMPLETED_PRIZE, WORDS_PER_ROUND });

const clickedLetters = ref({});

watch(
	() => clickedLetters,
	() => {
		const isAllClicked =
			Object.values(clickedLetters.value).length ===
				currentCharArray.value.length && currentCharArray.value.length > 0;

		if (isAllClicked) {
			if (validateLetter()) {
				saveCompletedWord();
				if (!isLastPage()) {
					turnToPage({ mode: onPage.mode, index: onPage.index + 1 });
					playRoutes({ pageNames: [PAGE.LEVEL_COMPLETED, PAGE.GAME] });
				} else {
					playRoutes({
						pageNames: [
							PAGE.LEVEL_COMPLETED,
							PAGE.MODE_COMPLETED,
							isBookCompleted() ? PAGE.GAME_COMPLETED : '',
							PAGE.MODE,
						],
					});
					receiveHint();
					resetInGameState();
					return;
				}
			}
			clearStack();
			clickedLetters.value = {};
		}
	},
	{ deep: true },
);
</script>

<template>
	<div>
		<!-- Home View -->
		<div
			id="home-view"
			v-if="on(PAGE.HOME)"
		>
			<h1 id="game-title">CLICK WORD</h1>
			<button @click="navigate(PAGE.MODE)">
				<img
					src="./assets/play-button.png"
					alt="play-button"
				/>
			</button>
			<div id="progression-badge">
				<div>
					<img
						src="./assets/trophy.png"
						alt="success-badge"
					/>
					<p>Success</p>
				</div>
				<div>
					<img
						src="./assets/lightbulb.png"
						alt="hints-badge"
					/>
					<p>Hints</p>
				</div>
			</div>
		</div>
		<!-- Mode View -->
		<div
			id="mode-view"
			v-if="on(PAGE.MODE)"
		>
			<h1>MODE</h1>
			<div id="mode-buttons-container">
				<button
					v-for="(difficulty, index) in difficulties"
					:key="index"
					@click="
						() => {
							turnToPage({ mode: difficulty.name, index: onPage.index });
							navigate(PAGE.GAME);
						}
					"
				>
					{{ difficulty.name }}
				</button>
			</div>
		</div>
		<!-- Game View -->
		<div
			id="game-view"
			v-if="on(PAGE.GAME)"
		>
			<div>Progress Bar Placeholder</div>
			<div id="letters-group-container">
				<button
					v-for="(letter, index) in currentCharArray"
					:key="index"
					@click="
						() => {
							clickedLetters[index] = true;
							stackLetter(letter);
						}
					"
					:disabled="clickedLetters[index]"
				>
					{{ letter }}
				</button>
			</div>
			<div id="letters-box-container">
				<div
					v-for="n in currentCharArray.length"
					:key="n"
					class="border-slate-700 border-2 w-8 h-8"
				>
					{{ letterBoxes[n - 1] }}
				</div>
			</div>
			<div id="cta-container">
				<button
					@click="
						() => {
							clearStack();
							clickedLetters = {};
						}
					"
				>
					Clear
				</button>
				<button @click="useHint(clickedLetters)">Hints</button>
			</div>
		</div>
		<!-- Level Completed View -->
		<div
			id="level-completed-view"
			v-if="on(PAGE.LEVEL_COMPLETED)"
		>
			Level Completed View
		</div>
		<!-- Mode Completed View -->
		<div
			id="mode-completed-view"
			v-if="on(PAGE.MODE_COMPLETED)"
		>
			Mode Completed View
		</div>
	</div>
</template>
