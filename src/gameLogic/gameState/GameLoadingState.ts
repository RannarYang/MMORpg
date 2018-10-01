/*
 * @Author: RannarYang
 * @Describe: 游戏加载状态
 * @Date: 2018-09-16 20:42:11 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-10-01 23:37:30
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

        arr.push({url: GameConfig.BmpFontPath, type: Laya.Loader.XML}, {url: GameConfig.BmpFontPath.replace(".fnt", ".png"), type: Laya.Loader.IMAGE});
        arr.push({url: GameConfig.BmpFontPath2, type: Laya.Loader.XML}, {url: GameConfig.BmpFontPath2.replace(".fnt", ".png"), type: Laya.Loader.IMAGE});

        Laya.loader.load(arr, Laya.Handler.create(this, this.onLoadedCmp));
    }

    private onLoadedCmp(): void {
        NavManager.I.init();

        let json:JSON=Laya.loader.getRes("res/config/config.json");
        ConfigTabel.initConfig(json);

        let bitmapFont: Laya.BitmapFont = new Laya.BitmapFont();
        bitmapFont.parseFont(Laya.Loader.getRes(GameConfig.BmpFontPath), Laya.Loader.getRes(GameConfig.BmpFontPath.replace(".fnt", ".png")));
        bitmapFont.setSpaceWidth(10);
        Laya.Text.registerBitmapFont(GameConfig.BmpFntName, bitmapFont);

        let bitmapFont2: Laya.BitmapFont = new Laya.BitmapFont();
        bitmapFont2.parseFont(Laya.Loader.getRes(GameConfig.BmpFontPath2), Laya.Loader.getRes(GameConfig.BmpFontPath2.replace(".fnt", ".png")));
        bitmapFont2.setSpaceWidth(10);
        Laya.Text.registerBitmapFont(GameConfig.BmpFntName2, bitmapFont2);

        this.preloadRes();
    }
    private preloadRes(): void {
        let arr = [];
        arr.push(GameConfig.EffectPath + "hit_red/hit_red.lh");
        arr.push(GameConfig.ModelPath + "fly_point/fly_point.lh");
        arr.push(GameConfig.ModelPath + "cike/cike.lh");
        arr.push(GameConfig.ModelPath + "monster_001/laohu.lh");
        arr.push(GameConfig.ModelPath + "npc_001/npc.lh");
        arr.push(GameConfig.ModelPath + "boss_002/ChiMoYan_Skin.lh");
        Laya.loader.create(arr, Laya.Handler.create(this, this.onResLoadCmp));
    }
    
    private onResLoadCmp() {
        let main: Main = this._owner as Main;
        main.changeState(GameState.Main);
    }
}