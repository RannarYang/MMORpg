/*
* name;
*/
class ObjDictionary{
    private _strongType;
    /**
     *
     */
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
    public resizeTo(key: any, value: any): void {
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
        return this._container[key];
    }

    public clear() {
        this._length = 0;
        this._container = null;
        this._container = new Object();
    }

}