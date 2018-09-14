/*
 * @Author: RannarYang
 * @Describe: 角色状态基类
 * @Date: 2018-09-14 22:32:21 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-14 22:39:11
 */

class ActorBaseState extends State{
    protected _actor: Actor;
    constructor(owner: Object){
        super(owner);
        this._actor = owner as Actor;
    }
    public onEnter(obj: Object = null): void {
        //TODO:播动画
        if(this._actor && this._actor.disObjCtrl.isObj3dLoaded) {
            // this._actor.disObjCtrl.aniController.playAni()
        }
    }
    public onLeave(newState: string): void {

    }
    public onUpdate(): void {
        
    }
    public getStateKey(): string {
        return StateMachine.InvalidState;
    }
}