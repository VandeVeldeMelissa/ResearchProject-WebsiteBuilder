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
			<div class="relative">
				<v-stage
					ref="stage"
					:config="configKonva"
					@mousedown="handleStageMouseDown"
					@touchstart="handleStageMouseDown"
				>
					<v-layer ref="layer">
						<v-regular-polygon
							v-for="item in polygonList"
							:key="item.id"
							:config="item"
							@transformend="handleTransformEnd"
							@dragend="handleTransformEnd"
						></v-regular-polygon>
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
						<v-circle
							v-for="item in circleList"
							:key="item.id"
							:config="item"
							@transformend="handleTransformEnd"
							@dragend="handleTransformEnd"
						></v-circle>
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
						<v-rect
							v-for="item in rectangleList"
							:key="item.id"
							:config="item"
							@transformend="handleTransformEnd"
							@dragend="handleTransformEnd"
						></v-rect>
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
						<v-image
							v-for="item in imageList"
							:key="item.id"
							:config="item"
							@transformend="handleTransformEnd"
							@dragend="handleTransformEnd"
						></v-image>
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
						<v-line
							v-for="item in lineList"
							:key="item.id"
							:config="item"
							@transformend="handleTransformEnd"
							@dragend="handleTransformEnd"
						/>
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
						<v-text
							v-for="item in textList"
							:key="item.id"
							:config="item"
							@transformend="handleTransformEnd"
							@dragend="handleTransformEnd"
							@dblclick="showTextEditor = true"
						></v-text>
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
					</v-layer>
				</v-stage>
				<div class="absolute bottom-0 bg-blue-100 w-200 mb-6 p-2 rounded-md drop-shadow-md left-[calc(50%-400px)]" v-if="showTextEditor">
					<label class="font-medium">What do you want this selected text to say?</label>
					<textarea class="block border-1 border-blue-400 rounded w-full p-2 hover:border-blue-600 transition-colors outline-none focus:border-blue-600 focus-visible:ring-2 caret-blue-600" placeholder="Type here your text" v-model="userInputText.text" @input="updateStylingText"></textarea>
				</div>
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
						<input class="bg-white" type="color" v-model="userInputText.textColor" @change="updateStylingText"/>
						<div>
							<input
								class="w-30 rounded-l bg-slate-100 px-2 py-1.5"
								type="text"
								v-model="userInputText.textColor"
								@change="updateStylingText"
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
						/>
						<input
							class="w-30 rounded-l bg-slate-100 px-2 py-1.5"
							type="text"
							v-model="userInputText.textBorderColor"
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
							v-model="userInputText.textShadowX"
							@change="updateStylingText"
						/>
						<label for="Blur">Blur</label>
						<input
							class="col-span-2 mr-4 w-20 rounded bg-slate-100 px-2 py-1.5"
							type="number"
							min="0"
							max="1000"
							id="Blur"
							v-model="userInputText.textShadowBlur"
							@change="updateStylingText"
						/>
						<label for="y">Y</label>
						<input
							class="col-span-2 mr-4 w-20 rounded bg-slate-100 px-2 py-1.5"
							type="number"
							min="0"
							max="1000"
							id="y"
							v-model="userInputText.textShadowY"
							@change="updateStylingText"
						/>
						<div class="flex items-center gap-x-1 col-span-6">
							<input class="bg-white" type="color" v-model="userInputText.textShadowColor" @change="updateStylingText"/>
							<div>
								<input
									class="w-30 rounded-l bg-slate-100 px-2 py-1.5"
									type="text"
									v-model="userInputText.textShadowColor"
									@change="updateStylingText"
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
						/>
						<input
							class="w-30 rounded-l bg-slate-100 px-2 py-1.5"
							type="text"
							v-model="userInputImage.imageBorderColor"
							@change="updateStylingImage"
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
							v-model="userInputImage.imageShadowX"
							@change="updateStylingImage"
						/>
						<label for="Blur">Blur</label>
						<input
							class="col-span-2 mr-4 w-20 rounded bg-slate-100 px-2 py-1.5"
							type="number"
							min="0"
							max="1000"
							id="Blur"
							v-model="userInputImage.imageShadowBlur"
							@change="updateStylingImage"
						/>
						<label for="y">Y</label>
						<input
							class="col-span-2 mr-4 w-20 rounded bg-slate-100 px-2 py-1.5"
							type="number"
							min="0"
							max="1000"
							id="y"
							v-model="userInputImage.imageShadowY"
							@change="updateStylingImage"
						/>
						<div class="flex items-center gap-x-1 col-span-6">
							<input class="bg-white" type="color" v-model="userInputImage.imageShadowColor" @change="updateStylingImage"/>
							<div>
								<input
									class="w-30 rounded-l bg-slate-100 px-2 py-1.5"
									type="text"
									v-model="userInputImage.imageShadowColor"
									@change="updateStylingImage"
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
							<label for="lineWidth">Width</label>
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
						<input class="bg-white" type="color" v-model="userInputLine.lineColor" @change="updateStylingLine"/>
						<div>
							<input
								class="w-30 rounded-l bg-slate-100 px-2 py-1.5"
								type="text"
								v-model="userInputLine.lineColor"
								@change="updateStylingLine"
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
							min="0"
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
							max="1000"
							id="Blur"
							v-model="userInputLine.lineShadowBlur"
							@change="updateStylingLine"
						/>
						<label for="y">Y</label>
						<input
							class="col-span-2 mr-4 w-20 rounded bg-slate-100 px-2 py-1.5"
							type="number"
							min="0"
							max="1000"
							id="y"
							v-model="userInputLine.lineShadowY"
							@change="updateStylingLine"
						/>
						<div class="flex items-center gap-x-1 col-span-6">
							<input class="bg-white" type="color" v-model="userInputLine.lineShadowColor" @change="updateStylingLine">
							<div>
								<input
									class="w-30 rounded-l bg-slate-100 px-2 py-1.5"
									type="text"
									v-model="userInputLine.lineShadowColor"
									@change="updateStylingLine"
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
					>
						<div class="flex gap-x-2"><Plus />Add arrow</div>
						<ArrowBigRight />
					</button>
					<button
						class="mt-4 flex w-full justify-between rounded bg-slate-100 p-4 transition-colors hover:bg-blue-50 hover:text-blue-600"
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
						<input class="bg-white" type="color" v-model="userInputRectangle.rectangleColor" @change="updateStylingRectangle"/>
						<div>
							<input
								class="w-30 rounded-l bg-slate-100 px-2 py-1.5"
								type="text"
								v-model="userInputRectangle.rectangleColor" 
								@change="updateStylingRectangle"
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
						/>
						<input
							class="w-30 rounded-l bg-slate-100 px-2 py-1.5"
							type="text"
							v-model="userInputRectangle.rectangleBorderColor"
							@change="updateStylingRectangle"
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
							v-model="userInputRectangle.rectangleShadowX"
							@change="updateStylingRectangle"
						/>
						<label for="Blur">Blur</label>
						<input
							class="col-span-2 mr-4 w-20 rounded bg-slate-100 px-2 py-1.5"
							type="number"
							min="0"
							max="1000"
							id="Blur"
							v-model="userInputRectangle.rectangleShadowBlur"
							@change="updateStylingRectangle"
						/>
						<label for="y">Y</label>
						<input
							class="col-span-2 mr-4 w-20 rounded bg-slate-100 px-2 py-1.5"
							type="number"
							min="0"
							max="1000"
							id="y"
							v-model="userInputRectangle.rectangleShadowY"
							@change="updateStylingRectangle"
						/>
						<div class="flex items-center gap-x-1 col-span-6">
							<input class="bg-white" type="color" 
							v-model="userInputRectangle.rectangleShadowColor"
							@change="updateStylingRectangle"
							/>
							<div>
								<input
									class="w-30 rounded-l bg-slate-100 px-2 py-1.5"
									type="text"
									v-model="userInputRectangle.rectangleShadowColor"
									@change="updateStylingRectangle"
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
						/>
						<div>
							<input
								class="w-30 rounded-l bg-slate-100 px-2 py-1.5"
								type="text"
								v-model="userInputCircle.circleColor"
								@change="updateStylingCircle"
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
						/>
						<input
							class="w-30 rounded-l bg-slate-100 px-2 py-1.5"
							type="text"
							v-model="userInputCircle.circleBorderColor"
							@change="updateStylingCircle"
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
							v-model="userInputCircle.circleShadowX"
							@change="updateStylingCircle"
						/>
						<label for="Blur">Blur</label>
						<input
							class="col-span-2 mr-4 w-20 rounded bg-slate-100 px-2 py-1.5"
							type="number"
							min="0"
							max="1000"
							id="Blur"
							v-model="userInputCircle.circleShadowBlur"
							@change="updateStylingCircle"
						/>
						<label for="y">Y</label>
						<input
							class="col-span-2 mr-4 w-20 rounded bg-slate-100 px-2 py-1.5"
							type="number"
							min="0"
							max="1000"
							id="y"
							v-model="userInputCircle.circleShadowY"
							@change="updateStylingCircle"
						/>
						<div class="flex items-center gap-x-1 col-span-6">
							<input class="bg-white" type="color"
							v-model="userInputCircle.circleShadowColor"
							@change="updateStylingCircle"
							/>
							<div>
								<input
									class="w-30 rounded-l bg-slate-100 px-2 py-1.5"
									type="text"
									v-model="userInputCircle.circleShadowColor"
									@change="updateStylingCircle"
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
						/>
						<div>
							<input
								class="w-30 rounded-l bg-slate-100 px-2 py-1.5"
								type="text"
								v-model="userInputPolygon.polygonColor"
								@change="updateStylingPolygon"
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
						/>
						<input
							class="w-30 rounded-l bg-slate-100 px-2 py-1.5"
							type="text"
							v-model="userInputPolygon.polygonBorderColor"
							@change="updateStylingPolygon"
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
							v-model="userInputPolygon.polygonShadowX"
							@change="updateStylingPolygon"
						/>
						<label for="Blur">Blur</label>
						<input
							class="col-span-2 mr-4 w-20 rounded bg-slate-100 px-2 py-1.5"
							type="number"
							min="0"
							max="1000"
							id="Blur"
							v-model="userInputPolygon.polygonShadowBlur"
							@change="updateStylingPolygon"
						/>
						<label for="y">Y</label>
						<input
							class="col-span-2 mr-4 w-20 rounded bg-slate-100 px-2 py-1.5"
							type="number"
							min="0"
							max="1000"
							id="y"
							v-model="userInputPolygon.polygonShadowY"
							@change="updateStylingPolygon"
						/>
						<div class="flex items-center gap-x-1 col-span-6">
							<input class="bg-white" type="color" 
							v-model="userInputPolygon.polygonShadowColor"
							@change="updateStylingPolygon"
							/>
							<div>
								<input
									class="w-30 rounded-l bg-slate-100 px-2 py-1.5"
									type="text"
									v-model="userInputPolygon.polygonShadowColor"
									@change="updateStylingPolygon"
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
			</aside>
		</main>
	</div>
</template>

<script lang="ts">
import { Ref, ref, watch, onMounted, reactive } from 'vue'
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
	Star
} from 'lucide-vue-next'
import Konva from 'konva'
import Text from '../interfaces/interface.text'
import { Rect } from 'konva/lib/shapes/Rect'

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
	Star
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
		let textListNumber: Ref<number> = ref(0)
		let lineListNumber: Ref<number> = ref(0)
		let rectangleListNumber: Ref<number> = ref(0)
		let circleListNumber: Ref<number> = ref(0)
		let polygonListNumber: Ref<number> = ref(0)
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
		const fileInput = ref()
		const rectangleTransformer = ref()

		const userInputText = reactive({
			fontFamily: 'Arial',
			fontSize: 21,
			isFontBold: false,
			isFontItalic: false,
			isFontUnderlined: false,
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

		const configKonva = ref({
			width: window.innerWidth * 0.75 - 56 - 2 * 32,
			height: window.innerHeight - 72 - 32,
		})

		const setPage = (page: string) => {
			isPageSelectorOpen.value = false
			selectedPage.value = page
		}

		window.addEventListener('resize', () => {
			configKonva.value.width = window.innerWidth * 0.75 - 56 - 2 * 32,
			configKonva.value.height = window.innerHeight - 72 - 32
		})

		const toggleIsPageSelectorOpen = () => {
			isPageSelectorOpen.value = !isPageSelectorOpen.value
		}

		const addTextElementToCanvas = () => {
			textListNumber.value++
			const textName = 'Text-' + textListNumber.value.toString()
			updateTextTransformer()
			textList.value.push({
				id: textListNumber.toString(),
				x: configKonva.value.width / 2,
				y: configKonva.value.height / 2,
				text: 'Double click to change this text. \nYou can also drag it around.',
				draggable: true,
				fontFamily: 'Arial',
				fontSize: 21,
				fontStyle: 'normal',
				textDecoration: '',
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
		}

		const addLineElementToCanvas = () => {
			lineListNumber.value++
			const lineName = 'Line-' + lineListNumber.value.toString()
			lineList.value.push({
				id: textListNumber.toString(),
				x: configKonva.value.width / 2,
				y: configKonva.value.height / 2,
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
		}

		const addRectangleToCanvas = () => {
			rectangleListNumber.value++
			const rectangleName = 'Rectangle-' + rectangleListNumber.value.toString()
			rectangleList.value.push({
				id: rectangleListNumber.toString(),
				x: configKonva.value.width / 2,
				y: configKonva.value.height / 2,
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
		}

		const addCircleToCanvas = () => {
			circleListNumber.value++
			const circleName = 'Circle-' + circleListNumber.value.toString()
			circleList.value.push({
				id: circleListNumber.toString(),
				x: configKonva.value.width / 2,
				y: configKonva.value.height / 2,
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
		}

		const addPolygonToCanvas = () => {
			polygonListNumber.value++
			const polygonName = 'Polygon-' + polygonListNumber.value.toString()
			polygonList.value.push({
				id: polygonListNumber.toString(),
				x: configKonva.value.width / 2,
				y: configKonva.value.height / 2,
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

			if (text) {
				selectedShapeName.value = name
			} else if (image || line || rectangle || circle || polygon){
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
		}

		const handleTransformEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
			const text = textList.value.find((r) => r.name === selectedShapeName.value)
			if (text) {
				text.x = e.target.x()
				text.y = e.target.y()
				text.rotation = e.target.rotation()
				text.scaleX = e.target.scaleX()
				text.scaleY = e.target.scaleY()
				return
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
				return
			}

			const line = lineList.value.find((r) => r.name === selectedShapeName.value)
			if (line) {
				line.x = e.target.x()
				line.y = e.target.y()
				line.rotation = e.target.rotation()
				line.scaleX = e.target.scaleX()
				line.scaleY = e.target.scaleY()
				return
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
				return
			}

			const circle = circleList.value.find((r) => r.name === selectedShapeName.value)
			if (circle) {
				circle.x = e.target.x()
				circle.y = e.target.y()
				circle.radius = e.target.width() / 2
				circle.height = e.target.height()
				circle.width = e.target.width()
				return
			}

			const polygon = polygonList.value.find((r) => r.name === selectedShapeName.value)
			if (polygon) {
				polygon.x = e.target.x()
				polygon.y = e.target.y()
				polygon.rotation = e.target.rotation()
				polygon.scaleX = e.target.scaleX()
				polygon.scaleY = e.target.scaleY()
				return
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
					showTextEditor.value = false
					updateTextTransformer()
					break
				case 'Image':
					imageList.value = imageList.value.filter((image) => {
						return image.name !== selectedShapeName.value
					})
					selectedShapeName.value = ''
					updateImageTransformer()
					break
				case 'Line':
					lineList.value = lineList.value.filter((line) => {
						return line.name !== selectedShapeName.value
					})
					selectedShapeName.value = ''
					updateLineTransformer()
					break
				case 'Rectangle':
					rectangleList.value = rectangleList.value.filter((rectangle) => {
						return rectangle.name !== selectedShapeName.value
					})
					selectedShapeName.value = ''
					updateRectangleTransformer()
					break
				case 'Circle':
					circleList.value = circleList.value.filter((circle) => {
						return circle.name !== selectedShapeName.value
					})
					selectedShapeName.value = ''
					updateCircleTransformer()
					break
				case 'Polygon':
					polygonList.value = polygonList.value.filter((polygon) => {
						return polygon.name !== selectedShapeName.value
					})
					selectedShapeName.value = ''
					updatePolygonTransformer()
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
		})

		const selectImage = () => {
			fileInput.value.click()
		}

		const uploadImage = (e: Event) => {
			const target = e.target as HTMLInputElement
			const file = target.files?.[0]
			if (file) {
				const reader = new FileReader()
				reader.onload = (e) => {
					const dataURL = e.target?.result
					if (dataURL) {
						const image = new window.Image()
						image.src = dataURL as string
						const fileName = 'Image-' + file.name
						image.onload = () => {
							imageList.value.push({
								image,
								name: fileName,
								x: configKonva.value.width / 2,
								y: configKonva.value.height / 2,
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
							})
						}
					}
				}
				reader.readAsDataURL(file)
			}
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
			console.log('transforming polygon')
			const polygon = e.target as Konva.RegularPolygon
			const polygonName = polygon.name()
			const polygonObject = polygonList.value.find((polygon) => {
				return polygon.name === polygonName
			})
			if (polygonObject) {
				polygonObject.radius = Math.round(polygon.radius() * polygon.scaleX())
				userInputPolygon.polygonSides = polygonObject.sides
				userInputPolygon.polygonRadius = Math.round(polygonObject.radius)
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
			handleTransformCircle
		}
	},
}
</script>
