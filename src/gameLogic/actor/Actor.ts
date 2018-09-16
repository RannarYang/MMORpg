/*
 * @Author: RannarYang
 * @Describe: 角色类
 * @Date: 2018-09-14 22:17:39 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-16 11:53:45
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

    public _actionDic: ObjDictionary;

    constructor(templateID: number, actorType: number, actorCamp: number){
        super(templateID, actorType, actorCamp);
        this.registerStates();
        this.registerActions();
        this.initProperty();
        this._disObjCtrl = new DisplayObjectController(this);
    }
    protected initProperty(): void {
        this._actorPropertyManager = new ActorPropertyManager(this);
        this._actorPropertyManager.setBaseProperty(ActorPropertyType.HP, this._actorBean.hp);
        this._actorPropertyManager.setBaseProperty(ActorPropertyType.Atk, this._actorBean.atk);
        this._actorPropertyManager.setBaseProperty(ActorPropertyType.Speed, this._actorBean.speed);
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
    public changeState(stateKey: string, obj: Object = null): void {
        if(this._stateMachine) {
            this._stateMachine.changeState(stateKey, obj);
        }
    }
    // public moveTo(pos: Laya.Point): void {
    //     if(this._disObjCtrl){
    //         this._disObjCtrl.moveTo(pos);
    //     }
    // }
    public update(): void {
        if(this._disObjCtrl) {
            this._disObjCtrl.update();
        }
    }
    
}