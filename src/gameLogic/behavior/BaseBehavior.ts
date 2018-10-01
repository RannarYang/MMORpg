/*
 * @Author: RannarYang
 * @Describe: 行为基类
 * @Date: 2018-09-26 23:01:32 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-10-01 21:51:42
 */

class BaseBehavior{
    protected _isFinish: boolean;
    public get isFinish(): boolean {
        return this._isFinish;
    }
    protected _owner: Actor;
    public set owner(owner: Actor) {
        this._owner = owner;
    }
    protected _sub: BaseBehavior;
    public moveTo(targetPos: Laya.Point, offset: number = 0): void {
        let moveParam: ActorMoveParam = new ActorMoveParam();
        moveParam.moveType = ActorState.Move;
        moveParam.offset = offset;
        moveParam.targetPos = targetPos;
        this._sub = new MoveToBehavior();
        this._sub.init(moveParam);
        this._sub.owner = this._owner;
        this._sub.start();
    }
    public init(param: Object = null){

    }
    public onBehaviorEvent(obj: Object): void {
        if(this._sub){
            if(!this._sub.isFinish) {
                this._sub.onBehaviorEvent(obj);
            }
            if(this._sub.isFinish) {
                this._sub = null;
                this.onSubBehaviorFinish(obj);
            }
        } else {
            this.onSubBehaviorFinish(obj);
        }
    }
    public onSubBehaviorFinish(obj: Object): void {
        
    }
    public start(): void {

    }
    public stop(): void {

    }
    protected getBestSkill(): Skill {
        let res: Skill = null;
        let skills: Skill[] = this._owner.skillManager.getAllCdSkills();
        if(skills && skills.length > 0) {
            if(skills.length > 1) {
                skills = skills.sort(this.compareSkill);
            }
            // 排序
            return skills[0];
        }
        return res;
    }
    private compareSkill(a: Skill, b: Skill): number {
        let cd1: number = a.skillBean.cd;
        let cd2: number = b.skillBean.cd;
        if(cd1 > cd2) {
            return -1;
        } else if(cd1 < cd2) {
            return 1;
        } else {
            return 0;
        }
    }
    public update(): void {
        
    }
}