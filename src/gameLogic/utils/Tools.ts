/*
 * @Author: RannarYang 
 * @Date: 2018-09-12 19:06:24 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-09-12 19:26:30
 */

class Tools{
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