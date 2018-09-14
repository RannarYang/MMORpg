/*
 * @Author: RannarYang
 * @Describe: 动画控制器
 * @Date: 2018-09-13 22:47:28 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-14 23:27:15
 */

class AnimationController{

    private _owner: ActorBase;

    private _skinAni: Laya.SkinAnimations;

    private _onAnimCmp: Laya.Handler;

    private _keyFrameHandler: Laya.Handler;

    private _keyFrame: number = -1;

    private _isPlaying: boolean = false;

    constructor(skinAni: Laya.SkinAnimations){
        this._skinAni = skinAni;
    }

    public playAni(startFrame: number, endFrame: number, keyframe: number = -1, isLoop: boolean = false, keyframeHandler: Laya.Handler = null, aniCmpHandler: Laya.Handler = null): void {
        if(this._skinAni) {
            this._isPlaying = true;
            let count: number = isLoop ? Number.MAX_VALUE : 0;
            this._onAnimCmp = aniCmpHandler;
            this._keyFrameHandler = keyframeHandler;
            this._keyFrame = keyframe;
            this._skinAni.player.on(Laya.Event.STOPPED, this, this.onAnimFinish);
            this._skinAni.player.playByFrame(0, 1, count, startFrame, endFrame);
        }
    }

    

    private onAnimFinish() : void {
        this._isPlaying = false;
        if(this._onAnimCmp) {
            this._onAnimCmp.run();
            // this._onAnimCmp.recover();
            this._onAnimCmp = null;
        }
    }

    public stop(immediate: boolean = true): void {
        this._isPlaying = false;
        this._skinAni.player.stop(immediate);
        this._keyFrameHandler = null;
        this._onAnimCmp = null;
        this._keyFrame = -1;
    }

    public update(): void {
        if(this._isPlaying) {
            if(this._keyFrame > 0 && this._keyFrameHandler) {
                if(this._skinAni.player.currentKeyframeIndex > 2 * this._keyFrame) {
                    this._keyFrameHandler.run();
                    this._keyFrameHandler = null;
                }
            }
        }
    }
}