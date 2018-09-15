/*
 * @Author: RannarYang
 * @Describe: 角色类
 * @Date: 2018-09-09 22:51:02 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-15 12:08:22
 */

class Player extends Actor{
    
    constructor(templateID: number, actorType: number, actorCamp: number){
        super(templateID, actorType, actorCamp);
    }

    protected registerStates(): void {
        super.registerStates();
        this._stateMachine.registerState(ActorState.Idle, new ActorIdleState(this));
        this._stateMachine.registerState(ActorState.Move, new ActorMoveState(this));
        this._stateMachine.registerState(ActorState.Skill, new ActorSkillState(this));
    }
    
     /**单例 */
    private static instance: Player;
    public static get I(): Player {
        if(!this.instance) {
            this.instance = new Player(1000, ActorType.Player, ActorCamp.Player);
        }
        return this.instance;
    }
}