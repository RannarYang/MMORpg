// 程序入口
class Main {
    constructor() {
        // TODO: 加载json文件(暂时放在这里)
        Laya3D.init(GameConfig.DeviceW, GameConfig.DeviceH, true);
        Laya.loader.load("res/config/config.json", Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.JSON);
        // this.init3d();
    }
    private onLoaded() {
        let json:JSON=Laya.loader.getRes("res/config/config.json");
        ConfigTabel.initConfig(json);
        this.init3d();
    }
    private init3d() {

        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.Stat.show();

        SceneManager.I.init();
        InputManager.I.init();
        SceneManager.I.addToLayer(WorldMap.I.container, LayerEnum.MapLayer);
        SceneManager.I.addToLayer(Player.I.disObjCtrl.disObj, LayerEnum.ActorLayer, 1024, 1024);
        SceneManager.I.camera2d.focus(Player.I.disObjCtrl.disObj);

        console.log(Player.I.actorPropertyManager.getProperty(ActorPropertyType.HP))
        Player.I.actorPropertyManager.changeProperty(ActorPropertyType.HP, -200);
        console.log(Player.I.actorPropertyManager.getProperty(ActorPropertyType.HP))
        Laya.timer.frameLoop(1, this, this.update);
    }
    private update(): void {
        SceneManager.I.update();
        Player.I.update();
    }
}
new Main();