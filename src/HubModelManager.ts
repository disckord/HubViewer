import * as THREE from 'three';
export default class HubModelManager{
    public static init() {
    }
    private constructor(){}
    public static processHubModel(model: THREE.Object3D): void {
        model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                console.log(`Processing mesh: ${child.name}`);
            }
        });
    }
}