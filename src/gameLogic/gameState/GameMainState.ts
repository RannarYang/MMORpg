/*
 * @Author: RannarYang
 * @Describe: 游戏主城状态
 * @Date: 2018-09-16 20:41:59 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-10-01 13:17:42
 */

class GameMainState extends State{
    constructor(owner: Object){
        super(owner);
    }
    public onEnter(obj: Object = null): void {

        let param: ActorParam = new ActorParam();
        param.pos = new Laya.Point(26, 13);
        let player = ActorManager.I.create(1000, ActorType.Player, ActorCamp.Player, param) as Player;
        player.changeState(ActorState.Idle);

        SpawnerManager.I.init();
        MainUIWindow.I.onOpen();
    }
    public onUpdate(): void {
        SceneManager.I.update();
        ActorManager.I.update();
        SpawnerManager.I.update();
    }
}