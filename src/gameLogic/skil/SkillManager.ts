/*
 * @Author: RannarYang
 * @Describe: 技能管理器
 * @Date: 2018-09-17 11:35:30 
 * @Last Modified by:   RannarYang 
 * @Last Modified time: 2018-09-17 11:35:30 
 */

class SkillManager{
    protected _owner: Actor;
    protected _skillDic: ObjDictionary;
    constructor(owner: Actor){
        this._owner = owner;
        this._skillDic = new ObjDictionary();
    }

    public add(skill: Skill): void {
        if(skill) {
            this._skillDic.add(skill.templateID, skill);
        } else {
            console.warn("无法添加技能");
        }
    }
    public remove(skillId: number): void {
        this._skillDic.remove(skillId);
    }
    public getSkill(skillId: number): Skill {
        return this._skillDic.get(skillId);
    }
}