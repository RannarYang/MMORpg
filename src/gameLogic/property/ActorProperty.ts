/*
 * @Author: RannarYang
 * @Describe: 角色属性
 * @Date: 2018-09-12 23:22:13 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-12 23:30:36
 */

class ActorProperty {
    private mProperties: ObjDictionary = null;
    constructor(){
        this.mProperties = new ObjDictionary();
    }
    public getProperty(type: number): number {
        if(this.mProperties.containsKey(type)) {
            return this.mProperties.get(type);
        }
        console.warn("can not find property: " + type);
        return 0;
    }
    public changeProperty(type: number, delta: number) {
        let old: number = this.getProperty(type);
        let after: number = old + delta;
        this.setProperty(type, after);
    }
    public setProperty(type: number, value: number): void {
        this.mProperties.add(type, value);
    }
    public clear(): void {
        this.mProperties.clear();
    }
}