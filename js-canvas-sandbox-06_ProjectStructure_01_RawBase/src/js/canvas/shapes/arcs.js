import { randomRange } from "../../utils/MathUtils"

export default class RotatingArc{
    constructor(x, y, radius, startAngle, endAngle){
        this.x= x
        this.y= y
        this.radius= radius
        this.startAngle= startAngle
        this.endAngle= endAngle

        this.vAngular=randomRange(-5, 5)
    }

    update(elapsed=16, speed=1){
        this.startAngle += speed* this.vAngular*elapsed / 1000
        this.endAngle += speed* this.vAngular * elapsed / 1000
    }

    draw(context){
        context.save()
        context.beginPath()
        context.translate(this.x, this.y)
        context.arc(0,0, this.radius, this.startAngle, this.endAngle)
        context.stroke()
        
        context.closePath()
        context.restore()
    }
}