/*
 * @Author: RannarYang
 * @Describe: 
 * @Date: 2018-09-17 22:38:13 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-10-01 09:45:35
 */

class AttackUtils{
    public static getDefendersInRange(attacker: Actor, rangeParam: RangeParam): Actor[] {
        let res: Actor[] = [];
        let cont: ObjDictionary = ActorManager.I.container;
        let actor: Actor;
        for(let key in cont.container) {
            actor = cont.container[key];
            if(actor.isDead()){
                continue;
            }
            if(actor.isCampOf(attacker.actorCamp) || actor.isCampOf(ActorCamp.Neutral)) {
                continue;
            }
            let flag: boolean = false;
            if(rangeParam.type == RangeParam.Circle) {
                flag = Tools.isInCircle(actor.disObjCtrl.screenPos2d, attacker.disObjCtrl.screenPos2d, rangeParam.radius);
            } else if(rangeParam.type == RangeParam.Sector) {
                flag = Tools.isInSector(actor.disObjCtrl.screenPos2d, attacker.disObjCtrl.screenPos2d, attacker.disObjCtrl.dir2d, rangeParam.radius, rangeParam.angle)
            } else {
                console.warn("不能识别的攻击范围")
            }
            if(flag) {
                res.push(actor);
            }
        }
        return res;
    }
    public static getNearestEnemy(attack: Actor) {
        let res: Actor = null;
        let actor: Actor;
        let cont = ActorManager.I.container.container;
        let distance: number, minDistance: number = Number.MAX_VALUE;
        for(let key in cont) {
            actor = cont[key];
            if(actor.isDead() || actor.isCampOf(attack.actorCamp) || actor.isCampOf(ActorCamp.Neutral)) {
                continue;
            }
            distance = attack.disObjCtrl.distance(actor);
            if(distance < minDistance) {
                minDistance = distance;
                res = actor;
            }
        }
        return res;
    }
}