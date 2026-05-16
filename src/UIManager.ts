import GUI from 'lil-gui';
import HubModelManager, { RampDoorMode } from './HubModelManager';
export default class UIManager{
    public static gui: GUI;
    public static uiVarRampDoorMode: RampDoorMode = RampDoorMode.CLOSED;
    public static uiVarWindowOpen: boolean = false;
    public static uiVarDoorsOpen: boolean = false;
    public static uiVarLegsExtended: boolean = false;
    private constructor(){}

    private static onRampDoorModeChange(){
        HubModelManager.setRampDoorMode(UIManager.uiVarRampDoorMode)
    }

    private static onWindowOpenChange(){
        HubModelManager.setWindowOpen(UIManager.uiVarWindowOpen)
    }

    private static onDoorsOpenChange(){
        HubModelManager.setDoorsOpen(UIManager.uiVarDoorsOpen)
    }

    private static onLegsExtendedChange(){
        HubModelManager.setLegsExtended(UIManager.uiVarLegsExtended)
    }

    public static init(){
        UIManager.gui = new GUI();
        UIManager.gui.title("Options");
        UIManager.gui.add(UIManager, "uiVarRampDoorMode", ["Closed", "Porch", "Ramp"]).name("Ramp Door Mode").onChange(UIManager.onRampDoorModeChange);
        UIManager.gui.add(UIManager, "uiVarWindowOpen").name("Open Window").onChange(UIManager.onWindowOpenChange)
        UIManager.gui.add(UIManager, "uiVarDoorsOpen").name("Open Doors").onChange(UIManager.onDoorsOpenChange)
        UIManager.gui.add(UIManager, "uiVarLegsExtended").name("Extend Legs").onChange(UIManager.onLegsExtendedChange)
    }
}