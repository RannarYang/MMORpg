/*
 * @Author: RannarYang
 * @Describe: 输入管理器
 * @Date: 2018-09-09 23:00:49 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-22 23:32:10
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
                    // ActorManager.player.changeState(ActorState.Move);
                    // 32 13 44 22
                    /*
                    let param: ActorMoveParam = new ActorMoveParam();
                    param.path = [];
                    param.path.push(new Laya.Point(32, 13));
                    param.path.push(new Laya.Point(44, 22));
                    param.moveType = ActorState.Fly;
                    ActorManager.player.changeState(ActorState.Fly, param);
                    */

                    let param: ActorMoveParam = new ActorMoveParam();
                    param.path = [];
                    param.path.push(new Laya.Point(27, 37));
                    param.path.push(new Laya.Point(35, 29));
                    param.path.push(new Laya.Point(66, 33));
                    param.moveType = ActorState.Fly;
                    ActorManager.player.changeState(ActorState.Fly, param);
                    break;
                case 87: // W
                    // ActorManager.player.useSkill(1000);
                    MainUIWindow.I.useSkill(1000);
                    break;
            }
        }
    }
    private mouseHandler(e: Laya.Event): void {
        // 检查鼠标点击的地方是否可以行走
        
        let targetPoint: Laya.Point = SceneManager.I.getMousePos();
        let startX: number = ActorManager.player.disObjCtrl.disObj.x;
        let startY: number = ActorManager.player.disObjCtrl.disObj.y;

        let path: Laya.Point[] = NavManager.I.findPathByScenePos(startX, startY, targetPoint.x, targetPoint.y);
        DebugTools.drawPath(path);

        let moveParam: ActorMoveParam = new ActorMoveParam();
        moveParam.path = path;
        ActorManager.player.changeState(ActorState.Move, moveParam);
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