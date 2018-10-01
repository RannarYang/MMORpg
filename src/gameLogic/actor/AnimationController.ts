/*
 * @Author: RannarYang
 * @Describe: 动画控制器
 * @Date: 2018-09-13 22:47:28 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-10-01 22:38:15
 */

class AnimationController{

    private _aniDic: ObjDictionary;

    private _skinAni: Laya.SkinAnimations;

    private _onAnimCmp: Laya.Handler;

    private _keyFrameHandler: Laya.Handler;

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


    private onAnimFinish() : void {
        this._isPlaying = false;
        this._keyFrames = null;
        this._keyFrameHandler = null;
        this._curKeyFrameIndex = 0;
        if(this._onAnimCmp) {
            let tempHandler: Laya.Handler = this._onAnimCmp;
            this._onAnimCmp = null;
            tempHandler.run();
            tempHandler = null;
        }
    }

    public stop(immediate: boolean = true): void {
        this._isPlaying = false;
        this._skinAni.player.stop(immediate);
        this._onAnimCmp = null;
        this._keyFrames = null;
        this._curKeyFrameIndex = 0;
        if(this._keyFrameHandler){
            this._keyFrameHandler.recover();
            this._keyFrameHandler = null;
        }
    }

    private _curKeyFrameIndex: number = 0;
    public update(): void {
        if(this._isPlaying && this._keyFrames && this._keyFrames.length > 0 && this._keyFrameHandler) {
            if(this._curKeyFrameIndex < this._keyFrames.length) {
                if(this._skinAni.player.currentKeyframeIndex > 2 * this._keyFrames[this._curKeyFrameIndex]) {
                    this._curKeyFrameIndex ++;
                    if(this._keyFrameHandler) {
                        this._keyFrameHandler.run();
                    }
                }
            } else if(this._keyFrameHandler){
                this._keyFrameHandler.recover();
                this._keyFrameHandler = null;
            }
        }
    }
}