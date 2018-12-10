import  * as THREE from "three";
import { canvasHeight, msInSec, Display } from './display';

export class FunDisplay extends Display {
    private renderer: THREE.Renderer;
    private scene: THREE.Scene;
    private camera: THREE.Camera;

    constructor(content: HTMLElement) {
        super(content);
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.canvas.width / this.canvas.height, 0.1, 1000);
        this.camera.position.set(0, 0, 100);
        this.camera.lookAt(0, 0, 0);
        
    }
}
