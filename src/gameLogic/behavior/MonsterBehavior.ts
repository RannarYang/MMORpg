/*
 * @Author: RannarYang
 * @Describe: 
 * @Date: 2018-10-01 21:13:59 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-10-01 23:06:30
 */

class MonsterBehavior extends BaseBehavior{
    constructor(){
        super();
    }
    private attack(): void {
        // 如果正在执行子行为或者正在砍怪
        if(this._sub || this._owner.isStateOf(ActorState.Skill) || this._owner.isStateOf(ActorState.Dead)) {
            return;
        }
        let skill = this.getBestSkill();
        if(skill) {
            // 找到离主角最近的怪物
            let enemy: Actor = ActorManager.I.getActorById(this._owner.attackerID);
            if(enemy && !enemy.isDead()) {
                // 判断enemy是否在某个攻击范围内
                if(Tools.isInCircle(enemy.disObjCtrl.screenPos2d, this._owner.disObjCtrl.screenPos2d, skill.rangeParam.radius)) {
                    // 攻击
                    this._owner.disObjCtrl.changeAngle(enemy.disObjCtrl.screenPos2d);
                    this._owner.useSkill(skill.templateID);
                } else {
                    if(this._owner.isActorType(ActorType.Boss)) {
                        this.moveTo(enemy.disObjCtrl.gridPos);
                    }
                }
            } else {
                // 切换到idle状态
                this._owner.changeState(ActorState.Idle);
            }

        } else {
            // 切换到idle状态
            this._owner.changeState(ActorState.Idle);
        }   
    }

    public update(): void {
        if(!this._owner.isDead() && this._owner.attackerID > 0) {
            this.attack();
        }
    }
}