/*
 * @Author: RannarYang
 * @Describe: 
 * @Date: 2018-09-15 14:10:34 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-26 00:22:07
 */

class BeanFactory{
    public static getActorById(id: number): T_ActorBean {
        return GameDataManager.I.t_actorContainer.getActorById(id);
    }
    public static getActionById(id: number): T_ActionBean {
        return GameDataManager.I.t_actionContainer.getActionById(id);
    }
    public static getSkillById(id: number): T_SkillBean {
        return GameDataManager.I.t_skillContainer.getSkillByID(id);
    }
    public static getSpawnerById(id: number): T_SpawnerBean {
        return GameDataManager.I.t_spawnerContainer.getSpawnerById(id);
    }
    public static getActionBeans(ownerID: number): T_ActionBean[] {
        let res: T_ActionBean[] = []
        let dic: ObjDictionary = GameDataManager.I.t_actionContainer.actionMap;
        if(dic) {
            let container = dic.container;
            let bean: T_ActionBean;
            for(let key in container) {
                bean = container[key];
                if(bean.ownerID == ownerID) {
                    res.push(bean);
                }
            }
        }
        return res;
    }
}