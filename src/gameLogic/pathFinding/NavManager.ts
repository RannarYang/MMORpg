/*
 * @Author: RannarYang
 * @Describe: 
 * @Date: 2018-09-16 17:00:07 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-16 22:36:05
 */

class NavManager{
    private _gridVO: GridVO;
    public get gridVO(): GridVO {
        return this._gridVO;
    }
    
    constructor(){
        
        
    }
    private _jsonUrl: string = "res/map_001/map_001.json";
    public get jsonUrl(): string {
        return this._jsonUrl;
    }
    public init(): void {
        this.onJsonLoaded();
    }
    private onJsonLoaded(): void {
        let json = Laya.loader.getRes(this._jsonUrl);
        let gridVO = this._gridVO = new GridVO();
        gridVO._rowNumber = json.row;
        gridVO._colNumber = json.col;
        gridVO._cellSize = json.cellW;
        gridVO._gridW = json.gridW;
        gridVO._gridH = json.gridH;

        let data: any[] = json.data;
        this._nodeGrid = new NodeGrid(this._gridVO._colNumber, this.gridVO._rowNumber);
        let index: number = 0;
        for(let i: number = 0; i < this._gridVO._rowNumber; i++) {
            for(let j: number = 0; j < this._gridVO._colNumber; j++) {
                this._nodeGrid.nodeList.push(new AStarNode(index++, j, i, data[j][i]));
            }
        }
        this._astar = new Astar8Dir(this._nodeGrid, new BinaryHeaps())

    }
    private _nodeGrid: NodeGrid;
    public get nodeGrid(): NodeGrid {
        return this._nodeGrid;
    }
    private _astar: Astar8Dir;    
    public findPath(startX: number, startY: number, endX: number, endY: number): Laya.Point[] {
        let path: Laya.Point[] = [];
        if(this._astar && this._nodeGrid) {
            // let res: any[] = this._astar.findPath(startX, startY, endX, endY);
            // res.reverse();
            let res: any[] = this._astar.findFloydPath(startX, startY, endX, endY);
            let tempNode: AStarNode;
            for(let i: number = 0; i < res.length; i++) {
                tempNode = this._nodeGrid.nodeList[res[i]];
                path[i] = new Laya.Point(tempNode.x, tempNode.y);
            }
            this._nodeGrid.reset();
        }
        return path;
    }
    public findPathByScenePos(startX: number, startY: number, endX: number, endY: number): Laya.Point[] {
        let startPos: Laya.Point = this.scenePosToGrid(startX, startY);
        let endPos: Laya.Point = this.scenePosToGrid(endX, endY);
        return this.findPath(startPos.x, startPos.y, endPos.x, endPos.y);
    }
    public scenePosToGrid(x: number, y:number): Laya.Point {
        let res: Laya.Point = new Laya.Point();
        res.x = Math.floor(x / this._gridVO._cellSize) 
        res.y = Math.floor(y / this._gridVO._cellSize) 
        return res;
    }
    public gridToScenePos(x: number, y:number): Laya.Point {
        let res: Laya.Point = new Laya.Point();
        res.x = (x + 0.5) * this._gridVO._cellSize; 
        res.y = (y + 0.5) * this._gridVO._cellSize; 
        return res;
    }
    public isAlpha(x: number, y:number): boolean {
        let gridPos: Laya.Point = this.scenePosToGrid(x, y);
        let node: AStarNode = this._nodeGrid.getNode(gridPos.x, gridPos.y)
        return node.walkFlag == 2;
    }
    /**单例 */
    private static instance: NavManager;
    public static get I(): NavManager {
        if(!this.instance) {
            this.instance = new NavManager();
        }
        return this.instance;
    }
}