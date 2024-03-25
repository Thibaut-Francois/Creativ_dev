import Scene from "../canvas/Scene.js"
import { randomRange } from "../utils/MathUtils.js"
import { deg2rad } from "../utils/MathUtils.js"
import RotatingArc from "../canvas/shapes/arcs"

export default class Scenario1 extends Scene {
    constructor(id="canvas-scene"){
        super(id)

        // debug
        this.params.speed = 1   // + param speed
        if(this.debug.active){
            this.debugFolder.add(this.params, 'speed', -5, 5, 0.01)
        }
        
        this.resize()

        const nArcs_ = 10

        this.arcs = []
        for(let i=0; i < nArcs_; i++) {
            const x_ = this.width / 2
            const y_ = this.height / 2
            const radius_ = this.mainRadius + (i - nArcs_/2) * this.deltaRadius
            const angle0_ = i !=0 && i < nArcs_ -1 ? deg2rad(randomRange(30, 330)) :0
            const angle1_ = i !=0 && i < nArcs_ -1 ? deg2rad(randomRange(30, 330)) : Math.PI * 2

            const arc_ = new RotatingArc(x_, y_, radius_, angle0_, angle1_)
            this.arcs.push(arc_)
        }
    }

    drawGraduation(){
        const nGraduation_ = 12
        for(let i=0; i<nGraduation_; i++){
            const angle_ = deg2rad(360) * i / nGraduation_
            const x_ = Math.cos(angle_) * (this.mainRadius - this.deltaRadius/2) + this.width / 2
            const y_ = Math.sin(angle_) * (this.mainRadius - this.deltaRadius/2) + this.height / 2
            const length_ = (this.arcs.length -1) * this.deltaRadius

            this.context.save()
            this.context.beginPath()
            this.context.translate(x_, y_)
            this.context.rotate(angle_)
            this.context.moveTo(-length_/2, 0)
            this.context.lineTo(length_/2, 0)
            this.context.stroke()
            
            this.context.closePath()
            this.context.restore()
        }
    }

    update(){
        if(!super.update())  return
        this.clear()

        this.context.strokeStyle = 'white'
        this.context.lineWidth = 3

        this.drawGraduation()
        this.arcs.forEach(arc =>{
            arc.update(this.globalContext.times.delta, this.params.speed)
            arc.draw(this.context)
        }) 
    }

    resize(){
        super.resize()
 
        this.mainRadius = Math.min(this.width, this.height)
        this.mainRadius /= 2
        this.mainRadius *= 0.65
        this.deltaRadius = this.mainRadius * 0.075

        if(!!this.arcs){
            this.arc.forEach((arc, index)=>{
                const x_ = this.width / 2
                arc.x_ = this.width / 2
                arc.y_ = this.height / 2
                arc.radius_ = this.mainRadius + (index - this.arcs.length/2) * this.deltaRadius
            })
        }
    }
}