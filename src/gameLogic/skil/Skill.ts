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
        let res: Actor[] = [];
        let cont: ObjDictionary = ActorManager.I.container;
        let actor: Actor;
        for(let key in cont.container) {
            actor = cont.container[key];
            if(actor.isDead()){
                continue;
            }
            if(!actor.isCampOf(this._owner.actorCamp)) {
                continue;
            }
            let flag: boolean = false;
            if(this._rangeParam.type == RangeParam.Circle) {
                flag = Tools.isInCircle(actor.disObjCtrl.screenPos2d(), this._owner.disObjCtrl.screenPos2d(), this._rangeParam.radius);
            } else if(this._rangeParam.type == RangeParam.Sector) {
                flag = Tools.isInSector(actor.disObjCtrl.screenPos2d(), this._owner.disObjCtrl.screenPos2d(), this._owner.disObjCtrl.dir2d(), this._rangeParam.radius, this._rangeParam.angle)
            } else {
                console.warn("不能识别的攻击范围")
            }
            if(flag) {
                res.push(actor);
            }
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