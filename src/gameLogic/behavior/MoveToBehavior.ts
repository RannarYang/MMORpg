/*
 * @Author: RannarYang
 * @Describe: 
 * @Date: 2018-09-26 23:05:31 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-27 23:55:54
 */

class MoveToBehavior extends BaseBehavior{
    constructor(){
        super();
    }
    protected _moveParam: ActorMoveParam;
    public init(param: Object = null){
        this._moveParam = param as ActorMoveParam;
        if(!this._moveParam) {
            console.warn("Error MoveToBehaviro param is null");
            return;
        }
    }
    public onBehaviorEvent(obj: Object): void {
        let str = obj as string;
        if(str == BehaviorEvent.MoveFinish){
            this._isFinish = true;
        }
    }
    public start(): void {
        if(this._owner) {
            if(this._moveParam.isFly()) {
                this._owner.changeState(ActorState.Fly, this._moveParam);
            } else {
                let startX: number = this._owner.disObjCtrl.disObj.x;
                let startY: number = this._owner.disObjCtrl.disObj.y;
                let bestPos: Laya.Point = NavManager.I.getBestPos(this._owner.disObjCtrl.gridPos, this._moveParam.targetPos, this._moveParam.offset);
                let p: Laya.Point = NavManager.I.gridToScenePos(bestPos.x, bestPos.y);
                let path: Laya.Point[] = NavManager.I.findPathByScenePos(startX, startY, p.x, p.y);
                if(path && path.length > 0) {
                    this._moveParam.path = path;
                    this._owner.changeState(ActorState.Move, this._moveParam);  
                }
                
            }
        }
    }
    public stop(): void {
        this._moveParam = null;
    }
}