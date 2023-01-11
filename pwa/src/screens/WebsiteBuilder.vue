<template>
	<header class="border-b-0.5 font-poppins h-18 border-neutral-300 flex justify-between">
		<div
			class="border-r-0.5 flex h-18 w-14 items-center justify-center border-neutral-300 text-3xl font-bold"
		>
			<h1>M<span class="text-blue-600">.</span></h1>
		</div>
		<div>Page & screen size</div>
		<div class="w-3/12 border-l-0.5 borderneutral-300 p-4 flex justify-between">
			<button class="px-5 py-1 rounded bg-blue-600 text-white flex items-center gap-x-4 hover:bg-blue-700 transition-colors"><Globe/>Publish site</button>
			<button class="flex gap-x-4 items-center bg-slate-100 px-5 py-1 hover:bg-blue-50 hover:text-blue-600 transition-colors">Melissa<User/></button>
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
			<div class="mb-4 flex justify-between rounded">
				<button class="border-b-2 border-blue-600 px-4 py-1">Elements</button>
				<button class="px-4 py-1 hover:text-blue-600 transition-colors">Blocks</button>
				<button class="px-4 py-1 hover:text-blue-600 transition-colors">Templates</button>
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
	User,
	Globe
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
		User,
		Globe
	},
	setup() {
		const configKonva = ref({
			width: window.innerWidth * 0.75 - 56,
			height: window.innerHeight - 72,
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
