<template>
	<header
		class="border-b-0.5 font-poppins h-18 flex justify-between border-neutral-300"
	>
		<div
			class="border-r-0.5 h-18 flex w-14 items-center justify-center border-neutral-300 text-3xl font-bold"
		>
			<h1>M<span class="text-blue-600">.</span></h1>
		</div>
		<div class="flex items-center gap-x-4 p-4">
			<div class="relative w-[16rem]">
				<button
					@click="toggleIsPageSelectorOpen"
					class="ring- flex w-full items-center justify-between rounded bg-slate-100 p-2 hover:bg-blue-50 hover:text-blue-600 transition-colors"
				>
					<span>Page: {{ selectedPage }}</span>
					<span class="grid h-5 w-5 place-content-center text-2xl"
						><ChevronDown
					/></span>
				</button>

				<ul
					class="z-2 absolute mt-2 w-full rounded bg-white ring-1 ring-gray-300 drop-shadow-sm"
					v-if="isPageSelectorOpen"
				>
					<li
						class="cursor-pointer select-none p-2 hover:bg-blue-50"
						@click="setPage('Home')"
					>
						Home
					</li>
					<li
						class="cursor-pointer select-none p-2 hover:bg-blue-50"
						@click="setPage('Contact')"
					>
						Contact
					</li>
					<li
						class="flex cursor-pointer select-none items-center gap-x-2 p-2 hover:bg-blue-50"
						@click="setPage('Add page')"
					>
						<Plus />
						Add page
					</li>
				</ul>
			</div>
			<button class="flex items-center gap-x-4 rounded bg-slate-100 px-5 py-2 hover:bg-blue-50 hover:text-blue-600 transition-colors">
				<Eye />Preview
			</button>
		</div>
		<div class="border-l-0.5 borderneutral-300 flex w-3/12 justify-between p-4">
			<button
				class="flex items-center gap-x-4 rounded bg-blue-600 px-5 py-1 text-white transition-colors hover:bg-blue-700"
			>
				<Globe />Publish
			</button>
			<button
				class="flex items-center gap-x-4 bg-slate-100 px-5 py-1 transition-colors hover:bg-blue-50 hover:text-blue-600"
			>
				Melissa<User />
			</button>
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
				<button
					class="px-4 py-1 text-neutral-600 transition-colors hover:text-blue-600"
				>
					Blocks
				</button>
				<button
					class="px-4 py-1 text-neutral-600 transition-colors hover:text-blue-600"
				>
					Templates
				</button>
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
import { Ref, ref, watch } from 'vue'
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
	Globe,
	Eye,
	ChevronDown,
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
		Globe,
		Eye,
		ChevronDown,
	},
	setup() {
		const isPageSelectorOpen: Ref<boolean> = ref(false)
		const selectedPage: Ref<string> = ref('Home')

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

		const setPage = (page: string) => {
			isPageSelectorOpen.value = false
			selectedPage.value = page
			console.log(page)
		}

		window.addEventListener('resize', () => {
			configKonva.value.width = window.innerWidth * 0.75 - 48
			configKonva.value.height = window.innerHeight - 56
		})

		const toggleIsPageSelectorOpen = () => {
			isPageSelectorOpen.value = !isPageSelectorOpen.value
		}

		watch(isPageSelectorOpen, (value) => {
			console.log(isPageSelectorOpen.value)
		})

		return {
			configKonva,
			configCircle,
			setPage,
			isPageSelectorOpen,
			selectedPage,
			toggleIsPageSelectorOpen,
		}
	},
}
</script>
