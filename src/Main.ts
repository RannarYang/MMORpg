// 程序入口
class Main {
    constructor() {
        // TODO: 加载json文件(暂时放在这里)
        this.init3d();
        this.initGameState();
    }
    private init3d() {
        Laya3D.init(GameConfig.DeviceW, GameConfig.DeviceH, true);
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.Stat.show();

        SceneManager.I.init();
        InputManager.I.init();
        SceneManager.I.addToLayer(WorldMap.I.container, LayerEnum.MapLayer);
        
        Laya.timer.frameLoop(1, this, this.update);
        
    }
    private _stateMachine: StateMachine;
    private initGameState(): void {
        this._stateMachine = new StateMachine(this);
        this._stateMachine.registerState(GameState.Loading, new GameLoadingState(this));
        this._stateMachine.registerState(GameState.Main, new GameMainState(this));
        this._stateMachine.changeState(GameState.Loading);
    }
    public changeState(key: string, obj: Object = null) {
        if(this._stateMachine) {
            this._stateMachine.changeState(key, obj);
        }
    }
    private update(): void {
        if(this._stateMachine){
            this._stateMachine.update();
        }
    }
}
new Main();