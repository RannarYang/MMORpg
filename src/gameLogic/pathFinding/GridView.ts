/*
 * @Author: RannarYang
 * @Describe: 
 * @Date: 2018-09-16 16:41:30 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-16 17:07:16
 */

class GridView extends Laya.Sprite{
    private _gridVO: GridVO = new GridVO();
    constructor(){
        super();
        this.drawGrid();
    }
    private drawGrid(): void {
        for(let i = 0; i < this._gridVO._rowNumber; i++) {
            this.graphics.drawLine(0, i * this._gridVO._cellSize, this._gridVO._gridW, i * this._gridVO._cellSize, "#ff0000", 2);
        }
        for(let j = 0; j < this._gridVO._colNumber; j++) {
            this.graphics.drawLine(j * this._gridVO._cellSize, 0, j * this._gridVO._cellSize, this._gridVO._gridH, "#ff0000", 2);
        }
    }
}