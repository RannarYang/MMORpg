/*
 * @Author: RannarYang
 * @Describe: 角色类
 * @Date: 2018-09-14 22:17:39 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-14 23:00:34
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

    constructor(actorType: number, actorCamp: number){
        super(actorType, actorCamp);
        this.registerStates();
        this._actorPropertyManager = new ActorPropertyManager(this);
        this._disObjCtrl = new DisplayObjectController(this);
    }

    public registerStates(): void {
        this._stateMachine = new StateMachine(this);
        
    }
    public changeState(stateKey: string, obj: Object = null): void {
        if(this._stateMachine) {
            this._stateMachine.changeState(stateKey, obj);
        }
    }
    public moveTo(pos: Laya.Point): void {
        if(this._disObjCtrl){
            this._disObjCtrl.moveTo(pos);
        }
    }
    public update(): void {
        if(this._disObjCtrl) {
            this._disObjCtrl.update();
        }
    }
    
}