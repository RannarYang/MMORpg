/*
 * @Author: RannarYang
 * @Describe: 
 * @Date: 2018-09-19 00:09:38 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-19 00:39:18
 */

class CDManager{
    private _cds: ObjDictionary;
    constructor(){
        this._cds = new ObjDictionary();
    }
    public addCD(key: number, duration: number) {
        duration = duration || 0;
        let cd: CD;
        if(this._cds.containsKey(key)) {
            cd = this._cds.get(key);
            cd.reset(duration);
        } else {
            cd = new CD(key, duration)
            this._cds.add(key, cd);
        }
    }
    public removeCD(key: number): void {
        this._cds.remove(key);
    }

    public isCoolDown(key: number): boolean {
        if(this._cds.containsKey(key)) {
            let cd: CD = this._cds.get(key);
            return Laya.timer.currTimer > cd.endTime;
        }
        return true;
    }
}