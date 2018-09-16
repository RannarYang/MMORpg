/*
 * @Author: RannarYang
 * @Describe: 游戏加载状态
 * @Date: 2018-09-16 20:42:11 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-16 21:04:02
 */

class GameLoadingState extends State {
    constructor(owner: Object){
        super(owner);
    }
    public onEnter(obj: Object = null): void {
        // 加载寻路配置文件
        Laya.loader.load([NavManager.I.jsonUrl,"res/config/config.json"], Laya.Handler.create(this, this.onLoadedCmp), null, Laya.Loader.JSON);
    }
    private onLoadedCmp(): void {
        NavManager.I.init();
        let main: Main = this._owner as Main;
        main.changeState(GameState.Main);
    }
}