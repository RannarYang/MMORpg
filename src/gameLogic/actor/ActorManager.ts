/*
 * @Author: RannarYang
 * @Describe: 角色管理器
 * @Date: 2018-09-17 13:23:41 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-17 13:57:05
 */

class ActorManager{
    public static player: Player = null;
    private _container: ObjDictionary;
    public get container(): ObjDictionary {
        return this._container;
    }
    constructor(){
        this._container = new ObjDictionary();
    }

    public create(templateID: number, type: number, camp: number, actorID: number, actorParam: ActorParam): Actor {
        let actor: Actor = null;
        switch(type){
            case ActorType.Player:
                actor = new Player(templateID, type, camp, actorID);
                ActorManager.player = actor as Player;
                break;
            case ActorType.NPC:
                // actor 
                break;
            case ActorType.Monster:
                break;
        }
        actor.init(actorParam);
        this.add(actor);
        return actor;
    }

    public add(actor: Actor): void {
        if(!actor) {
            console.warn("即将添加的角色为空");
            return;
        }
        if(this._container.get(actor.actorID)) {
            console.warn("请勿重复添加角色：", actor.actorID);
        } else {
            this._container.add(actor.actorID, actor);
        }
    }
    public remove(actor: Actor): void{
        if(actor) {
            this._container.remove(actor.actorID);
        } else {
            console.warn("can not remove a null actor");
        }
    }
    public removeById(actorID: number): void{
        if(actorID) {
            this._container.remove(actorID);
        } else {
            console.warn("can not remove a null actor");
        }
    }
    public getActorById(actorID: number): Actor {
        return this._container.get(actorID);
    }
    public update(): void {
        let container = this._container.container;
        let actor: Actor;
        for(let key in container) {
            actor = container[key];
            if(actor) {
                actor.update();
            }
        }
    }
    /**单例 */
    private static instance: ActorManager;
    public static get I(): ActorManager {
        if(!this.instance) {
            this.instance = new ActorManager();
        }
        return this.instance;
    }
}