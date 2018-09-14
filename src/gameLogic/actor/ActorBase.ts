/*
 * @Author: RannarYang
 * @Describe: 角色基类
 * @Date: 2018-09-12 23:11:03 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-14 22:20:59
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
    
    constructor(actorType: number, actorCamp: number){
        this._actorType = actorType;
        this._actorCamp = actorCamp;
    }

    public isActorType(type: number): boolean {
        return this._actorType == type;
    }
    public isCampOf(camp: number): boolean {
        return this._actorCamp == camp;
    }
} 