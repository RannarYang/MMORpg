/*
 * @Author: RannarYang
 * @Describe: 2D 摄像机（滚动的矩形区域）
 * @Date: 2018-09-09 23:18:25 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-09 23:51:23
 */

class Camera2D {
    private _cameraView: Laya.Rectangle;
    public get cameraView(): Laya.Rectangle {
        return this._cameraView;
    }
    private _scene: Laya.Sprite;
    constructor(scene: Laya.Sprite){
        this._scene = scene;
        this._cameraView = new Laya.Rectangle(0, 0, GameConfig.deviceW, GameConfig.deviceH);
        this._scene.scrollRect = this._cameraView;
    }

    private _focusTarget: Laya.Sprite;
    public focus(target: Laya.Sprite) {
        this._focusTarget = target;
        this._cameraView.x = this._focusTarget.x - (GameConfig.deviceW >> 1);
        this._cameraView.y = this._focusTarget.y - (GameConfig.deviceH >> 1);
    }
    private _pos: Laya.Point = new Laya.Point();
    private _ease: number = 0.0025;
    public update() {
        this._pos.x = this._focusTarget.x - (GameConfig.deviceW >> 1);
        this._pos.y = this._focusTarget.y - (GameConfig.deviceH >> 1);
        if(this._focusTarget) {
            
            if(this._focusTarget.x + (GameConfig.deviceW >> 1) < WorldMap.I.mapW
            && this._focusTarget.x - (GameConfig.deviceW >> 1) > 0
            ) {
                this._cameraView.x += (this._pos.x - this._cameraView.x) * Laya.timer.delta * this._ease;
            }
        
            if(this._focusTarget.y + (GameConfig.deviceH >> 1) < WorldMap.I.mapH
            && this._focusTarget.y - (GameConfig.deviceH >> 1) > 0
            ) {
                this._cameraView.y += (this._pos.y - this._cameraView.y) * Laya.timer.delta * this._ease;
            }
        }
    }
}