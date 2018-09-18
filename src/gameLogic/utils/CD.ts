/*
 * @Author: RannarYang
 * @Describe: 
 * @Date: 2018-09-19 00:30:33 
 * @Last Modified by:   RannarYang 
 * @Last Modified time: 2018-09-19 00:30:33 
 */

class CD {
    public key: number;
    public beginTime: number;
    public endTime: number;
    constructor(key: number, duration: number) {
        this.key = key;
        this.reset(duration);
    }
    public reset(duration: number): void{
        this.beginTime = Laya.timer.currTimer; // 浏览器时间
        this.endTime = this.beginTime + duration;
    }
}