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
        SceneManager.I.addToLayer(Player.I.disObj, LayerEnum.ActorLayer, 1024, 1024);
        SceneManager.I.camera2d.focus(Player.I.disObj);

        Player.I.actorPropertyManager.setBaseProperty(ActorPropertyType.HP, 1000);
        console.log(Player.I.actorPropertyManager.getProperty(ActorPropertyType.HP))
        console.log(Player.I.actorPropertyManager.changeProperty(ActorPropertyType.HP, -200))
        console.log(Player.I.actorPropertyManager.getProperty(ActorPropertyType.HP))
        Laya.timer.frameLoop(1, this, this.update);
    }
    private update(): void {
        SceneManager.I.update();
        Player.I.update();
    }
}
new Main();