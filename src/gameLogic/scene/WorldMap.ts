/*
 * @Author: RannarYang
 * @Describe: 世界地图
 * @Date: 2018-09-09 22:47:11 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-09 23:41:24
 */

class WorldMap{
    public mapW: number = 2048;
    public mapH: number = 2048;

    public mapUrl: string = "res/map.jpg";

    private _container: Laya.Sprite;
    public get container(): Laya.Sprite {
        return this._container;
    }

    constructor() {
        this._container = Laya.Sprite.fromImage(this.mapUrl);
    }

    /**单例 */
    private static instance: WorldMap;
    public static get I(): WorldMap {
        if(!this.instance) {
            this.instance = new WorldMap();
        }
        return this.instance;
    }
}