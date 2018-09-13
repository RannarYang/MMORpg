/*
 * @Author: RannarYang
 * @Describe: 角色类
 * @Date: 2018-09-09 22:51:02 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-13 23:34:50
 */

class Player extends ActorBase{
    
    protected _disObjCtrl: DisplayObjectController;
    public get disObjCtrl(): DisplayObjectController {
        return this._disObjCtrl;
    }
    constructor(actorType: number, actorCamp: number){
        super(actorType, actorCamp);
        this._disObjCtrl = new DisplayObjectController(this);
    }

    public update(): void {
        if(this._disObjCtrl) {
            this._disObjCtrl.update();
        }
    }
    public moveTo(pos: Laya.Point): void {
        if(this._disObjCtrl){
            this._disObjCtrl.moveTo(pos);
        }
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