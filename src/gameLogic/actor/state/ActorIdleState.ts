/*
 * @Author: RannarYang
 * @Describe: 角色待机状态
 * @Date: 2018-09-14 22:40:05 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-15 15:22:16
 */

class ActorIdleState extends ActorBaseState{
    constructor(owner: Object){
        super(owner);
    }
    public onEnter(obj: Object = null): void {
        super.onEnter(obj);
    }
    public getStateKey(): string {
        return ActorState.Idle;
    }
}