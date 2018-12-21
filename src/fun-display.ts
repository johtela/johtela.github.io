import  * as THREE from "three";
import { canvasHeight, msInSec, Display } from './display';
import { Mesh } from "three";

let active: FunDisplay | null = null;

export class FunDisplay extends Display {
    private renderer: THREE.Renderer;
    private scene: THREE.Scene;
    private camera: THREE.Camera;
    private geometry: THREE.BufferGeometry;
    private material: THREE.Material;
    private mesh: THREE.Mesh;

    constructor(content: HTMLElement) {
        super(content);
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true });
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.canvas.width / this.canvas.height, 0.1, 1000);
        this.camera.position.set(0, 0, 2);
        this.camera.lookAt(0, 0, 0);

        this.geometry = new THREE.IcosahedronBufferGeometry(1);
        this.material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.FrontSide, wireframe: true });
        this.mesh = new Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);
    }

    protected async render() {
        this.mesh.rotation.y = 0;
        active = this;
        requestAnimationFrame(this.animate);
        do {
            await super.delay(1000);
        }
        while (active)
    }

    animate(): void {
        if (!active)
            return;
        active.mesh.rotation.x += 0.01;
        active.mesh.rotation.y += 0.01;
        active.renderer.render(active.scene, active.camera);
        if (active.mesh.rotation.y < 5 * Math.PI)
            requestAnimationFrame(active.animate);
        else
            active = null;
    }
}
