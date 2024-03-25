import { GUI } from 'dat.gui'

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d') // context type: https://developer.mozilla.org/fr/docs/Web/API/HTMLCanvasElement/getContext#typedecontexte
const canvasWidth = canvas.getBoundingClientRect().width
const canvasHeight = canvas.getBoundingClientRect().height
canvas.width = canvasWidth
canvas.height = canvasHeight


const params = {
    nBubble : 10,
    lineWidth : 1,
    speed: 1,
    radius: 10,
    threshold: 100,
}

const distance2d = (x1, y1, x2, y2) => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}

class Bubble {
    constructor(x, y){
        this.x = x
        this.y = y
        //this.angle= Math.random() * Math.PI * 2

        this.vx= Math.random() * 2 - 1
        this.vy= Math.random() * 2 - 1
    }

    update(speed = 1) {
        this.x += this.vx * params.speed
        this.y += this.vy * params.speed

        if (this.x - params.radius < 0 || this.x + params.radius > canvasWidth) {
            this.vx *= -1
        }   
        if (this.y - params.radius < 0 || this.y + params.radius > canvasHeight) {
            this.vy *= -1
        }
    }

    draw(){
        ctx.save()
        ctx.beginPath()
        ctx.translate(this.x, this.y)
        ctx.arc(0, 0, params.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
        ctx.closePath()

        ctx.restore()
    }
}


const generate = () => {
    const bubbles = []
    ctx.fillStyle = 'black'
    ctx.strokeStyle = 'white'
    ctx.lineWidth = params.lineWidth

    // SETUP
    for (let i = 0; i < params.nBubble; i++) {
        const x_ = Math.random() * canvasWidth
        const y_ = Math.random() * canvasHeight
        const bubble_ = new Bubble(x_,y_)

        bubbles.push(bubble_)
    }

    // DRAW
    const update = () => {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight)

        for(let i=0; i < bubbles.length; i++){
            const current_=bubbles[i]

            for(let j=i; j < bubbles.length; j++){
                const next_ = bubbles[j]

                const d_ = distance2d(current_.x, current_.y, next_.x, next_.y)
                if(d_ < params.threshold){
                    
                    // dessiner une ligne entre les deux bulles
                    ctx.save()
                    ctx.beginPath()
                    ctx.moveTo(current_.x, current_.y)
                    ctx.lineTo(next_.x, next_.y)
                    ctx.stroke()
                    
                    ctx.closePath()
                    ctx.restore()
                }

            }
        }

        bubbles.forEach(bubble => {
            bubble.update()
            bubble.draw()
        })
        window.requestAnimationFrame(update)
    }

    update()
}

generate()

// DEBUG
const debug = new GUI()
debug.add(params, 'nBubble', 1, 50, 1).onFinishChange(generate)
debug.add(params, 'radius', 1, 100, 5)
debug.add(params, 'lineWidth', 1, 10, 2).onChange(generate)
debug.add(params, 'threshold', 0, 1000, 50)
debug.add(params, 'speed', -10, 50, 0.5)