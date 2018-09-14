/*
 * @Author: RannarYang
 * @Describe: 角色移动状态
 * @Date: 2018-09-14 22:40:05 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-14 22:44:30
 */

class ActorMoveState extends ActorBaseState{
    constructor(owner: Object){
        super(owner);
    }
    public onEnter(obj: Object = null): void {
        if(this._actor && this._actor.disObjCtrl.isObj3dLoaded) {
            this._actor.disObjCtrl.aniController.playAni(1266, 1288, -1, true);
        }
    }
}