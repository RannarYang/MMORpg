/*
 * @Author: RannarYang
 * @Describe: 
 * @Date: 2018-09-17 22:28:44 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-17 22:30:38
 */
class ActorDeadState extends ActorBaseState{
    constructor(owner: Object){
        super(owner);
    }
    public onEnter(obj: Object = null): void {
        if(this._actor && this._actor.disObjCtrl.isObj3dLoaded) {
            this._actor.disObjCtrl.aniController.playAniByState(this.getStateKey(), null, Laya.Handler.create(this, this.onAniFinish));
        }
    }
    private onAniFinish(): void {
        ActorManager.I.remove(this._actor);
    }
    public getStateKey(): string {
        return ActorState.Dead;
    }
}