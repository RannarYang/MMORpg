/*
 * @Author: RannarYang
 * @Describe: 
 * @Date: 2018-09-17 21:10:00 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-17 22:35:42
 */

class Monster extends Actor{
    constructor(templateID: number, actorType: number, actorCamp: number, actorID: number){
        super(templateID, actorType, actorCamp, actorID);
    }

    protected registerStates(): void {
        super.registerStates();
        this._stateMachine.registerState(ActorState.Idle, new ActorIdleState(this));
        this._stateMachine.registerState(ActorState.Move, new ActorMoveState(this));
        this._stateMachine.registerState(ActorState.Skill, new ActorSkillState(this));
        this._stateMachine.registerState(ActorState.Dead, new ActorDeadState(this));
    }
}