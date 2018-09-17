/*
 * @Author: RannarYang
 * @Describe: 
 * @Date: 2018-09-17 19:09:15 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-17 22:24:27
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
        console.log("tiger hp: ", this._defender.actorPropertyManager.getProperty(ActorPropertyType.HP));
        // TODO:跳伤害数字
    }
    private playEffect(): void {
        if(Utils.StringUtil.isNullOrEmpty(this._skill.skillBean.hitEffect)) return;
        let pos: Laya.Vector3 = this._defender.disObjCtrl.getPos3d(true);
        let eft: Laya.Sprite3D = Laya.Sprite3D.load(GameConfig.EffectPath + this._skill.skillBean.hitEffect);
        eft.once(Laya.Event.HIERARCHY_LOADED, this, ()=>{
            SceneManager.I.addToContainer3d(eft);
            eft.transform.localPosition = pos;
        });

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