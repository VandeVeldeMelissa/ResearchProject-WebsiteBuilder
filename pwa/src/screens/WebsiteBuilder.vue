<template>
	<header class="h-14 border-b-0.5 border-neutral-400 font-poppins">
		<h1 class="border-r-0.5 h-14 w-12 border-neutral-400">M.</h1>
	</header>
	<main class="flex w-screen font-poppins">
		<aside class="w-12 border-r-0.5 border-neutral-400">
			<h1>Side nav</h1>
		</aside>
		<v-stage :config="configKonva">
			<v-layer>
				<v-circle :config="configCircle"></v-circle>
			</v-layer>
		</v-stage>
		<aside class="w-3/12 border-l-0.5 border-neutral-400">
			<h1>Hehe</h1>
		</aside>
	</main>
</template>

<script lang="ts">
import { ref } from 'vue'
export default {
	setup() {
		const configKonva = ref({
			width: window.innerWidth * 0.75 - 48,
			height: window.innerHeight - 56,
		})

		const configCircle = {
			x: 100,
			y: 100,
			radius: 70,
			fill: 'red',
			stroke: 'black',
			strokeWidth: 4,
		}

		window.addEventListener('resize', () => {
			configKonva.value.width = window.innerWidth * 0.75 - 48
			configKonva.value.height = window.innerHeight - 56
		})

		return {
			configKonva,
			configCircle,
		}
	},
}
</script>
