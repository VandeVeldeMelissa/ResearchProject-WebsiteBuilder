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
								class="transition-all ease-in"
								:class="isPageSelectorOpen ? 'rotate-0' : 'rotate-90'"
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
			<aside
				class="border-r-0.5 -mt-8 flex w-14 flex-col justify-between border-neutral-300 bg-white p-3"
			>
				<div>
					<button
						class="rounded p-1 transition-colors hover:bg-blue-50 hover:text-blue-600"
						title="Cursor"
					>
						<MousePointer2 />
					</button>
					<button
						class="mt-5 rounded p-1 transition-colors hover:bg-blue-50 hover:text-blue-600"
						title="Add text"
					>
						<Type />
					</button>
					<button
						class="mt-5 rounded p-1 transition-colors hover:bg-blue-50 hover:text-blue-600"
						title="Add image"
					>
						<Image />
					</button>
					<button
						class="mt-5 rounded p-1 transition-colors hover:bg-blue-50 hover:text-blue-600"
						title="Add line"
					>
						<Spline />
					</button>
					<button
						class="mt-5 rounded p-1 transition-colors hover:bg-blue-50 hover:text-blue-600"
						title="Add square"
					>
						<Square />
					</button>
					<button
						class="mt-5 rounded p-1 transition-colors hover:bg-blue-50 hover:text-blue-600"
						title="Add triangle"
					>
						<Triangle />
					</button>
					<button
						class="mt-5 rounded p-1 transition-colors hover:bg-blue-50 hover:text-blue-600"
						title="Add circle"
					>
						<Circle />
					</button>
					<button
						class="mt-5 rounded p-1 transition-colors hover:bg-blue-50 hover:text-blue-600"
						title="Add hexagon"
					>
						<Hexagon />
					</button>
					<button
						class="mt-5 rounded p-1 transition-colors hover:bg-blue-50 hover:text-blue-600"
						title="Add arrow"
					>
						<ArrowBigRight />
					</button>
				</div>
				<button
					class="relative mt-5 mb-2 rounded p-1 transition-colors hover:bg-red-50 hover:text-red-600"
					@click="deleteShape"
					v-if="selectedShapeName != ''"
					title="Delete shape"
				>
					<Trash2 />
				</button>
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
			<aside class="border-l-0.5 -mt-8 w-3/12 border-neutral-300 bg-white p-4 h-[calc(100vh-72px)] overflow-y-scroll">
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
				<div v-if="selectedShapeName == ''">
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
				</div>
				<div v-if="selectedShapeName.split('-')[0] == 'Text'">
					<h3 class="mb-1 text-base font-semibold">Font</h3>
					<div class="mb-2.5 grid grid-cols-3 gap-x-2.5 gap-y-2.5">
						<select class="col-span-3 w-full rounded bg-slate-100 px-2 py-1.5" @change="updateStylingText" v-model="userInput.fontFamily">
							<option value="Andalé Mono">Andalé Mono</option>
							<option value="Arial" selected>Arial</option>
							<option value="Baskerville">Baskerville</option>
							<option value="Calibri">Calibri</option>
							<option value="Comic Sans MS">Comic Sans MS</option>
							<option value="Courier">Courier</option>
							<option value="Georgia">Georgia</option>
							<option value="Gill Sans">Gill Sans</option>
							<option value="Helvetica">Helvetica</option>
							<option value="Impact">Impact</option>
							<option value="Lucida Console">Lucida Console</option>
							<option value="Monaco">Monaco</option>
							<option value="Palatino">Palatino</option>
							<option value="Tahoma">Tahoma</option>
							<option value="Trebuchet MS">Trebuchet MS</option>
							<option value="Times New Roman">Times New Roman</option>
							<option value="Verdana">Verdana</option>
						</select>
						<select class="col-span-2 rounded bg-slate-100 px-2 py-1.5">
							<option value="Light">Light</option>
							<option value="Regular" selected>Regular</option>
							<option value="Bold">Bold</option>
						</select>
						<input
							class="col-span-1 rounded bg-slate-100 px-2 py-1.5"
							type="number"
							min="0"
							max="1000"
							v-model="userInput.fontSize"
							@change="updateStylingText"
						/>
					</div>
					<button
						:class="
							isBold
								? 'bg-blue-600 text-white hover:bg-blue-700'
								: 'bg-slate-100 hover:bg-blue-50 hover:text-blue-600'
						"
						class="mr-1 rounded-l py-1.5 px-3 transition-colors"
						@click="isBold = !isBold"
					>
						<Bold stroke-width="3" />
					</button>
					<button
						:class="
							isItalic
								? 'bg-blue-600 text-white hover:bg-blue-700'
								: 'bg-slate-100 hover:bg-blue-50 hover:text-blue-600'
						"
						class="mr-1 py-1.5 px-3 transition-colors"
						@click="isItalic = !isItalic"
					>
						<Italic />
					</button>
					<button
						:class="
							isUnderline
								? 'bg-blue-600 text-white hover:bg-blue-700'
								: 'bg-slate-100 hover:bg-blue-50 hover:text-blue-600'
						"
						class="mr-1 rounded-r py-1.5 px-3 transition-colors"
						@click="isUnderline = !isUnderline"
					>
						<Underline />
					</button>
					<h3 class="mb-1 mt-5 text-base font-semibold">Align text</h3>
					<button
						:class="
							alignText == 'left'
								? 'bg-blue-600 text-white hover:bg-blue-700'
								: 'bg-slate-100 hover:bg-blue-50 hover:text-blue-600'
						"
						class="mr-1 rounded-l py-1.5 px-3 transition-colors"
						@click="alignText = 'left'"
					>
						<AlignLeft />
					</button>
					<button
						:class="
							alignText == 'center'
								? 'bg-blue-600 text-white hover:bg-blue-700'
								: 'bg-slate-100 hover:bg-blue-50 hover:text-blue-600'
						"
						class="mr-1 py-1.5 px-3 transition-colors"
						@click="alignText = 'center'"
					>
						<AlignCenter />
					</button>
					<button
						:class="
							alignText == 'right'
								? 'bg-blue-600 text-white hover:bg-blue-700'
								: 'bg-slate-100 hover:bg-blue-50 hover:text-blue-600'
						"
						class="mr-1 rounded-r py-1.5 px-3 transition-colors"
						@click="alignText = 'right'"
					>
						<AlignRight />
					</button>
					<h3 class="mb-1 mt-5 text-base font-semibold">Text color</h3>
					<div class="flex items-center gap-x-1">
						<input class="bg-white" type="color" v-model="userInput.textColor" @change="updateStylingText"/>
						<div>
							<input
								class="w-30 rounded-l bg-slate-100 px-2 py-1.5"
								type="text"
								v-model="userInput.textColor"
								@change="updateStylingText"
							/>
							<input
								class="border-l-1 col-span-1 rounded-r border-slate-300 bg-slate-100 px-2 py-1.5 pl-3"
								type="number"
								min="0"
								max="100"
								v-model="userInput.textColorOpacity"
								@change="updateStylingText"
							/>
						</div>
					</div>
					<div class="my-6 h-0.5 w-full bg-slate-300 opacity-50"></div>
					<button
						class="flex gap-x-1"
						@click="showBorderDetails = !showBorderDetails"
					>
						<ChevronDown
							:class="showBorderDetails ? 'rotate-0' : '-rotate-90'"
							class="transition-all ease-in"
						/>
						<h3 class="text-base font-semibold">Border</h3>
					</button>
					<div class="flex items-center gap-x-1 mt-3" v-if="showBorderDetails">
						<input
							class="mr-4 w-20 rounded bg-slate-100 px-2 py-1.5"
							type="number"
							min="0"
							max="1000"
							v-model="userInput.textBorder"
							@change="updateStylingText"
						/>
						<input
							class="bg-white"
							type="color"
							v-model="userInput.textBorderColor"
							@change="updateStylingText"
						/>
						<input
							class="w-30 rounded-l bg-slate-100 px-2 py-1.5"
							type="text"
							v-model="userInput.textBorderColor"
							@change="updateStylingText"
						/>
					</div>
					<div class="my-6 h-0.5 w-full bg-slate-300 opacity-50"></div>
					<button
						class="flex gap-x-1"
						@click="showShadowDetails = !showShadowDetails"
					>
						<ChevronDown
							:class="showShadowDetails ? 'rotate-0' : '-rotate-90'"
							class="transition-all ease-in"
						/>
						<h3 class="text-base font-semibold">Shadow</h3>
					</button>
					<div
						v-if="showShadowDetails"
						class="grid grid-cols-6 items-center gap-y-4 mt-3 mr-8"
					>
						<label for="x">X</label>
						<input
							class="col-span-2 mr-4 w-20 rounded bg-slate-100 px-2 py-1.5"
							type="number"
							min="0"
							max="1000"
							id="x"
							v-model="userInput.textShadowX"
							@change="updateStylingText"
						/>
						<label for="Blur">Blur</label>
						<input
							class="col-span-2 mr-4 w-20 rounded bg-slate-100 px-2 py-1.5"
							type="number"
							min="0"
							max="1000"
							id="Blur"
							v-model="userInput.textShadowBlur"
							@change="updateStylingText"
						/>
						<label for="y">Y</label>
						<input
							class="col-span-2 mr-4 w-20 rounded bg-slate-100 px-2 py-1.5"
							type="number"
							min="0"
							max="1000"
							id="y"
							v-model="userInput.textShadowY"
							@change="updateStylingText"
						/>
						<div class="flex items-center gap-x-1 col-span-6">
							<input class="bg-white" type="color" v-model="userInput.textShadowColor" @change="updateStylingText"/>
							<div>
								<input
									class="w-30 rounded-l bg-slate-100 px-2 py-1.5"
									type="text"
									v-model="userInput.textShadowColor"
									@change="updateStylingText"
								/>
								<input
									class="border-l-1 col-span-1 rounded-r border-slate-300 bg-slate-100 px-2 py-1.5 pl-3"
									type="number"
									min="0"
									max="100"
									v-model="userInput.textShadowColorOpacity"
									@change="updateStylingText"
								/>
							</div>
						</div>
					</div>
				</div>
			</aside>
		</main>
	</div>
</template>

<script lang="ts">
import { Ref, ref, watch, computed, onMounted, reactive } from 'vue'
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
	Trash2,
	Bold,
	Italic,
	Underline,
	AlignLeft,
	AlignCenter,
	AlignRight,
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
		Bold,
		Italic,
		Underline,
		AlignLeft,
		AlignCenter,
		AlignRight,
	},
	setup() {
		const isUserTyping: Ref<boolean> = ref(false)
		const isPageSelectorOpen: Ref<boolean> = ref(false)
		const isFontSelectorOpen: Ref<boolean> = ref(false)
		const selectedPage: Ref<string> = ref('Home')
		const textList: Ref<Text[]> = ref([])
		let textListNumber: Ref<number> = ref(0)
		const selectedShapeName: Ref<string> = ref('')
		const showBorderDetails: Ref<boolean> = ref(false)
		const showShadowDetails: Ref<boolean> = ref(false)

		//Text
		const isBold: Ref<boolean> = ref(false)
		const isItalic: Ref<boolean> = ref(false)
		const isUnderline: Ref<boolean> = ref(false)
		const alignText: Ref<string> = ref('left')

		const layer = ref()
		const stage = ref()
		const transformer = ref()

		const userInput = reactive({
			fontFamily: 'Arial',
			fontSize: 21,
			textColor: '#000000',
			textColorOpacity: 100,
			textBorder: 0,
			textBorderColor: '#000000',
			textShadowX: 0,
			textShadowY: 0,
			textShadowBlur: 0,
			textShadowSpread: 0,
			textShadowColor: '#000000',
			textShadowColorOpacity: 50,
		})

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
			const textName = 'Text-' + textListNumber.value.toString()
			updateTransformer()
			textList.value.push({
				id: textListNumber.toString(),
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
				shadowOpacity: 0.5,
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
			switch (shape) {
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
			window.addEventListener('mousedown', isCursorInsideInput)
		})

		const whickKeyIsBeingPressed = (e: KeyboardEvent) => {
			//console.log(e.key)
			if (
				e.key === 'Backspace' &&
				selectedShapeName.value !== '' &&
				!isUserTyping.value
			) {
				deleteShape()
			}
		}

		const isCursorInsideInput = (e: MouseEvent) => {
			const target = e.target as HTMLElement
			if (target.tagName === 'INPUT') {
				isUserTyping.value = true
				return true
			} else {
				isUserTyping.value = false
				return false
			}
		}

		//Update text styling
		watch([isBold, isItalic, isUnderline, alignText], ([isBold, isItalic, isUnderline, alignText]) => {
			const text = textList.value.find((text) => {
				return text.name === selectedShapeName.value
			})
			if (text) {
				if (isBold && isItalic) {
					text.fontStyle = 'bold italic'
				} else if (isBold) {
					text.fontStyle = 'bold'
				} else if (isItalic) {
					text.fontStyle = 'italic'
				} else {
					text.fontStyle = 'normal'
				}
				if (isUnderline) {
					text.textDecoration = 'underline'
				} else {
					text.textDecoration = ''
				}
				if (alignText === 'left') {
					text.align = 'left'
				} else if (alignText === 'center') {
					text.align = 'center'
				} else if (alignText === 'right') {
					text.align = 'right'
				}
			}
		})

		const updateStylingText = () => {
			const text = textList.value.find((text) => {
				return text.name === selectedShapeName.value
			})
			if (text) {
				text.fontFamily = userInput.fontFamily
				text.fontSize = userInput.fontSize
				text.fill = userInput.textColor
				text.opacity = userInput.textColorOpacity / 100
				text.stroke = userInput.textBorderColor
				text.strokeWidth = userInput.textBorder
				text.shadowOffsetX = userInput.textShadowX
				text.shadowOffsetY = userInput.textShadowY
				text.shadowBlur = userInput.textShadowBlur
				text.shadowColor = userInput.textShadowColor
				text.shadowOpacity = userInput.textShadowColorOpacity / 100
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
			isFontSelectorOpen,
			userInput,
			isBold,
			isItalic,
			isUnderline,
			alignText,
			showBorderDetails,
			showShadowDetails,
			updateStylingText
		}
	},
}
</script>
