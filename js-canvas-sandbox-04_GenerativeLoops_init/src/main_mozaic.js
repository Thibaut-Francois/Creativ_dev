import { GUI } from 'dat.gui'

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d') // context type: https://developer.mozilla.org/fr/docs/Web/API/HTMLCanvasElement/getContext#typedecontexte
const canvasWidth = canvas.getBoundingClientRect().width
const canvasHeight = canvas.getBoundingClientRect().height
canvas.width = canvasWidth
canvas.height = canvasHeight

/**
 *  CONFIG
 */

const params = {
    rows: 5,
    cols: 6,
    scale: 0.5,
    angle: 45,
    chance: 0.3
}

const red = '#E83A4E'
const yellow = '#FFE800'
const blue = '#3B76F5'
const green = '#71E394'
const white = '#FFFFFF'
const black = '#000000'

const colors = [red, yellow, blue, green] //red, yellow, blue, green, white, black

/**
 *  METHODS
 */
const drawRectangle = (cWidth, cHeight, color) => {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.rect(-cWidth / 2, -cHeight / 2, cWidth, cHeight)
    ctx.fill()
    ctx.closePath()
}

const deg2rad = (deg) => {
    return deg * 2 * Math.PI / 360
}

const generateMozaic = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const height = canvas.height
    const width = canvas.width
    const celH = height / params.cols
    const celW = width / params.rows
    
    for (let i = 0; i < params.rows; i++) {
        for (let j = 0; j < params.cols; j++) {
            
            const x_ = i*celW+celW/2
            const y_ = j*celH+celH/2
            const color_ = colors[Math.floor(Math.random() * colors.length)]
            
            ctx.save()
            ctx.translate(x_,y_)
            if(Math.random() < params.chance) {
                ctx.rotate(deg2rad(params.angle))
                
                const ratio_ = params.scale
                const scalex_ = celW > celH ? ratio_ * celH / celW : ratio_
                const scaley_ = celH > celW ?  ratio_ *  celW / celH : ratio_
                ctx.scale(scalex_, scaley_)
            }
            drawRectangle(celW, celH, color_)
            
            ctx.restore()
        }
    }
}
    
    
    
    // DEBUG
    const debug = new GUI()
let folder = debug.addFolder('GRID')
// lignes
folder.add(params, 'rows', 1, 50, 1).onChange(generateMozaic)
// colonnes
folder.add(params, 'cols', 1, 50, 1).onChange(generateMozaic)

folder = debug.addFolder('GENERATIVE')
// scale
folder.add(params, 'scale', 0.1, 5, 0.1).onFinishChange(generateMozaic)
// angle
folder.add(params, 'angle', 0, 90, 1).onChange(generateMozaic)
// chance
folder.add(params, 'chance', 0, 1, 0.1).onChange(generateMozaic)

