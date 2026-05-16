import * as THREE from 'three';
import { degToRad } from 'three/src/math/MathUtils.js';

const LEGS_EXTEND_DIST_METERS = 1.2;

export enum RampDoorMode{
    CLOSED = "Closed",
    PORCH = "Porch",
    RAMP = "Ramp"
}


export default class HubModelManager{


    private static doorLeft: THREE.Mesh;
    private static doorRight: THREE.Mesh;
    private static footBackLeft: THREE.Mesh;
    private static footBackRight: THREE.Mesh;
    private static footFrontLeft: THREE.Mesh;
    private static footFrontRight: THREE.Mesh;
    private static rampDoor: THREE.Mesh;
    private static rampDoorRailings: THREE.Mesh;
    private static rampDoorLatch: THREE.Mesh;
    private static rampDoorRailingsStowed: THREE.Mesh;
    private static rampDoorLatchStowed: THREE.Mesh;
    private static windowCover: THREE.Mesh;
    private static windowLatch: THREE.Mesh;
    private static windowLatchStowed: THREE.Mesh;
    
    private constructor(){}

    public static init(containerModel: THREE.Object3D) {
        containerModel.traverse((child) => {
            if (!(child instanceof THREE.Mesh)) return;
            console.log(`Processing mesh: ${child.name}`);
            let childAsMesh = child as THREE.Mesh;

            switch(childAsMesh.name){
                case "door_left":
                    HubModelManager.doorLeft = childAsMesh;
                    return;

                case "door_right":
                    HubModelManager.doorRight = childAsMesh;
                    return;
                
                case "foot_BL_screw":
                    HubModelManager.footBackLeft = childAsMesh;
                    return;
                
                case "foot_BR_screw":
                    HubModelManager.footBackRight = childAsMesh;
                    return;

                case "foot_FL_screw":
                    HubModelManager.footFrontLeft = childAsMesh;
                    return;
                
                case "foot_FR_screw":
                    HubModelManager.footFrontRight = childAsMesh;
                    return;

                case "ramp_door":
                    HubModelManager.rampDoor = childAsMesh;
                    return;

                case "ramp_door_latch":
                    HubModelManager.rampDoorLatch = childAsMesh;
                    return;

                case "ramp_door_railings":
                    HubModelManager.rampDoorRailings = childAsMesh;
                    return;

                case "ramp_door_latch_stowed":
                    HubModelManager.rampDoorLatchStowed = childAsMesh;
                    return;

                case "ramp_door_railings_stowed":
                    HubModelManager.rampDoorRailingsStowed = childAsMesh;
                    return;

                case "window_cover":
                    HubModelManager.windowCover = childAsMesh;
                    return;

                case "window_latch":
                    HubModelManager.windowLatch = childAsMesh;
                    return;

                case "window_latch_stowed":
                    HubModelManager.windowLatchStowed = childAsMesh;
                    return;
            }
        });
        HubModelManager.setRampDoorMode(RampDoorMode.CLOSED);
        HubModelManager.setWindowOpen(false);
    }

    public static setDoorsOpen(open: boolean){
        HubModelManager.doorLeft.rotation.set(0, degToRad(open ? -115.0 : 0), 0);
        HubModelManager.doorRight.rotation.set(0, degToRad(open ? 115.0 : 0), 0);
    }

    public static setLegsExtended(extended: boolean){
        const extendLen = extended ? -LEGS_EXTEND_DIST_METERS : LEGS_EXTEND_DIST_METERS;
        HubModelManager.footBackLeft.position.y += extendLen;
        HubModelManager.footBackRight.position.y += extendLen;
        HubModelManager.footFrontLeft.position.y += extendLen;
        HubModelManager.footFrontRight.position.y += extendLen;
    }

    public static setRampDoorMode(mode: RampDoorMode){
        switch(mode){
            case RampDoorMode.CLOSED:
                HubModelManager.rampDoor.rotation.set(0, 0, 0);
                HubModelManager.rampDoorLatch.visible = false;
                HubModelManager.rampDoorRailings.visible = false;
                HubModelManager.rampDoorLatchStowed.visible = true;
                HubModelManager.rampDoorRailingsStowed.visible = true;
                return;

            case RampDoorMode.PORCH:
                HubModelManager.rampDoor.rotation.set(0, 0, degToRad(90));
                HubModelManager.rampDoorLatch.visible = true;
                HubModelManager.rampDoorRailings.visible = true;
                HubModelManager.rampDoorLatchStowed.visible = false;
                HubModelManager.rampDoorRailingsStowed.visible = false;
                return;
                
            case RampDoorMode.RAMP:
                HubModelManager.rampDoor.rotation.set(0, 0, degToRad(105));
                HubModelManager.rampDoorLatch.visible = false;
                HubModelManager.rampDoorRailings.visible = false;
                HubModelManager.rampDoorLatchStowed.visible = true;
                HubModelManager.rampDoorRailingsStowed.visible = true;
                return;
        }
    }

    public static setWindowOpen(open: boolean){
        HubModelManager.windowCover.rotation.set(0, 0, degToRad(open ? 73 : 0));
        HubModelManager.windowLatch.visible = open;
        HubModelManager.windowLatchStowed.visible = !open;
    }
}