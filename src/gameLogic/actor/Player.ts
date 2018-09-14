/*
 * @Author: RannarYang
 * @Describe: 角色类
 * @Date: 2018-09-09 22:51:02 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-14 23:02:56
 */

class Player extends Actor{
    
    constructor(actorType: number, actorCamp: number){
        super(actorType, actorCamp);
    }

    public registerStates(): void {
        super.registerStates();
        this._stateMachine.registerState(ActorState.Idle, new ActorIdleState(this));
        this._stateMachine.registerState(ActorState.Move, new ActorMoveState(this));
        this._stateMachine.registerState(ActorState.Skill, new ActorSkillState(this));
    }
    
     /**单例 */
    private static instance: Player;
    public static get I(): Player {
        if(!this.instance) {
            this.instance = new Player(ActorType.Player, ActorCamp.Player);
        }
        return this.instance;
    }
}