/*
 * @Author: RannarYang
 * @Describe: 角色类
 * @Date: 2018-09-09 22:51:02 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-22 22:53:49
 */

class Player extends Actor{
    
    constructor(templateID: number, actorType: number, actorCamp: number, actorID: number){
        super(templateID, actorType, actorCamp, actorID);
    }

    protected registerStates(): void {
        super.registerStates();
        this._stateMachine.registerState(ActorState.Idle, new ActorIdleState(this));
        this._stateMachine.registerState(ActorState.Move, new ActorMoveState(this));
        this._stateMachine.registerState(ActorState.Skill, new ActorSkillState(this));
        this._stateMachine.registerState(ActorState.Fly, new ActorFlyState(this));
    }
}