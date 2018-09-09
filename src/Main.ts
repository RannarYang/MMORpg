// 程序入口
class Main {
    constructor() {
        //初始化引擎
        Laya3D.init(GameConfig.deviceW, GameConfig.deviceH, true);

        //适配模式
        Laya.stage.alignV = Laya.Stage.ALIGN_TOP;
        Laya.stage.alignH = Laya.Stage.ALIGN_LEFT;

        Laya.stage.scaleMode = Laya.Stage.SCALE_NOSCALE;
        Laya.stage.bgColor = '#232628';

        SceneManager.I.init();
        InputManager.I.init();
        SceneManager.I.addToLayer(WorldMap.I.container, LayerEnum.MapLayer);
        SceneManager.I.addToLayer(Player.I.disObj, LayerEnum.ActorLayer, 1024, 1024);

        SceneManager.I.camera2D.focus(Player.I.disObj);

        Laya.timer.frameLoop(1, this, this.update);
    }
    private update(): void {
        SceneManager.I.update();
    }
}
new Main();