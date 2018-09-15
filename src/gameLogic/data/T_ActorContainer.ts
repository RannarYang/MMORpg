/*
 * @Author: RannarYang
 * @Describe: 
 * @Date: 2018-09-15 11:35:14 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-15 11:59:08
 */

class T_ActorContainer {
    private _actorMap: ObjDictionary = new ObjDictionary();
 
    constructor() {
        let actorBeanArr: T_ActorBean[] = ConfigTabel.getConfig(T_ActorBean);
        for(let i = 0, len = actorBeanArr.length; i < len; i++) {
            this._actorMap.add(actorBeanArr[i].id, actorBeanArr[i]);
        }
    }
    public getActorById(id: number): T_ActorBean {
        if(this._actorMap.containsKey(id)) {
            return this._actorMap.get(id);
        } else {
            console.warn("can not find actor by id: ", id)
            return null;
        }
    }
}