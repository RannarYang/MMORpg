/*
 * @Author: RannarYang
 * @Describe: 输入管理器
 * @Date: 2018-09-09 23:00:49 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-16 11:12:47
 */

class InputManager{
    constructor(){

    }

    public init(): void{
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseHandler);
        Laya.stage.on(Laya.Event.KEY_DOWN, this, this.onKeyDown);
    }
    private onKeyDown(e: any = null): void {
        if(e){
            switch(e["keyCode"]) {
                case 81: // Q
                    Player.I.changeState(ActorState.Move);
                    break;
                case 87: // W
                    Player.I.changeState(ActorState.Skill);
                    break;
            }
        }
    }
    private mouseHandler(e: Laya.Event): void {
        let pos: Laya.Point = SceneManager.I.getMousePos();
        Player.I.changeState(ActorState.Move, pos);
    }
    /**单例 */
    private static instance: InputManager;
    public static get I(): InputManager {
        if(!this.instance) {
            this.instance = new InputManager();
        }
        return this.instance;
    }
}