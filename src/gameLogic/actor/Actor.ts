/*
 * @Author: RannarYang
 * @Describe: 角色类
 * @Date: 2018-09-14 22:17:39 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-19 00:34:46
 */

class Actor extends ActorBase{
    /**角色属性 */
    protected _actorPropertyManager: ActorPropertyManager;
    public get actorPropertyManager(): ActorPropertyManager {
        return this._actorPropertyManager;
    }
    /**显示对象 */
    protected _disObjCtrl: DisplayObjectController;
    public get disObjCtrl(): DisplayObjectController {
        return this._disObjCtrl;
    }

    /**角色状态机 */
    protected _stateMachine: StateMachine;
    public get stateMachine(): StateMachine {
        return this._stateMachine;
    }
    /**技能管理器 */
    protected _skillManager: SkillManager;
    public get skillManager(): SkillManager {
        return this._skillManager;
    }
    public _actionDic: ObjDictionary;

    constructor(templateID: number, actorType: number, actorCamp: number, actorID: number){
        super(templateID, actorType, actorCamp, actorID);
    }
    public init(actorParam: ActorParam): void {
        super.init(actorParam);
        this.registerStates();
        this.registerActions();
        this.registerSkills();
        this.initProperty();
        this._disObjCtrl = new DisplayObjectController(this);
    }
    protected initProperty(): void {
        this._actorPropertyManager = new ActorPropertyManager(this);
        this._actorPropertyManager.setBaseProperty(ActorPropertyType.HP, this._actorBean.hp);
        this._actorPropertyManager.setBaseProperty(ActorPropertyType.Atk, this._actorBean.atk);
        this._actorPropertyManager.setBaseProperty(ActorPropertyType.Speed, this._actorBean.speed);
    }
    public useSkill(skillId: number): boolean {
        let skill: Skill = this._skillManager.getSkill(skillId);
        if(skill) {
            if(this._skillManager.isCoolDown(skillId)) {
                this._skillManager.addCD(skillId);
                this.changeState(ActorState.Skill, skill);
                return true;
            } else {
                console.warn("使用的技能还在冷却中");
                return false;
            }
            
        } else {
            console.warn("使用了未注册的技能：", skillId);
            return false;
        }
    }
    protected registerActions(): void {
        let actionDic = this._actionDic = new ObjDictionary();
        let res = BeanFactory.getActionBeans(this._templateID);
        let bean: T_ActionBean;
        for(let key in res) {
             bean = res[key];
             actionDic.add(bean.name, bean.actionID);
        }
    }
    protected registerStates(): void {
        this._stateMachine = new StateMachine(this);
        
    }
    protected registerSkills(): void {
        this._skillManager = new SkillManager(this);
        if(!Utils.StringUtil.isNullOrEmpty(this._actorBean.skillIds)) {
            let arr = Utils.StringUtil.splitStrToIntArr(this._actorBean.skillIds, "+");
            let skill: Skill;
            for(let i = 0, len = arr.length; i < len; i++) {
                skill = new Skill(arr[i], this);
                this._skillManager.add(skill);
            }
            
        }
    }
    public changeState(stateKey: string, obj: Object = null): void {
        if(this._stateMachine) {
            this._stateMachine.changeState(stateKey, obj);
        }
    }
    public isDead(): boolean {
        return this._actorPropertyManager.getProperty(ActorPropertyType.HP) < 0;
    }
    public onAttacked(skill: Skill): void {
        console.log("i am attacked", this._actorID);
        if(!this.isDead()) {
            AttackEffectUtils.I.doEffect(skill, this);
        }
    }
    public onDestroy(): void {
        if(this._disObjCtrl) {
            this._disObjCtrl.onDestroy();
        }
    }
    public update(): void {
        if(this._disObjCtrl) {
            this._disObjCtrl.update();
        }
    }
    
}