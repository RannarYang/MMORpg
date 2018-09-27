/*
 * @Author: RannarYang
 * @Describe: 行为管理器
 * @Date: 2018-09-26 23:14:39 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-26 23:44:52
 */

class BehaviorManager extends Laya.EventDispatcher{
    private _behaviorList: BaseBehavior[];
    private _curBehavior: BaseBehavior;
    private _owner: Actor;
    constructor(owner: Actor){
        super();
        this._owner = owner;
        this._behaviorList = [];
        this.on(BehaviorEvent.EventOccur, this, this.onBehaviorEvent);
    }
    public add(behavior: BaseBehavior): void {
        behavior.owner = this._owner;
        this._behaviorList.push(behavior);
    }
    private onBehaviorEvent(obj: Object = null): void {
        if(this._curBehavior) {
            this._curBehavior.onBehaviorEvent(obj);
        }
    }
    public update(): void {
        if(this._owner.isDead()) {
            return;
        }
        if(this._curBehavior == null) {
            if(this._behaviorList.length > 0) {
                this._curBehavior = this._behaviorList.shift();
                this._curBehavior.start();
            }
        } else {
            if(this._curBehavior.isFinish) {
                this._curBehavior.stop();
                this._curBehavior = null
            } else {
                this._curBehavior.update();
            }
        }
    }
}