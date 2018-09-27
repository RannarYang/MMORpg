/*
 * @Author: RannarYang
 * @Describe: 行为基类
 * @Date: 2018-09-26 23:01:32 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-27 23:52:39
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
    protected _sub: BaseBehavior;
    public moveTo(targetPos: Laya.Point, offset: number = 0): void {
        let moveParam: ActorMoveParam = new ActorMoveParam();
        moveParam.moveType = ActorState.Move;
        moveParam.offset = offset;
        moveParam.targetPos = targetPos;
        this._sub = new MoveToBehavior();
        this._sub.init(moveParam);
        this._sub.owner = this._owner;
        this._sub.start();
    }
    public init(param: Object = null){

    }
    public onBehaviorEvent(obj: Object): void {
        if(this._sub && !this._sub.isFinish){
            this._sub.onBehaviorEvent(obj);
        }
        if(this._sub && this._sub.isFinish) {
            this.onSubBehaviorFinish()
        }
    }
    public onSubBehaviorFinish(): void {
        
    }
    public start(): void {

    }
    public stop(): void {

    }

    public update(): void {
        
    }
}