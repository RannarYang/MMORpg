class T_SkillBean {
    public static ClassName = "T_SkillBean"
    /** 编号 */
    public id: number; 
    /** 名称 */
    public name: string; 
    /** 动作ID */
    public actionID: number; 
    /** 攻击力 */
    public atk: number; 
    /** 攻击范围 */
    public atkDis: number; 
    /** 攻击特效 */
    public atkEft: string; 
    /** 击中特效 */
    public hitEffect: string; 
    /** 声音 */
    public sound: string; 
    /** 范围类型，1圆形，2扇形 */
    public rangeType: number; 
    /** 范围参数 */
    public rangeParam: string; 
    /** 连招 */
    public nextSkill: number; 
    /** 是否是连招 */
    public isLinkSkill: boolean; 
    /** 冷却时间 */
    public cd: number; 
    /** 优先级 */
    public priority: number; 
}