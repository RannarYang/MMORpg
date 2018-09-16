/*
 * @Author: RannarYang
 * @Describe: 状态机
 * @Date: 2018-09-13 23:46:27 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-16 20:47:55
 */

class StateMachine {
    public static InvalidState: string = "Invalid";
    protected _stateDic: ObjDictionary;

    protected _currentState: State;

    protected _lastState: State;

    protected _owner: Object;
    public get owner(): Object{
        return this._owner;
    }
    public set owner(value: Object) {
        this._owner = value;
    }
    constructor(owner: Object){
        this._owner = owner; 
        this._stateDic = new ObjDictionary();
    }

    public registerState(stateKey: string, state: State): void {
        if(this._owner != state.owner) {
            console.warn("state machine 和 state 的所有者不一样");
            return;
        }
        this._stateDic.add(stateKey, state);
    }
    public isExist(stateKey: string): boolean {
        return this._stateDic.containsKey(stateKey);
    }

    public changeState(stateKey: string, obj: Object = null): void {
        let newState: State = this._stateDic.get(stateKey);
        if(newState == null){
            console.warn("unregister state: ", stateKey);
            return;
        }
        if(this._currentState) {
            this._currentState.onLeave(newState.getStateKey());
        }
        this._currentState = newState;
        this._currentState.onEnter(obj);
    }

    public update(): void {
        if(this._currentState) {
            this._currentState.onUpdate();
        }
    }

    public getCurrentState(): string {
        if(this._currentState) {
            return this._currentState.getStateKey();
        }
        return StateMachine.InvalidState;
    }

    public clear() {
        if(this._currentState) {
            this._currentState.onLeave(StateMachine.InvalidState);
        }
        this._stateDic.clear();
        this._currentState = null;
    }
}