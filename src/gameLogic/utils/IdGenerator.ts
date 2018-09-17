/*
 * @Author: RannarYang
 * @Describe: ID 生成器
 * @Date: 2018-09-17 14:10:45 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-17 14:28:52
 */
class IdGenerator{
    private _idDic: ObjDictionary = new ObjDictionary();
    private Default_ID_Begin: number = 100;
    public getID(idType: IDType): number{
        let res: number = 0;
        if(!this._idDic.containsKey(idType)) {
            res = this.Default_ID_Begin;
            this._idDic.add(idType, res);
        } else {
            res = this._idDic.get(idType);
            res ++;
            this._idDic.reset(idType, res);
        }
        return res;
    }
    public removeID(idType: IDType): void {
        this._idDic.remove(idType);
    }
    public clearAll(): void {
        this._idDic = new ObjDictionary();
    }
    /**单例 */
    private static instance: IdGenerator;
    public static get I(): IdGenerator {
        if(!this.instance) {
            this.instance = new IdGenerator();
        }
        return this.instance;
    }
}

enum IDType {
    Actor = 100
}