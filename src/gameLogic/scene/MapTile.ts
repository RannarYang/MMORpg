/*
 * @Author: RannarYang
 * @Describe: 地图块
 * @Date: 2018-09-10 22:56:06 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-10 23:19:55
 */

class MapTile{
    private _row: number;
    private _col: number;

    private _resUrl: string;
    private _disObj: Laya.Sprite;
    private _parent: Laya.Sprite;

    private _isLoading: boolean;
    private _isLoaded: boolean;

    constructor(row: number, col: number, parent: Laya.Sprite){
        this._row = row;
        this._col = col;
        this._parent = parent;
        this._resUrl = "res/map_001/" + row + "_" + col + ".jpg";
        this._disObj = new Laya.Sprite();
    }

    /**加载地图块 */
    private _handler: Laya.Handler;
    public loadTile(): void {
        this._handler = Laya.Handler.create(this, this.onLoadCmp);
        Laya.loader.load(this._resUrl, this._handler);
    }
    private onLoadCmp() {
        if(this._handler) {
            this._handler.recover();
        }
        this._isLoaded = true;
        this._isLoading = false;
        var texture: Laya.Texture = Laya.loader.getRes(this._resUrl);
        this._disObj.graphics.drawTexture(texture, 0, 0);
        // TODO: 300 => 需要读取配置
        this._disObj.x = this._col * 300;
        this._disObj.y = this._row * 300;
        this._parent.addChild(this._disObj);
    }

    public unloadTile(): void {
        this._disObj.graphics.clear();
        if(this._isLoading) {
            Laya.loader.cancelLoadByUrl(this._resUrl);
            this._isLoading = false;
        } else {
            Laya.loader.clearRes(this._resUrl, true);
        }
        this._isLoaded = false;
        this._parent.removeChild(this._disObj);
        this._handler && this._handler.recover();
    }
}