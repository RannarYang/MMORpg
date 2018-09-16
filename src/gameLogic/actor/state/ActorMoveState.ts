/*
 * @Author: RannarYang
 * @Describe: 角色移动状态
 * @Date: 2018-09-14 22:40:05 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-16 11:49:41
 */

class ActorMoveState extends ActorBaseState{
    constructor(owner: Object){
        super(owner);
    }
    private _tween: Laya.Tween;
    private _targetPos: Laya.Point;
    public onEnter(obj: Object = null): void {
        this._targetPos = obj as Laya.Point;
        if(!obj) {
            console.warn("ActorMoveState obj param is null");
            this._actor.changeState(ActorState.Idle);
        } else {
            if(this._actor && this._actor.disObjCtrl.isObj3dLoaded) {
                this._actor.disObjCtrl.aniController.playAniByState(ActorState.Move);
            }

            let speed: number = this._actor.actorPropertyManager.getProperty(ActorPropertyType.Speed);
            let curPos: Laya.Point = new Laya.Point(this._actor.disObjCtrl.disObj.x, this._actor.disObjCtrl.disObj.y);
            let distance: number = Tools.distancePoint(this._targetPos, curPos);
            let duration: number = distance/speed * 1000;
            // 进行位移
            if(this._tween)
                this._tween.clear();
            this._tween = Laya.Tween.to(this._actor.disObjCtrl.disObj, {x: this._targetPos.x, y: this._targetPos.y}, duration, null, Laya.Handler.create(this, this.onMoveCmp));
            this._actor.disObjCtrl.changeAngle(this._targetPos);
        }
        
    }
    private onMoveCmp(): void {
        this._actor.changeState(ActorState.Idle);
    }

    public onLeave(newState: string) {
        super.onLeave(newState);
        this._targetPos = null;
        if(this._tween)
            this._tween.clear();
        this._tween = null;
    }
}