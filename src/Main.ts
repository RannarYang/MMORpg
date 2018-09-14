// 程序入口
class Main {
    constructor() {
        this.init3d();
        
    }
    private init3d() {
        Laya3D.init(GameConfig.DeviceW, GameConfig.DeviceH, true);

        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.Stat.show();

        SceneManager.I.init();
        InputManager.I.init();
        SceneManager.I.addToLayer(WorldMap.I.container, LayerEnum.MapLayer);
        SceneManager.I.addToLayer(Player.I.disObjCtrl.disObj, LayerEnum.ActorLayer, 1024, 1024);
        SceneManager.I.camera2d.focus(Player.I.disObjCtrl.disObj);

        Player.I.changeState(ActorState.Idle);

        Laya.timer.frameLoop(1, this, this.update);
    }
    private update(): void {
        SceneManager.I.update();
        Player.I.update();
    }
}
new Main();