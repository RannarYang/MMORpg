/*
 * @Author: RannarYang
 * @Describe: 场景管理器
 * @Date: 2018-09-09 21:21:48 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-16 16:52:36
 */

class SceneManager{

    private _layer_map: Laya.Sprite;
    private _layer_actor: Laya.Sprite;
    private _layer_effect: Laya.Sprite;
    /**调试层 */
    private _layer_debug: Laya.Sprite;
    
    private _layerDic: ObjDictionary;

    private _scene: Laya.Sprite;
    public get scene(): Laya.Sprite {
        return this._scene;
    }
    private _camera2d: Camera2D;

    private _scene3d: Laya.Scene;
    private _container3d: Laya.Sprite3D;
    private _camera3d: Laya.Camera;

    public get camera2d() {
        return this._camera2d;
    }
    public init(): void {
        this.init2d();
        this.init3d();
    }
    private init2d(): void {
        this._scene = new Laya.Sprite();
        this._layer_map = new Laya.Sprite();
        this._layer_actor = new Laya.Sprite();
        this._layer_effect = new Laya.Sprite();
        this._layer_debug = new Laya.Sprite();

        this._layerDic = new ObjDictionary();
        this._layerDic.add(LayerEnum.MapLayer, this._layer_map);
        this._layerDic.add(LayerEnum.ActorLayer, this._layer_actor);
        this._layerDic.add(LayerEnum.EffectLayer, this._layer_effect);
        this._layerDic.add(LayerEnum.DebugLayer, this._layer_debug);

        this._scene.addChild(this._layer_map);
        this._scene.addChild(this._layer_actor);
        this._scene.addChild(this._layer_effect);
        this._scene.addChild(this._layer_debug);

        Laya.stage.addChild(this._scene);

        this._camera2d = new Camera2D(this._scene);
    }

    private init3d(): void {
        this._scene3d = new Laya.Scene();
        Laya.stage.addChild(this._scene3d);
        // camera
        let camera3d = this._camera3d = new Laya.Camera(0, 0.1, 300);
        this._scene3d.addChild(camera3d);
        camera3d.transform.translate(new Laya.Vector3(0,0,150));
        camera3d.orthographic = true;
        camera3d.orthographicVerticalSize = 10;
        camera3d.viewport = new Laya.Viewport(0, 0, GameConfig.DeviceW, GameConfig.DeviceH);

        let container3d = this._container3d = new Laya.Sprite3D();
        container3d.transform.rotationEuler = new Laya.Vector3(Tools.A2R(30));
        this._scene3d.addChild(container3d);
    }

    public addToLayer(spr: Laya.Sprite, layer: string, posX: number = 0, posY: number = 0): void {
        let layerSpr: Laya.Sprite = (<Laya.Sprite>this._layerDic.get(layer));
        if(layerSpr) {
            layerSpr.addChild(spr);
            spr.x = posX;
            spr.y = posY;
        } else {
            console.warn("can not found layer: ", layer);
        }
    }

    public addToContainer3d(obj) {
        this._container3d.addChild(obj);
    }

    public update(): void {
        if(this._camera2d)
            this._camera2d.update();
        WorldMap.I.update();
    }

    public getMousePos(): Laya.Point {
        if(this._scene) {
            return new Laya.Point(this._scene.mouseX, this._scene.mouseY);
        } else {
            return new Laya.Point();
        }
    }
    /**单例 */
    private static instance: SceneManager;
    public static get I(): SceneManager {
        if(!this.instance) {
            this.instance = new SceneManager();
        }
        return this.instance;
    }
}