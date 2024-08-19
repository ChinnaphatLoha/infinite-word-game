<script setup>
import useRouter from './libs/router';
import useGameStore from './stores/game-store';

import { pages, PAGE, FIRST_PAGE_NAME } from './configs/page-config';
import {
	difficulties,
	MODE_COMPLETED_PRIZE,
	WORDS_PER_ROUND,
} from './configs/game-config';

const { navigate, playRoutes, on } = useRouter(pages, FIRST_PAGE_NAME);
</script>

<template>
	<div class="h-screen flex items-center justify-center bg-[#FEF9EF] p-4">
		<!-- Home View -->
		<div
			id="home-view"
			v-if="on(PAGE.HOME)"
			class="h-full flex flex-col items-center justify-center gap-[10%] w-full md:w-[70%]"
		>
			<h1
				class="text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[6vw] text-[#237C9D] title"
			>
				CLICK WORD
			</h1>
			<div class="mt-8">
				<button @click="navigate(PAGE.MODE)">
					<img
						src="./assets/play-button.png"
						alt="Play"
						class="w-[30vw] sm:w-[20vw] md:w-[15vw] lg:w-[10vw] mx-auto"
					/>
				</button>
			</div>
			<div class="flex justify-center gap-[10vw] mt-12">
				<div class="flex flex-col items-center space-y-4">
					<div>
						<img
							src="./assets/trophy.png"
							alt="Trophy"
							class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
						/>
					</div>
					<div
						class="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white bg-[#19C3B2] px-4 py-2 rounded-xl"
					>
						Success ({{}})
					</div>
				</div>
				<div class="flex flex-col items-center space-y-4">
					<div>
						<img
							src="./assets/light-bulb.png"
							alt="Light Bulb"
							class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
						/>
					</div>
					<div
						class="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white bg-[#FF9090] px-4 py-2 rounded-xl"
					>
						Hints ({{}})
					</div>
				</div>
			</div>
		</div>
		<!-- Mode View -->
		<div
			id="mode-view"
			v-if="on(PAGE.MODE)"
			class="h-full flex flex-col items-center justify-center gap-[10%] w-full md:w-[70%]"
		>
			<h1
				class="text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[6vw] text-[#237C9D] title"
			>
				MODE
			</h1>
			<div class="flex flex-col items-center gap-8 w-full">
				<button
					class="text-[#FEF9EF] w-[60vw] sm:w-[40vw] md:w-[30vw] lg:w-[20vw] h-[12vw] sm:h-[10vw] md:h-[8vw] lg:h-[6vw] px-4 py-2 rounded-xl text-lg sm:text-xl md:text-2xl lg:text-3xl"
					:style="{ backgroundColor: `${difficulty.primaryColor}` }"
					v-for="(difficulty, index) in difficulties"
					:key="index"
					@click="navigate(PAGE.GAME)"
				>
					{{
						difficulty.name.charAt(0).toUpperCase() + difficulty.name.slice(1)
					}}
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Irish+Grover&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Irish+Grover&family=Itim&display=swap');

* {
	font-family: 'Itim', sans-serif;
}

.title {
	font-family: 'Irish Grover', cursive;
}
</style>
