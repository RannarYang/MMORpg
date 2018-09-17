/*
 * @Author: RannarYang
 * @Describe: 输入管理器
 * @Date: 2018-09-09 23:00:49 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-16 18:10:11
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
                    Player.I.useSkill(1000);
                    break;
            }
        }
    }
    private mouseHandler(e: Laya.Event): void {
        // 检查鼠标点击的地方是否可以行走
        
        let targetPoint: Laya.Point = SceneManager.I.getMousePos();
        let startX: number = Player.I.disObjCtrl.disObj.x;
        let startY: number = Player.I.disObjCtrl.disObj.y;

        let path: Laya.Point[] = NavManager.I.findPathByScenePos(startX, startY, targetPoint.x, targetPoint.y);
        DebugTools.drawPath(path);

        let moveParam: ActorMoveParam = new ActorMoveParam();
        moveParam.path = path;
        Player.I.changeState(ActorState.Move, moveParam);
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