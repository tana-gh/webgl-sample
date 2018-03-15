import "../style/style";
import THREE = require("three");
import OrbitControls = require("three-orbitcontrols");

interface IThreeObjects {
    scene   : THREE.Scene;
    camera  : THREE.Camera;
    controls: THREE.OrbitControls;
    renderer: THREE.Renderer;
}

window.onload = () => {
    const width : number  = window.innerWidth  - 20;
    const height: number = window.innerHeight - 20;

    const threeObjects: IThreeObjects = init(width, height);
    window.requestAnimationFrame(animate(threeObjects));
};

function init(width: number, height: number): IThreeObjects {
    const scene: THREE.Scene = new THREE.Scene();

    const camera: THREE.Camera = new THREE.PerspectiveCamera(60.0, width / height);
    camera.position.set(0.0, 0.0, 3.0);
    const controls: THREE.OrbitControls = new OrbitControls(camera);

    const geometry: THREE.Geometry = new THREE.BoxGeometry(1.0, 1.0, 1.0);
    const material: THREE.Material = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(1.0, 1.0, 1.0),
        metalness: 0.5,
        roughness: 0.5,
        clearCoat: 0.5,
        clearCoatRoughness: 0.5,
        reflectivity: 1.0,
        fog: true
    });
    const mesh: THREE.Mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const lights: Array<THREE.Light> = [
        new THREE.PointLight(new THREE.Color().setHSL(0.6, 0.5, 0.8)),
        new THREE.PointLight(new THREE.Color().setHSL(0.2, 0.5, 0.8)),
        new THREE.PointLight(new THREE.Color().setHSL(0.1, 0.5, 0.8)),
        new THREE.PointLight(new THREE.Color().setHSL(0.4, 0.5, 0.8)),
        new THREE.PointLight(new THREE.Color().setHSL(0.8, 0.5, 0.8))
    ];
    lights[0].position.set( 2.0,  4.0,  2.0);
    lights[1].position.set(-2.0,  4.0, -2.0);
    lights[2].position.set( 2.0,  0.0,  2.0);
    lights[3].position.set(-2.0,  0.0, -2.0);
    lights[4].position.set( 1.0, -4.0,  1.0);
    lights.forEach(x => scene.add(x));

    const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0), 1.0);
    renderer.setSize(width, height);
    document.getElementById("container")!.appendChild(renderer.domElement);

    return {
        scene,
        camera,
        controls,
        renderer
    };
}

let start : number | null = null;
let before: number | null = null;
function animate(threeObjects: IThreeObjects): (timestamp: number) => void {
    return (timestamp: number) => {
        if (!start) {
            start = timestamp;
        }
        if (!before) {
            before = timestamp;
        }
        const total   : number = timestamp - start;
        const progress: number = timestamp - before;
        before = timestamp;

        render(threeObjects, total, progress);

        window.requestAnimationFrame(animate(threeObjects));
    };
}

function render(threeObjects: IThreeObjects, total: number, progress: number): void {
    threeObjects.controls.update();
    threeObjects.renderer.render(threeObjects.scene, threeObjects.camera);
}
