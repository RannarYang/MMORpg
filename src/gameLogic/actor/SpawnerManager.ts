/*
 * @Author: RannarYang
 * @Describe: 刷怪管理器
 * @Date: 2018-09-26 00:05:27 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-26 00:47:34
 */

class SpawnerManager{
    private _spawnerDic: ObjDictionary;
    private _createdDic: ObjDictionary;
    constructor(){
        this._spawnerDic = new ObjDictionary();
        this._createdDic = new ObjDictionary();
    }
    public init(){
        this.initTileInfo();
    }
    private initTileInfo(): void {
        let beans: ObjDictionary = GameDataManager.I.t_spawnerContainer.spawnerMap;
        let p: Laya.Point;
        let key: string;
        let spawnerBeanIDArr: number[];
        let bean: T_SpawnerBean;
        for(let key in beans.container) {
            bean = beans.container[key];
            p = NavManager.I.gridToScenePos(bean.posX, bean.posY);
            p = WorldMap.I.scenePosToGrid(p.x, p.y);
            key = p.x + "_" + p.y;
            if(this._spawnerDic.containsKey(key)) {
                spawnerBeanIDArr = this._spawnerDic.get(key);
            } else {
                spawnerBeanIDArr = [];
                this._spawnerDic.add(key, spawnerBeanIDArr);
            }
            spawnerBeanIDArr.push(bean.id)
        }
    }

    public onTileLoaded(col: number, row: number) {
        let key: string = col + "_" + row;
        let spawnerBeanIDArr: number[] = this._spawnerDic.get(key);   
        if(spawnerBeanIDArr && spawnerBeanIDArr.length > 0) {
            let bean: T_SpawnerBean;
            let param: ActorParam;
            let camp: number;
            let actor: Actor;
            let spawnerBean: SpawnerBean;
            for(let i: number = 0, len = spawnerBeanIDArr.length; i < len; i++) {
                bean = BeanFactory.getSpawnerById(spawnerBeanIDArr[i]);
                if(bean) {
                    param = new ActorParam();
                    param.pos = new Laya.Point(bean.posX, bean.posY);
                    param.dir = new Laya.Point();
                    if(bean.type == ActorType.NPC) {
                        camp = ActorCamp.Neutral;
                    } else if(bean.type == ActorType.Monster || bean.type == ActorType.Boss) {
                        camp = ActorCamp.Enemy;
                    }else if(bean.type == ActorType.Bubble) {
                        camp = ActorCamp.Neutral;
                    }
                    actor = ActorManager.I.create(bean.templateID, bean.type, camp, param);
                    actor.changeState(ActorState.Idle);

                    spawnerBean = new SpawnerBean();
                    spawnerBean.actorID = actor.actorID;
                    spawnerBean.key = key;
                    spawnerBean.spawnerID = bean.id;
                    this._createdDic.add(spawnerBean.spawnerID, spawnerBean);
                }
            }
        }     
    }
    public onTileUnloaded(col: number, row: number) {
        let key: string = col + "_" + row;
        let spawnerBean: SpawnerBean;
        let keys: number[] = [];
        for(let i in this._createdDic.container) {
            spawnerBean = this._createdDic.container[i];
            if(spawnerBean.key == key) {
                keys.push(spawnerBean.spawnerID);
                ActorManager.I.removeById(spawnerBean.actorID);
            }
        }
        for(let i =0, len = keys.length; i < len; i++) {
            this._createdDic.remove(keys[i]);
        }
    }
    /**单例 */
    private static instance: SpawnerManager;
    public static get I(): SpawnerManager {
        if(!this.instance) {
            this.instance = new SpawnerManager();
        }
        return this.instance;
    }
}

class SpawnerBean {
    public spawnerID: number;
    public key: string;
    public actorID:number;
}