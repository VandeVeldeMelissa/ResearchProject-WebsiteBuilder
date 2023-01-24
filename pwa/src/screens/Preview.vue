<template>
   <main class="h-screen overflow-y-scroll">
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
							v-for="item in imageList"
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
							v-for="item in textList"
							:key="item.id"
							:config="item"
						></v-text>
					</v-layer>
        </v-stage>
   </main>
</template>

<script lang="ts">
import Konva from 'konva';
import { onMounted, Ref, ref } from 'vue';
import Text from '../interfaces/interface.text';

export default {
    setup() {
        const textList: Ref<Text[]> = ref([])
		const imageList: Ref<any[]> = ref([])
		const lineList: Ref<any[]> = ref([])
		const rectangleList: Ref<any[]> = ref([])
		const circleList: Ref<any[]> = ref([])
		const polygonList: Ref<any[]> = ref([])
		const arrowList: Ref<any[]> = ref([])
		const starList: Ref<any[]> = ref([])
        
        const configStagePreview = ref({
            width: window.innerWidth,
            height: window.innerHeight, //get height from builder

        })

        window.addEventListener('resize', () => {
			configStagePreview.value.width = window.innerWidth
			configStagePreview.value.height = window.innerHeight
		})

        //Load the shapes from local storage on mounted:
		onMounted(() => {
			const shapes = localStorage.getItem('shapes') || '[]'
			if (shapes) {
				const shapesArray = JSON.parse(shapes)
				shapesArray.forEach((shape: any) => {
                    shape.draggable = false
					if (shape.name.split('-')[0] == 'Text') {
						textList.value.push(shape)
					} else if (shape.name.split('-')[0] == 'Image') {
						const img = new window.Image()
						img.src = shape.dataURLString
						img.onload = () => {
							shape.image = img
							imageList.value.push(shape)
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
		})


        return {
            configStagePreview,
            textList,
            imageList,
            lineList,
            rectangleList,
            circleList,
            polygonList,
            arrowList,
            starList
        }
    }  
}
</script>