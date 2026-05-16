import * as THREE from 'three';
export default class HubMaterialManager{
    private static matRegistry: Map<string, (importedMat?: THREE.Material) => THREE.Material>;
    private static loadedMats: Map<string, THREE.Material>;
    private constructor(){}

    public static init(){
        HubMaterialManager.matRegistry = new Map<string, (importedMat?: THREE.Material) => THREE.Material>();
        HubMaterialManager.loadedMats = new Map<string, THREE.Material>();
    }

    public static processHubMaterials(hubModel: THREE.Object3D) {
        hubModel.traverse((child) => {
            if (!(child instanceof THREE.Mesh)) return;
            let childAsMesh = child as THREE.Mesh;
            if(!childAsMesh.material || !(childAsMesh.material instanceof THREE.Material)) return;
            console.log("Processing Material '" + childAsMesh.material.name + "' for mesh '" + childAsMesh.name);
        });
    }
}