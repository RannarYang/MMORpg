/*
 * @Author: RannarYang
 * @Describe: 游戏主城状态
 * @Date: 2018-09-16 20:41:59 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-17 21:31:51
 */

class GameMainState extends State{
    constructor(owner: Object){
        super(owner);
    }
    public onEnter(obj: Object = null): void {

        let json:JSON=Laya.loader.getRes("res/config/config.json");
        ConfigTabel.initConfig(json);

        let param: ActorParam = new ActorParam();
        param.pos = new Laya.Point(50, 20);
        let player = ActorManager.I.create(1000, ActorType.Player, ActorCamp.Player, param) as Player;

        // 创建老虎
        param = new ActorParam();
        param.pos = new Laya.Point(51, 21);
        let monster = ActorManager.I.create(3000, ActorType.Monster, ActorCamp.Enemy
    , param) as Player;
    }
    public onUpdate(): void {
        SceneManager.I.update();
        ActorManager.I.update();
    }
}