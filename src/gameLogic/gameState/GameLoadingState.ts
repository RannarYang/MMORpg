/*
 * @Author: RannarYang
 * @Describe: 游戏加载状态
 * @Date: 2018-09-16 20:42:11 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-19 23:04:59
 */

class GameLoadingState extends State {
    constructor(owner: Object){
        super(owner);
    }
    public onEnter(obj: Object = null): void {
        // 加载寻路配置文件
        let arr = [];
        arr.push({url: NavManager.I.jsonUrl, type:Laya.Loader.JSON});
        arr.push({url: "res/config/config.json", type: Laya.Loader.JSON});
        arr.push({url: "res/atlas/ui_main.atlas", type: Laya.Loader.ATLAS});

        Laya.loader.load(arr, Laya.Handler.create(this, this.onLoadedCmp));
    }

    private onLoadedCmp(): void {
        NavManager.I.init();

        let json:JSON=Laya.loader.getRes("res/config/config.json");
        ConfigTabel.initConfig(json);

        this.preloadRes();
    }
    private preloadRes(): void {
        let arr = [];
        arr.push(GameConfig.EffectPath + "hit_red/hit_red.lh");
        arr.push(GameConfig.ModelPath + "cike/cike.lh");
        arr.push(GameConfig.ModelPath + "monster_001/laohu.lh")
        Laya.loader.create(arr, Laya.Handler.create(this, this.onResLoadCmp));
    }
    
    private onResLoadCmp() {
        let main: Main = this._owner as Main;
        main.changeState(GameState.Main);
    }
}