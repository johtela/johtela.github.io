import  * as THREE from "three";
import { canvasHeight, msInSec, Display } from './display';

let active: FunDisplay | null = null;

export class FunDisplay extends Display {
    private renderer: THREE.Renderer;
    private scene: THREE.Scene;
    private camera: THREE.Camera;
    private geometry: THREE.WireframeGeometry;
    private material: THREE.Material;
    private lines: THREE.Line;
    private start: number | null;

    constructor(content: HTMLElement) {
        super(content);
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true });
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.canvas.width / this.canvas.height, 0.1, 1000);
        this.camera.position.set(0, 0, 2);
        this.camera.lookAt(0, 0, 0);

        this.geometry = new THREE.WireframeGeometry (new THREE.BoxGeometry(1, 1, 1));
        this.material = new THREE.LineBasicMaterial({ color: 0xffffff });
        this.lines = new THREE.LineSegments(this.geometry, this.material);
        this.scene.add(this.lines);
    }

    protected async render() {
        this.lines.rotation.y = 0;
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
        active.lines.rotation.x += 0.01;
        active.lines.rotation.y += 0.01;
        active.renderer.render(active.scene, active.camera);
        if (active.lines.rotation.y < 10 * Math.PI)
            requestAnimationFrame(active.animate);
        else
            active = null;
    }
}
