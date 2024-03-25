import Debug from "./utils/Debug"
import Time from "./utils/Time"
import Size from "./utils/Size"

let instance = null

export default class GlobalContext {
    constructor() {
        if(!!instance) return instance
        instance = this

        // Debug
        this.debug = new Debug()

        // Time
        this.times = new Time()
        this.times.on('update', () => {this.update()})

        // window size
        this.windowSize = new Size()
        this.windowSize.on('resize', ()=> {this.resize()})

        // Scenes
        this.scenes = []
    }

    pushScene(scene){
        this.scenes.push(scene)
    }

    resize(){
        this.scenes.forEach(s => {
            s.resize()
        })
    }

    update(){
        this.scenes.forEach(s => {s.update()})
    }

    destroy(){
        this.times.off('update')
        this.windowSize.off('resize')

        if(this.debug.active) this.debug.ui.destroy()

        this.scenes.forEach(s => {
            s.destroy()
        })
    }
}