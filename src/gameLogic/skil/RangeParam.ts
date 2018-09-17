/*
 * @Author: RannarYang
 * @Describe: 
 * @Date: 2018-09-17 11:08:59 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-17 11:10:03
 */

class RangeParam{
    public static Circle = 0;
    public static Sector = 1;
    public static Rectangle = 2;

    private _type: number;
    public get type(): number {
        return this._type;
    }
    
    private _radius: number;
    public get radius(): number {
        return this._radius;
    }

    private _angle: number;
    public get angle(): number {
        return this._angle;
    }

    constructor(type: number,strParam: string) {
        this._type = type;
        if(this._type == RangeParam.Circle) {
            this._radius = parseInt(strParam);
        } else if(this._type == RangeParam.Sector) {
            let arr: number[] = Utils.StringUtil.splitStrToNumberArr(strParam);
            this._radius = arr[0];
            this._angle = arr[1];
        } else {
            console.warn("未识别的范围类型")
        }
    }
}