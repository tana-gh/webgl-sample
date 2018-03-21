declare module "three-orbitcontrols" {
    import THREE = require("three")
    class OrbitControls extends THREE.OrbitControls {
        constractor(object: any, domElement?: HTMLElement | Document): OrbitControls
    }
    export = OrbitControls
}
