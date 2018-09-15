class T_ActionBean {
    public static ClassName = "T_ActionBean";
    /** 动作ID */
    public actionID: number; 
    /** 所属的角色 */
    public ownerID: number; 
    /** 名称 */
    public name: string; 
    /** 起始帧 */
    public start: number; 
    /** 结束帧 */
    public end: number; 
    /** 关键帧 */
    public keyFrame: string; 
    /** 是否循环 */
    public isLoop: boolean; 
}