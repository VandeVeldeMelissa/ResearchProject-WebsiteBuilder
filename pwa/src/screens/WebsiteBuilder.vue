<template>
	<header class="border-b-0.5 font-poppins h-16 border-neutral-300">
		<div
			class="border-r-0.5 flex h-16 w-14 items-center justify-center border-neutral-300 text-3xl font-bold"
		>
			<h1>M<span class="text-blue-600">.</span></h1>
		</div>
	</header>
	<main class="font-poppins flex bg-slate-100">
		<aside class="border-r-0.5 w-14 border-neutral-300 bg-white p-3">
			<button
				class="rounded p-1 transition-colors hover:bg-blue-50 hover:text-blue-600"
			>
				<MousePointer2 />
			</button>
			<button
				class="mt-5 rounded p-1 transition-colors hover:bg-blue-50 hover:text-blue-600"
			>
				<Type />
			</button>
			<button
				class="mt-5 rounded p-1 transition-colors hover:bg-blue-50 hover:text-blue-600"
			>
				<Image />
			</button>
			<button
				class="mt-5 rounded p-1 transition-colors hover:bg-blue-50 hover:text-blue-600"
			>
				<Spline />
			</button>
			<button
				class="mt-5 rounded p-1 transition-colors hover:bg-blue-50 hover:text-blue-600"
			>
				<Square />
			</button>
			<button
				class="mt-5 rounded p-1 transition-colors hover:bg-blue-50 hover:text-blue-600"
			>
				<Triangle />
			</button>
			<button
				class="mt-5 rounded p-1 transition-colors hover:bg-blue-50 hover:text-blue-600"
			>
				<Circle />
			</button>
			<button
				class="mt-5 rounded p-1 transition-colors hover:bg-blue-50 hover:text-blue-600"
			>
				<Hexagon />
			</button>
			<button
				class="mt-5 rounded p-1 transition-colors hover:bg-blue-50 hover:text-blue-600"
			>
				<ArrowBigRight />
			</button>
		</aside>
		<v-stage :config="configKonva">
			<v-layer>
				<v-circle :config="configCircle"></v-circle>
			</v-layer>
		</v-stage>
		<aside class="border-l-0.5 w-3/12 border-neutral-300 bg-white p-4">
			<!--3 pages: elements, blocks and templates -->
			<div class="mb-4 flex justify-between rounded bg-slate-100">
				<button class="rounded bg-blue-600 px-4 py-1 text-white">Elements</button>
				<button class="rounded px-4 py-1 hover:bg-blue-50 hover:text-blue-600 transition-colors">Blocks</button>
				<button class="rounded px-4 py-1 hover:bg-blue-50 hover:text-blue-600 transition-colors">Templates</button>
			</div>
			<button
				class="flex w-full justify-between rounded bg-slate-100 p-4 transition-colors hover:bg-blue-50 hover:text-blue-600"
			>
				<div class="flex gap-x-2"><Plus />Add text</div>
				<Type />
			</button>
			<button
				class="mt-4 flex w-full justify-between rounded bg-slate-100 p-4 transition-colors hover:bg-blue-50 hover:text-blue-600"
			>
				<div class="flex gap-x-2"><Plus />Add image</div>
				<Image />
			</button>
			<button
				class="mt-4 flex w-full justify-between rounded bg-slate-100 p-4 transition-colors hover:bg-blue-50 hover:text-blue-600"
			>
				<div class="flex gap-x-2"><Plus />Add line</div>
				<Spline />
			</button>
			<button
				class="mt-4 flex w-full justify-between rounded bg-slate-100 p-4 transition-colors hover:bg-blue-50 hover:text-blue-600"
			>
				<div class="flex gap-x-2"><Plus />Add shape</div>
				<Square />
			</button>
		</aside>
	</main>
</template>

<script lang="ts">
import { ref } from 'vue'
import {
	Plus,
	Type,
	Image,
	Square,
	Spline,
	MousePointer2,
	Triangle,
	Circle,
	Hexagon,
	ArrowBigRight,
} from 'lucide-vue-next'

export default {
	components: {
		Plus,
		Type,
		Image,
		Square,
		Spline,
		MousePointer2,
		Triangle,
		Circle,
		Hexagon,
		ArrowBigRight,
	},
	setup() {
		const configKonva = ref({
			width: window.innerWidth * 0.75 - 56,
			height: window.innerHeight - 64,
		})

		const configCircle = {
			x: 100,
			y: 100,
			radius: 70,
			fill: 'red',
			stroke: 'black',
			strokeWidth: 4,
			draggable: true,
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
