/*
 * @Author: RannarYang
 * @Describe: 游戏数据管理器
 * @Date: 2018-09-15 11:44:52 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-15 14:04:53
 */

class GameDataManager{
    public t_actorContainer: T_ActorContainer = new T_ActorContainer();
    public t_actionContainer: T_ActionContainer = new T_ActionContainer();
     /**单例 */
    private static instance: GameDataManager;
    public static get I(): GameDataManager {
        if(!this.instance) {
            this.instance = new GameDataManager();
        }
        return this.instance;
    }
}