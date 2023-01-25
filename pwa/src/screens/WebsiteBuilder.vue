<template>
	<div class="bg-slate-100 relative overflow-hidden">
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
					@click="previewPageWebsite"
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
						:class="selectedPointer == true ? 'bg-blue-50 text-blue-600' : ''"
					>
						<MousePointer2 />
					</button>
					<button
						class="mt-5 rounded p-1 transition-colors hover:bg-blue-50 hover:text-blue-600"
						title="Add text"
						:class="selectedAddTextPointer == true ? 'bg-blue-50 text-blue-600' : ''"
						@click="addTextElementWithPointer"
					>
						<Type />
					</button>
					<button
						class="mt-5 rounded p-1 transition-colors hover:bg-blue-50 hover:text-blue-600"
						title="Add image"
						:class="selectedAddImagePointer == true ? 'bg-blue-50 text-blue-600' : ''"
						@click="selectImage"
					>
						<Image />
					</button>
					<button
						class="mt-5 rounded p-1 transition-colors hover:bg-blue-50 hover:text-blue-600"
						title="Add line"
						:class="selectedAddLinePointer == true ? 'bg-blue-50 text-blue-600' : ''"
						@click="addLineElementWithPointer"
					>
						<Spline />
					</button>
					<button
						class="mt-5 rounded p-1 transition-colors hover:bg-blue-50 hover:text-blue-600"
						title="Add rectangle"
						:class="selectedAddRectanglePointer == true ? 'bg-blue-50 text-blue-600' : ''"
						@click="addRectangleElementWithPointer"
					>
						<Square />
					</button>
					<button
						class="mt-5 rounded p-1 transition-colors hover:bg-blue-50 hover:text-blue-600"
						title="Add circle"
						:class="selectedAddCirclePointer == true ? 'bg-blue-50 text-blue-600' : ''"
						@click="addCircleElementWithPointer"
					>
						<Circle />
					</button>
					<button
						class="mt-5 rounded p-1 transition-colors hover:bg-blue-50 hover:text-blue-600"
						title="Add hexagon"
						:class="selectedAddPolygonPointer == true ? 'bg-blue-50 text-blue-600' : ''"
						@click="addPolygonElementWithPointer"
					>
						<Hexagon />
					</button>
					<button
						class="mt-5 rounded p-1 transition-colors hover:bg-blue-50 hover:text-blue-600"
						title="Add arrow"
						:class="selectedAddArrowPointer == true ? 'bg-blue-50 text-blue-600' : ''"
						@click="addArrowElementWithPointer"
					>
						<ArrowBigRight />
					</button>
					<button
						class="mt-5 rounded p-1 transition-colors hover:bg-blue-50 hover:text-blue-600"
						title="Add star"
						:class="selectedAddStarPointer == true ? 'bg-blue-50 text-blue-600' : ''"
						@click="addStarElementWithPointer"
					>
						<Star />
					</button>
				</div>
				
				<div v-if="selectedShapeName != ''">
					<button class="mb-5 rounded p-1 transition-colors hover:bg-blue-50 hover:text-blue-600" title="Move up" @click="moveUp">
						<div class="relative">
							<Layers class="text-neutral-400 mt-2"/>
							<ArrowUp class="absolute bottom-3"/>
						</div>
					</button>
					<button class="mb-5 rounded p-1 transition-colors hover:bg-blue-50 hover:text-blue-600" title="Move down" @click="moveDown">
						<div class="relative">
							<Layers class="text-neutral-400 mt-2"/>
							<ArrowDown class="absolute bottom-3"/>
						</div>
					</button>
					<button
						class="mb-2 rounded p-1 transition-colors hover:bg-red-50 hover:text-red-600"
						@click="deleteShape"
						title="Delete shape"
					>
						<Trash2 />
					</button>
				</div>
			</aside>
			<div class="w-8 bg-slate-100"></div>
			<div class="h-[calc(100vh-72px-32px)] w-[calc(75vw-56px-64px)] overflow-y-scroll" ref="scrollContainer" :class="selectedAddTextPointer || selectedAddLinePointer || selectedAddRectanglePointer || selectedAddCirclePointer || selectedAddPolygonPointer || selectedAddArrowPointer || selectedAddStarPointer ? 'cursor-cell' : ''">
				<v-stage
					ref="stage"
					:config="configKonva"
					@mousedown="handleStageMouseDown"
					@touchstart="handleStageMouseDown"
				>
					<v-layer ref="layer" @dragmove="showGuidelines" @dragend="handleDragEndLayer">
						<v-regular-polygon
							v-for="item in polygonList"
							:key="item.id"
							:config="item"
							@transformend="handleTransformEnd"
							@dragend="handleTransformEnd"
						></v-regular-polygon>
						<v-circle
							v-for="item in circleList"
							:key="item.id"
							:config="item"
							@transformend="handleTransformEnd"
							@dragend="handleTransformEnd"
						></v-circle>
						<v-rect
							v-for="item in rectangleList"
							:key="item.id"
							:config="item"
							@transformend="handleTransformEnd"
							@dragend="handleTransformEnd"
						></v-rect>
						<v-image
							v-for="item in imageList"
							:key="item.id"
							:config="item"
							@transformend="handleTransformEnd"
							@dragend="handleTransformEnd"
						></v-image>
						<v-star
							v-for="item in starList"
							:key="item.id"
							:config="item"
							@transformend="handleTransformEnd"
							@dragend="handleTransformEnd"
						></v-star>
						<v-arrow
							v-for="item in arrowList"
							:key="item.id"
							:config="item"
							@transformend="handleTransformEnd"
							@dragend="handleTransformEnd"
						></v-arrow>
						<v-line
							v-for="item in lineList"
							:key="item.id"
							:config="item"
							@transformend="handleTransformEnd"
							@dragend="handleTransformEnd"
						/>
						<v-text
							v-for="item in textList"
							:key="item.id"
							:config="item"
							@transformend="handleTransformEnd"
							@dragend="handleTransformEnd"
							@dblclick="showTextEditor = true"
						></v-text>
						<v-transformer
							ref="starTransformer"
							:config="{
								rotationSnaps: [0, 90, 180, 270],
								rotationSnapTolerance: 5,
								anchorStroke: '#2563EB',
								borderStroke: '#2563EB',
								enabledAnchors: [],
								borderDash: [3, 3],
							}"
						/>
						<v-transformer
							ref="rectangleTransformer"
							:config="{
								rotationSnaps: [0, 90, 180, 270],
								rotationSnapTolerance: 5,
								anchorStroke: '#2563EB',
								borderStroke: '#2563EB',
							}"
							@transform="handleTransformRectangle"
						></v-transformer>
						<v-transformer
							ref="circleTransformer"
							:config="{
								rotationSnaps: [0, 90, 180, 270],
								rotationSnapTolerance: 5,
								anchorStroke: '#2563EB',
								borderStroke: '#2563EB',
								enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
								rotateEnabled: false,
							}"
							@transform="handleTransformCircle"
						></v-transformer>
						<v-transformer
							ref="polygonTransformer"
							:config="{
								rotationSnaps: [0, 90, 180, 270],
								rotationSnapTolerance: 5,
								anchorStroke: '#2563EB',
								borderStroke: '#2563EB',
								enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
							}"
							@transform="handleTransformPolygon"
						></v-transformer>
						<v-transformer
							ref="lineTransformer"
							:config="{
								rotationSnaps: [0, 90, 180, 270],
								rotationSnapTolerance: 5,
								anchorStroke: '#2563EB',
								borderStroke: '#2563EB',
								enabledAnchors: ['middle-left', 'middle-right'],
							}"
							@transform="handleTransformLine"
							/>
						<v-transformer
							ref="imageTransformer"
							:config="{
								rotationSnaps: [0, 90, 180, 270],
								rotationSnapTolerance: 5,
								anchorStroke: '#2563EB',
								borderStroke: '#2563EB',
							}"
							@transform="handleTransformImage"
						/>
						<v-transformer
							ref="textTransformer"
							:config="{
								rotationSnaps: [0, 90, 180, 270],
								rotationSnapTolerance: 5,
								anchorStroke: '#2563EB',
								borderStroke: '#2563EB',
								borderDash: [3, 3],
								enabledAnchors: [],
								rotateAnchorOffset: 30
							}"
						/>
						<v-transformer
							ref="arrowTransformer"
							:config="{
								rotationSnaps: [0, 90, 180, 270],
								rotationSnapTolerance: 5,
								anchorStroke: '#2563EB',
								borderStroke: '#2563EB',
								enabledAnchors: ['middle-left', 'middle-right'],
							}"
							@transform="handleTransformArrow"
						/>
					</v-layer>
				</v-stage>
			</div>
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
				<div v-if="selectedShapeName == '' && showShapesButton == false">
					<button
						class="flex w-full justify-between rounded bg-slate-100 p-4 transition-colors hover:bg-blue-50 hover:text-blue-600"
						@click="addTextElementToCanvas"
					>
						<div class="flex gap-x-2"><Plus />Add text</div>
						<Type />
					</button>
					<div>
						<button
							class="mt-4 flex w-full justify-between rounded bg-slate-100 p-4 transition-colors hover:bg-blue-50 hover:text-blue-600"
							@click="selectImage"
						>
							<div class="flex gap-x-2"><Plus />Add image</div>
							<Image />
						</button>
						<input type="file" ref="fileInput" @change="uploadImage" class="hidden"/>
					</div>
					<button
						class="mt-4 flex w-full justify-between rounded bg-slate-100 p-4 transition-colors hover:bg-blue-50 hover:text-blue-600"
						@click="addLineElementToCanvas"
					>
						<div class="flex gap-x-2"><Plus />Add line</div>
						<Spline />
					</button>
					<button
						class="mt-4 flex w-full justify-between rounded bg-slate-100 p-4 transition-colors hover:bg-blue-50 hover:text-blue-600"
						@click="showShapesButton = true"
					>
						<div class="flex gap-x-2"><Plus />Add shape</div>
						<Square />
					</button>
				</div>
				<div v-if="selectedShapeName.split('-')[0] == 'Text'">
					<h3 class="mb-1 text-base font-semibold">Font</h3>
					<div class="mb-2.5 grid grid-cols-3 gap-x-2.5 gap-y-2.5">
						<select class="col-span-3 w-full rounded bg-slate-100 px-2 py-1.5" @change="updateStylingText" v-model="userInputText.fontFamily">
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
							v-model="userInputText.fontSize"
							@change="updateStylingText"
						/>
					</div>
					<button
						:class="
							userInputText.isFontBold
								? 'bg-blue-600 text-white hover:bg-blue-700'
								: 'bg-slate-100 hover:bg-blue-50 hover:text-blue-600'
						"
						class="mr-1 rounded-l py-1.5 px-3 transition-colors"
						@click="{userInputText.isFontBold = !userInputText.isFontBold; updateStylingText()}"

					>
						<Bold stroke-width="3" />
					</button>
					<button
						:class="
							userInputText.isFontItalic
								? 'bg-blue-600 text-white hover:bg-blue-700'
								: 'bg-slate-100 hover:bg-blue-50 hover:text-blue-600'
						"
						class="mr-1 py-1.5 px-3 transition-colors"
						@click="{userInputText.isFontItalic = !userInputText.isFontItalic; updateStylingText()}"
					>
						<Italic />
					</button>
					<button
						:class="
							userInputText.isFontUnderlined
								? 'bg-blue-600 text-white hover:bg-blue-700'
								: 'bg-slate-100 hover:bg-blue-50 hover:text-blue-600'
						"
						class="mr-1 rounded-r py-1.5 px-3 transition-colors"
						@click="{userInputText.isFontUnderlined = !userInputText.isFontUnderlined; updateStylingText()}"
					>
						<Underline />
					</button>
					<h3 class="mb-1 mt-5 text-base font-semibold">Line height</h3>
					<div class="flex items-center gap-x-1">
						<MoveVertical/>
						<input
								class="col-span-1 rounded bg-slate-100 px-2 py-1.5"
								type="number"
								min="0"
								max="1000"
								step="0.1"
								v-model="userInputText.lineHeight"
								@change="updateStylingText"
						/>
					</div>
					<h3 class="mb-1 mt-5 text-base font-semibold">Align text</h3>
					<button
						:class="
							userInputText.textAlign == 'left'
								? 'bg-blue-600 text-white hover:bg-blue-700'
								: 'bg-slate-100 hover:bg-blue-50 hover:text-blue-600'
						"
						class="mr-1 rounded-l py-1.5 px-3 transition-colors"
						@click="{userInputText.textAlign = 'left'; updateStylingText()}"
					>
						<AlignLeft />
					</button>
					<button
						:class="
							userInputText.textAlign == 'center'
								? 'bg-blue-600 text-white hover:bg-blue-700'
								: 'bg-slate-100 hover:bg-blue-50 hover:text-blue-600'
						"
						class="mr-1 py-1.5 px-3 transition-colors"
						@click="{userInputText.textAlign = 'center'; updateStylingText()}"
					>
						<AlignCenter />
					</button>
					<button
						:class="
							userInputText.textAlign == 'right'
								? 'bg-blue-600 text-white hover:bg-blue-700'
								: 'bg-slate-100 hover:bg-blue-50 hover:text-blue-600'
						"
						class="mr-1 rounded-r py-1.5 px-3 transition-colors"
						@click="{userInputText.textAlign = 'right'; updateStylingText()}"
					>
						<AlignRight />
					</button>
					<h3 class="mb-1 mt-5 text-base font-semibold">Text color</h3>
					<div class="flex items-center gap-x-1">
						<input class="bg-white" type="color" v-model="userInputText.textColor" @change="updateStylingText" @input="updateStylingText"/>
						<div>
							<input
								class="w-30 rounded-l bg-slate-100 px-2 py-1.5"
								type="text"
								v-model="userInputText.textColor"
								@change="updateStylingText"
								@input="updateStylingText"
							/>
							<input
								class="border-l-1 col-span-1 rounded-r border-slate-300 bg-slate-100 px-2 py-1.5 pl-3"
								type="number"
								min="0"
								max="100"
								v-model="userInputText.textColorOpacity"
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
							v-model="userInputText.textBorder"
							@change="updateStylingText"
						/>
						<input
							class="bg-white"
							type="color"
							v-model="userInputText.textBorderColor"
							@change="updateStylingText"
							@input="updateStylingText"
						/>
						<input
							class="w-30 rounded-l bg-slate-100 px-2 py-1.5"
							type="text"
							v-model="userInputText.textBorderColor"
							@change="updateStylingText"
							@input="updateStylingText"
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
							min="-1000"
							max="1000"
							id="x"
							v-model="userInputText.textShadowX"
							@change="updateStylingText"
						/>
						<label for="Blur">Blur</label>
						<input
							class="col-span-2 mr-4 w-20 rounded bg-slate-100 px-2 py-1.5"
							type="number"
							min="0"
							max="50"
							id="Blur"
							v-model="userInputText.textShadowBlur"
							@change="updateStylingText"
						/>
						<label for="y">Y</label>
						<input
							class="col-span-2 mr-4 w-20 rounded bg-slate-100 px-2 py-1.5"
							type="number"
							min="-1000"
							max="1000"
							id="y"
							v-model="userInputText.textShadowY"
							@change="updateStylingText"
						/>
						<div class="flex items-center gap-x-1 col-span-6">
							<input class="bg-white" type="color" v-model="userInputText.textShadowColor" @change="updateStylingText" @input="updateStylingText"/>
							<div>
								<input
									class="w-30 rounded-l bg-slate-100 px-2 py-1.5"
									type="text"
									v-model="userInputText.textShadowColor"
									@change="updateStylingText"
									@input="updateStylingText"
								/>
								<input
									class="border-l-1 col-span-1 rounded-r border-slate-300 bg-slate-100 px-2 py-1.5 pl-3"
									type="number"
									min="0"
									max="100"
									v-model="userInputText.textShadowColorOpacity"
									@change="updateStylingText"
								/>
							</div>
						</div>
					</div>
				</div>
				<div v-if="selectedShapeName.split('-')[0] == 'Image'">
					<h3 class="mb-1 text-base font-semibold flex-wrap">Size</h3>
					<div class="grid grid-cols-6 items-center gap-y-4 mr-8">
							<label for="imageHeight">Height</label>
							<input
								class="w-20 rounded bg-slate-100 px-2 py-1.5 col-span-2"
								type="number"
								min="0"
								max="10000"
								id="imageHeight"
								v-model="userInputImage.imageHeight"
								@change="updateStylingImage()"
							/>
							<label for="imageWidth">Width</label>
							<input
								class="w-20 rounded bg-slate-100 px-2 py-1.5 col-span-2"
								type="number"
								min="0"
								max="10000"
								id="imageWidth"
								v-model="userInputImage.imageWidth"
								@change="updateStylingImage"
							/>
					</div>
					<h3 class="mb-1 mt-5 text-base font-semibold">Opacity</h3>
					<input
								class="mr-4 w-20 rounded bg-slate-100 px-2 py-1.5"
								type="number"
								min="0"
								max="100"
								v-model="userInputImage.imageOpacity"
								@change="updateStylingImage"
							/>
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
							v-model="userInputImage.imageBorder"
							@change="updateStylingImage"
						/>
						<input
							class="bg-white"
							type="color"
							v-model="userInputImage.imageBorderColor"
							@change="updateStylingImage"
							@input="updateStylingImage"
						/>
						<input
							class="w-30 rounded-l bg-slate-100 px-2 py-1.5"
							type="text"
							v-model="userInputImage.imageBorderColor"
							@change="updateStylingImage"
							@input="updateStylingImage"
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
							min="-1000"
							max="1000"
							id="x"
							v-model="userInputImage.imageShadowX"
							@change="updateStylingImage"
						/>
						<label for="Blur">Blur</label>
						<input
							class="col-span-2 mr-4 w-20 rounded bg-slate-100 px-2 py-1.5"
							type="number"
							min="0"
							max="50"
							id="Blur"
							v-model="userInputImage.imageShadowBlur"
							@change="updateStylingImage"
						/>
						<label for="y">Y</label>
						<input
							class="col-span-2 mr-4 w-20 rounded bg-slate-100 px-2 py-1.5"
							type="number"
							min="-1000"
							max="1000"
							id="y"
							v-model="userInputImage.imageShadowY"
							@change="updateStylingImage"
						/>
						<div class="flex items-center gap-x-1 col-span-6">
							<input class="bg-white" type="color" v-model="userInputImage.imageShadowColor" @change="updateStylingImage" @input="updateStylingImage"/>
							<div>
								<input
									class="w-30 rounded-l bg-slate-100 px-2 py-1.5"
									type="text"
									v-model="userInputImage.imageShadowColor"
									@change="updateStylingImage"
									@input="updateStylingImage"
								/>
								<input
									class="border-l-1 col-span-1 rounded-r border-slate-300 bg-slate-100 px-2 py-1.5 pl-3"
									type="number"
									min="0"
									max="100"
									v-model="userInputImage.imageShadowColorOpacity"
									@change="updateStylingImage"
								/>
							</div>
						</div>
					</div>	
				</div>
				<div v-if="selectedShapeName.split('-')[0] == 'Line'">
					<h3 class="mb-1 text-base font-semibold flex-wrap">Size</h3>
					<div class="grid grid-cols-6 items-center gap-y-4 mr-8">
							<label for="lineLength">Length</label>
							<input
								class="w-20 rounded bg-slate-100 px-2 py-1.5 col-span-2"
								type="number"
								min="0"
								max="1000"
								id="lineLength"
								v-model="userInputLine.lineLength"
								@change="{updateStylingLine(); handleLineLengthChange()}"
							/>
							<label for="lineWidth">Stroke</label>
							<input
								class="w-20 rounded bg-slate-100 px-2 py-1.5 col-span-2"
								type="number"
								min="0"
								max="1000"
								id="lineWidth"
								v-model="userInputLine.lineWidth"
								@change="updateStylingLine"
							/>
					</div>
					<h3 class="mb-1 mt-5 text-base font-semibold">Line color</h3>
					<div class="flex items-center gap-x-1">
						<input class="bg-white" type="color" v-model="userInputLine.lineColor" @change="updateStylingLine" @input="updateStylingLine"/>
						<div>
							<input
								class="w-30 rounded-l bg-slate-100 px-2 py-1.5"
								type="text"
								v-model="userInputLine.lineColor"
								@change="updateStylingLine"
								@input="updateStylingLine"
							/>
							<input
								class="border-l-1 col-span-1 rounded-r border-slate-300 bg-slate-100 px-2 py-1.5 pl-3"
								type="number"
								min="0"
								max="100"
								v-model="userInputLine.lineColorOpacity"
								@change="updateStylingLine"
							/>
						</div>
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
							min="-1000"
							max="1000"
							id="x"
							v-model="userInputLine.lineShadowX"
							@change="updateStylingLine"
						/>
						<label for="Blur">Blur</label>
						<input
							class="col-span-2 mr-4 w-20 rounded bg-slate-100 px-2 py-1.5"
							type="number"
							min="0"
							max="50"
							id="Blur"
							v-model="userInputLine.lineShadowBlur"
							@change="updateStylingLine"
						/>
						<label for="y">Y</label>
						<input
							class="col-span-2 mr-4 w-20 rounded bg-slate-100 px-2 py-1.5"
							type="number"
							min="-1000"
							max="1000"
							id="y"
							v-model="userInputLine.lineShadowY"
							@change="updateStylingLine"
						/>
						<div class="flex items-center gap-x-1 col-span-6">
							<input class="bg-white" type="color" v-model="userInputLine.lineShadowColor" @change="updateStylingLine" @input="updateStylingLine">
							<div>
								<input
									class="w-30 rounded-l bg-slate-100 px-2 py-1.5"
									type="text"
									v-model="userInputLine.lineShadowColor"
									@change="updateStylingLine"
									@input="updateStylingLine"
								/>
								<input
									class="border-l-1 col-span-1 rounded-r border-slate-300 bg-slate-100 px-2 py-1.5 pl-3"
									type="number"
									min="0"
									max="100"
									v-model="userInputLine.lineShadowColorOpacity"
									@change="updateStylingLine"
								/>
							</div>
						</div>
					</div>
				</div>
				<div v-if="showShapesButton == true && selectedShapeName == ''">
					<button
						class="w-full rounded bg-slate-100 p-4 transition-colors hover:bg-blue-50 hover:text-blue-600"
						@click="showShapesButton = false"
					>
						<div class="flex gap-x-2"><ChevronLeft />Return</div>
					</button>
					<button
						class="mt-4 flex w-full justify-between rounded bg-slate-100 p-4 transition-colors hover:bg-blue-50 hover:text-blue-600"
						@click="addRectangleToCanvas"
					>
						<div class="flex gap-x-2"><Plus />Add rectangle</div>
						<Square />
					</button>
					<button
						class="mt-4 flex w-full justify-between rounded bg-slate-100 p-4 transition-colors hover:bg-blue-50 hover:text-blue-600"
						@click="addCircleToCanvas"
					>
						<div class="flex gap-x-2"><Plus />Add circle</div>
						<Circle />
					</button>
					<button
						class="mt-4 flex w-full justify-between rounded bg-slate-100 p-4 transition-colors hover:bg-blue-50 hover:text-blue-600"
						@click="addPolygonToCanvas"
					>
						<div class="flex gap-x-2"><Plus />Add polygon</div>
						<Hexagon />
					</button>
					<button
						class="mt-4 flex w-full justify-between rounded bg-slate-100 p-4 transition-colors hover:bg-blue-50 hover:text-blue-600"
						@click="addArrowToCanvas"
					>
						<div class="flex gap-x-2"><Plus />Add arrow</div>
						<ArrowBigRight />
					</button>
					<button
						class="mt-4 flex w-full justify-between rounded bg-slate-100 p-4 transition-colors hover:bg-blue-50 hover:text-blue-600"
						@click="addStarToCanvas"
					>
						<div class="flex gap-x-2"><Plus />Add star</div>
						<Star />
					</button>
				</div>
				<div v-if="selectedShapeName.split('-')[0] == 'Rectangle'">
					<h3 class="mb-1 text-base font-semibold flex-wrap">Size</h3>
					<div class="grid grid-cols-6 items-center gap-y-4 mr-8">
							<label for="rectangleHeight">Height</label>
							<input
								class="w-20 rounded bg-slate-100 px-2 py-1.5 col-span-2"
								type="number"
								min="0"
								max="10000"
								id="rectangleHeight"
								v-model="userInputRectangle.rectangleHeight"
								@change="updateStylingRectangle"
							/>
							<label for="rectangleWidth">Width</label>
							<input
								class="w-20 rounded bg-slate-100 px-2 py-1.5 col-span-2"
								type="number"
								min="0"
								max="10000"
								id="rectangleWidth"
								v-model="userInputRectangle.rectangleWidth"
								@change="updateStylingRectangle"
							/>
					</div>
					<h3 class="mb-1 mt-5 text-base font-semibold">Rectangle color</h3>
					<div class="flex items-center gap-x-1">
						<input class="bg-white" type="color" v-model="userInputRectangle.rectangleColor" @change="updateStylingRectangle" @input="updateStylingRectangle"/>
						<div>
							<input
								class="w-30 rounded-l bg-slate-100 px-2 py-1.5"
								type="text"
								v-model="userInputRectangle.rectangleColor" 
								@change="updateStylingRectangle"
								@input="updateStylingRectangle"
							/>
							<input
								class="border-l-1 col-span-1 rounded-r border-slate-300 bg-slate-100 px-2 py-1.5 pl-3"
								type="number"
								min="0"
								max="100"
								v-model="userInputRectangle.rectangleColorOpacity"
								@change="updateStylingRectangle"
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
							v-model="userInputRectangle.rectangleBorder"
							@change="updateStylingRectangle"
						/>
						<input
							class="bg-white"
							type="color"
							v-model="userInputRectangle.rectangleBorderColor"
							@change="updateStylingRectangle"
							@input="updateStylingRectangle"
						/>
						<input
							class="w-30 rounded-l bg-slate-100 px-2 py-1.5"
							type="text"
							v-model="userInputRectangle.rectangleBorderColor"
							@change="updateStylingRectangle"
							@input="updateStylingRectangle"
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
							min="-1000"
							max="1000"
							id="x"
							v-model="userInputRectangle.rectangleShadowX"
							@change="updateStylingRectangle"
						/>
						<label for="Blur">Blur</label>
						<input
							class="col-span-2 mr-4 w-20 rounded bg-slate-100 px-2 py-1.5"
							type="number"
							min="0"
							max="50"
							id="Blur"
							v-model="userInputRectangle.rectangleShadowBlur"
							@change="updateStylingRectangle"
						/>
						<label for="y">Y</label>
						<input
							class="col-span-2 mr-4 w-20 rounded bg-slate-100 px-2 py-1.5"
							type="number"
							min="-1000"
							max="1000"
							id="y"
							v-model="userInputRectangle.rectangleShadowY"
							@change="updateStylingRectangle"
						/>
						<div class="flex items-center gap-x-1 col-span-6">
							<input class="bg-white" type="color" 
							v-model="userInputRectangle.rectangleShadowColor"
							@change="updateStylingRectangle"
							@input="updateStylingRectangle"
							/>
							<div>
								<input
									class="w-30 rounded-l bg-slate-100 px-2 py-1.5"
									type="text"
									v-model="userInputRectangle.rectangleShadowColor"
									@change="updateStylingRectangle"
									@input="updateStylingRectangle"
								/>
								<input
									class="border-l-1 col-span-1 rounded-r border-slate-300 bg-slate-100 px-2 py-1.5 pl-3"
									type="number"
									min="0"
									max="100"
									v-model="userInputRectangle.rectangleShadowColorOpacity"
									@change="updateStylingRectangle"
								/>
							</div>
						</div>
					</div>	
				</div>
				<div v-if="selectedShapeName.split('-')[0] == 'Circle'">
					<h3 class="mb-1 text-base font-semibold flex-wrap">Radius</h3>
							<input
								class="w-20 rounded bg-slate-100 px-2 py-1.5 col-span-2"
								type="number"
								min="0"
								max="10000"
								id="radius"
								v-model="userInputCircle.circleRadius"
								@change="updateStylingCircle"
							/>
					<h3 class="mb-1 mt-5 text-base font-semibold">Circle color</h3>
					<div class="flex items-center gap-x-1">
						<input class="bg-white" type="color"
						v-model="userInputCircle.circleColor"
						@change="updateStylingCircle"
						@input="updateStylingCircle"
						/>
						<div>
							<input
								class="w-30 rounded-l bg-slate-100 px-2 py-1.5"
								type="text"
								v-model="userInputCircle.circleColor"
								@change="updateStylingCircle"
								@input="updateStylingCircle"
							/>
							<input
								class="border-l-1 col-span-1 rounded-r border-slate-300 bg-slate-100 px-2 py-1.5 pl-3"
								type="number"
								min="0"
								max="100"
								v-model="userInputCircle.circleColorOpacity"
								@change="updateStylingCircle"
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
							v-model="userInputCircle.circleBorder"
							@change="updateStylingCircle"
						/>
						<input
							class="bg-white"
							type="color"
							v-model="userInputCircle.circleBorderColor"
							@change="updateStylingCircle"
							@input="updateStylingCircle"
						/>
						<input
							class="w-30 rounded-l bg-slate-100 px-2 py-1.5"
							type="text"
							v-model="userInputCircle.circleBorderColor"
							@change="updateStylingCircle"
							@input="updateStylingCircle"
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
							min="-1000"
							max="1000"
							id="x"
							v-model="userInputCircle.circleShadowX"
							@change="updateStylingCircle"
						/>
						<label for="Blur">Blur</label>
						<input
							class="col-span-2 mr-4 w-20 rounded bg-slate-100 px-2 py-1.5"
							type="number"
							min="0"
							max="50"
							id="Blur"
							v-model="userInputCircle.circleShadowBlur"
							@change="updateStylingCircle"
						/>
						<label for="y">Y</label>
						<input
							class="col-span-2 mr-4 w-20 rounded bg-slate-100 px-2 py-1.5"
							type="number"
							min="-1000"
							max="1000"
							id="y"
							v-model="userInputCircle.circleShadowY"
							@change="updateStylingCircle"
						/>
						<div class="flex items-center gap-x-1 col-span-6">
							<input class="bg-white" type="color"
							v-model="userInputCircle.circleShadowColor"
							@change="updateStylingCircle"
							@input="updateStylingCircle"
							/>
							<div>
								<input
									class="w-30 rounded-l bg-slate-100 px-2 py-1.5"
									type="text"
									v-model="userInputCircle.circleShadowColor"
									@change="updateStylingCircle"
									@input="updateStylingCircle"
								/>
								<input
									class="border-l-1 col-span-1 rounded-r border-slate-300 bg-slate-100 px-2 py-1.5 pl-3"
									type="number"
									min="0"
									max="100"
									v-model="userInputCircle.circleShadowColorOpacity"
									@change="updateStylingCircle"
								/>
							</div>
						</div>
					</div>	
				</div>
				<div v-if="selectedShapeName.split('-')[0] == 'Polygon'">
					<h3 class="mb-1 text-base font-semibold flex-wrap">Properties</h3>
					<div class="grid grid-cols-3 gap-y-4 mr-8">
							<label for="sidesPolygon">Sides</label>
							<input
								class="w-20 rounded bg-slate-100 px-2 py-1.5 col-span-2"
								type="number"
								min="3"
								max="20"
								id="sidesPolygon"
								v-model="userInputPolygon.polygonSides"
								@change="{updateStylingPolygon(); handlePolygonSidesChange()}"
							/>
							<label for="radiusPolygon">Radius</label>
							<input
								class="w-20 rounded bg-slate-100 px-2 py-1.5 col-span-2"
								type="number"
								min="0"
								max="10000"
								id="radiusPolygon"
								v-model="userInputPolygon.polygonRadius"
								@change="updateStylingPolygon"
							/>
					</div>
					<h3 class="mb-1 mt-5 text-base font-semibold">Polygon color</h3>
					<div class="flex items-center gap-x-1">
						<input class="bg-white" type="color"
						v-model="userInputPolygon.polygonColor"
						@change="updateStylingPolygon"
						@input="updateStylingPolygon"
						/>
						<div>
							<input
								class="w-30 rounded-l bg-slate-100 px-2 py-1.5"
								type="text"
								v-model="userInputPolygon.polygonColor"
								@change="updateStylingPolygon"
								@input="updateStylingPolygon"
							/>
							<input
								class="border-l-1 col-span-1 rounded-r border-slate-300 bg-slate-100 px-2 py-1.5 pl-3"
								type="number"
								min="0"
								max="100"
								v-model="userInputPolygon.polygonColorOpacity"
								@change="updateStylingPolygon"
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
							v-model="userInputPolygon.polygonBorder"
							@change="updateStylingPolygon"
						/>
						<input
							class="bg-white"
							type="color"
							v-model="userInputPolygon.polygonBorderColor"
							@change="updateStylingPolygon"
							@input="updateStylingPolygon"
						/>
						<input
							class="w-30 rounded-l bg-slate-100 px-2 py-1.5"
							type="text"
							v-model="userInputPolygon.polygonBorderColor"
							@change="updateStylingPolygon"
							@input="updateStylingPolygon"
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
							min="-1000"
							max="1000"
							id="x"
							v-model="userInputPolygon.polygonShadowX"
							@change="updateStylingPolygon"
						/>
						<label for="Blur">Blur</label>
						<input
							class="col-span-2 mr-4 w-20 rounded bg-slate-100 px-2 py-1.5"
							type="number"
							min="0"
							max="50"
							id="Blur"
							v-model="userInputPolygon.polygonShadowBlur"
							@change="updateStylingPolygon"
						/>
						<label for="y">Y</label>
						<input
							class="col-span-2 mr-4 w-20 rounded bg-slate-100 px-2 py-1.5"
							type="number"
							min="-1000"
							max="1000"
							id="y"
							v-model="userInputPolygon.polygonShadowY"
							@change="updateStylingPolygon"
						/>
						<div class="flex items-center gap-x-1 col-span-6">
							<input class="bg-white" type="color" 
							v-model="userInputPolygon.polygonShadowColor"
							@change="updateStylingPolygon"
							@input="updateStylingPolygon"
							/>
							<div>
								<input
									class="w-30 rounded-l bg-slate-100 px-2 py-1.5"
									type="text"
									v-model="userInputPolygon.polygonShadowColor"
									@change="updateStylingPolygon"
									@input="updateStylingPolygon"
								/>
								<input
									class="border-l-1 col-span-1 rounded-r border-slate-300 bg-slate-100 px-2 py-1.5 pl-3"
									type="number"
									min="0"
									max="100"
									v-model="userInputPolygon.polygonShadowColorOpacity"
									@change="updateStylingPolygon"
								/>
							</div>
						</div>
					</div>	
				</div>
				<div v-if="selectedShapeName.split('-')[0] == 'Arrow'">
					<h3 class="mb-1 text-base font-semibold flex-wrap">Size</h3>
					<div class="grid grid-cols-6 items-center gap-y-4 mr-8">
							<label for="arrowLength">Length</label>
							<input
								class="w-20 rounded bg-slate-100 px-2 py-1.5 col-span-2"
								type="number"
								min="0"
								max="1000"
								id="arrowLength"
								v-model="userInputArrow.arrowLength"
								@change="{updateStylingArrow(); handleArrowLengthChange()}"
							/>
							<label for="arrowStroke">Stroke</label>
							<input
								class="w-20 rounded bg-slate-100 px-2 py-1.5 col-span-2"
								type="number"
								min="0"
								max="1000"
								id="arrowStroke"
								v-model="userInputArrow.arrowStroke"
								@change="updateStylingArrow"
							/>
					</div>
					<h3 class="mb-1 mt-5 text-base font-semibold">Arrow color</h3>
					<div class="flex items-center gap-x-1">
						<input class="bg-white" type="color"
						v-model="userInputArrow.arrowStrokeColor"
						@change="updateStylingArrow"
						@input="updateStylingArrow"
						/>
						<div>
							<input
								class="w-30 rounded-l bg-slate-100 px-2 py-1.5"
								type="text"
								v-model="userInputArrow.arrowStrokeColor"
								@change="updateStylingArrow"
								@input="updateStylingArrow"
							/>
							<input
								class="border-l-1 col-span-1 rounded-r border-slate-300 bg-slate-100 px-2 py-1.5 pl-3"
								type="number"
								min="0"
								max="100"
								v-model="userInputArrow.arrowStrokeColorOpacity"
								@change="updateStylingArrow"
							/>
						</div>
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
							min="-1000"
							max="1000"
							id="x"
							v-model="userInputArrow.arrowShadowX"
							@change="updateStylingArrow"
						/>
						<label for="Blur">Blur</label>
						<input
							class="col-span-2 mr-4 w-20 rounded bg-slate-100 px-2 py-1.5"
							type="number"
							min="0"
							max="50"
							id="Blur"
							v-model="userInputArrow.arrowShadowBlur"
							@change="updateStylingArrow"
						/>
						<label for="y">Y</label>
						<input
							class="col-span-2 mr-4 w-20 rounded bg-slate-100 px-2 py-1.5"
							type="number"
							min="-1000"
							max="1000"
							id="y"
							v-model="userInputArrow.arrowShadowY"
							@change="updateStylingArrow"
						/>
						<div class="flex items-center gap-x-1 col-span-6">
							<input class="bg-white" type="color"
							v-model="userInputArrow.arrowShadowColor"
							@change="updateStylingArrow"
							@input="updateStylingArrow"
							>
							<div>
								<input
									class="w-30 rounded-l bg-slate-100 px-2 py-1.5"
									type="text"
									v-model="userInputArrow.arrowShadowColor"
									@change="updateStylingArrow"
									@input="updateStylingArrow"
								/>
								<input
									class="border-l-1 col-span-1 rounded-r border-slate-300 bg-slate-100 px-2 py-1.5 pl-3"
									type="number"
									min="0"
									max="100"
									v-model="userInputArrow.arrowShadowColorOpacity"
									@change="updateStylingArrow"
								/>
							</div>
						</div>
					</div>
				</div>
				<div v-if="selectedShapeName.split('-')[0] == 'Star'">
					<h3 class="mb-1 text-base font-semibold flex-wrap">Properties</h3>
					<div class="grid grid-cols-3 items-center gap-y-4 mr-8">
							<label for="pointsStar">Points</label>
							<input
								class="w-20 rounded bg-slate-100 px-2 py-1.5 col-span-2"
								type="number"
								min="2"
								max="30"
								id="pointsStar"
								v-model="userInputStar.starPoints"
								@change="updateStylingStar"
							/>
							<label for="innerRadiusStar">Inner radius</label>
							<input
								class="w-20 rounded bg-slate-100 px-2 py-1.5 col-span-2"
								type="number"
								min="0"
								max="10000"
								id="innerRadiusStar"
								v-model="userInputStar.starInnerRadius"
								@change="updateStylingStar"
							/>
							<label for="outerRadiusStar">Outer radius</label>
							<input
								class="w-20 rounded bg-slate-100 px-2 py-1.5 col-span-2"
								type="number"
								min="0"
								max="10000"
								id="outerRadiusStar"
								v-model="userInputStar.starOuterRadius"
								@change="updateStylingStar"
							/>
					</div>
					<h3 class="mb-1 mt-5 text-base font-semibold">Star color</h3>
					<div class="flex items-center gap-x-1">
						<input class="bg-white" type="color"
						v-model="userInputStar.starColor"
						@change="updateStylingStar"
						@input="updateStylingStar"
						/>
						<div>
							<input
								class="w-30 rounded-l bg-slate-100 px-2 py-1.5"
								type="text"
								v-model="userInputStar.starColor"
								@change="updateStylingStar"
								@input="updateStylingStar"
							/>
							<input
								class="border-l-1 col-span-1 rounded-r border-slate-300 bg-slate-100 px-2 py-1.5 pl-3"
								type="number"
								min="0"
								max="100"
								v-model="userInputStar.starColorOpacity"
								@change="updateStylingStar"
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
							v-model="userInputStar.starBorder"
							@change="updateStylingStar"
						/>
						<input
							class="bg-white"
							type="color"
							v-model="userInputStar.starBorderColor"
							@change="updateStylingStar"
							@input="updateStylingStar"
						/>
						<input
							class="w-30 rounded-l bg-slate-100 px-2 py-1.5"
							type="text"
							v-model="userInputStar.starBorderColor"
							@change="updateStylingStar"
							@input="updateStylingStar"
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
							min="-1000"
							max="1000"
							id="x"
							v-model="userInputStar.starShadowX"
							@change="updateStylingStar"
						/>
						<label for="Blur">Blur</label>
						<input
							class="col-span-2 mr-4 w-20 rounded bg-slate-100 px-2 py-1.5"
							type="number"
							min="0"
							max="50"
							id="Blur"
							v-model="userInputStar.starShadowBlur"
							@change="updateStylingStar"
						/>
						<label for="y">Y</label>
						<input
							class="col-span-2 mr-4 w-20 rounded bg-slate-100 px-2 py-1.5"
							type="number"
							min="-1000"
							max="1000"
							id="y"
							v-model="userInputStar.starShadowY"
							@change="updateStylingStar"
						/>
						<div class="flex items-center gap-x-1 col-span-6">
							<input class="bg-white" type="color" 
							v-model="userInputStar.starShadowColor"
							@change="updateStylingStar"
							@input="updateStylingStar"
							/>
							<div>
								<input
									class="w-30 rounded-l bg-slate-100 px-2 py-1.5"
									type="text"
									v-model="userInputStar.starShadowColor"
									@change="updateStylingStar"
									@input="updateStylingStar"
								/>
								<input
									class="border-l-1 col-span-1 rounded-r border-slate-300 bg-slate-100 px-2 py-1.5 pl-3"
									type="number"
									min="0"
									max="100"
									v-model="userInputStar.starShadowColorOpacity"
									@change="updateStylingStar"
								/>
							</div>
						</div>
					</div>	
				</div>
			</aside>
		</main>
		<div class="absolute bottom-0 bg-blue-100 w-200 mb-6 p-2 rounded-md drop-shadow-md left-[calc(75%/2-400px+27px)] transition-transform ease-[cubic-bezier(0.25, 1, 0.5, 1)]"
		:class="showTextEditor ? 'translate-y-0' : 'translate-y-34'">
		<div class="flex justify-between items-center mb-1">
			<label class="font-medium">What do you want this selected text to say?</label>
			<button class="text-blue-600 hover:text-blue-800 hover:bg-blue-200 rounded" @click="showTextEditor = false"><X /></button>
		</div>
		<textarea class="block border-1 border-blue-400 rounded w-full p-2 hover:border-blue-600 transition-colors outline-none focus:border-blue-600 focus-visible:ring-2 caret-blue-600" placeholder="Type here your text" v-model="userInputText.text" @input="updateStylingText"></textarea>
		</div>
	</div>
</template>

<script lang="ts">
import { Ref, ref, watch, onMounted, reactive, computed } from 'vue'
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
	ChevronLeft,
	Star,
	Layers,
	ArrowUp,
	ArrowDown,
	X,
	MoveVertical
} from 'lucide-vue-next'
import Konva from 'konva'
import Text from '../interfaces/interface.text'
import { Rect } from 'konva/lib/shapes/Rect'
import { Shape, ShapeConfig } from 'konva/lib/Shape'
import router from '../bootstrap/router'

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
    ChevronLeft,
	Star,
	Layers,
	ArrowUp,
	ArrowDown,
	X,
	MoveVertical,
},
	setup() {
		const isUserTyping: Ref<boolean> = ref(false)
		const isPageSelectorOpen: Ref<boolean> = ref(false)
		const selectedPage: Ref<string> = ref('Home')
		const textList: Ref<Text[]> = ref([])
		const imageList: Ref<any[]> = ref([])
		const lineList: Ref<any[]> = ref([])
		const rectangleList: Ref<any[]> = ref([])
		const circleList: Ref<any[]> = ref([])
		const polygonList: Ref<any[]> = ref([])
		const arrowList: Ref<any[]> = ref([])
		const starList: Ref<any[]> = ref([])
		let textListNumber: Ref<number> = ref(0)
		let imageListNumber: Ref<number> = ref(0)
		let lineListNumber: Ref<number> = ref(0)
		let rectangleListNumber: Ref<number> = ref(0)
		let circleListNumber: Ref<number> = ref(0)
		let polygonListNumber: Ref<number> = ref(0)
		let arrowListNumber: Ref<number> = ref(0)
		let starListNumber: Ref<number> = ref(0)
		const selectedShapeName: Ref<string> = ref('')
		const showBorderDetails: Ref<boolean> = ref(false)
		const showShadowDetails: Ref<boolean> = ref(false)
		const showTextEditor: Ref<boolean> = ref(false)
		const alignText: Ref<string> = ref('left')
		const showShapesButton: Ref<boolean> = ref(false)

		const layer = ref()
		const stage = ref()
		const textTransformer = ref()
		const imageTransformer = ref()
		const lineTransformer = ref()
		const circleTransformer = ref()
		const polygonTransformer = ref()
		const arrowTransformer = ref()
		const fileInput = ref()
		const fileInputSideBar = ref()
		const rectangleTransformer = ref()
		const starTransformer = ref()

		const scrollContainer = ref()

		const selectedPointer: Ref<boolean> = ref(true)
		const selectedAddTextPointer: Ref<boolean> = ref(false)
		const selectedAddImagePointer: Ref<boolean> = ref(false)
		const selectedAddLinePointer: Ref<boolean> = ref(false)
		const selectedAddRectanglePointer: Ref<boolean> = ref(false)
		const selectedAddCirclePointer: Ref<boolean> = ref(false)
		const selectedAddPolygonPointer: Ref<boolean> = ref(false)
		const selectedAddArrowPointer: Ref<boolean> = ref(false)
		const selectedAddStarPointer: Ref<boolean> = ref(false)

		const userInputText = reactive({
			fontFamily: 'Arial',
			fontSize: 21,
			isFontBold: false,
			isFontItalic: false,
			isFontUnderlined: false,
			lineHeight: 1,
			textAlign: 'left',
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
			text: ''
		})

		const userInputImage = reactive({
			imageOpacity: 100,
			imageBorder: 0,
			imageBorderColor: '#000000',
			imageShadowX: 0,
			imageShadowY: 0,
			imageShadowBlur: 0,
			imageShadowSpread: 0,
			imageShadowColor: '#000000',
			imageShadowColorOpacity: 50,
			imageWidth: 100,
			imageHeight: 100,
		})

		const userInputLine = reactive({
			lineWidth: 3,
			lineLength: 100,
			lineColor: '#000000',
			lineColorOpacity: 100,
			lineBorder: 0,
			lineBorderColor: '#000000',
			lineShadowX: 0,
			lineShadowY: 0,
			lineShadowBlur: 0,
			lineShadowSpread: 0,
			lineShadowColor: '#000000',
			lineShadowColorOpacity: 50,
		})

		const userInputRectangle = reactive({
			rectangleWidth: 100,
			rectangleHeight: 100,
			rectangleColor: '#000000',
			rectangleColorOpacity: 100,
			rectangleBorder: 0,
			rectangleBorderColor: '#000000',
			rectangleShadowX: 0,
			rectangleShadowY: 0,
			rectangleShadowBlur: 0,
			rectangleShadowSpread: 0,
			rectangleShadowColor: '#000000',
			rectangleShadowColorOpacity: 50,
		})

		const userInputCircle = reactive({
			circleRadius: 50,
			circleColor: '#000000',
			circleColorOpacity: 100,
			circleBorder: 0,
			circleBorderColor: '#000000',
			circleShadowX: 0,
			circleShadowY: 0,
			circleShadowBlur: 0,
			circleShadowSpread: 0,
			circleShadowColor: '#000000',
			circleShadowColorOpacity: 50,
		})

		const userInputPolygon = reactive({
			polygonSides: 3,
			polygonRadius: 50,
			polygonColor: '#000000',
			polygonColorOpacity: 100,
			polygonBorder: 0,
			polygonBorderColor: '#000000',
			polygonShadowX: 0,
			polygonShadowY: 0,
			polygonShadowBlur: 0,
			polygonShadowSpread: 0,
			polygonShadowColor: '#000000',
			polygonShadowColorOpacity: 50,
		})

		const userInputArrow = reactive({
			arrowPointerWidth: 10,
			arrowPointerLength: 100,
			arrowStroke: 3,
			arrowStrokeColor: '#000000',
			arrowStrokeColorOpacity: 100,
			arrowBorder: 0,
			arrowBorderColor: '#000000',
			arrowShadowX: 0,
			arrowShadowY: 0,
			arrowShadowBlur: 0,
			arrowShadowSpread: 0,
			arrowShadowColor: '#000000',
			arrowShadowColorOpacity: 50,
			arrowLength: 100,
		})

		const userInputStar = reactive({
			starPoints: 5,
			starInnerRadius: 20,
			starOuterRadius: 50,
			starColor: '#000000',
			starColorOpacity: 100,
			starBorder: 0,
			starBorderColor: '#000000',
			starShadowX: 0,
			starShadowY: 0,
			starShadowBlur: 0,
			starShadowSpread: 0,
			starShadowColor: '#000000',
			starShadowColorOpacity: 50,
		})

		const originalHeight = window.innerHeight - 72 - 32

		const configKonva = ref({
			width: 1024, //window.innerWidth * 0.75 - 56 - 2 * 32,
			height: window.innerHeight - 72 - 32,
		})

		// Show 1024px width in available container (this messes up the guidelines)
		// const scale = computed(() => {
		// 	return configKonva.value.height / 1024
		// })

		const setPage = (page: string) => {
			isPageSelectorOpen.value = false
			selectedPage.value = page
		}

		// window.addEventListener('resize', () => {
		// 	configKonva.value.width = window.innerWidth * 0.75 - 56 - 2 * 32,
		// 	configKonva.value.height = (window.innerHeight - 72 - 32) * 1.5
		// })

		const toggleIsPageSelectorOpen = () => {
			isPageSelectorOpen.value = !isPageSelectorOpen.value
		}

		const addTextElementToCanvas = async () => {
			textListNumber.value++
			const textName = 'Text-' + textListNumber.value.toString()
			selectedShapeName.value = textName

			//Get the scroll position of the canvas:
			const scrollTop = scrollContainer.value.scrollTop

			//@ts-ignore
			textList.value.push({
				id: textListNumber.toString(),
				x: 100,
				y: scrollTop + 100,
				text: 'Double click to change this text. \nYou can also drag it around.',
				draggable: true,
				fontFamily: 'Arial',
				fontSize: 21,
				fontStyle: 'normal',
				textDecoration: '',
				lineHeight: 1,
				align: 'left',
				fill: '#000000',
				stroke: '#000000',
				strokeWidth: 0,
				shadowColor: '#000000',
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

			//Make element selected
			await Promise.resolve();
			updateTextTransformer();

			//Save shape:
			saveShapesToLocalStorage()
		}

		const addTextElementWithPointer = () => {
			textListNumber.value++
			const textName = 'Text-' + textListNumber.value.toString()

			selectedPointer.value = false
			selectedAddTextPointer.value = true

			//Listen to click event on stage: 
			stage.value.getNode().on('click', (e: Konva.KonvaEventObject<MouseEvent>) => {
				//@ts-ignore
				textList.value.push({
					id: textListNumber.toString(),
					x: e.evt.offsetX,
					y: e.evt.offsetY,
					text: 'Double click to change this text. \nYou can also drag it around.',
					draggable: true,
					fontFamily: 'Arial',
					fontSize: 21,
					fontStyle: 'normal',
					textDecoration: '',
					lineHeight: 1,
					align: 'left',
					fill: '#000000',
					stroke: '#000000',
					strokeWidth: 0,
					shadowColor: '#000000',
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

				//Save shape:
				saveShapesToLocalStorage()
				//Remove event listener:
				stage.value.getNode().off('click')
				selectedAddTextPointer.value = false
				selectedPointer.value = true
			})
		}

		const addLineElementToCanvas = async () => {
			lineListNumber.value++
			const lineName = 'Line-' + lineListNumber.value.toString()
			selectedShapeName.value = lineName
			//Get the scroll position of the canvas:
			const scrollTop = scrollContainer.value.scrollTop
			lineList.value.push({
				id: textListNumber.toString(),
				x: 100,
				y: scrollTop + 100,
				points: [0, 0, 200, 0],
				stroke: '#000000',
				strokeWidth: 3,
				draggable: true,
				name: lineName,
				opacity: 1,
				rotation: 0,
				scaleX: 1,
				scaleY: 1,
				shadowColor: '#000000',
				shadowBlur: 0,
				shadowOffsetX: 0,
				shadowOffsetY: 0,
				shadowOpacity: 0.5,
			})
			await Promise.resolve();
			updateLineTransformer();
			saveShapesToLocalStorage()
		}

		const addLineElementWithPointer = () => {
			lineListNumber.value++
			const lineName = 'Line-' + lineListNumber.value.toString()

			selectedPointer.value = false
			selectedAddLinePointer.value = true

			//Listen to click event on stage: 
			stage.value.getNode().on('click', (e: Konva.KonvaEventObject<MouseEvent>) => {
				lineList.value.push({
					id: textListNumber.toString(),
					x: e.evt.offsetX,
					y: e.evt.offsetY,
					points: [0, 0, 200, 0],
					stroke: '#000000',
					strokeWidth: 3,
					draggable: true,
					name: lineName,
					opacity: 1,
					rotation: 0,
					scaleX: 1,
					scaleY: 1,
					shadowColor: '#000000',
					shadowBlur: 0,
					shadowOffsetX: 0,
					shadowOffsetY: 0,
					shadowOpacity: 0.5,
				})
				saveShapesToLocalStorage()
				//Remove event listener:
				stage.value.getNode().off('click')
				selectedAddLinePointer.value = false
				selectedPointer.value = true
			})
		}

		const addRectangleToCanvas = async () => {
			rectangleListNumber.value++
			const rectangleName = 'Rectangle-' + rectangleListNumber.value.toString()
			selectedShapeName.value = rectangleName
			//Get the scroll position of the canvas:
			const scrollTop = scrollContainer.value.scrollTop
			rectangleList.value.push({
				id: rectangleListNumber.toString(),
				x: 100,
				y: scrollTop + 100,
				width: 100,
				height: 100,
				fill: '#000000',
				stroke: '#000000',
				strokeWidth: 0,
				draggable: true,
				name: rectangleName,
				opacity: 1,
				rotation: 0,
				scaleX: 1,
				scaleY: 1,
				shadowColor: '#000000',
				shadowBlur: 0,
				shadowOffsetX: 0,
				shadowOffsetY: 0,
				shadowOpacity: 0.5,
				cornerRadius: 0,
			})
			await Promise.resolve();
			updateRectangleTransformer();
			saveShapesToLocalStorage()
		}

		const addRectangleElementWithPointer = () => {
			rectangleListNumber.value++
			const rectangleName = 'Rectangle-' + rectangleListNumber.value.toString()

			selectedPointer.value = false
			selectedAddRectanglePointer.value = true

			//Listen to click event on stage: 
			stage.value.getNode().on('click', (e: Konva.KonvaEventObject<MouseEvent>) => {
				rectangleList.value.push({
					id: rectangleListNumber.toString(),
					x: e.evt.offsetX,
					y: e.evt.offsetY,
					width: 100,
					height: 100,
					fill: '#000000',
					stroke: '#000000',
					strokeWidth: 0,
					draggable: true,
					name: rectangleName,
					opacity: 1,
					rotation: 0,
					scaleX: 1,
					scaleY: 1,
					shadowColor: '#000000',
					shadowBlur: 0,
					shadowOffsetX: 0,
					shadowOffsetY: 0,
					shadowOpacity: 0.5,
					cornerRadius: 0,
				})
				saveShapesToLocalStorage()
				//Remove event listener:
				stage.value.getNode().off('click')
				selectedAddRectanglePointer.value = false
				selectedPointer.value = true
			})
		}

		const addCircleToCanvas = async () => {
			circleListNumber.value++
			const circleName = 'Circle-' + circleListNumber.value.toString()
			selectedShapeName.value = circleName
			//Get the scroll position of the canvas:
			const scrollTop = scrollContainer.value.scrollTop
			circleList.value.push({
				id: circleListNumber.toString(),
				x: 100,
				y: scrollTop + 100,
				radius: 50,
				fill: '#000000',
				stroke: '#000000',
				strokeWidth: 0,
				draggable: true,
				name: circleName,
				opacity: 1,
				rotation: 0,
				scaleX: 1,
				scaleY: 1,
				shadowColor: '#000000',
				shadowBlur: 0,
				shadowOffsetX: 0,
				shadowOffsetY: 0,
				shadowOpacity: 0.5,
			})
			await Promise.resolve();
			updateCircleTransformer();
			saveShapesToLocalStorage()
		}

		const addCircleElementWithPointer = () => {
			circleListNumber.value++
			const circleName = 'Circle-' + circleListNumber.value.toString()

			selectedPointer.value = false
			selectedAddCirclePointer.value = true

			//Listen to click event on stage: 
			stage.value.getNode().on('click', (e: Konva.KonvaEventObject<MouseEvent>) => {
				circleList.value.push({
					id: circleListNumber.toString(),
					x: e.evt.offsetX,
					y: e.evt.offsetY,
					radius: 50,
					fill: '#000000',
					stroke: '#000000',
					strokeWidth: 0,
					draggable: true,
					name: circleName,
					opacity: 1,
					rotation: 0,
					scaleX: 1,
					scaleY: 1,
					shadowColor: '#000000',
					shadowBlur: 0,
					shadowOffsetX: 0,
					shadowOffsetY: 0,
					shadowOpacity: 0.5,
				})
				saveShapesToLocalStorage()
				//Remove event listener:
				stage.value.getNode().off('click')
				selectedAddCirclePointer.value = false
				selectedPointer.value = true
			})
		}

		const addPolygonToCanvas = async () => {
			polygonListNumber.value++
			const polygonName = 'Polygon-' + polygonListNumber.value.toString()
			selectedShapeName.value = polygonName
			//Get the scroll position of the canvas:
			const scrollTop = scrollContainer.value.scrollTop
			polygonList.value.push({
				id: polygonListNumber.toString(),
				x: 100,
				y: scrollTop + 100,
				sides: 5,
				radius: 50,
				fill: '#000000',
				stroke: '#000000',
				strokeWidth: 0,
				draggable: true,
				name: polygonName,
				opacity: 1,
				rotation: 0,
				scaleX: 1,
				scaleY: 1,
				shadowColor: '#000000',
				shadowBlur: 0,
				shadowOffsetX: 0,
				shadowOffsetY: 0,
				shadowOpacity: 0.5,
			})
			await Promise.resolve();
			updatePolygonTransformer();
			saveShapesToLocalStorage()
		}

		const addPolygonElementWithPointer = () => {
			polygonListNumber.value++
			const polygonName = 'Polygon-' + polygonListNumber.value.toString()

			selectedPointer.value = false
			selectedAddPolygonPointer.value = true

			//Listen to click event on stage: 
			stage.value.getNode().on('click', (e: Konva.KonvaEventObject<MouseEvent>) => {
				polygonList.value.push({
					id: polygonListNumber.toString(),
					x: e.evt.offsetX,
					y: e.evt.offsetY,
					sides: 5,
					radius: 50,
					fill: '#000000',
					stroke: '#000000',
					strokeWidth: 0,
					draggable: true,
					name: polygonName,
					opacity: 1,
					rotation: 0,
					scaleX: 1,
					scaleY: 1,
					shadowColor: '#000000',
					shadowBlur: 0,
					shadowOffsetX: 0,
					shadowOffsetY: 0,
					shadowOpacity: 0.5,
				})
				saveShapesToLocalStorage()
				//Remove event listener:
				stage.value.getNode().off('click')
				selectedAddPolygonPointer.value = false
				selectedPointer.value = true
			})
		}

		const addArrowToCanvas = async () => {
			arrowListNumber.value++
			const arrowName = 'Arrow-' + arrowListNumber.value.toString()
			selectedShapeName.value = arrowName
			//Get the scroll position of the canvas:
			const scrollTop = scrollContainer.value.scrollTop
			arrowList.value.push({
				id: arrowListNumber.toString(),
				x: 100,
				y: scrollTop + 100,
				points: [0, 0, 100, 0],
				stroke: '#000000',
				strokeWidth: 3,
				draggable: true,
				name: arrowName,
				opacity: 1,
				rotation: 0,
				scaleX: 1,
				scaleY: 1,
				shadowColor: '#000000',
				shadowBlur: 0,
				shadowOffsetX: 0,
				shadowOffsetY: 0,
				shadowOpacity: 0.5,
				pointerLength: 10,
				pointerWidth: 10,
				fill: '#000000'
			})
			await Promise.resolve();
			updateArrowTransformer();
			saveShapesToLocalStorage()
		}

		const addArrowElementWithPointer = () => {
			arrowListNumber.value++
			const arrowName = 'Arrow-' + arrowListNumber.value.toString()

			selectedPointer.value = false
			selectedAddArrowPointer.value = true

			//Listen to click event on stage: 
			stage.value.getNode().on('click', (e: Konva.KonvaEventObject<MouseEvent>) => {
				arrowList.value.push({
					id: arrowListNumber.toString(),
					x: e.evt.offsetX,
					y: e.evt.offsetY,
					points: [0, 0, 100, 0],
					stroke: '#000000',
					strokeWidth: 3,
					draggable: true,
					name: arrowName,
					opacity: 1,
					rotation: 0,
					scaleX: 1,
					scaleY: 1,
					shadowColor: '#000000',
					shadowBlur: 0,
					shadowOffsetX: 0,
					shadowOffsetY: 0,
					shadowOpacity: 0.5,
					pointerLength: 10,
					pointerWidth: 10,
					fill: '#000000'
				})
				saveShapesToLocalStorage()
				//Remove event listener:
				stage.value.getNode().off('click')
				selectedAddArrowPointer.value = false
				selectedPointer.value = true
			})
		}

		const addStarToCanvas = async () => {
			starListNumber.value++
			const starName = 'Star-' + starListNumber.value.toString()
			selectedShapeName.value = starName
			//Get the scroll position of the canvas:
			const scrollTop = scrollContainer.value.scrollTop
			starList.value.push({
				id: starListNumber.toString(),
				x: 100,
				y: scrollTop + 100,
				numPoints: 5,
				innerRadius: 20,
				outerRadius: 50,
				fill: '#000000',
				stroke: '#000000',
				strokeWidth: 0,
				draggable: true,
				name: starName,
				opacity: 1,
				rotation: 0,
				scaleX: 1,
				scaleY: 1,
				shadowColor: '#000000',
				shadowBlur: 0,
				shadowOffsetX: 0,
				shadowOffsetY: 0,
				shadowOpacity: 0.5,
			})
			await Promise.resolve();
			updateStarTransformer();
			saveShapesToLocalStorage()
		}

		const addStarElementWithPointer = () => {
			starListNumber.value++
			const starName = 'Star-' + starListNumber.value.toString()

			selectedPointer.value = false
			selectedAddStarPointer.value = true

			//Listen to click event on stage: 
			stage.value.getNode().on('click', (e: Konva.KonvaEventObject<MouseEvent>) => {
				starList.value.push({
					id: starListNumber.toString(),
					x: e.evt.offsetX,
					y: e.evt.offsetY,
					numPoints: 5,
					innerRadius: 20,
					outerRadius: 50,
					fill: '#000000',
					stroke: '#000000',
					strokeWidth: 0,
					draggable: true,
					name: starName,
					opacity: 1,
					rotation: 0,
					scaleX: 1,
					scaleY: 1,
					shadowColor: '#000000',
					shadowBlur: 0,
					shadowOffsetX: 0,
					shadowOffsetY: 0,
					shadowOpacity: 0.5,
				})
				saveShapesToLocalStorage()
				//Remove event listener:
				stage.value.getNode().off('click')
				selectedAddStarPointer.value = false
				selectedPointer.value = true
			})
		}

		const updateTextTransformer = () => {
			const textTransformerNode = textTransformer.value?.getNode()
			if (selectedShapeName.value !== '' && selectedShapeName.value.split('-')[0] === 'Text') {
				const textTransformerStage = textTransformerNode.getStage()
				const selectedNode = textTransformerStage.findOne(
					(node: { name: () => string }) => {
						return node.name() === selectedShapeName.value
					},
				)
				if (selectedNode === textTransformerNode?.node()) {
					return
				}

				if (selectedNode) {
					textTransformerNode.nodes([selectedNode])
				} else {
					textTransformerNode.nodes([])
				}
			} else {
				textTransformerNode.nodes([])
			}
		}

		const updateImageTransformer = () => {
			const imageTransformerNode = imageTransformer.value?.getNode()
			if (selectedShapeName.value !== '' && selectedShapeName.value.split('-')[0] === 'Image') {
				const imageTransformerStage = imageTransformerNode.getStage()
				const selectedNode = imageTransformerStage.findOne(
					(node: { name: () => string }) => {
						return node.name() === selectedShapeName.value
					},
				)
				if (selectedNode === imageTransformerNode?.node()) {
					return
				}

				if (selectedNode) {
					imageTransformerNode.nodes([selectedNode])
				} else {
					imageTransformerNode.nodes([])
				}
			} else {
				imageTransformerNode.nodes([])
			}
		}

		const updateLineTransformer = () => {
			const lineTransformerNode = lineTransformer.value?.getNode()
			if (selectedShapeName.value !== '' && selectedShapeName.value.split('-')[0] === 'Line') {
				const lineTransformerStage = lineTransformerNode.getStage()
				const selectedNode = lineTransformerStage.findOne(
					(node: { name: () => string }) => {
						return node.name() === selectedShapeName.value
					},
				)
				if (selectedNode === lineTransformerNode?.node()) {
					return
				}

				if (selectedNode) {
					lineTransformerNode.nodes([selectedNode])
				} else {
					lineTransformerNode.nodes([])
				}
			} else {
				lineTransformerNode.nodes([])
			}
		}

		const updateRectangleTransformer = () => {
			const rectangleTransformerNode = rectangleTransformer.value?.getNode()
			if (selectedShapeName.value !== '' && selectedShapeName.value.split('-')[0] === 'Rectangle') {
				const rectangleTransformerStage = rectangleTransformerNode.getStage()
				const selectedNode = rectangleTransformerStage.findOne(
					(node: { name: () => string }) => {
						return node.name() === selectedShapeName.value
					},
				)
				if (selectedNode === rectangleTransformerNode?.node()) {
					return
				}

				if (selectedNode) {
					rectangleTransformerNode.nodes([selectedNode])
				} else {
					rectangleTransformerNode.nodes([])
				}
			} else {
				rectangleTransformerNode.nodes([])
			}
		}

		const updateCircleTransformer = () => {
			const circleTransformerNode = circleTransformer.value?.getNode()
			if (selectedShapeName.value !== '' && selectedShapeName.value.split('-')[0] === 'Circle') {
				const circleTransformerStage = circleTransformerNode.getStage()
				const selectedNode = circleTransformerStage.findOne(
					(node: { name: () => string }) => {
						return node.name() === selectedShapeName.value
					},
				)
				if (selectedNode === circleTransformerNode?.node()) {
					return
				}

				if (selectedNode) {
					circleTransformerNode.nodes([selectedNode])
				} else {
					circleTransformerNode.nodes([])
				}
			} else {
				circleTransformerNode.nodes([])
			}
		}

		const updatePolygonTransformer = () => {
			const polygonTransformerNode = polygonTransformer.value?.getNode()
			if (selectedShapeName.value !== '' && selectedShapeName.value.split('-')[0] === 'Polygon') {
				const polygonTransformerStage = polygonTransformerNode.getStage()
				const selectedNode = polygonTransformerStage.findOne(
					(node: { name: () => string }) => {
						return node.name() === selectedShapeName.value
					},
				)
				if (selectedNode === polygonTransformerNode?.node()) {
					return
				}

				if (selectedNode) {
					polygonTransformerNode.nodes([selectedNode])
				} else {
					polygonTransformerNode.nodes([])
				}
			} else {
				polygonTransformerNode.nodes([])
			}
		}

		const updateArrowTransformer = () => {
			const arrowTransformerNode = arrowTransformer.value?.getNode()
			if (selectedShapeName.value !== '' && selectedShapeName.value.split('-')[0] === 'Arrow') {
				const arrowTransformerStage = arrowTransformerNode.getStage()
				const selectedNode = arrowTransformerStage.findOne(
					(node: { name: () => string }) => {
						return node.name() === selectedShapeName.value
					},
				)
				if (selectedNode === arrowTransformerNode?.node()) {
					return
				}

				if (selectedNode) {
					arrowTransformerNode.nodes([selectedNode])
				} else {
					arrowTransformerNode.nodes([])
				}
			} else {
				arrowTransformerNode.nodes([])
			}
		}

		const updateStarTransformer = () => {
			const starTransformerNode = starTransformer.value?.getNode()
			if (selectedShapeName.value !== '' && selectedShapeName.value.split('-')[0] === 'Star') {
				const starTransformerStage = starTransformerNode.getStage()
				const selectedNode = starTransformerStage.findOne(
					(node: { name: () => string }) => {
						return node.name() === selectedShapeName.value
					},
				)
				if (selectedNode === starTransformerNode?.node()) {
					return
				}

				if (selectedNode) {
					starTransformerNode.nodes([selectedNode])
				} else {
					starTransformerNode.nodes([])
				}
			} else {
				starTransformerNode.nodes([])
			}
		}

		const handleStageMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
			// clicked on stage - clear selection
			if (e.target === e.target.getStage()) {
				selectedShapeName.value = ''
				showTextEditor.value = false
				updateTextTransformer()
				updateImageTransformer()
				updateLineTransformer()
				updateRectangleTransformer()
				updateCircleTransformer()
				updatePolygonTransformer()
				updateArrowTransformer()
				updateStarTransformer()
				return
			}

			// clicked on transformer - do nothing
			const clickedOnTransformer = e.target.getParent().className === 'Transformer'
			if (clickedOnTransformer) {
				return
			}

			const name = e.target.name()

			// find clicked shape by its name
			const text = textList.value.find((text) => {
				return text.name === name
			})
			const image = imageList.value.find((image) => {
				return image.name === name
			})
			const line = lineList.value.find((line) => {
				return line.name === name
			})
			const rectangle = rectangleList.value.find((rectangle) => {
				return rectangle.name === name
			})
			const circle = circleList.value.find((circle) => {
				return circle.name === name
			})
			const polygon = polygonList.value.find((polygon) => {
				return polygon.name === name
			})
			const arrow = arrowList.value.find((arrow) => {
				return arrow.name === name
			})
			const star = starList.value.find((star) => {
				return star.name === name
			})

			if (text) {
				selectedShapeName.value = name
			} else if (image || line || rectangle || circle || polygon || arrow || star){
				selectedShapeName.value = name
				showTextEditor.value = false
			} else {
				selectedShapeName.value = ''
				showTextEditor.value = false
			}
			updateTextTransformer()
			updateImageTransformer()
			updateLineTransformer()
			updateRectangleTransformer()
			updateCircleTransformer()
			updatePolygonTransformer()
			updateArrowTransformer()
			updateStarTransformer()
		}

		const handleTransformEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
			checkShapeLocation(e)


			const text = textList.value.find((r) => r.name === selectedShapeName.value)
			if (text) {
				text.x = e.target.x()
				text.y = e.target.y()
				text.rotation = e.target.rotation()
				text.scaleX = e.target.scaleX()
				text.scaleY = e.target.scaleY()
			}

			const image = imageList.value.find((r) => r.name === selectedShapeName.value)
			if (image) {
				image.x = e.target.x()
				image.y = e.target.y()
				image.rotation = e.target.rotation()
				image.width = e.target.width()
				image.height = e.target.height()
				e.target.scaleX(1)
				e.target.scaleY(1)
				image.scaleX = e.target.scaleX()
				image.scaleY = e.target.scaleY()
			}

			const line = lineList.value.find((r) => r.name === selectedShapeName.value)
			if (line) {
				line.x = e.target.x()
				line.y = e.target.y()
				line.rotation = e.target.rotation()
				line.scaleX = e.target.scaleX()
				line.scaleY = e.target.scaleY()
			}

			const rectangle = rectangleList.value.find((r) => r.name === selectedShapeName.value)
			if (rectangle) {
				rectangle.x = e.target.x()
				rectangle.y = e.target.y()
				rectangle.rotation = e.target.rotation()
				rectangle.width = e.target.width()
				rectangle.height = e.target.height()
				e.target.scaleX(1)
				e.target.scaleY(1)
				rectangle.scaleX = e.target.scaleX()
				rectangle.scaleY = e.target.scaleY()
			}

			const circle = circleList.value.find((r) => r.name === selectedShapeName.value)
			if (circle) {
				circle.x = e.target.x()
				circle.y = e.target.y()
				circle.radius = e.target.width() / 2
				circle.height = e.target.height()
				circle.width = e.target.width()
			}

			const polygon = polygonList.value.find((r) => r.name === selectedShapeName.value)
			if (polygon) {
				polygon.x = e.target.x()
				polygon.y = e.target.y()
				polygon.rotation = e.target.rotation()
				polygon.scaleX = e.target.scaleX()
				polygon.scaleY = e.target.scaleY()
			}

			const arrow = arrowList.value.find((r) => r.name === selectedShapeName.value)
			if (arrow) {
				arrow.x = e.target.x()
				arrow.y = e.target.y()
				arrow.rotation = e.target.rotation()
				e.target.scaleX(1)
				e.target.scaleY(1)
				arrow.scaleX = e.target.scaleX()
				arrow.scaleY = e.target.scaleY()
			}

			const star = starList.value.find((r) => r.name === selectedShapeName.value)
			if (star) {
				star.x = e.target.x()
				star.y = e.target.y()
				star.rotation = e.target.rotation()
				star.width = e.target.width()
				star.height = e.target.height()
				e.target.scaleX(1)
				e.target.scaleY(1)
				star.scaleX = e.target.scaleX()
				star.scaleY = e.target.scaleY()
			}
			saveShapesToLocalStorage()
		}

		const deleteShape = () => {
			const shape = selectedShapeName.value.split('-')[0]
			switch (shape) {
				case 'Text':
					textList.value = textList.value.filter((text) => {
						return text.name !== selectedShapeName.value
					})
					selectedShapeName.value = ''
					showTextEditor.value = false
					updateTextTransformer()
					saveShapesToLocalStorage()
					break
				case 'Image':
					imageList.value = imageList.value.filter((image) => {
						return image.name !== selectedShapeName.value
					})
					selectedShapeName.value = ''
					updateImageTransformer()
					saveShapesToLocalStorage()
					break
				case 'Line':
					lineList.value = lineList.value.filter((line) => {
						return line.name !== selectedShapeName.value
					})
					selectedShapeName.value = ''
					updateLineTransformer()
					saveShapesToLocalStorage()
					break
				case 'Rectangle':
					rectangleList.value = rectangleList.value.filter((rectangle) => {
						return rectangle.name !== selectedShapeName.value
					})
					selectedShapeName.value = ''
					updateRectangleTransformer()
					saveShapesToLocalStorage()
					break
				case 'Circle':
					circleList.value = circleList.value.filter((circle) => {
						return circle.name !== selectedShapeName.value
					})
					selectedShapeName.value = ''
					updateCircleTransformer()
					saveShapesToLocalStorage()
					break
				case 'Polygon':
					polygonList.value = polygonList.value.filter((polygon) => {
						return polygon.name !== selectedShapeName.value
					})
					selectedShapeName.value = ''
					updatePolygonTransformer()
					saveShapesToLocalStorage()
					break
				case 'Arrow':
					arrowList.value = arrowList.value.filter((arrow) => {
						return arrow.name !== selectedShapeName.value
					})
					selectedShapeName.value = ''
					updateArrowTransformer()
					saveShapesToLocalStorage()
					break
				case 'Star':
					starList.value = starList.value.filter((star) => {
						return star.name !== selectedShapeName.value
					})
					selectedShapeName.value = ''
					updateStarTransformer()
					saveShapesToLocalStorage()
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
			if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
				isUserTyping.value = true
				return true
			} else {
				isUserTyping.value = false
				return false
			}
		}

		const updateStylingText = () => {
			const text = textList.value.find((text) => {
				return text.name === selectedShapeName.value
			})
			if (text) {
				text.fontFamily = userInputText.fontFamily
				text.fontSize = userInputText.fontSize
				if (userInputText.isFontBold && userInputText.isFontItalic) {
					text.fontStyle = 'bold italic'
				} else if (userInputText.isFontBold) {
					text.fontStyle = 'bold'
				} else if (userInputText.isFontItalic) {
					text.fontStyle = 'italic'
				} else {
					text.fontStyle = 'normal'
				}
				if (userInputText.isFontUnderlined) {
					text.textDecoration = 'underline'
				} else {
					text.textDecoration = ''
				}
				text.lineHeight = userInputText.lineHeight
				text.align = userInputText.textAlign
				text.fill = userInputText.textColor
				text.opacity = userInputText.textColorOpacity / 100
				text.stroke = userInputText.textBorderColor
				text.strokeWidth = userInputText.textBorder
				text.shadowOffsetX = userInputText.textShadowX
				text.shadowOffsetY = userInputText.textShadowY
				text.shadowBlur = userInputText.textShadowBlur
				text.shadowColor = userInputText.textShadowColor
				text.shadowOpacity = userInputText.textShadowColorOpacity / 100
				text.text = userInputText.text
			}
			saveShapesToLocalStorage()
		}

		const updateStylingImage = () => {
			const image = imageList.value.find((image) => {
				return image.name === selectedShapeName.value
			})
			if (image) {
				image.opacity = userInputImage.imageOpacity / 100
				image.stroke = userInputImage.imageBorderColor
				image.strokeWidth = userInputImage.imageBorder
				image.shadowOffsetX = userInputImage.imageShadowX
				image.shadowOffsetY = userInputImage.imageShadowY
				image.shadowBlur = userInputImage.imageShadowBlur
				image.shadowColor = userInputImage.imageShadowColor
				image.shadowOpacity = userInputImage.imageShadowColorOpacity / 100
				image.width = userInputImage.imageWidth
				image.height = userInputImage.imageHeight
			}
			saveShapesToLocalStorage()
		}

		const updateStylingLine = () => {
			const line = lineList.value.find((line) => {
				return line.name === selectedShapeName.value
			})
			if (line) {
				line.stroke = userInputLine.lineColor
				line.strokeWidth = userInputLine.lineWidth
				line.opacity = userInputLine.lineColorOpacity / 100
				line.shadowOffsetX = userInputLine.lineShadowX
				line.shadowOffsetY = userInputLine.lineShadowY
				line.shadowBlur = userInputLine.lineShadowBlur
				line.shadowColor = userInputLine.lineShadowColor
				line.shadowOpacity = userInputLine.lineShadowColorOpacity / 100
				line.points[2] = userInputLine.lineLength
			}
			saveShapesToLocalStorage()
		}

		const updateStylingRectangle = () => {
			const rectangle = rectangleList.value.find((rectangle) => {
				return rectangle.name === selectedShapeName.value
			})
			if (rectangle) {
				rectangle.stroke = userInputRectangle.rectangleBorderColor
				rectangle.strokeWidth = userInputRectangle.rectangleBorder
				rectangle.opacity = userInputRectangle.rectangleColorOpacity / 100
				rectangle.shadowOffsetX = userInputRectangle.rectangleShadowX
				rectangle.shadowOffsetY = userInputRectangle.rectangleShadowY
				rectangle.shadowBlur = userInputRectangle.rectangleShadowBlur
				rectangle.shadowColor = userInputRectangle.rectangleShadowColor
				rectangle.shadowOpacity =
					userInputRectangle.rectangleShadowColorOpacity / 100
				rectangle.width = userInputRectangle.rectangleWidth
				rectangle.height = userInputRectangle.rectangleHeight
				rectangle.fill = userInputRectangle.rectangleColor
			}
			saveShapesToLocalStorage()
		}

		const updateStylingCircle = () => {
			const circle = circleList.value.find((circle) => {
				return circle.name === selectedShapeName.value
			})
			if (circle) {
				circle.stroke = userInputCircle.circleBorderColor
				circle.strokeWidth = userInputCircle.circleBorder
				circle.opacity = userInputCircle.circleColorOpacity / 100
				circle.shadowOffsetX = userInputCircle.circleShadowX
				circle.shadowOffsetY = userInputCircle.circleShadowY
				circle.shadowBlur = userInputCircle.circleShadowBlur
				circle.shadowColor = userInputCircle.circleShadowColor
				circle.shadowOpacity = userInputCircle.circleShadowColorOpacity / 100
				circle.radius = userInputCircle.circleRadius
				circle.fill = userInputCircle.circleColor
			}
			saveShapesToLocalStorage()
		}

		const updateStylingPolygon = () => {
			const polygon = polygonList.value.find((polygon) => {
				return polygon.name === selectedShapeName.value
			})
			if (polygon) {
				polygon.stroke = userInputPolygon.polygonBorderColor
				polygon.strokeWidth = userInputPolygon.polygonBorder
				polygon.opacity = userInputPolygon.polygonColorOpacity / 100
				polygon.shadowOffsetX = userInputPolygon.polygonShadowX
				polygon.shadowOffsetY = userInputPolygon.polygonShadowY
				polygon.shadowBlur = userInputPolygon.polygonShadowBlur
				polygon.shadowColor = userInputPolygon.polygonShadowColor
				polygon.shadowOpacity = userInputPolygon.polygonShadowColorOpacity / 100
				polygon.radius = userInputPolygon.polygonRadius
				polygon.fill = userInputPolygon.polygonColor
				polygon.sides = userInputPolygon.polygonSides
			}
			saveShapesToLocalStorage()
		}

		const updateStylingArrow = () => {
			const arrow = arrowList.value.find((arrow) => {
				return arrow.name === selectedShapeName.value
			})
			if (arrow) {
				arrow.stroke = userInputArrow.arrowStrokeColor
				arrow.strokeWidth = userInputArrow.arrowStroke
				arrow.opacity = userInputArrow.arrowStrokeColorOpacity / 100
				arrow.shadowOffsetX = userInputArrow.arrowShadowX
				arrow.shadowOffsetY = userInputArrow.arrowShadowY
				arrow.shadowBlur = userInputArrow.arrowShadowBlur
				arrow.shadowColor = userInputArrow.arrowShadowColor
				arrow.shadowOpacity = userInputArrow.arrowShadowColorOpacity / 100
				arrow.points[2] = userInputArrow.arrowLength
				arrow.fill = userInputArrow.arrowStrokeColor
			}
			saveShapesToLocalStorage()
		}

		const updateStylingStar = () => {
			const star = starList.value.find((star) => {
				return star.name === selectedShapeName.value
			})
			if (star) {
				star.stroke = userInputStar.starBorderColor
				star.strokeWidth = userInputStar.starBorder
				star.opacity = userInputStar.starColorOpacity / 100
				star.shadowOffsetX = userInputStar.starShadowX
				star.shadowOffsetY = userInputStar.starShadowY
				star.shadowBlur = userInputStar.starShadowBlur
				star.shadowColor = userInputStar.starShadowColor
				star.shadowOpacity = userInputStar.starShadowColorOpacity / 100
				star.fill = userInputStar.starColor
				star.innerRadius = userInputStar.starInnerRadius
				star.outerRadius = userInputStar.starOuterRadius
				star.numPoints = userInputStar.starPoints
			}
			saveShapesToLocalStorage()
		}

		watch(selectedShapeName, () => {
			console.log('selectedShapeName: ' + selectedShapeName.value)
			const text = textList.value.find((text) => {
				return text.name === selectedShapeName.value
			})
			if (text) {
				userInputText.fontFamily = text.fontFamily
				userInputText.fontSize = text.fontSize
				userInputText.textAlign = text.align
				userInputText.isFontBold = text.fontStyle.includes('bold')
				userInputText.isFontItalic = text.fontStyle.includes('italic')
				userInputText.isFontUnderlined = text.textDecoration.includes('underline')
				userInputText.lineHeight = text.lineHeight
				userInputText.textColor = text.fill
				userInputText.textColorOpacity = text.opacity * 100
				userInputText.textBorderColor = text.stroke
				userInputText.textBorder = text.strokeWidth
				userInputText.textShadowX = text.shadowOffsetX
				userInputText.textShadowY = text.shadowOffsetY
				userInputText.textShadowBlur = text.shadowBlur
				userInputText.textShadowColor = text.shadowColor
				userInputText.textShadowColorOpacity = text.shadowOpacity * 100
				if (text.strokeWidth > 0) {
					showBorderDetails.value = true
				} else {
					showBorderDetails.value = false
				}
				if (text.shadowOffsetX > 0 || text.shadowOffsetY > 0 || text.shadowBlur > 0) {
					showShadowDetails.value = true
				} else {
					showShadowDetails.value = false
				}
				userInputText.text = text.text
				return
			}
			const image = imageList.value.find((image) => {
				return image.name === selectedShapeName.value
			})
			if (image) {
				userInputImage.imageOpacity = image.opacity * 100
				userInputImage.imageBorderColor = image.stroke
				userInputImage.imageBorder = image.strokeWidth
				userInputImage.imageShadowX = image.shadowOffsetX
				userInputImage.imageShadowY = image.shadowOffsetY
				userInputImage.imageShadowBlur = image.shadowBlur
				userInputImage.imageShadowColor = image.shadowColor
				userInputImage.imageShadowColorOpacity = image.shadowOpacity * 100
				userInputImage.imageWidth = image.width
				userInputImage.imageHeight = image.height
				if (image.strokeWidth > 0) {
					showBorderDetails.value = true
				} else {
					showBorderDetails.value = false
				}
				if (image.shadowOffsetX > 0 || image.shadowOffsetY > 0 || image.shadowBlur > 0) {
					showShadowDetails.value = true
				} else {
					showShadowDetails.value = false
				}
				return
			}
			const line = lineList.value.find((line) => {
				return line.name === selectedShapeName.value
			})
			if (line) {
				userInputLine.lineLength = line.points[2]
				userInputLine.lineColor = line.stroke
				userInputLine.lineWidth = line.strokeWidth
				userInputLine.lineColorOpacity = line.opacity * 100
				userInputLine.lineShadowX = line.shadowOffsetX
				userInputLine.lineShadowY = line.shadowOffsetY
				userInputLine.lineShadowBlur = line.shadowBlur
				userInputLine.lineShadowColor = line.shadowColor
				userInputLine.lineShadowColorOpacity = line.shadowOpacity * 100
				if (line.strokeWidth > 0) {
					showBorderDetails.value = true
				} else {
					showBorderDetails.value = false
				}
				if (line.shadowOffsetX > 0 || line.shadowOffsetY > 0 || line.shadowBlur > 0) {
					showShadowDetails.value = true
				} else {
					showShadowDetails.value = false
				}
				return
			}
			const rectangle = rectangleList.value.find((rectangle) => {
				return rectangle.name === selectedShapeName.value
			})
			if (rectangle) {
				userInputRectangle.rectangleColor = rectangle.fill
				userInputRectangle.rectangleColorOpacity = rectangle.opacity * 100
				userInputRectangle.rectangleWidth = rectangle.width
				userInputRectangle.rectangleHeight = rectangle.height
				userInputRectangle.rectangleShadowX = rectangle.shadowOffsetX
				userInputRectangle.rectangleShadowY = rectangle.shadowOffsetY
				userInputRectangle.rectangleShadowBlur = rectangle.shadowBlur
				userInputRectangle.rectangleShadowColor = rectangle.shadowColor
				userInputRectangle.rectangleShadowColorOpacity = rectangle.shadowOpacity * 100
				userInputRectangle.rectangleBorderColor = rectangle.stroke
				userInputRectangle.rectangleBorder = rectangle.strokeWidth
				if (rectangle.strokeWidth > 0) {
					showBorderDetails.value = true
				} else {
					showBorderDetails.value = false
				}
				if (rectangle.shadowOffsetX > 0 || rectangle.shadowOffsetY > 0 || rectangle.shadowBlur > 0) {
					showShadowDetails.value = true
				} else {
					showShadowDetails.value = false
				}
				return
			}

			const circle = circleList.value.find((circle) => {
				return circle.name === selectedShapeName.value
			})
			if (circle) {
				userInputCircle.circleColor = circle.fill
				userInputCircle.circleColorOpacity = circle.opacity * 100
				userInputCircle.circleRadius = circle.radius
				userInputCircle.circleShadowX = circle.shadowOffsetX
				userInputCircle.circleShadowY = circle.shadowOffsetY
				userInputCircle.circleShadowBlur = circle.shadowBlur
				userInputCircle.circleShadowColor = circle.shadowColor
				userInputCircle.circleShadowColorOpacity = circle.shadowOpacity * 100
				userInputCircle.circleBorderColor = circle.stroke
				userInputCircle.circleBorder = circle.strokeWidth
				if (circle.strokeWidth > 0) {
					showBorderDetails.value = true
				} else {
					showBorderDetails.value = false
				}
				if (circle.shadowOffsetX > 0 || circle.shadowOffsetY > 0 || circle.shadowBlur > 0) {
					showShadowDetails.value = true
				} else {
					showShadowDetails.value = false
				}
				return
			}

			const polygon = polygonList.value.find((polygon) => {
				return polygon.name === selectedShapeName.value
			})
			if (polygon) {
				userInputPolygon.polygonColor = polygon.fill
				userInputPolygon.polygonColorOpacity = polygon.opacity * 100
				userInputPolygon.polygonShadowX = polygon.shadowOffsetX
				userInputPolygon.polygonShadowY = polygon.shadowOffsetY
				userInputPolygon.polygonShadowBlur = polygon.shadowBlur
				userInputPolygon.polygonShadowColor = polygon.shadowColor
				userInputPolygon.polygonShadowColorOpacity = polygon.shadowOpacity * 100
				userInputPolygon.polygonBorderColor = polygon.stroke
				userInputPolygon.polygonBorder = polygon.strokeWidth
				userInputPolygon.polygonSides = polygon.sides
				if (polygon.strokeWidth > 0) {
					showBorderDetails.value = true
				} else {
					showBorderDetails.value = false
				}
				if (polygon.shadowOffsetX > 0 || polygon.shadowOffsetY > 0 || polygon.shadowBlur > 0) {
					showShadowDetails.value = true
				} else {
					showShadowDetails.value = false
				}
				return
			}

			const arrow = arrowList.value.find((arrow) => {
				return arrow.name === selectedShapeName.value
			})
			if (arrow) {
				userInputArrow.arrowLength = arrow.points[2]
				userInputArrow.arrowStroke = arrow.strokeWidth
				userInputArrow.arrowStrokeColor = arrow.stroke
				userInputArrow.arrowStrokeColorOpacity = arrow.opacity * 100
				userInputArrow.arrowShadowX = arrow.shadowOffsetX
				userInputArrow.arrowShadowY = arrow.shadowOffsetY
				userInputArrow.arrowShadowBlur = arrow.shadowBlur
				userInputArrow.arrowShadowColor = arrow.shadowColor
				userInputArrow.arrowShadowColorOpacity = arrow.shadowOpacity * 100
				userInputArrow.arrowBorderColor = arrow.stroke
				userInputArrow.arrowBorder = arrow.strokeWidth
				if (arrow.shadowOffsetX > 0 || arrow.shadowOffsetY > 0 || arrow.shadowBlur > 0) {
					showShadowDetails.value = true
				} else {
					showShadowDetails.value = false
				}
				return
			}
			
			const star = starList.value.find((star) => {
				return star.name === selectedShapeName.value
			})

			if (star) {
				userInputStar.starColor = star.fill
				userInputStar.starColorOpacity = star.opacity * 100
				userInputStar.starShadowX = star.shadowOffsetX
				userInputStar.starShadowY = star.shadowOffsetY
				userInputStar.starShadowBlur = star.shadowBlur
				userInputStar.starShadowColor = star.shadowColor
				userInputStar.starShadowColorOpacity = star.shadowOpacity * 100
				userInputStar.starBorderColor = star.stroke
				userInputStar.starBorder = star.strokeWidth
				userInputStar.starInnerRadius = star.innerRadius
				userInputStar.starOuterRadius = star.outerRadius
				userInputStar.starPoints = star.numPoints
				if (star.strokeWidth > 0) {
					showBorderDetails.value = true
				} else {
					showBorderDetails.value = false
				}
				if (star.shadowOffsetX > 0 || star.shadowOffsetY > 0 || star.shadowBlur > 0) {
					showShadowDetails.value = true
				} else {
					showShadowDetails.value = false
				}
				return
			}

		})

		//Update the height of the canvas if there is any shape at the bottom of the canvas
		const checkShapeLocation = (e: Konva.KonvaEventObject<DragEvent>) => {
			const shapeY = e.target.y() + e.target.height() //bottom of the element
			if (shapeY > (configKonva.value.height - 200)) {
				//Update height of the canvas
				configKonva.value.height = configKonva.value.height + 200
			}

			//check if there is any shape at the bottom of the canvas:
			const shapeList: any[] = []
			stage.value.getNode().children[0].children.forEach((shape: Konva.Shape) => {
				if ((shape.y() + shape.height()) > (configKonva.value.height - 400) && shape.name() !== 'guideline' && shape.className !== 'Transformer') {
					shapeList.push(shape)
				}
			})
			if (shapeList.length === 0 && configKonva.value.height > originalHeight) {
				//Update height of the canvas
				configKonva.value.height = configKonva.value.height - 200
			}
			saveShapesToLocalStorage() //Save height to local storage
		}

		const selectImage = () => {
			fileInput.value.click()
		}

		const uploadImage = (e: Event) => {
			const target = e.target as HTMLInputElement
			const file = target.files?.[0]
			const scrollTop = scrollContainer.value.scrollTop
			if (file) {
				const reader = new FileReader()
				reader.onload = (e) => {
					const dataURL = e.target?.result
					if (dataURL) {
						const image = new window.Image()
						image.src = dataURL as string
						imageListNumber.value++
						const fileName = 'Image-' + imageListNumber.value
						image.onload = () => {
							imageList.value.push({
								image: image,
								name: fileName,
								x: 100,
								y: scrollTop + 100,
								width: image.width / 2,
								height: image.height / 2,
								draggable: true,
								opacity: 1,
								stroke: '#000000',
								strokeWidth: 0,
								shadowOffsetX: 0,
								shadowOffsetY: 0,
								shadowBlur: 0,
								shadowColor: '#000000',
								shadowOpacity: 0.5,
								dataURLString: dataURL as string,
							})
						}
					}
				}
				reader.readAsDataURL(file)
			}
			saveShapesToLocalStorage()
		}

		const handleTransformLine = (e: Konva.KonvaEventObject<DragEvent>) => {
			const line = e.target as Konva.Line
			const lineName = line.name()
			const lineObject = lineList.value.find((line) => {
				return line.name === lineName
			})
			if (lineObject) {
				lineObject.points[2] = Math.round(line.points()[2] * line.scaleX())
				userInputLine.lineLength = Math.round(lineObject.points[2])
			}
		}

		const handleTransformImage = (e: Konva.KonvaEventObject<DragEvent>) => {
			const image = e.target as Konva.Image
			const imageName = image.name()
			const imageObject = imageList.value.find((image) => {
				return image.name === imageName
			})
			if (imageObject) {
				imageObject.width = Math.round(image.width() * image.scaleX())
				imageObject.height = Math.round(image.height() * image.scaleY())
				userInputImage.imageWidth = Math.round(imageObject.width)
				userInputImage.imageHeight = Math.round(imageObject.height)
			}
		}

		const handleTransformRectangle = (e: Konva.KonvaEventObject<DragEvent>) => {
			const rectangle = e.target as Konva.Rect
			const rectangleName = rectangle.name()
			const rectangleObject = rectangleList.value.find((rectangle) => {
				return rectangle.name === rectangleName
			})
			if (rectangleObject) {
				rectangleObject.width = Math.round(rectangle.width() * rectangle.scaleX())
				rectangleObject.height = Math.round(rectangle.height() * rectangle.scaleY())
				userInputRectangle.rectangleWidth = Math.round(rectangleObject.width)
				userInputRectangle.rectangleHeight = Math.round(rectangleObject.height)
			}
		}

		const handleTransformCircle = (e: Konva.KonvaEventObject<DragEvent>) => {
			const circle = e.target as Konva.Circle
			const circleName = circle.name()
			const circleObject = circleList.value.find((circle) => {
				return circle.name === circleName
			})
			if (circleObject) {
				circleObject.radius = Math.round(circle.radius() * circle.scaleX())
				userInputCircle.circleRadius = Math.round(circleObject.radius)
			}
		}

		const handleTransformPolygon = (e: Konva.KonvaEventObject<DragEvent>) => {
			const polygon = e.target as Konva.RegularPolygon
			const polygonName = polygon.name()
			const polygonObject = polygonList.value.find((polygon) => {
				return polygon.name === polygonName
			})
			if (polygonObject) {
				polygonObject.radius = Math.round(polygon.radius() * polygon.scaleX())
				userInputPolygon.polygonRadius = Math.round(polygonObject.radius)
				userInputPolygon.polygonSides = polygonObject.sides
			}
		}

		const handleTransformArrow = (e: Konva.KonvaEventObject<DragEvent>) => {
			const arrow = e.target as Konva.Arrow
			const arrowName = arrow.name()
			const arrowObject = arrowList.value.find((arrow) => {
				return arrow.name === arrowName
			})
			if (arrowObject) {
				arrowObject.points[2] = Math.round(arrow.points()[2] * arrow.scaleX())
				userInputArrow.arrowLength = Math.round(arrowObject.points[2])
			}
		}

		const handleLineLengthChange = () => {
			const lineTransformerNode = lineTransformer.value?.getNode()
			lineTransformerNode?.forceUpdate()
		}

		const handlePolygonSidesChange = () => {
			const polygonTransformerNode = polygonTransformer.value?.getNode()
			polygonTransformerNode?.forceUpdate()
		}

		const handleArrowLengthChange = () => {
			const arrowTransformerNode = arrowTransformer.value?.getNode()
			arrowTransformerNode?.forceUpdate()
		}

		const handleStarPointsChange = () => {
			const starTransformerNode = starTransformer.value?.getNode()
			starTransformerNode?.forceUpdate()
		}


		// ******* Snap with guidelines functions *******
		//Snap shape positions
		const getGuidelines = (skipShape: any) => {
			//Stage borders & center of stage
			var vertical = [0, stage.value.getNode().width() / 2, stage.value.getNode().width()]
			var horizontal = [0, stage.value.getNode().height() / 2, stage.value.getNode().height()]

			//Find all objects on stage and skip the current object and transformers
			stage.value.getNode().children[0].children.forEach((guideItem: any) => {
				if (guideItem === skipShape || guideItem.className === 'Transformer') {
					return
				}
				var box = guideItem.getClientRect();

				//Object borders & center of object
				vertical.push([box.x, box.x + box.width, box.x + box.width / 2]);
		  		horizontal.push([box.y, box.y + box.height, box.y + box.height / 2]);
			})

			return {
				vertical: vertical.flat(),
				horizontal: horizontal.flat(),
			}
		}

		//Snap points objects
		const getObjectSnappingEdges = (node: any) => {
			var box = node.getClientRect()
			var absolutePosition = node.getAbsolutePosition()

			return {
				vertical: [
					{
						guide: Math.round(box.x),
						offset: Math.round(absolutePosition.x - box.x),
						snap: 'start',
					},
					{
						guide: Math.round(box.x + box.width / 2),
						offset: Math.round(absolutePosition.x - box.x - box.width / 2),
						snap: 'center',
					},
					{
						guide: Math.round(box.x + box.width),
						offset: Math.round(absolutePosition.x - box.x - box.width),
						snap: 'end',
					},
          		],
				  horizontal: [
					{
						guide: Math.round(box.y),
						offset: Math.round(absolutePosition.y - box.y),
						snap: 'start',
					},
					{
						guide: Math.round(box.y + box.height / 2),
						offset: Math.round(absolutePosition.y - box.y - box.height / 2),
						snap: 'center',
					},
					{
						guide: Math.round(box.y + box.height),
						offset: Math.round(absolutePosition.y - box.y - box.height),
						snap: 'end',
					},
          		],
			}
		}

		//Find all snapping possibilities
		const getGuides = (lineGuideStops: any, itemBounds: any) => {
			var resultV: { lineGuide: any; diff: number; snap: any; offset: any }[] = [];
        	var resultH: { lineGuide: any; diff: number; snap: any; offset: any }[] = [];

			lineGuideStops.vertical.forEach((lineGuide: any) => {
				itemBounds.vertical.forEach((itemBound: any) => {
					var diff = Math.abs(lineGuide - itemBound.guide)
					//Snap if the difference between a guideline and an object is less than 5
					if (diff < 5) { // 5 = guideline offset
						resultV.push({
							lineGuide: lineGuide,
							diff: diff,
							snap: itemBound.snap,
							offset: itemBound.offset,
						})
					}
				})
			});

			lineGuideStops.horizontal.forEach((lineGuide: any) => {
				itemBounds.horizontal.forEach((itemBound: any) => {
					var diff = Math.abs(lineGuide - itemBound.guide)
					//Snap if the difference between a guideline and an object is less than 5
					if (diff < 5) { // 5 = guideline offset
						resultH.push({
							lineGuide: lineGuide,
							diff: diff,
							snap: itemBound.snap,
							offset: itemBound.offset,
						})
					}
				})
			});

			var guides = [];

			//Find the closest snap point
			var closestV = resultV.sort((a: any, b: any) => {
				return a.diff - b.diff
			})[0]
			var closestH = resultH.sort((a: any, b: any) => {
				return a.diff - b.diff
			})[0]

			if (closestV) {
				guides.push({
					lineGuide: closestV.lineGuide,
					offset: closestV.offset,
					snap: closestV.snap,
					orientation: 'vertical',
				})
			}
			if (closestH) {
				guides.push({
					lineGuide: closestH.lineGuide,
					offset: closestH.offset,
					snap: closestH.snap,
					orientation: 'horizontal',
				})
			}
			return guides
		}

		//Draw the guidelines
		const drawGuides = (guides: any) => {
			guides.forEach((lg: any) => {
				if (lg.orientation === 'horizontal') {
					//Draw horizontal line
					var line = new Konva.Line({
						points: [-6000, 0, 6000, 0],
						stroke: '#2563EB',
						strokeWidth: 1,
						name: 'guideline',
						dash: [4, 6],
					})
					//Add line to layer
					layer.value.getNode().add(line)
					//Set position
					line.position({
						x: 0,
						y: lg.lineGuide,
					})
				} else if (lg.orientation === 'vertical') {
					//Draw vertical line
					var line = new Konva.Line({
						points: [0, -6000, 0, 6000],
						stroke: '#2563EB',
						strokeWidth: 1,
						name: 'guideline',
						dash: [4, 6],
					});
					//Add line to layer
					layer.value.getNode().add(line);
					//Set position
					line.position({
						x: lg.lineGuide,
						y: 0,
					})
				}
			})
		}

		const showGuidelines = (e: Konva.KonvaEventObject<DragEvent>) => {
			//Select the shape and not the transformer:
			if (e.target === rectangleTransformer.value.getNode() || e.target === circleTransformer.value.getNode() || e.target === polygonTransformer.value.getNode() || e.target === arrowTransformer.value.getNode() || e.target === starTransformer.value.getNode() || e.target === lineTransformer.value.getNode() || e.target === imageTransformer.value.getNode() || e.target === textTransformer.value.getNode()) {
				return
			}

			//Clear all previous lines on screen
			layer.value.getNode().find('.guideline').forEach((line: any) => {
				line.destroy()
			})

			//Find possible snapping lines
			var lineGuideStops = getGuidelines(e.target)
			var itemBounds = getObjectSnappingEdges(e.target)

			//Find the closest snap point
			var guides = getGuides(lineGuideStops, itemBounds)

			if (!guides.length) {
				return
			}

			//Draw the guidelines
			drawGuides(guides)

			var absolutePosition = e.target.absolutePosition()
			//Force the object to snap to the closest snap point
			guides.forEach((lg: any) => {
				switch (lg.snap) {
					case 'start': {
						switch (lg.orientation) {
							case 'vertical': {
								absolutePosition.x = lg.lineGuide + lg.offset
								break
							}
							case 'horizontal': {
								absolutePosition.y = lg.lineGuide + lg.offset
								break
							}
						}
						break
					}
					case 'center': {
						switch (lg.orientation) {
							case 'vertical': {
								absolutePosition.x = lg.lineGuide + lg.offset
								break
							}
							case 'horizontal': {
								absolutePosition.y = lg.lineGuide + lg.offset
								break
							}
						}
						break
					}
					case 'end': {
						switch (lg.orientation) {
							case 'vertical': {
								absolutePosition.x = lg.lineGuide + lg.offset
								break
							}
							case 'horizontal': {
								absolutePosition.y = lg.lineGuide + lg.offset
								break
							}
						}
						break
					}
				}
			})
			e.target.absolutePosition(absolutePosition)
		}

		const handleDragEndLayer = (e: Konva.KonvaEventObject<DragEvent>) => {
			//Clear all previous lines on screen
			layer.value.getNode().find('.guideline').forEach((line: any) => {
				line.destroy()
			})
		}

		const moveUp = () => {
			if (selectedShapeName.value !== '') {
				const shape = layer.value.getNode().findOne('.' + selectedShapeName.value)
				shape.moveUp()
				layer.value.getNode().batchDraw()

				//move all transformers to the top
				rectangleTransformer.value.getNode().moveToTop()
				circleTransformer.value.getNode().moveToTop()
				polygonTransformer.value.getNode().moveToTop()
				arrowTransformer.value.getNode().moveToTop()
				starTransformer.value.getNode().moveToTop()
				lineTransformer.value.getNode().moveToTop()
				imageTransformer.value.getNode().moveToTop()
				textTransformer.value.getNode().moveToTop()
			}
		}

		const moveDown = () => {
			if (selectedShapeName.value !== '') {
				const shape = layer.value.getNode().findOne('.' + selectedShapeName.value)
				shape.moveDown()
				layer.value.getNode().batchDraw()
			}
		}

		const saveShapesToLocalStorage = () => {
			const allShapes: any = []
			textList.value.forEach((text: any) => {
				allShapes.push(text)
			})
			imageList.value.forEach((image: any) => {
				allShapes.push(image)
			})
			lineList.value.forEach((line: any) => {
				allShapes.push(line)
			})
			rectangleList.value.forEach((rectangle: any) => {
				allShapes.push(rectangle)
			})
			circleList.value.forEach((circle: any) => {
				allShapes.push(circle)
			})
			polygonList.value.forEach((polygon: any) => {
				allShapes.push(polygon)
			})
			arrowList.value.forEach((arrow: any) => {
				allShapes.push(arrow)
			})
			starList.value.forEach((star: any) => {
				allShapes.push(star)
			})
			localStorage.setItem('shapes', JSON.stringify(allShapes))
			localStorage.setItem('heightStage', configKonva.value.height.toString())
			localStorage.setItem('widthStage', configKonva.value.width.toString())
		}

		//Load the shapes from local storage on mounted:
		onMounted(() => {
			const shapes = localStorage.getItem('shapes') || '[]'
			if (shapes) {
				const shapesArray = JSON.parse(shapes)
				shapesArray.forEach((shape: any) => {
					if (shape.name.split('-')[0] == 'Text') {
						const numberList = shape.name.split('-')[1]
						if (parseInt(numberList) > textListNumber.value) {
							textListNumber.value = parseInt(numberList)
						}
						textList.value.push(shape)
					} else if (shape.name.split('-')[0] == 'Image') {
						const img = new window.Image()
						img.src = shape.dataURLString
						img.onload = () => {
							shape.image = img
							const numberList = shape.name.split('-')[1]
							if (parseInt(numberList) > imageListNumber.value) {
								imageListNumber.value = parseInt(numberList)
							}
							imageList.value.push(shape)
						}
					} else if (shape.name.split('-')[0] == 'Line') {
						const numberList = shape.name.split('-')[1]
						if (parseInt(numberList) > lineListNumber.value) {
							lineListNumber.value = parseInt(numberList)
						}
						lineList.value.push(shape)
					} else if (shape.name.split('-')[0] == 'Arrow') {
						const numberList = shape.name.split('-')[1]
						if (parseInt(numberList) > arrowListNumber.value) {
							arrowListNumber.value = parseInt(numberList)
						}
						arrowList.value.push(shape)
					} else if (shape.name.split('-')[0] == 'Star') {
						const numberList = shape.name.split('-')[1]
						if (parseInt(numberList) > starListNumber.value) {
							starListNumber.value = parseInt(numberList)
						}
						starList.value.push(shape)
					} else if (shape.name.split('-')[0] == 'Circle') {
						const numberList = shape.name.split('-')[1]
						if (parseInt(numberList) > circleListNumber.value) {
							circleListNumber.value = parseInt(numberList)
						}
						circleList.value.push(shape)
					} else if (shape.name.split('-')[0] == 'Rectangle') {
						const numberList = shape.name.split('-')[1]
						if (parseInt(numberList) > rectangleListNumber.value) {
							rectangleListNumber.value = parseInt(numberList)
						}
						rectangleList.value.push(shape)
					} else if (shape.name.split('-')[0] == 'Polygon') {
						const numberList = shape.name.split('-')[1]
						if (parseInt(numberList) > polygonListNumber.value) {
							polygonListNumber.value = parseInt(numberList)
						}
						polygonList.value.push(shape)
					}
				})
			}
			const stageHeight = localStorage.getItem('heightStage') || ''
            if (stageHeight) {
                configKonva.value.height = parseInt(stageHeight)
            }
		})

		const previewPageWebsite = () => {
			router.push({
				path: 'preview',
			})
		}

		return {
			configKonva,
			setPage,
			isPageSelectorOpen,
			selectedPage,
			toggleIsPageSelectorOpen,
			addTextElementToCanvas,
			textList,
			handleTransformEnd,
			handleStageMouseDown,
			textTransformer,
			layer,
			stage,
			deleteShape,
			selectedShapeName,
			userInputText,
			alignText,
			showBorderDetails,
			showShadowDetails,
			updateStylingText,
			showTextEditor,
			uploadImage,
			selectImage,
			fileInput,
			imageList,
			imageTransformer,
			userInputImage,
			updateStylingImage, 
			lineList,
			addLineElementToCanvas,
			lineTransformer,
			userInputLine,
			updateStylingLine,
			updateLineTransformer,
			handleTransformLine,
			handleLineLengthChange,
			handleTransformImage,
			showShapesButton,
			addRectangleToCanvas,
			rectangleList,
			rectangleTransformer,
			userInputRectangle,
			updateStylingRectangle,
			handleTransformRectangle,
			circleList,
			addCircleToCanvas,
			circleTransformer,
			userInputCircle,
			updateStylingCircle,
			polygonTransformer,
			polygonList,
			addPolygonToCanvas,
			updateStylingPolygon,
			userInputPolygon,
			handlePolygonSidesChange,
			handleTransformPolygon,
			handleTransformCircle,
			arrowList,
			addArrowToCanvas,
			arrowTransformer,
			updateStylingArrow,
			handleTransformArrow,
			handleArrowLengthChange,
			userInputArrow,
			starList,
			addStarToCanvas,
			starTransformer,
			updateStylingStar,
			handleStarPointsChange,
			userInputStar,
			showGuidelines,
			handleDragEndLayer,
			scrollContainer,
			moveUp,
			moveDown,
			saveShapesToLocalStorage,
			addTextElementWithPointer,
			selectedAddTextPointer,
			selectedAddImagePointer,
			selectedAddLinePointer,
			selectedAddRectanglePointer,
			selectedAddCirclePointer,
			selectedAddPolygonPointer,
			selectedAddArrowPointer,
			selectedAddStarPointer,
			selectedPointer,
			fileInputSideBar,
			addLineElementWithPointer,
			addRectangleElementWithPointer,
			addCircleElementWithPointer,
			addPolygonElementWithPointer,
			addArrowElementWithPointer,
			addStarElementWithPointer,
			previewPageWebsite,
		}
	},
}
</script>
