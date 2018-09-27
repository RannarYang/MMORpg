/*
 * @Author: RannarYang
 * @Describe: 
 * @Date: 2018-09-27 23:00:50 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-28 00:04:19
 */

class DialogToNPCBehavior extends BaseBehavior{
    private _param: DialogToNPCParam;
    private _bean: T_SpawnerBean;
    constructor(){
        super()
    }
    public init(param: Object = null){
        this._param = param as DialogToNPCParam;
        if(!this._param) {
            console.warn("Error DialogToNPCBehavior param is null");
        }
    }
    public start(): void {
        let bean: T_SpawnerBean = this._bean = BeanFactory.getSpawnerById(this._param.spawnerId);
        this.moveTo(new Laya.Point(bean.posX, bean.posY), 1);
    }
    public onSubBehaviorFinish(): void {
        // 对话
        this._sub = null;
        // 改变npc的朝向
        let npc: Actor = ActorManager.I.getActorById(this._bean.actorID);
        npc.disObjCtrl.changeAngle(this._owner.disObjCtrl.screenPos2d);

        Laya.timer.once(2000,  this, ()=>{
            // 播放动作
            npc.changeState(ActorState.NPCVisited);
                Laya.timer.once(2000,  this, ()=>{
                // 显示对话
                console.log("npc visited:" + this._bean.dialog);
                this._isFinish = true;
            })
        })
        
    }
    public stop(): void {
        this._param = null;
        this._bean = null;
    }
}