/*
 * @Author: RannarYang
 * @Describe: 角色技能状态
 * @Date: 2018-09-14 22:40:05 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-14 23:22:36
 */

class ActorSkillState extends ActorBaseState{
    constructor(owner: Object){
        super(owner);
    }
    public onEnter(obj: Object = null): void {
        if(this._actor && this._actor.disObjCtrl.isObj3dLoaded) {
            this._actor.disObjCtrl.aniController.playAni(880, 900, 890, false, Laya.Handler.create(this, this.keyFrameHandler), Laya.Handler.create(this, this.onAniFinish));
        }
    }

    public keyFrameHandler(): void {
        console.log("key frame triggered");
    }

    public onAniFinish(): void {
        this._actor.changeState(ActorState.Idle);
    }
}