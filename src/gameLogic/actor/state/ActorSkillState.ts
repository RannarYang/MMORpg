/*
 * @Author: RannarYang
 * @Describe: 角色技能状态
 * @Date: 2018-09-14 22:40:05 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-15 15:01:00
 */

class ActorSkillState extends ActorBaseState{
    protected _skill: Skill;
    constructor(owner: Object){
        super(owner);
    }
    public onEnter(obj: Object = null): void {
        let skill = this._skill = obj as Skill;
        if(!skill) {
            console.warn("攻击状态 技能参数为空");
            this._actor.changeState(ActorState.Idle);
            return;
        }
        this._skill.onEnter();
    }
    public onUpdate(): void {
        super.onUpdate();
        if(this._skill) {
            this._skill.onUpdate();
        }
    }
    public onLeave(): void {
        if(this._skill) {
            this._skill.stop();
            this._skill = null;
        }
    }
    public getStateKey(): string {
        return ActorState.Skill;
    }
}