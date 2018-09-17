/*
 * @Author: RannarYang
 * @Describe: 游戏数据管理器
 * @Date: 2018-09-15 11:44:52 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-17 11:17:46
 */

class GameDataManager{
    public t_actorContainer: T_ActorContainer = new T_ActorContainer();
    public t_actionContainer: T_ActionContainer = new T_ActionContainer();
    public t_skillContainer: T_SkillContainer = new T_SkillContainer();
     /**单例 */
    private static instance: GameDataManager;
    public static get I(): GameDataManager {
        if(!this.instance) {
            this.instance = new GameDataManager();
        }
        return this.instance;
    }
}