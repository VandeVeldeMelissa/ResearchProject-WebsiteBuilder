<template>
   <main class="h-screen overflow-y-scroll">
       <div class="relative w-[1024px] mx-auto">
            <v-stage
                ref="previewStage"
                :config="configStagePreview">
                <v-layer ref="previewLayer">
    						<v-regular-polygon
    							v-for="item in polygonList"
    							:key="item.id"
    							:config="item"
    						></v-regular-polygon>
    						<v-circle
    							v-for="item in circleList"
    							:key="item.id"
    							:config="item"
    						></v-circle>
    						<v-rect
    							v-for="item in rectangleList"
    							:key="item.id"
    							:config="item"
    						></v-rect>
    						<v-image
    							v-for="item in imageListCanvas"
    							:key="item.id"
    							:config="item"
    						></v-image>
    						<v-star
    							v-for="item in starList"
    							:key="item.id"
    							:config="item"
    						></v-star>
    						<v-arrow
    							v-for="item in arrowList"
    							:key="item.id"
    							:config="item"
    						></v-arrow>
    						<v-line
    							v-for="item in lineList"
    							:key="item.id"
    							:config="item"
    						/>
    						<v-text
    							v-for="item in textListCanvas"
    							:key="item.id"
    							:config="item"
    						></v-text>
                            <v-group
                                v-for="item in quoteList"
                                :key="item.id"
                                :config="item.group"
                            >
                                <v-image
                                    :config="item.image">
                                </v-image>
                                <v-rect
                                    :config="item.rectangle">
                                </v-rect>
                                <v-line
                                    :config="item.line">
                                </v-line>
                                <v-text
                                    :config="item.text">
                                </v-text>

                            </v-group>
    					</v-layer>
            </v-stage>
            <img v-for="image in imageList" :src="image.image.src" class="absolute" :class="[image.onClickGoToPage ? 'cursor-pointer' : '']"
                :style="[{ 
                    top: image.y + 'px', 
                    left: image.x + 'px', 
                    width: image.width + 'px', 
                    height: image.height + 'px',
                    boxShadow: image.shadowOffsetX + 'px ' + image.shadowOffsetY + 'px ' + image.shadowBlur + 'px ' + hexToRgbA(image.shadowColor, image.shadowOpacity),
                }]"
                @click="setPage(image.onClickGoToPage)"
            />
            <pre v-for="text in textList"
                class="absolute" 
                :class="[text.fontStyle == 'bold italic' ? '!font-bold !font-italic' : '', text.fontStyle == 'bold' ? '!font-bold' : '', text.fontStyle == 'italic' ? '!font-italic' : '', text.onClickGoToPage ? 'cursor-pointer' : '']"
                :style="[{ 
                    color: text.fill, 
                    top: (text.y-1.5) + 'px', 
                    left: text.x + 'px', 
                    fontFamily: text.fontFamily, 
                    fontSize: text.fontSize + 'px', 
                    lineHeight: text.lineHeight,
                    textDecoration: text.textDecoration,
                    textShadow: text.shadowOffsetX + 'px ' + text.shadowOffsetY + 'px ' + text.shadowBlur + 'px ' + hexToRgbA(text.shadowColor, text.shadowOpacity),
                }]"
                @click="setPage(text.onClickGoToPage)"
            >{{ text.text }}</pre>
       </div>
   </main>
</template>

<script lang="ts">
import Konva from 'konva';
import { onMounted, Ref, ref, watch } from 'vue';

export default {
    setup() {
        const textListCanvas: Ref<any[]> = ref([])
        const textList: Ref<any[]> = ref([])
        const imageListCanvas: Ref<any[]> = ref([])
		const imageList: Ref<any[]> = ref([])
		const lineList: Ref<any[]> = ref([])
		const rectangleList: Ref<any[]> = ref([])
		const circleList: Ref<any[]> = ref([])
		const polygonList: Ref<any[]> = ref([])
		const arrowList: Ref<any[]> = ref([])
		const starList: Ref<any[]> = ref([])
        const quoteList: Ref<any[]> = ref([])
        const selectedPage: Ref<string> = ref('')
        const previewLayer = ref()
        
        const configStagePreview = ref({
            width: window.innerWidth,
            height: window.innerHeight, //get height from builder when mounted
        })

        window.addEventListener('resize', () => {
			configStagePreview.value.width = window.innerWidth
			configStagePreview.value.height = window.innerHeight
		})

        const hexToRgbA = (hex: string, opacity: number) => {
            var rgb = hex.replace('#', '').match(/.{1,2}/g)
            if (rgb) {
                return 'rgba(' + parseInt(rgb[0], 16) + ', ' + parseInt(rgb[1], 16) + ', ' + parseInt(rgb[2], 16) + ', ' + opacity + ')'
            }
        }

        const addEventListenerToElement = (element: any) => {
            if (!element.onClickGoToPage) {
                console.log('No onClickGoToPage')
                return
            }
            const shape = previewLayer.value.getNode().findOne(`.${element}`)
            console.log(previewLayer.value.getNode().children)
            console.log(previewLayer.value.getNode().children.length)
            previewLayer.value.getNode().children.forEach((child: any) => {
                child.on('click', () => {
                    console.log('click')
                    setPage(element.onClickGoToPage)
                })
                child.on('mouseenter', () => {
                    document.body.style.cursor = 'pointer'
                })
                child.on('mouseleave', () => {
                    document.body.style.cursor = 'default'
                })
            })
        }

        const addEventListenerToTextElements = () => {
            //TODO
        }

        const setPage = (page: string) => {
			selectedPage.value = page
			localStorage.setItem('selectedPage', selectedPage.value)
			//1. Remove all shapes from the canvas
			//Empty all lists:
			textList.value = []
            textListCanvas.value = []
			imageList.value = []
			lineList.value = []
			rectangleList.value = []
			circleList.value = []
			polygonList.value = []
			arrowList.value = []
			starList.value = []
			quoteList.value = []

			//2. Add all shapes from the selected page to the canvas
			//Get the shapes from the local storage:
			const stageHeight = localStorage.getItem('heightStage-' + selectedPage.value) || ''
            if (stageHeight) {
                configStagePreview.value.height = parseInt(stageHeight)
            } 

			const shapes = localStorage.getItem(selectedPage.value) || '[]'
			if (shapes) {
				const shapesArray = JSON.parse(shapes)
				shapesArray.forEach(async (shape: any) => {
                    if (shape.group && shape.group.name.split('-')[0] == 'Quote') {
                        shape.group.draggable = false
						const image = new window.Image()
						image.src = "https://aux.iconspalace.com/uploads/left-quote-vector-icon-256.png"
						image.onload = () => {
							shape.image.image = image
							quoteList.value.push(shape)
						}
                        //add event listener to the group
						return
					}
                    shape.draggable = false
					if (shape.name.split('-')[0] == 'Text') {
                        if (shape.strokeWidth > 0) {
                            shape.strokeWidth = shape.strokeWidth + 1
                            textListCanvas.value.push(shape)
                            textList.value.push(shape)
                        } else if (shape.rotation != 0) {
                            textListCanvas.value.push(shape)
                        } else {
                            textList.value.push(shape)
                        }
					} else if (shape.name.split('-')[0] == 'Image') {
						const img = new window.Image()
						img.src = shape.dataURLString
						img.onload = () => {
							shape.image = img
                            if (shape.rotation != 0) {
                                imageListCanvas.value.push(shape)
                            } else if (shape.strokeWidth > 0){
                                imageListCanvas.value.push(shape)
                                imageList.value.push(shape)
                            } else {
                                imageList.value.push(shape)
                            }
						}
					} else if (shape.name.split('-')[0] == 'Line') {
						lineList.value.push(shape)
					} else if (shape.name.split('-')[0] == 'Arrow') {
						arrowList.value.push(shape)
					} else if (shape.name.split('-')[0] == 'Star') {
						starList.value.push(shape)
					} else if (shape.name.split('-')[0] == 'Circle') {
						circleList.value.push(shape)
					} else if (shape.name.split('-')[0] == 'Rectangle') {
						rectangleList.value.push(shape)
					} else if (shape.name.split('-')[0] == 'Polygon') {
						polygonList.value.push(shape)
					}
                    await Promise.resolve()
                    addEventListenerToElement(shape)
				})
			}
		}

        watch(selectedPage, () => {
            localStorage.setItem('selectedPage', selectedPage.value)
        })

        //Load the shapes from local storage on mounted:
		onMounted(() => {
            selectedPage.value = localStorage.getItem('selectedPage') || 'Home'
			const shapes = localStorage.getItem(selectedPage.value) || '[]'
			if (shapes) {
				const shapesArray = JSON.parse(shapes)
				shapesArray.forEach(async (shape: any) => {
                    if (shape.group && shape.group.name.split('-')[0] == 'Quote') {
                        shape.group.draggable = false
						const image = new window.Image()
						image.src = "https://aux.iconspalace.com/uploads/left-quote-vector-icon-256.png"
						image.onload = () => {
							shape.image.image = image
							quoteList.value.push(shape)
						}
                        //add event listener to the group
						return
					}
                    shape.draggable = false
					if (shape.name.split('-')[0] == 'Text') {
                        if (shape.strokeWidth > 0) {
                            shape.strokeWidth = shape.strokeWidth + 1
                            textListCanvas.value.push(shape)
                            textList.value.push(shape)
                        } else if (shape.rotation != 0) {
                            textListCanvas.value.push(shape)
                        } else {
                            textList.value.push(shape)
                        }
					} else if (shape.name.split('-')[0] == 'Image') {
						const img = new window.Image()
						img.src = shape.dataURLString
						img.onload = () => {
							shape.image = img
                            if (shape.rotation != 0) {
                                imageListCanvas.value.push(shape)
                            } else if (shape.strokeWidth > 0){
                                imageListCanvas.value.push(shape)
                                imageList.value.push(shape)
                            } else {
                                imageList.value.push(shape)
                            }
						}
					} else if (shape.name.split('-')[0] == 'Line') {
						lineList.value.push(shape)
					} else if (shape.name.split('-')[0] == 'Arrow') {
						arrowList.value.push(shape)
					} else if (shape.name.split('-')[0] == 'Star') {
						starList.value.push(shape)
					} else if (shape.name.split('-')[0] == 'Circle') {
						circleList.value.push(shape)
					} else if (shape.name.split('-')[0] == 'Rectangle') {
						rectangleList.value.push(shape)
					} else if (shape.name.split('-')[0] == 'Polygon') {
						polygonList.value.push(shape)
					}
                    await Promise.resolve()
                    addEventListenerToElement(shape)
				})
                addEventListenerToTextElements()
			}
            const stageHeight = localStorage.getItem('heightStage-' + selectedPage.value) || ''
            if (stageHeight) {
                configStagePreview.value.height = parseInt(stageHeight)
            }
            const stageWidth = localStorage.getItem('widthStage') || ''
            if (stageWidth) {
                configStagePreview.value.width = parseInt(stageWidth)
            }
            console.log('stageHeight', stageHeight)
            console.log('stageWidth', stageWidth)
           
		})


        return {
            configStagePreview,
            textList,
            textListCanvas,
            imageList,
            imageListCanvas,
            lineList,
            rectangleList,
            circleList,
            polygonList,
            arrowList,
            starList,
            hexToRgbA,
            quoteList,
            previewLayer,
            selectedPage,
            setPage
        }
    }  
}
</script>