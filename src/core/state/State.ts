/*
 * @Author: RannarYang
 * @Describe: 状态基类
 * @Date: 2018-09-13 23:43:17 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-14 22:33:54
 */

class State{
    protected _owner: Object;
    public get owner(): Object {
        return this._owner;
    }
    public onEnter(obj: Object = null): void {

    }
    public onLeave(newState: string): void {

    }
    public onUpdate(): void {
        
    }
    constructor(owner: Object){
        this._owner = owner;
    }
    public getStateKey(): string {
        return StateMachine.InvalidState;
    }
}