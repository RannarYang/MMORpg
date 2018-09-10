/*
 * @Author: RannarYang
 * @Describe: 场景管理器
 * @Date: 2018-09-09 21:21:48 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-10 23:47:48
 */

class SceneManager{
    private _scene: Laya.Sprite;

    private _layer_map: Laya.Sprite;
    private _layer_actor: Laya.Sprite;
    private _layer_effect: Laya.Sprite;
    
    private _layerDic: ObjDictionary;

    private _camera2D: Camera2D;
    public get camera2D() {
        return this._camera2D;
    }
    public init(): void {
        this._scene = new Laya.Sprite();
        this._layer_map = new Laya.Sprite();
        this._layer_actor = new Laya.Sprite();
        this._layer_effect = new Laya.Sprite();

        this._layerDic = new ObjDictionary();
        this._layerDic.add(LayerEnum.MapLayer, this._layer_map);
        this._layerDic.add(LayerEnum.ActorLayer, this._layer_actor);
        this._layerDic.add(LayerEnum.EffectLayer, this._layer_effect);

        this._scene.addChild(this._layer_map);
        this._scene.addChild(this._layer_actor);
        this._scene.addChild(this._layer_effect);

        Laya.stage.addChild(this._scene);

        this._camera2D = new Camera2D(this._scene);
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

    public update(): void {
        if(this._camera2D)
            this._camera2D.update();
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