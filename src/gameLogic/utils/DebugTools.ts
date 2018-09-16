/*
 * @Author: RannarYang
 * @Describe: 
 * @Date: 2018-09-16 17:27:00 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-16 21:10:11
 */

class DebugTools{
    private static markVec: Laya.Sprite[] = [];
    public static drawPath(path: Laya.Point[]): void {
        let spr: Laya.Sprite;
        let pos: Laya.Point;
        this.clearLastPath();
        for(let i: number = 0; i < path.length; i++) {
            spr = Laya.Sprite.fromImage("res/go.png");
            pos = NavManager.I.gridToScenePos(path[i].x, path[i].y);
            SceneManager.I.addToLayer(spr, LayerEnum.DebugLayer);
            spr.x = pos.x - 32;
            spr.y = pos.y - 32;
            this.markVec.push(spr);
        }
    }
    private static clearLastPath(): void {
        if(this.markVec) {
            for(let i = 0, len = this.markVec.length; i < len; i++) {
                this.markVec[i].removeSelf();
            }
            this.markVec = [];
        }
        
    }
    constructor(){

    }
}