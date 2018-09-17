/*
 * @Author: RannarYang
 * @Describe: 技能类
 * @Date: 2018-09-17 10:31:17 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-17 22:41:24
 */

class Skill{
    protected _templateID: number;
    public get templateID(): number {
        return this._templateID;
    }
    protected _owner: Actor;
    protected _skillBean: T_SkillBean;
    public get skillBean(): T_SkillBean {
        return this._skillBean;
    }
    protected _rangeParam: RangeParam;
    constructor(templateID: number, owner: Actor){
        this._owner = owner;
        this._templateID = templateID;
        this._skillBean = BeanFactory.getSkillById(templateID);
        this._rangeParam = new RangeParam(this._skillBean.rangeType, this._skillBean.rangeParam);
    }
    protected _keyFrameHandler: Laya.Handler;
    protected playAni(): void {
        this._keyFrameHandler = Laya.Handler.create(this, this.keyFrameHandler, null, false);
        this._owner.disObjCtrl.aniController.playAniByID(this._skillBean.actionID, this._keyFrameHandler, Laya.Handler.create(this, this.antionFinishHandler));
    }
    protected keyFrameHandler(): void {
        // TODO: 触发伤害
        // 取得当前技能攻击范围之内的所有怪物
        // 是否在攻击范围内
        
        let res = AttackUtils.getDefendersInRange(this._owner, this._rangeParam)
        console.log("res length", res.length);
        for(let i = 0, len = res.length; i < len; i++) {
            res[i].onAttacked(this);
        }
        console.log("skill: " + this._templateID + "key frame triggered")
    }
    protected antionFinishHandler(): void {
        // 
        console.log("skill: " + this._templateID + "use complete");
        this._owner.changeState(ActorState.Idle);
    }
    protected playEffecct(): void {

    }
    protected playSound(): void {

    }
    public onEnter(): void {
        this.playAni();
        this.playSound();
        this.playEffecct();
        this.drawSkillArea();
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
        if(this._keyFrameHandler) {
            this._keyFrameHandler.recover();
        }
        this._templateID = -1;
    }
}