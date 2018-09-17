class T_ActorBean {
    public static ClassName = "T_ActorBean";
    /** 编号 */
    public id: number; 
    /** 名称 */
    public name: string; 
    /** 血量 */
    public hp: number; 
    /** 攻击力 */
    public atk: number; 
    /** 速度 */
    public speed: number; 
    /** 飞行速度 */
    public flyspeed: number; 
    /** 人物头像 */
    public titleImg: string; 
    /** 2d图路径 */
    public file2d: string; 
    /** 3d模型路径 */
    public file3d: string; 
    /** 3d动画路径 */
    public fileAni: string; 
    /** mesh3d的名字 */
    public meshName: string; 
    /** 角色拥有的属性id */
    public skillIds: string; 
    /** 伤害数字偏移 */
    public yOffset: number; 
    /** 伤害数字偏移 */
    public xOffset: number; 
    /**   */
    public yOffsetEft: number; 
}