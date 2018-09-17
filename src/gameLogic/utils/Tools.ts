/*
 * @Author: RannarYang 
 * @Date: 2018-09-12 19:06:24 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-16 11:48:18
 */

class Tools{
    public static distancePoint(src: Laya.Point, des: Laya.Point): number{
        return Math.sqrt((des.x - src.x) * (des.x - src.x) + (des.y -src.y) * (des.y -src.y));
    }
    public static distancePointSquare(src: Laya.Point, des: Laya.Point): number{
        return (des.x - src.x) * (des.x - src.x) + (des.y -src.y) * (des.y -src.y);
    }
    public static isInCircle(pos: Laya.Point, center: Laya.Point, radius: number): boolean {
        return this.distancePointSquare(pos, center) <= radius * radius;
    }
    public static isInSector(pos: Laya.Point, center: Laya.Point, dir: Laya.Point, radius: number, degree: number): boolean {
        if(!this.isInCircle(pos, center, radius)) return false;
        let angle1: number = this.R2A(Math.atan2(dir.x, dir.y));
        let angle2: number = this.R2A(Math.atan2(pos.x - center.x, pos.y - center.y));
        return Math.abs(angle1 - angle2) <= degree * 0.5;
    }
    public static R2A(r: number): number {
        return r * 180 / Math.PI;
    }
    public static A2R(a: number): number {
        return a * Math.PI / 180;
    }
    /**
     * 转换2D屏幕坐标系统到3D投影坐标系统（仅限于正交投影）
     * @param	source 源坐标。
     * @param	out 输出坐标。
     */
    public static screenCoordTo3DCoord(source: Laya.Vector3, out: Laya.Vector3):void
    {
        let se: Float32Array = source.elements;
        let oe: Float32Array = out.elements;
        oe[0] = ((-GameConfig.DeviceW >> 1) + se[0]) * GameConfig.UnitPerPixel;
        oe[1] = ((GameConfig.DeviceH >> 1) - se[1]) * GameConfig.UnitPerPixel;
        oe[2] = se[2];
    }
}