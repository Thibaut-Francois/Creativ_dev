import Scene from "./js/canvas/Scene"
import Scenario1 from "./js/scenarios/Scenario1"

//const scene = new Scene() // set id if != "canvas-scene" (default)
//console.log(scene)
//const scene2 = new Scene("canvas-scene-2") // example

/** test 1 */

const scene = new Scenario1()

const scene2 = new Scenario1('canvas-scene-2')
const scene3 = new Scenario1('canvas-scene-3')

/** test 2 */
// scene2.context.fillStyle = 'yellow'
// scene2.context.fillRect(0,0, scene.width / 2, scene.height / 2)
// scene2.context.fillStyle = 'green'
// scene2.context.fillRect(scene.width / 2, scene.height / 2, scene.width / 2, scene.height / 2)