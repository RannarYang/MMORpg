/*
 * @Author: RannarYang
 * @Describe: 
 * @Date: 2018-09-15 13:25:36 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-15 14:24:54
 */

class T_SpawnerContainer{
    private _spawnerMap:ObjDictionary = new ObjDictionary(T_SpawnerBean);
    public get spawnerMap():ObjDictionary {
        return this._spawnerMap;
    }
    constructor(){
        let spawnerBeanArr: T_SpawnerBean[] = ConfigTabel.getConfig(T_SpawnerBean);
        for(let i = 0, len = spawnerBeanArr.length; i < len; i++) {
            this._spawnerMap.add(spawnerBeanArr[i].id, spawnerBeanArr[i]);
        }
    }
    public getSpawnerById(id: number): T_SpawnerBean {
        if(this._spawnerMap.containsKey(id)) {
            return this._spawnerMap.get(id);
        } else {
            console.warn("can not find spawner by id: ", id)
            return null;
        }
    }
}