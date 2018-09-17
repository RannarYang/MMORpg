/*
 * @Author: RannarYang
 * @Describe: 
 * @Date: 2018-09-16 17:27:00 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-17 22:03:25
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
    public static drawCircle(center: Laya.Point, radius: number): void {
        let spr: Laya.Sprite = SceneManager.I.getLayer(LayerEnum.DebugLayer);
        spr.graphics.clear();
        spr.graphics.drawCircle(center.x, center.y, radius, "0xcccccc");
    }
    public static drawPie(center: Laya.Point, radius: number, startAngle: number, endAngle: number){
        let spr: Laya.Sprite = SceneManager.I.getLayer(LayerEnum.DebugLayer);
        spr.graphics.clear();
        spr.graphics.drawPie(center.x, center.y, radius, startAngle, endAngle, "0xcccccc");
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