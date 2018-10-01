/*
 * @Author: RannarYang
 * @Describe: 
 * @Date: 2018-09-17 19:09:15 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-10-01 13:30:01
 */

class AttackEffectUtils{
    private _skill: Skill;
    private _defender: Actor;

    public doEffect(skill: Skill, defender: Actor) {
        if(!skill || !defender) return;
        this._skill = skill;
        this._defender = defender;
        this.doHp();
        this.playEffect();
    }
    private doHp(): void {
        let hp: number = this._skill.skillBean.atk;
        this._defender.actorPropertyManager.changeProperty(ActorPropertyType.HP, -hp);
        // TODO:跳伤害数字
        SceneManager.I.showDamageNum(-hp,this._defender.disObjCtrl.hpScreenPos, this._defender.actorType)
    }
    private playEffect(): void {
        if(Utils.StringUtil.isNullOrEmpty(this._skill.skillBean.hitEffect)) return;
        let pos: Laya.Vector3 = this._defender.disObjCtrl.getPos3d(true);
        pos.y += 0.5;
        let original: Laya.Sprite3D = Laya.Sprite3D.load(GameConfig.EffectPath + this._skill.skillBean.hitEffect);
        let eft = Laya.Sprite3D.instantiate(original);
        SceneManager.I.addToContainer3d(eft);
        eft.transform.localPosition = pos;
    }
     /**单例 */
    private static instance: AttackEffectUtils;
    public static get I(): AttackEffectUtils {
        if(!this.instance) {
            this.instance = new AttackEffectUtils();
        }
        return this.instance;
    }
}