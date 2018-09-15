/*
 * @Author: RannarYang
 * @Describe: 
 * @Date: 2018-09-15 13:25:36 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-15 14:24:54
 */

class T_ActionContainer{
    private _actionMap: ObjDictionary = new ObjDictionary();
    public get actionMap(): ObjDictionary {
        return this._actionMap;
    }
    constructor(){
        let actionBeanArr: T_ActionBean[] = ConfigTabel.getConfig(T_ActionBean);
        for(let i = 0, len = actionBeanArr.length; i < len; i++) {
            this._actionMap.add(actionBeanArr[i].actionID, actionBeanArr[i]);
        }
    }
    public getActionById(id: number): T_ActionBean {
        if(this._actionMap.containsKey(id)) {
            return this._actionMap.get(id);
        } else {
            console.warn("can not find action by id: ", id)
            return null;
        }
    }
}