/*
 * @Author: RannarYang
 * @Describe: 行为基类
 * @Date: 2018-09-26 23:01:32 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-26 23:39:20
 */

class BaseBehavior{
    protected _isFinish: boolean;
    public get isFinish(): boolean {
        return this._isFinish;
    }
    protected _owner: Actor;
    public set owner(owner: Actor) {
        this._owner = owner;
    }
    public init(param: Object = null){

    }
    public onBehaviorEvent(obj: Object): void {
        
    }
    public start(): void {

    }
    public stop(): void {

    }

    public update(): void {
        
    }
}