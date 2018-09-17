/*
 * @Author: RannarYang
 * @Describe: 角色基类
 * @Date: 2018-09-12 23:11:03 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-17 14:01:16
 */

class ActorBase {
    /**角色类型 */
    protected _actorType: number;
    public get actorType(): number {
        return this._actorType;
    }
    /**角色阵营 */
    protected _actorCamp: number;
    public get actorCamp(): number {
        return this._actorCamp;
    }
    
    protected _templateID: number;
    protected _actorBean: T_ActorBean;
    public get actorBean(): T_ActorBean {
        return this._actorBean;
    }

    protected _actorID: number;
    public get actorID(): number {
        return this._actorID;
    }
    
    protected _actorParam: ActorParam;
    public get actorParam(): ActorParam {
        return this._actorParam;
    }
    constructor(templateID: number, actorType: number, actorCamp: number, actorID: number){
        this._templateID = templateID;
        this._actorType = actorType;
        this._actorCamp = actorCamp;
        this._actorID = actorID;
        this._actorBean = BeanFactory.getActorById(templateID);
    }

    public init(actorParam: ActorParam): void{
        this._actorParam = actorParam;
    }

    public isActorType(type: number): boolean {
        return this._actorType == type;
    }
    public isCampOf(camp: number): boolean {
        return this._actorCamp == camp;
    }
} 