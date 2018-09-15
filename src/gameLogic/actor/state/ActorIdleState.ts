/*
 * @Author: RannarYang
 * @Describe: 角色待机状态
 * @Date: 2018-09-14 22:40:05 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-15 15:22:16
 */

class ActorIdleState extends ActorBaseState{
    constructor(owner: Object){
        super(owner);
    }
    public onEnter(obj: Object = null): void {
        if(this._actor && this._actor.disObjCtrl.isObj3dLoaded) {
            this._actor.disObjCtrl.aniController.playAniByState(ActorState.Idle, Laya.Handler.create(this, this.keyFrameHandler,null, false));
        }
    }
    private keyFrameHandler(): void {
        console.log("actor idle key frame call back")
    }
}