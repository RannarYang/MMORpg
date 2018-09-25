/*
 * @Author: RannarYang
 * @Describe: 世界地图
 * @Date: 2018-09-09 22:47:11 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-26 00:15:32
 */

class WorldMap{
    private _mapAttr: MapAttr = new MapAttr();
    public get mapAttr(): MapAttr {
        return this._mapAttr;
    }

    private _tiles: MapTile[][];
    public get tiles(): MapTile[][] {
        return this._tiles;
    }

    private _container: Laya.Sprite;
    public get container(): Laya.Sprite {
        return this._container;
    }

    constructor() {
        this._container = new Laya.Sprite();
        this.init();
    }

    private init() {
        this.createTiles();
    }

    private createTiles(): void {
        this._tiles = [];
        for(let col = 0, clen = this._mapAttr.col; col < clen; col++) {
            this._tiles[col] = [];
            for(let row = 0, rlen = this._mapAttr.row; row < rlen; row++) {
                this.tiles[col][row] = new MapTile(row, col, this._container);
            }
        }
    }

    public update(): void {
        let camView: Laya.Rectangle = SceneManager.I.camera2d.cameraView;
        let tiles: ObjDictionary = this.getNeedLoadTile(camView.x, camView.y);
        this.loadTiles(tiles);
    }

    private _loadedTiles: ObjDictionary = new ObjDictionary();
    private loadTiles(tiles: ObjDictionary) {
        if(tiles && tiles.length > 0) {
            let arr: any[];
            let col: number, row: number;
            let key: string;
            // 卸载不用的地图块
            for(key in this._loadedTiles.container) {
                if(!tiles.containsKey(key)) {
                    arr = key.split("_");
                    col = parseInt(arr[0]);
                    row = parseInt(arr[1]);
                    this._tiles[col][row].unloadTile();
                    this._loadedTiles.remove(key);
                }
            }
            // 加载地图块
            for(key in tiles.container) {
                if(!this._loadedTiles.containsKey(key)) {
                    arr = key.split("_");
                    col = parseInt(arr[0]);
                    row = parseInt(arr[1]);
                    if(col >= 0 && col < this._mapAttr.col && row >= 0 && row < this._mapAttr.row) {
                        this._tiles[col][row].loadTile();
                        this._loadedTiles.add(key, key);
                    }
                }
                
            }
        }
    }

    /**获取需要加载的地图块 */
    public getNeedLoadTile(camX: number, camY: number): ObjDictionary {
        let tileW: number = this._mapAttr.mapTileW;
        let tileH: number = this._mapAttr.mapTileH;
        
        let rect: Laya.Rectangle = new Laya.Rectangle(camX - tileW, camY - tileH, GameConfig.DeviceW + 2 * tileW, GameConfig.DeviceH + 2 * tileH);
        let p1: Laya.Point = this.scenePosToGrid(rect.x, rect.y);
        let p2: Laya.Point = this.scenePosToGrid(rect.right, rect.bottom);

        let res: ObjDictionary = new ObjDictionary();
        let key: string;
        for(let i: number = p1.x; i <= p2.x; i++) {
            for(let j: number = p1.y; j <= p2.y; j++) {
                key = i + "_" + j;
                res.add(key, key);
            }
        }
        return res;
    }
    /**
     * 场景左边转成地图格子坐标
     * @param x 场景的横坐标
     * @param y 场景的纵坐标
     * @return x:格子的行，y:格子的列
     */
    public scenePosToGrid(x: number, y: number): Laya.Point {
        let p: Laya.Point = new Laya.Point();
        p.x = Math.floor(x / this._mapAttr.mapTileW);
        p.y = Math.floor(y / this._mapAttr.mapTileH);
        return p;
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