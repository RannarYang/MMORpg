/*
 * @Author: RannarYang
 * @Describe: 
 * @Date: 2018-09-17 22:28:44 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-10-01 13:16:03
 */
class ActorDeadState extends ActorBaseState{
    constructor(owner: Object){
        super(owner);
    }
    public onEnter(obj: Object = null): void {
        if(this._actor && this._actor.disObjCtrl.isObj3dLoaded) {
            this._actor.disObjCtrl.aniController.playAniByState(this.getStateKey(), null, Laya.Handler.create(this, this.onAniFinish));
        }
        if(this._actor.isActorType(ActorType.Monster) || this._actor.isActorType(ActorType.Boss)) {
            // 取得攻击者
            if(this._actor.attackerID > 0) {
                let attacker: Actor = ActorManager.I.getActorById(this._actor.attackerID);
                if(attacker) {
                    attacker.behaviorManager.event(BehaviorEvent.EventOccur, BehaviorEvent.KillMonster);
                }
            }
            SpawnerManager.I.onMonsterDead(this._actor.actorParam.spawnerId);
        }
        
    }
    private onAniFinish(): void {
        ActorManager.I.remove(this._actor);
    }
    public getStateKey(): string {
        return ActorState.Dead;
    }
}