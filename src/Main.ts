// 程序入口
class Main {
    constructor() {
        //初始化引擎
        Laya3D.init( 0, 0, true);
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        Laya.Stat.show();

        let scene : Laya.Scene = Laya.stage.addChild(new Laya.Scene()) as Laya.Scene;
        let camera : Laya.Camera = scene.addChild(new Laya.Camera(0, 0.1, 100)) as Laya.Camera;
        camera.transform.translate(new Laya.Vector3(0, 0.5, 10));

        // let layaMonkey: Laya.Sprite3D = scene.addChild(Laya.Sprite3D.load("res/models/cike/cike.lh")) as Laya.Sprite3D;

        let e1: Laya.Sprite3D = Laya.Sprite3D.load("res/models/fly_point/fly_point.lh");
        scene.addChild(e1);

        let e2: Laya.Sprite3D = Laya.Sprite3D.load("res/effects/hit_red/hit_red.lh");
        scene.addChild(e2);


        Laya.timer.once(1000, this, ()=>{
            // layaMonkey.transform.localScale = new Laya.Vector3(0.01, 0.01, 0.01);
            e1.transform.translate(new Laya.Vector3(0, 1, 0), true);
        })



        // Laya.init(GameConfig.deviceW, GameConfig.deviceH, true);

        // //适配模式
        // Laya.stage.alignV = Laya.Stage.ALIGN_TOP;
        // Laya.stage.alignH = Laya.Stage.ALIGN_LEFT;

        // Laya.stage.scaleMode = Laya.Stage.SCALE_NOSCALE;
        // Laya.stage.bgColor = '#232628';

        // SceneManager.I.init();
        // InputManager.I.init();
        // SceneManager.I.addToLayer(WorldMap.I.container, LayerEnum.MapLayer);
        // SceneManager.I.addToLayer(Player.I.disObj, LayerEnum.ActorLayer, 1024, 1024);

        // SceneManager.I.camera2D.focus(Player.I.disObj);

        // Laya.timer.frameLoop(1, this, this.update);
    }
    private update(): void {
        SceneManager.I.update();
    }
}
new Main();