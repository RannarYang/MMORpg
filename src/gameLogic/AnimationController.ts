/*
 * @Author: RannarYang
 * @Describe: 动画控制器
 * @Date: 2018-09-13 22:47:28 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-15 14:38:56
 */

class AnimationController{

    private _aniDic: ObjDictionary;

    private _skinAni: Laya.SkinAnimations;

    private _onAnimCmp: Laya.Handler;

    private _keyFrameHandler: Laya.Handler;

    private _keyFrame: number = -1;
    private _keyFrames: number[];

    private _isPlaying: boolean = false;

    constructor(skinAni: Laya.SkinAnimations, aniDic: ObjDictionary){
        this._skinAni = skinAni;
        this._aniDic = aniDic;
    }
    public playAniByState(stateKey: string, keyframeHandler: Laya.Handler = null, aniCmpHandler: Laya.Handler = null) {
        let actionID: number = this._aniDic.get(stateKey);
        if(actionID > 0) {
            this.playAniByID(actionID, keyframeHandler, aniCmpHandler)
        } else {
            console.warn("Error, can not find ActionID for: ", stateKey);
        }
    }
    public playAniByID(actionID: number, keyframeHandler: Laya.Handler = null, aniCmpHandler: Laya.Handler = null) {
        let bean: T_ActionBean = BeanFactory.getActionById(actionID);
        if(bean && this._skinAni) {
             this._isPlaying = true;
            let count: number = bean.isLoop ? Number.MAX_VALUE : 0;
            this._onAnimCmp = aniCmpHandler;
            this._keyFrameHandler = keyframeHandler;
            if(!Utils.StringUtil.isNullOrEmpty(bean.keyFrame)) {
                this._keyFrames = Utils.StringUtil.splitStrToIntArr(bean.keyFrame, "+");
            }
            this._skinAni.player.on(Laya.Event.STOPPED, this, this.onAnimFinish);
            this._skinAni.player.playByFrame(0, 1, count, bean.start, bean.end);
        }
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