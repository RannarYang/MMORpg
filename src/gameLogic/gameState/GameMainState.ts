/*
 * @Author: RannarYang
 * @Describe: 游戏主城状态
 * @Date: 2018-09-16 20:41:59 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-22 23:36:26
 */

class GameMainState extends State{
    constructor(owner: Object){
        super(owner);
    }
    public onEnter(obj: Object = null): void {

        let param: ActorParam = new ActorParam();
        param.pos = new Laya.Point(27, 37);
        let player = ActorManager.I.create(1000, ActorType.Player, ActorCamp.Player, param) as Player;
        player.changeState(ActorState.Idle);

        // 创建老虎
        param = new ActorParam();
        param.pos = new Laya.Point(51, 21);
        let monster = ActorManager.I.create(3000, ActorType.Monster, ActorCamp.Enemy, param) as Player;
        monster.changeState(ActorState.Idle);

        MainUIWindow.I.onOpen();
    }
    public onUpdate(): void {
        SceneManager.I.update();
        ActorManager.I.update();
    }
}