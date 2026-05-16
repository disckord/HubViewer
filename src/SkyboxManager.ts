import * as THREE from 'three';
import { HDRLoader } from 'three/examples/jsm/loaders/HDRLoader.js';
export default class SkyboxManager{
    private constructor(){}
    public static init(hdrFileName: string, scene: THREE.Scene, renderer: THREE.WebGLRenderer){
        const pmremGenerator = new THREE.PMREMGenerator(renderer);
        pmremGenerator.compileEquirectangularShader();

        const hdrLoader = new HDRLoader();

        hdrLoader.load(
            hdrFileName,
            (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            const envMap = pmremGenerator.fromEquirectangular(texture).texture;
        
            scene.environment = envMap;
            scene.background = envMap;
            scene.environmentIntensity = 1.2;
            scene.backgroundBlurriness = 0.0;
            scene.backgroundIntensity = 1.0;
        
            texture.dispose();
            },
            (progress) => {
              console.log(`HDR Loading: ${Math.round((progress.loaded / progress.total) * 100)}%`);
            },
            (error) => {
              console.error('HDR Load Error:', error);
            }
        );
    }
}