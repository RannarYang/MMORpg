/*
 * @Author: RannarYang
 * @Describe: 状态基类
 * @Date: 2018-09-13 23:43:17 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-14 00:01:40
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
    constructor(){

    }
    public getStateKey(): string {
        return StateMachine.InvalidState;
    }
}