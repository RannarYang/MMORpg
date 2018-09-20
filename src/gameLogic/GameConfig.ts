/*
 * @Author: RannarYang
 * @Describe: 
 * @Date: 2018-09-09 23:21:49 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-17 19:58:49
 */

class GameConfig{
    /**设备宽度 */
    public static DeviceW: number = 1136;
    /**设备高度 */
    public static DeviceH: number = 640;

    public static OrthographicVerticalSize: number = 10;
		
    public static CameraAspectRatio: number = 1.775;
    
    public static UnitPerPixel: number = 0.015625;    //1/64

    public static BmpFntName: string = "bmpFont";
		
    public static BmpFntName2: string = "bmpFont2";
    
    public static ActorPath: string = "res/actor/";
    
    public static ModelPath: string = "res/models/";
    
    public static SoundPath: string = "res/sound/";
    
    public static EffectPath: string = "res/effects/";

    public static FrameLoopDelay: number = 1;
    
    public static BmpFontPath: string = "res/bitmapFont/font.fnt";
    
    public static BmpFontPath2: string = "res/bitmapFont/font2.fnt";
}