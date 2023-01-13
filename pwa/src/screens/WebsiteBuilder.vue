<template>
	<div class="bg-slate-100">
		<header
			class="border-b-0.5 font-poppins h-18 mb-8 flex justify-between border-neutral-300 bg-white"
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
						class="ring- flex w-full items-center justify-between rounded bg-slate-100 p-2 transition-colors hover:bg-blue-50 hover:text-blue-600"
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
				<button
					class="flex items-center gap-x-4 rounded bg-slate-100 px-5 py-2 transition-colors hover:bg-blue-50 hover:text-blue-600"
				>
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
		<main class="font-poppins flex bg-white">
			<aside class="border-r-0.5 -mt-8 w-14 border-neutral-300 bg-white p-3 flex flex-col justify-between">
				<div>
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
				</div>
				<button class="mt-5 rounded p-1 transition-colors hover:bg-red-50 hover:text-red-600 mb-2" @click="deleteShape" v-if="selectedShapeName != ''"><Trash2/></button>
			</aside>
			<div class="w-8 bg-slate-100"></div>
			<v-stage
				ref="stage"
				:config="configKonva"
				@mousedown="handleStageMouseDown"
				@touchstart="handleStageMouseDown"
			>
				<v-layer ref="layer">
					<v-text
						v-for="item in textList"
						:key="item.id"
						:config="item"
						@transformend="handleTransformEnd"
						@dragend="handleTransformEnd"
					></v-text>
					<v-transformer
						ref="transformer"
						:config="{
							rotationSnaps: [0, 90, 180, 270],
							rotationSnapTolerance: 5,
							anchorStroke: '#2563EB',
							borderStroke: '#2563EB',
							borderDash: [3, 3],
						}"
					/>
				</v-layer>
			</v-stage>
			<div class="w-8 bg-slate-100"></div>
			<aside class="border-l-0.5 -mt-8 w-3/12 border-neutral-300 bg-white p-4">
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
					@click="addTextElementToCanvas"
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
	</div>
</template>

<script lang="ts">
import { Ref, ref, watch, computed, onMounted } from 'vue'
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
	Trash2
} from 'lucide-vue-next'
import Konva from 'konva'
import Text from '../interfaces/interface.text'

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
		Trash2,
	},
	setup() {
		const isPageSelectorOpen: Ref<boolean> = ref(false)
		const selectedPage: Ref<string> = ref('Home')
		const textList: Ref<Text[]> = ref([])
		let textListNumber: Ref<number> = ref(0)

		const selectedShapeName: Ref<string> = ref('')

		const layer = ref()
		const stage = ref()
		const transformer = ref()

		const configKonva = ref({
			width: window.innerWidth * 0.75 - 56 - 2 * 32,
			height: window.innerHeight - 72 - 32,
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
		}

		window.addEventListener('resize', () => {
			configKonva.value.width = window.innerWidth * 0.75 - 48
			configKonva.value.height = window.innerHeight - 56
		})

		const toggleIsPageSelectorOpen = () => {
			isPageSelectorOpen.value = !isPageSelectorOpen.value
		}

		const addTextElementToCanvas = () => {
			textListNumber.value++
			const textName = 'Text-' + (textListNumber.value).toString()
			updateTransformer()
			textList.value.push({
				id: (textListNumber).toString(),
				x: configKonva.value.width / 2,
				y: configKonva.value.height / 2,
				text: 'Double click to change this text.',
				draggable: true,
				fontFamily: 'Arial',
				fontSize: 21,
				fontStyle: 'normal',
				textDecoration: '',
				align: 'left',
				fill: 'black',
				stroke: '',
				strokeWidth: 0,
				shadowColor: '',
				shadowBlur: 0,
				shadowOffsetX: 0,
				shadowOffsetY: 0,
				shadowOpacity: 0,
				opacity: 1,
				rotation: 0,
				scaleX: 1,
				scaleY: 1,
				name: textName,
			})
		}

		const updateTransformer = () => {
			const transformerNode = transformer.value?.getNode()
			if (selectedShapeName.value !== '') {
				const transformerStage = transformerNode.getStage()
				const selectedNode = transformerStage.findOne(
					(node: { name: () => string }) => {
						return node.name() === selectedShapeName.value
					},
				)
				if (selectedNode === transformerNode?.node()) {
					return
				}

				if (selectedNode) {
					transformerNode.nodes([selectedNode])
				} else {
					transformerNode.nodes([])
				}
			} else {
				transformerNode.nodes([])
			}
		}

		const handleStageMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
			// clicked on stage - clear selection
			if (e.target === e.target.getStage()) {
				selectedShapeName.value = ''
				updateTransformer()
				return
			}

			// clicked on transformer - do nothing
			const clickedOnTransformer = e.target.getParent().className === 'Transformer'
			if (clickedOnTransformer) {
				return
			}

			// find clicked text by its name
			const name = e.target.name()
			const text = textList.value.find((text) => {
				return text.name === name
			})

			if (text) {
				selectedShapeName.value = name
			} else {
				selectedShapeName.value = ''
			}
			updateTransformer()
		}

		const handleTransformEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
			const text = textList.value.find((r) => r.name === selectedShapeName.value)
			if (text) {
				text.x = e.target.x()
				text.y = e.target.y()
				text.rotation = e.target.rotation()
				text.scaleX = e.target.scaleX()
				text.scaleY = e.target.scaleY()
			}
		}

		const deleteShape = () => {
			const shape = selectedShapeName.value.split('-')[0]
			switch(shape) {
				case 'Text':
					textList.value = textList.value.filter((text) => {
						return text.name !== selectedShapeName.value
					})
					selectedShapeName.value = ''
					updateTransformer()
					break
				default:
					console.log('Shape not found')
			}
		}

		onMounted(() => {
			window.addEventListener('keydown', whickKeyIsBeingPressed)
		})
		
		const whickKeyIsBeingPressed = (e: KeyboardEvent) => {
			//console.log(e.key)
			if (e.key === 'Backspace' && selectedShapeName.value !== '') {
				deleteShape()
			}
		}

		return {
			configKonva,
			configCircle,
			setPage,
			isPageSelectorOpen,
			selectedPage,
			toggleIsPageSelectorOpen,
			addTextElementToCanvas,
			textList,
			handleTransformEnd,
			handleStageMouseDown,
			transformer,
			layer,
			stage,
			deleteShape,
			selectedShapeName,
		}
	},
}
</script>
