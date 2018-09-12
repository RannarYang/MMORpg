/*
 * @Author: RannarYang
 * @Describe: 属性管理器
 * @Date: 2018-09-12 23:41:11 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-13 00:03:23
 */

class ActorPropertyManager{

    private _owner: ActorBase;

    protected _baseProperty: ActorProperty;
    protected _deltaProperty: ActorProperty;

    constructor(owner: ActorBase){
        this._owner = owner;
        this._baseProperty = new ActorProperty();
        this._deltaProperty = new ActorProperty();

        let begin = ActorPropertyType.HP;
        let end = ActorPropertyType.Max;

        for(let i = begin; i < end; i++) {
            this._baseProperty.setProperty(i, 0);
            this._deltaProperty.setProperty(i, 0);
        }
    }

    public getBaseProperty(type: number) : number{
        return this._baseProperty.getProperty(type);
    }
    public setBaseProperty(type: number, value: number): void{
        this._baseProperty.setProperty(type, value);
    }
    public getProperty(type: number): number {
        let baseProp: number = this._baseProperty.getProperty(type);
        let deltaProp: number = this._deltaProperty.getProperty(type);
        return baseProp + deltaProp;
    }
    public changeProperty(type: number, delta: number): void {
        if(type == ActorPropertyType.HP) {
            let hp: number = this.getProperty(type) + delta;
            if(hp > this.getBaseProperty(type)) {
                this._deltaProperty.setProperty(type, 0);
            } else if(hp <= 0) {
                this._deltaProperty.setProperty(type, - this.getBaseProperty(type))
            } else {
                this._deltaProperty.setProperty(type, delta);
            }
        } else {
            this._deltaProperty.setProperty(type, delta);
        }
    }
    public clear() {
        let begin = ActorPropertyType.HP;
        let end = ActorPropertyType.Max;

        for(let i = begin; i < end; i++) {
            this._baseProperty.setProperty(i, 0);
            this._deltaProperty.setProperty(i, 0);
        }
    }
}