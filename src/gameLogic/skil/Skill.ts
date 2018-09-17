/*
 * @Author: RannarYang
 * @Describe: 技能类
 * @Date: 2018-09-17 10:31:17 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-17 11:26:21
 */

class Skill{
    protected _templateID: number;
    public get templateID(): number {
        return this._templateID;
    }
    protected _owner: Actor;
    protected _skillBean: T_SkillBean;
    constructor(templateID: number, owner: Actor){
        this._owner = owner;
        this._templateID = templateID;
        this._skillBean = BeanFactory.getSkillById(templateID);
    }
    protected _keyFrameHandler: Laya.Handler;
    protected playAni(): void {
        this._keyFrameHandler = Laya.Handler.create(this, this.keyFrameHandler, null, false);
        this._owner.disObjCtrl.aniController.playAniByID(this._skillBean.actionID, this._keyFrameHandler, Laya.Handler.create(this, this.antionFinishHandler));
    }
    protected keyFrameHandler(): void {
        // TODO: 触发伤害
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