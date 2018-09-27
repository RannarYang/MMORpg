/*
 * @Author: RannarYang
 * @Describe: 
 * @Date: 2018-09-27 23:15:40 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-27 23:18:00
 */

class NPCVisitedState extends ActorBaseState{
    constructor(owner: Object){
        super(owner);
    }
    public onEnter(obj: Object = null): void {
        if(this._actor && this._actor.disObjCtrl.isObj3dLoaded &&  this._actor.disObjCtrl.aniController) {
            this._actor.disObjCtrl.aniController.playAniByState(this.getStateKey(), null, Laya.Handler.create(this, this.onAniCmp));
        }
    }
    private onAniCmp(): void {
        this._actor.changeState(ActorState.Idle);
    }
    public getStateKey(): string {
        return ActorState.NPCVisited;
    }
}