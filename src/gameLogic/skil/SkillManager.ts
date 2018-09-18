/*
 * @Author: RannarYang
 * @Describe: 技能管理器
 * @Date: 2018-09-17 11:35:30 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-19 00:43:09
 */

class SkillManager{
    protected _owner: Actor;
    protected _skillDic: ObjDictionary;
    private _cdMgr: CDManager;
    constructor(owner: Actor){
        this._owner = owner;
        this._skillDic = new ObjDictionary();
        this._cdMgr = new CDManager();
    }

    public add(skill: Skill): void {
        if(skill) {
            this._skillDic.add(skill.templateID, skill);
        } else {
            console.warn("无法添加技能");
        }
    }
    public addCD(skillId: number): void {
        let skill: Skill = this._skillDic.get(skillId);
        if(skill) {
            this._cdMgr.addCD(skillId, skill.skillBean.cd);
        }
    }
    public isCoolDown(skillId: number): boolean {
        return this._cdMgr.isCoolDown(skillId);
    }
    public remove(skillId: number): void {
        this._skillDic.remove(skillId);
    }
    public getSkill(skillId: number): Skill {
        return this._skillDic.get(skillId);
    }
}