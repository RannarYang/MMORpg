/*
 * @Author: RannarYang
 * @Describe: 
 * @Date: 2018-09-19 22:58:45 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-19 23:25:26
 */

class MainUIWindow{
    private _view: View;

    private _skillBtnDic: ObjDictionary;
    constructor(){
        this._skillBtnDic = new ObjDictionary();
    }
    public onOpen(){
        let view = this._view = new ui.MainUI();
        Laya.stage.addChild(view);

        let node: laya.display.Node = view.getChildByName("btm_right_panel");
        // TODO: 从主角技能表中取数据
        this._skillBtnDic.add(1000, new SkillButton(node.getChildByName("btn_skill_pg")));
        this._skillBtnDic.add(1003, new SkillButton(node.getChildByName("btn_skill_01")));
        this._skillBtnDic.add(1004, new SkillButton(node.getChildByName("btn_skill_02")));
        this._skillBtnDic.add(1005, new SkillButton(node.getChildByName("btn_skill_03")));
        this._skillBtnDic.add(1006, new SkillButton(node.getChildByName("btn_skill_04")));
    }
    public useSkill(skillId: number) {
        if(ActorManager.player) {
            if(this._skillBtnDic.containsKey(skillId)) {
                let skillBtn: SkillButton = this._skillBtnDic.get(skillId);
                skillBtn.useSkill(skillId);
                ActorManager.player.useSkill(skillId);
            }
        }
    }
    /**单例 */
    private static instance: MainUIWindow;
    public static get I(): MainUIWindow {
        if(!this.instance) {
            this.instance = new MainUIWindow();
        }
        return this.instance;
    }
}