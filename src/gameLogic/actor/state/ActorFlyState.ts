/*
 * @Author: RannarYang
 * @Describe: 飞行逻辑
 * @Date: 2018-09-22 22:46:29 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-10-01 10:32:47
 */
class ActorFlyState extends ActorBaseState{
    private _moveParam: ActorMoveParam;
    private _tween: Laya.Tween;
    private _numPoints: number = 10;
    constructor(owner: Object){
        super(owner);
    }
    // 起飞点和落地点
    public onEnter(obj: Object = null): void {
        console.log("enter fly state");
        this._moveParam = obj as ActorMoveParam;
        if(!this._moveParam || !this._moveParam.path){
            console.warn("ActorFlyState moveParam is null");
            this._actor.changeState(ActorState.Idle);
        } else {
            super.onEnter(obj);
            this.fly();
        }
    }
    private pathP: Laya.Point[];
    private _duration: number;
    private _dt: number;

    private _flyStep: number = 0;
    private fly(): void {
        if(this._flyStep < this._moveParam.path.length - 1) {
            let begin: Laya.Point = NavManager.I.gridToScenePos(this._moveParam.path[this._flyStep].x, this._moveParam.path[this._flyStep].y);
            let end: Laya.Point = NavManager.I.gridToScenePos(this._moveParam.path[this._flyStep + 1].x, this._moveParam.path[this._flyStep + 1].y);
            let ctrlPoint: Laya.Point = new Laya.Point();
            ctrlPoint.x = (begin.x + end.x) >> 1;
            let deltaY = end.y - begin.y;
            let yOffset: number = 350;
            if(deltaY > 0) {
                ctrlPoint.y = begin.y - yOffset
            } else {
                ctrlPoint.y = end.y - yOffset
            }
            let path = Laya.Bezier.I.getBezierPoints([begin.x, begin.y, ctrlPoint.x, ctrlPoint.y, end.x, end.y], this._numPoints);
            let pathP: Laya.Point[] = this.pathP = [];
            let temp: Laya.Point = null;
            for(let i: number = 0; i < path.length - 1; i+=2) {
                temp = new Laya.Point(path[i], path[i+1]);
                pathP.push(temp);
            }
            // 删除第一个点
            pathP.shift();

            let speed: number = this._actor.actorPropertyManager.getProperty(ActorPropertyType.FlySpeed);
            let distance: number = Tools.distancePoint(begin, end);
            this._duration = Math.ceil(distance/speed/10 * 1000);
            this._actor.disObjCtrl.changeAngle(end);
            this._dt = this._numPoints / 30;

            this.tweenMove();
            this._flyStep ++;
        } else {
             // 结束移动
            this.reset();
            this._actor.changeState(ActorState.Idle);
            this._actor.behaviorManager.event(BehaviorEvent.EventOccur, BehaviorEvent.MoveFinish);
        }
        
    }

    private _step: number = 0;
    private tweenMove(): void {
        if(this._step < this.pathP.length) {
            // 进行位移
            let duration = this._duration - this._step * this._dt;
            let endX: number = this.pathP[this._step].x;
            let endY: number = this.pathP[this._step].y;
            if(!this._tween) {
                this._tween = Laya.Tween.to(this._actor.disObjCtrl.disObj, {x: endX, y: endY}, duration, Laya.Ease.linearNone, Laya.Handler.create(this, this.tweenMove));
            } else {
                this._tween.to(this._actor.disObjCtrl.disObj, {x: endX, y: endY}, duration,  Laya.Ease.linearNone, Laya.Handler.create(this, this.tweenMove));
            }
            Laya.timer.once(this._duration - this._step * this._dt + 100, this, ()=>{
                if(this._actor.disObjCtrl.disObj.x == endX && this._actor.disObjCtrl.disObj.y == endY) {
                    if(this._tween) {
                        this._tween.complete();
                        this.tweenMove();
                    }
                    
                }
            })
            this._step ++;
        } else {
            this._step = 0;
            this.fly();
        }
    }

    public onLeave(newState: string): void {
        this.reset();
    }
    private reset(): void {
        this.pathP = null;
        this._duration = 0;
        this._dt = 0;
        this._step = 0;
        this._flyStep = 0;
        this._moveParam = null;
        if(this._tween) {
            this._tween.clear();
        }
        this._tween = null;
    }
    public getStateKey(): string {
        return ActorState.Fly;
    }
}