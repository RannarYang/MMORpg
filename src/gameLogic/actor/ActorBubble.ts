/*
 * @Author: RannarYang
 * @Describe: Bubble
 * @Date: 2018-09-26 00:30:39 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-26 00:34:23
 */

class ActorBubble extends Actor{
    constructor(templateID: number, actorType: number, actorCamp: number, actorID: number){
        super(templateID, actorType, actorCamp, actorID);
    }

    protected registerStates(): void {
        super.registerStates();
        this._stateMachine.registerState(ActorState.Idle, new ActorIdleState(this));
    }
}