/*
 * @Author: RannarYang
 * @Describe: 
 * @Date: 2018-09-17 14:21:58 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-10-01 09:51:10
 */

class ObjDictionary{
    private _strongType;
    constructor(strongType = null) {
        this._strongType = strongType;
        this._length = 0;
        this._container = {};
    }
    private _container: Object;
    public get container(): Object {
        return this._container;
    }


    private _length: number;
    public get length() {
        return this._length;
    }

    public add(key: any, value: any): void {
        if(this._strongType && value instanceof this._strongType) {
            throw new Error("Obj Dictionary [add] Type check Error, Need " + this._strongType);
        }
        if(!this.containsKey(key))
            this._length++;
        this._container[key] = value;
    }
    public reset(key: any, value: any): void {
        if(this._strongType && value instanceof this._strongType) {
            throw new Error("Obj Dictionary [add] Type check Error, Need " + this._strongType);
        }
        if(this.containsKey(key)) {
            this._container[key] = value;
        } else {
            console.warn("ObjDictionary: warning you reset a not exist key");
        }
    }
    public remove(key: any): void {
        if(this._container.hasOwnProperty(key)) {
            this._container[key] = null;
            delete this._container[key];
            this._length--;
        }
    }
    public get(key: any): any {
        return this._container[key];
    }

    public containsKey(key: any): boolean {
        return this._container.hasOwnProperty(key);
    }

    public clear() {
        this._length = 0;
        this._container = null;
        this._container = new Object();
    }

}