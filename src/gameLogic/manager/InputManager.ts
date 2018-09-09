/*
 * @Author: RannarYang
 * @Describe: 输入管理器
 * @Date: 2018-09-09 23:00:49 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-09 23:39:16
 */

class InputManager{
    constructor(){

    }

    public init(): void{
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseHandler);
    }
    private mouseHandler(e: Laya.Event): void {
        let pos: Laya.Point = SceneManager.I.getMousePos();
        Player.I.moveTo(pos);
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