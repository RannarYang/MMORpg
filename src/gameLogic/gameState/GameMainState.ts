/*
 * @Author: RannarYang
 * @Describe: 游戏主城状态
 * @Date: 2018-09-16 20:41:59 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-16 21:12:18
 */

class GameMainState extends State{
    constructor(owner: Object){
        super(owner);
    }
    public onEnter(obj: Object = null): void {

        let json:JSON=Laya.loader.getRes("res/config/config.json");
        ConfigTabel.initConfig(json);

        let pos: Laya.Point = NavManager.I.gridToScenePos(50, 20);
        SceneManager.I.addToLayer(Player.I.disObjCtrl.disObj, LayerEnum.ActorLayer, pos.x, pos.y);
        SceneManager.I.camera2d.focus(Player.I.disObjCtrl.disObj);

    }
    public onUpdate(): void {
        SceneManager.I.update();
        Player.I.update();
    }
}