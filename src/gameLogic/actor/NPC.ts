/*
 * @Author: RannarYang
 * @Describe: NPC
 * @Date: 2018-09-26 00:30:39 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-27 23:18:35
 */

class NPC extends Actor{
    constructor(templateID: number, actorType: number, actorCamp: number, actorID: number){
        super(templateID, actorType, actorCamp, actorID);
    }

    protected registerStates(): void {
        super.registerStates();
        this._stateMachine.registerState(ActorState.Idle, new ActorIdleState(this));
        this._stateMachine.registerState(ActorState.NPCVisited, new NPCVisitedState(this));
    }
}