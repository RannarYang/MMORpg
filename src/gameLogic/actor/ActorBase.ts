/*
 * @Author: RannarYang
 * @Describe: 角色基类
 * @Date: 2018-09-12 23:11:03 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-12 23:55:33
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
    /**角色属性 */
    protected _actorPropertyManager: ActorPropertyManager;
    public get actorPropertyManager(): ActorPropertyManager {
        return this._actorPropertyManager;
    }
    constructor(actorType: number, actorCamp: number){
        this._actorType = actorType;
        this._actorCamp = actorCamp;
        this._actorPropertyManager = new ActorPropertyManager(this);
    }

    public isActorType(type: number): boolean {
        return this._actorType == type;
    }
    public isCampOf(camp: number): boolean {
        return this._actorCamp == camp;
    }
} 