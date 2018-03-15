let width : number | undefined = undefined
let height: number | undefined = undefined

window.onload = () => {
    width  = window.innerWidth - 20
    height = window.innerHeight - 20

    const canvas = <HTMLCanvasElement>document.getElementById('canvas')
    canvas.width  = width
    canvas.height = height

    const gl  = canvas.getContext('webgl')
    init(gl)
    window.requestAnimationFrame(animate(gl))
}

const init = (gl: WebGLRenderingContext) => {
    
}

let start : number | undefined = undefined
let before: number | undefined = undefined
const animate = (gl: WebGLRenderingContext) => (timestamp: number) => {
    if (!start) {
        start = timestamp
    }
    if (!before) {
        before = timestamp
    }
    const total    = timestamp - start
    const progress = timestamp - before
    before = timestamp

    render(gl,  total, progress)

    window.requestAnimationFrame(animate(gl))
}

const render = (gl: WebGLRenderingContext, total: number, progress: number) => {
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
}
