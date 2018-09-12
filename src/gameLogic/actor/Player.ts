/*
 * @Author: RannarYang
 * @Describe: 角色类
 * @Date: 2018-09-09 22:51:02 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-12 23:18:29
 */

class Player extends ActorBase{
    protected _disObj: Laya.Sprite;
    public get disObj(): Laya.Sprite {
        return this._disObj;
    }

    protected _disObj3d: Laya.Sprite3D;
    
    constructor(actorType: number, actorCamp: number){
        super(actorType, actorCamp);
        this._disObj = new Laya.Sprite();
        let spr: Laya.Sprite = Laya.Sprite.fromImage("res/player.png");
        this._disObj.addChild(spr);   
        spr.x = -48;
        spr.y = -48;    
        this.create3dObj(); 
    }

    private create3dObj(): void {
        let _disObj3d = this._disObj3d = Laya.Sprite3D.load("res/models/cike/cike.lh");
        SceneManager.I.addToContainer3d(_disObj3d);
        _disObj3d.once(Laya.Event.HIERARCHY_LOADED, this, ()=>{
            _disObj3d.transform.localScale = new Laya.Vector3(0.3, 0.3, 0.3);
        })
    }

    public update(): void {
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
     /**单例 */
    private static instance: Player;
    public static get I(): Player {
        if(!this.instance) {
            this.instance = new Player(ActorType.Player, ActorCamp.Player);
        }
        return this.instance;
    }
}