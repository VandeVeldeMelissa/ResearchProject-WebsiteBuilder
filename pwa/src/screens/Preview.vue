<template>
   <main class="h-screen overflow-y-scroll">
       <div class="relative w-[1024px]">
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
    					</v-layer>
            </v-stage>
            <pre v-for="text in textList" :key="text.id" 
                class="absolute" 
                :class="[text.fontStyle == 'bold italic' ? '!font-bold !font-italic' : '', text.fontStyle == 'bold' ? '!font-bold' : '', text.fontStyle == 'italic' ? '!font-italic' : '']"
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
            >{{ text.text }}</pre>
            <img v-for="image in imageList" :key="image.id" :src="image.image.src" class="absolute" 
            :style="[{ 
                top: image.y + 'px', 
                left: image.x + 'px', 
                width: image.width + 'px', 
                height: image.height + 'px',
                boxShadow: image.shadowOffsetX + 'px ' + image.shadowOffsetY + 'px ' + image.shadowBlur + 'px ' + hexToRgbA(image.shadowColor, image.shadowOpacity),
            }]"/>
       </div>
   </main>
</template>

<script lang="ts">
import Konva from 'konva';
import { onMounted, Ref, ref } from 'vue';
import Text from '../interfaces/interface.text';

export default {
    setup() {
        const textListCanvas: Ref<Text[]> = ref([])
        const textList: Ref<Text[]> = ref([])
        const imageListCanvas: Ref<any[]> = ref([])
		const imageList: Ref<any[]> = ref([])
		const lineList: Ref<any[]> = ref([])
		const rectangleList: Ref<any[]> = ref([])
		const circleList: Ref<any[]> = ref([])
		const polygonList: Ref<any[]> = ref([])
		const arrowList: Ref<any[]> = ref([])
		const starList: Ref<any[]> = ref([])
        
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

        //Load the shapes from local storage on mounted:
		onMounted(() => {
			const shapes = localStorage.getItem('shapes') || '[]'
			if (shapes) {
				const shapesArray = JSON.parse(shapes)
				shapesArray.forEach((shape: any) => {
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
				})
			}
            const stageHeight = localStorage.getItem('heightStage') || ''
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
            hexToRgbA
        }
    }  
}
</script>