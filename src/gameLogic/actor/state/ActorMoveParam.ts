/*
 * @Author: RannarYang
 * @Describe: 
 * @Date: 2018-09-16 17:43:07 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-26 23:09:38
 */

class ActorMoveParam{
    public moveType: string;
    public path: Laya.Point[] = [];
    public targetPos: Laya.Point;
    constructor(){

    }
    public isFly(): boolean {
        return this.moveType == ActorState.Fly || this.moveType == ActorState.Fly2;
    }
}