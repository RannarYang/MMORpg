/*
 * @Author: RannarYang
 * @Describe: 
 * @Date: 2018-09-17 10:40:26 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-17 11:13:00
 */

class T_SkillContainer{
    private _skillDic: ObjDictionary = new ObjDictionary(T_SkillBean);
 
    constructor() {
        let skillBeanArr: T_SkillBean[] = ConfigTabel.getConfig(T_SkillBean);
        for(let i = 0, len = skillBeanArr.length; i < len; i++) {
            this._skillDic.add(skillBeanArr[i].id, skillBeanArr[i]);
        }
    }
    public getSkillByID(id: number):T_SkillBean{
        if(this._skillDic.containsKey(id)) {
            return this._skillDic.get(id);	
        } else {
            console.warn("can not find skill bean : " + id);
            return null;
        }
    }
}