import '../style/style'

let canvas: HTMLCanvasElement | null = null

window.onload = () => {
    canvas = <HTMLCanvasElement>document.getElementById('canvas')
    canvas.width  = window.innerWidth - 20
    canvas.height = window.innerHeight - 20

    const gl = <WebGLRenderingContext>canvas.getContext('webgl')
    init(gl)
    window.requestAnimationFrame(animate(gl))
}

const init = (gl: WebGLRenderingContext) => {
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.viewport(0.0, 0.0, canvas!.width, canvas!.height)
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
}

let start : number | null = null
let before: number | null = null
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
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
}