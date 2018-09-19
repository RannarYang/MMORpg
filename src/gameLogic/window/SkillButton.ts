/*
 * @Author: RannarYang
 * @Describe: 
 * @Date: 2018-09-19 23:12:26 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-20 00:04:43
 */

class SkillButton{
    private _txtCd: laya.display.Text;
    private _imgCd: laya.ui.Image;
    private _cdTime: number;
    private _passedTime: number;
    private _leftTime: number;
    private _maskSpr: Laya.Sprite;
    private _maskRadius: number;
    private _isMask: boolean = false;
    constructor(node: laya.display.Node){
        this._txtCd = node.getChildByName("cd_txt") as laya.display.Text;
        this._imgCd = node.getChildByName("cd_img") as laya.ui.Image;
        this._maskSpr = new Laya.Sprite();
        this._isMask = Laya.Browser.onPC;
    }
    public useSkill(skillId: number) {
        let bean: T_SkillBean = BeanFactory.getSkillById(skillId);
        this._cdTime = bean.cd;
        this._passedTime = 0;
        this.doEffect();
    }

    private doEffect(): void {
        if(this._cdTime <= 0) return;
        this._txtCd.visible = true;
        this._txtCd.text = Math.ceil(this._cdTime / 1000) + "";
        if(this._isMask) {
            this._imgCd.mask = this._maskSpr;
            this._maskRadius = this._imgCd.width * 0.5;
        }
        this._imgCd.visible = true;
        Laya.timer.frameLoop(1, this, this.onUpdate);
    }
    private onUpdate(): void {
        this._passedTime += Laya.timer.delta;
        this._leftTime = this._cdTime - this._passedTime;
        if(this._leftTime <= 0){
            this.kill();
        } else {
            this._txtCd.text = Math.ceil(this._leftTime / 1000) + "";
            if(this._isMask){
                this._maskSpr.graphics.drawPie(this._maskRadius, this._maskRadius, this._maskRadius, -90, this._passedTime/ this._cdTime * 360 - 90, 0x0);
            }
        }
    }
    private kill(): void {
        Laya.timer.clear(this, this.onUpdate);
        this._txtCd.visible = false;
        this._passedTime = 0;
        this._leftTime = 0;
        this._cdTime = 0;
        if(this._isMask){
            this._maskSpr.graphics.clear();
        }
        this._imgCd.visible = false;
    }
}