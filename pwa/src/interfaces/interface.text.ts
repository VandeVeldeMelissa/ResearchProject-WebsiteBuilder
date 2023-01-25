export default interface Text {
getLayer(): unknown
	id: string
	x: number
	y: number
	text: string
	draggable: boolean
	fontFamily: string
	fontSize: number
	fontStyle: string
	textDecoration: string
	lineHeight: number
	align: string
	fill: string
	stroke: string
	strokeWidth: number
	shadowColor: string
	shadowBlur: number
	shadowOffsetX: number
	shadowOffsetY: number
	shadowOpacity: number
	opacity: number
    rotation: number
    scaleX: number
    scaleY: number
    name: string
}
