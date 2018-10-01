/*
 * @Author: RannarYang
 * @Describe: 技能类
 * @Date: 2018-09-17 10:31:17 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-10-01 22:52:47
 */

class Skill{
    protected _templateID: number;
    public get templateID(): number {
        return this._templateID;
    }
    protected _owner: Actor;
    public get owner(): Actor {
        return this._owner;
    }
    protected _skillBean: T_SkillBean;
    public get skillBean(): T_SkillBean {
        return this._skillBean;
    }
    protected _rangeParam: RangeParam;
    public get rangeParam(): RangeParam {
        return this._rangeParam;
    }
    constructor(templateID: number, owner: Actor){
        this._owner = owner;
        this._templateID = templateID;
        this._skillBean = BeanFactory.getSkillById(templateID);
        this._rangeParam = new RangeParam(this._skillBean.rangeType, this._skillBean.rangeParam);
    }
    protected playAni(): void {
        this._owner.disObjCtrl.aniController.playAniByID(this._skillBean.actionID,  Laya.Handler.create(this, this.keyFrameHandler, null, false), Laya.Handler.create(this, this.antionFinishHandler));
    }
    protected keyFrameHandler(): void {
        // TODO: 触发伤害
        // 取得当前技能攻击范围之内的所有怪物
        // 是否在攻击范围内
        
        let res = AttackUtils.getDefendersInRange(this._owner, this._rangeParam)
        for(let i = 0, len = res.length; i < len; i++) {
            res[i].onAttacked(this);
        }
    }
    protected antionFinishHandler(): void {
        // 连招
        if(!this.useNextSkill()) {
            this._owner.changeState(ActorState.Idle);   
        }
    }
    protected useNextSkill(): boolean {
        if(this._skillBean.isLinkSkill && this._skillBean.nextSkill > 0) {
            let skill: Skill = this._owner.skillManager.getSkill(this._skillBean.nextSkill);
            if(skill) {
                this._owner.changeState(ActorState.Skill, skill);
                return true;
            }
            return false;
        }
        return false;
    }
    protected playEffecct(): void {

    }
    protected playSound(): void {

    }
    public onEnter(): void {
        this.playAni();
        this.playSound();
        this.playEffecct();
        // this.drawSkillArea();
    }
    public drawSkillArea(): void {
        if(this._rangeParam.type == RangeParam.Circle) {
            DebugTools.drawCircle(this._owner.disObjCtrl.screenPos2d, this._rangeParam.radius);
        } else if(this._rangeParam.type == RangeParam.Sector) {
            let dir: Laya.Point = this._owner.disObjCtrl.dir2d;
            let angle: number = Tools.R2A(Math.atan2(dir.y, dir.x));
            let startAngle: number = angle - this._rangeParam.angle * 0.5;
            let endAngle: number = angle + this._rangeParam.angle * 0.5;
            DebugTools.drawPie(this._owner.disObjCtrl.screenPos2d, this._rangeParam.radius, startAngle, endAngle);
        }
    }
    public onUpdate(): void {

    }

    public stop(): void {

    }
}