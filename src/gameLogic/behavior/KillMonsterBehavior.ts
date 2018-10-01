/*
 * @Author: RannarYang
 * @Describe: 击杀怪物的行为
 * @Date: 2018-10-01 09:27:02 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-10-01 23:28:34
 */

class KillMonsterBehavior extends BaseBehavior{
    private _killCount: number;
    private _killedNum: number;
    constructor(){
        super();
    }
    public init(param: Object = null): void {
        this._killCount = param as number;
        this._killedNum = 0;
    }
    
    private attack(): void {
        // 如果正在执行子行为或者正在砍怪
        if(this._sub || this._owner.isStateOf(ActorState.Skill)) {
            return;
        }
        let skill = this.getBestSkill();
        if(skill) {
            // 找到离主角最近的怪物
            let enemy: Actor = AttackUtils.getNearestEnemy(this._owner);
            if(enemy) {
                // 判断enemy是否在某个攻击范围内
                if(Tools.isInCircle(enemy.disObjCtrl.screenPos2d, this._owner.disObjCtrl.screenPos2d, skill.rangeParam.radius)) {
                    // 攻击
                    this._owner.disObjCtrl.changeAngle(enemy.disObjCtrl.screenPos2d);
                    MainUIWindow.I.useSkill(skill.templateID);
                } else {
                    this.moveTo(enemy.disObjCtrl.gridPos);
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
        if(!this._isFinish){
            this.attack();
        }
    }
    public onSubBehaviorFinish(obj: Object): void {
        console.log("onSubBehaviorFinish=====", obj);
        let str: string = obj as string;    
        if(str == BehaviorEvent.KillMonster) {
            this._killedNum++;
            if(this._killedNum >= this._killCount) {
                this._isFinish = true;
            }
        }    
    }
    
    public start(): void {
        
    }
}