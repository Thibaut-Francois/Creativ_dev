import GlobalContext from "../GlobalContext"
import DomElement from "../utils/DomElement"

export default class Scene {
    constructor(id = "canvas-scene") {
        this.globalContext = new GlobalContext()
        this.globalContext.pushScene(this)
        this.id = id

        // debug
        this.params = {
            "isUpdate": true
        }
        this.debug = this.globalContext.debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder(id)
            this.debugFolder.add(this.params, 'isUpdate')
        }

        // canvas
        this.domElement = new DomElement(id)
        this.canvas = this.domElement.instance
        this.resize()
        this.context = this.canvas.getContext('2d')
    }

    get width() { return this.domElement.width }
    get height() { return this.domElement.height }
    get postion() { return this.domElement.position }

    clear() {
        this.context.clearRect(0, 0, this.width, this.height)
    }

    resize() {
        this.domElement.getBoundingRect()
        this.canvas.width = this.domElement.width * this.globalContext.windowSize.pixelRatio
        this.canvas.height = this.domElement.height * this.globalContext.windowSize.pixelRatio
        //this.context.scale(this.globalContext.windowSize.pixelRatio, this.globalContext.windowSize.pixelRatio)
        // CA FONCTIONNE PAS !!!!!!!!!
    }

    update(){
        return this.params["isUpdate"]
    }

    destroy(){}
}