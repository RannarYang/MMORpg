/*
 * @Author: RannarYang
 * @Describe: 显示对象控制器
 * @Date: 2018-09-13 23:24:09 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-14 22:38:39
 */

class DisplayObjectController{

    protected _owner: Actor;
    
    protected _disObj: Laya.Sprite;
    public get disObj(): Laya.Sprite {
        return this._disObj;
    }

    protected _disObj3d: Laya.Sprite3D;
    
    protected _aniController: AnimationController;
    public get aniController(): AnimationController {
        return this._aniController;
    }

    protected _isObj3dLoaded: boolean = false;
    public get isObj3dLoaded(): boolean {
        return this._isObj3dLoaded;
    }
    constructor(owner: Actor){
        this._owner = owner;
        this.create2dObj();
        this.create3dObj();
    }

    private create2dObj(): void {
        this._disObj = new Laya.Sprite();
        let spr: Laya.Sprite = Laya.Sprite.fromImage("res/player.png");
        this._disObj.addChild(spr);   
        spr.x = -48;
        spr.y = -48;  
    }
    private create3dObj(): void {
        let _disObj3d = this._disObj3d = Laya.Sprite3D.load("res/models/cike/cike.lh");
        SceneManager.I.addToContainer3d(_disObj3d);
        _disObj3d.once(Laya.Event.HIERARCHY_LOADED, this, ()=>{
            this._isObj3dLoaded = true;
            _disObj3d.transform.localScale = new Laya.Vector3(0.3, 0.3, 0.3);

            let ms3d: Laya.MeshSprite3D = _disObj3d.getChildByName("mod_CiKeZhuangBei_Body_03") as Laya.MeshSprite3D;
            if(ms3d) {
                let skinAni: Laya.SkinAnimations = ms3d.addComponent(Laya.SkinAnimations) as Laya.SkinAnimations;
                skinAni.templet = Laya.AnimationTemplet.load("res/models/cike/cike.lsani");
                this._aniController = new AnimationController(skinAni);

                this._aniController.playAni(0, 50, -1, false);
            }
        })
    }
    public update(): void {
        if(this._aniController) {
            this._aniController.update();
        }
        if(this._disObj && this._disObj3d) {
            let pos2d: Laya.Vector3 = this.getGlobalVec3();
            let pos3d: Laya.Vector3 = new Laya.Vector3();
            Tools.screenCoordTo3DCoord(pos2d, pos3d);
            this._disObj3d.transform.position = pos3d;  
        }
    }
    private getGlobalVec3(): Laya.Vector3 {
        var pos: Laya.Vector3 = new Laya.Vector3();
        if(this._disObj) {
            let gp: Laya.Point = SceneManager.I.scene.localToGlobal(new Laya.Point(this._disObj.x, this._disObj.y))
            pos.x = gp.x;
            pos.y = gp.y;
        }
        return pos;
    }

    private _tween: Laya.Tween;
    public moveTo(pos: Laya.Point): void {
        if(this._tween)
            this._tween.clear();
        this._tween = Laya.Tween.to(this._disObj, {x: pos.x, y: pos.y}, 1000);
    }
}