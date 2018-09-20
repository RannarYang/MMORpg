
class ObjPool {
	
	private _poolDic:ObjDictionary = new ObjDictionary()
		
	constructor(){

	}
	
	public register(cls: any, count: number=5):void {
		if(!this._poolDic.containsKey(cls)) {
			if(count <= 0) {
				console.warn("ObjPool count is must bigger than 0");
				return;
			}
			var arr: any[] = [];
			var temp:IRecycleable;
			for(var i: number=0; i<count; i++) {
				temp = new cls();
				arr.push(temp);
			}
			this._poolDic.add(cls, arr);
		} else {
			console.warn("Error, You have add this type: " + cls);
		}
	}
	
	
	public getObject(cls:any): IRecycleable {
		if(!this._poolDic.containsKey(cls))
			this.register(cls);
		
		if(this._poolDic.containsKey(cls)) {
			var pool: any[] = this._poolDic.get(cls);
			var res:IRecycleable;
			if(pool.length <= 0) {
				res = new cls();
				if(!res)
					console.warn("you can not get an non IRecycleable object")
			} else {
				res = pool.pop();
			}
			res.isRecycled = false;
			//console.warn("Hurt num length: " + pool.length);
			return res;
		}
		
		return null;
	}
	
	public recycleObj(obj:IRecycleable, cls:any):void {
		if(obj.isRecycled) {
			console.warn("Warning, you recycled a recycled obj, do nothing!");
			return;
		}
		obj.onRecycle();
		obj.isRecycled = true;
		
		var pool: any[];
		if(this._poolDic.containsKey(cls))
		{
			pool = this._poolDic.get(cls);
			pool.push(obj);
		}
	}
	
	public clear(cls:any):void
	{
		this._poolDic.remove(cls);
	}
	
	public clearAll():void{
		this._poolDic.clear();
	}
	
	/**单例 */
    private static instance: ObjPool;
    public static get I(): ObjPool {
        if(!this.instance) {
            this.instance = new ObjPool();
        }
        return this.instance;
    }
	
}
