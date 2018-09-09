/*
 * @Author: RannarYang
 * @Describe: 角色类
 * @Date: 2018-09-09 22:51:02 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-09 23:12:45
 */

class Player{
    protected _disObj: Laya.Sprite;
    public get disObj(): Laya.Sprite {
        return this._disObj;
    }
    constructor(){
        this._disObj = new Laya.Sprite();
        let spr: Laya.Sprite = Laya.Sprite.fromImage("res/player.png");
        this._disObj.addChild(spr);   
        spr.x = -48;
        spr.y = -48;     
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
            this.instance = new Player();
        }
        return this.instance;
    }
}