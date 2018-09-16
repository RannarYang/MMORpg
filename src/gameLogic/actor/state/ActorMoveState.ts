/*
 * @Author: RannarYang
 * @Describe: 角色移动状态
 * @Date: 2018-09-14 22:40:05 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-16 21:42:22
 */

class ActorMoveState extends ActorBaseState{
    constructor(owner: Object){
        super(owner);
    }
    private _tween: Laya.Tween;
    private _moveParam: ActorMoveParam;
    public onEnter(obj: Object = null): void {
        let moveParam = this._moveParam = obj as ActorMoveParam;
        if(!moveParam || !moveParam.path) {
            console.warn("ActorMoveState obj param is null");
            this._actor.changeState(ActorState.Idle);
        } else {
            if(this._actor && this._actor.disObjCtrl.isObj3dLoaded) {
                this._actor.disObjCtrl.aniController.playAniByState(ActorState.Move);
            }
            this._step = 0;
            this.tweenMove();
        }
        
    }

    private _step: number = 0;
    private tweenMove(): void {
        if(this._step < this._moveParam.path.length - 1) {
            let begin: Laya.Point = NavManager.I.gridToScenePos(this._moveParam.path[this._step].x, this._moveParam.path[this._step].y) ;
            let end: Laya.Point = NavManager.I.gridToScenePos(this._moveParam.path[this._step + 1].x, this._moveParam.path[this._step + 1].y)
            let speed: number = this._actor.actorPropertyManager.getProperty(ActorPropertyType.Speed);
            let distance: number = Tools.distancePoint(begin, end);
            let duration: number = Math.round(distance/speed * 1000);
            this._actor.disObjCtrl.changeAngle(end);
            // 进行位移
            if(!this._tween) {
                this._tween = Laya.Tween.to(this._actor.disObjCtrl.disObj, {x: end.x, y: end.y}, duration, Laya.Ease.linearNone, Laya.Handler.create(this, this.tweenMove));
            } else {
                this._tween.to(this._actor.disObjCtrl.disObj, {x:end.x, y:end.y}, duration,  Laya.Ease.linearNone, Laya.Handler.create(this, this.tweenMove));
            }
            this._step ++;
        } else {
            // 结束移动
            this._actor.changeState(ActorState.Idle);
        }
    }
    private reset(): void {
        this._step = 0;
        this._moveParam = null;
        if(this._tween) {
            this._tween.clear();
        }
        this._tween = null;
    }

    public onLeave(newState: string) {
        this.reset();
    }
}