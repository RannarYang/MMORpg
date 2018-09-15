/*
 * @Description: 游戏内配置表的管理
 * @Author: Ran Yang 
 * @Date: 2018-01-04 15:59:55 
 * @Last Modified by: Ran Yang
 * @Last Modified time: 2018-05-07 16:16:53
 */

class ConfigTabel {
	/*
    *从配置表中找到符合某条件数据,找到第一个立刻返回 
    * @param confName 配置表名
    * @param every  条件判断函数
    */
	public static find<T>(t: {new(): T},every:(item:T)=>boolean):T;
    /*
    *从配置表中找到符合某条件数据,找到第一个立刻返回 
    * @param confName 配置表名
    * @param key  关键属性名
    * @param value  关键值
    */
    public static find<T>(t: {new(): T},key:string,value:any):T;
	public static find<T>(t: {new(): T}, data: any, value?: any): T
	{
		let every : (item:T) => boolean;
		if (typeof data == 'string') {
			every = function(item:T):boolean{return item[data]==value};
		} else {
			every = data;
		}
		let confName = Utils.CommonUtil.getClassName(t);
        let conf : T[] = this.mConfig[confName];
		if(!conf) return null;
		let row: T = Utils.ArrayUtil.find(conf, every);
		if(!row) {
			return null;
		}
		return row;

	}
	/*
    *从配置表中找到符合某条件数据,找到第一个立刻返回 
    * @param confName 配置表名
    * @param key  关键属性名
    * @param value  关键值
    */
    public static findAll<T>(t: {new(): T},key:string,value:any):T[]
    /*
    *从配置表中找到所有符合某条件数据
    * @param confName 配置表名
    * @param every  条件判断函数
    */
    public static findAll<T>(t: {new(): T},every:(item:any)=>boolean):T[]
    public static findAll<T>(t: {new(): T},data:any,value?:any):T[]{
        let every:(item:any)=>boolean;
        if(typeof data == "string")
        {
            every = function(item:any):boolean{return item[data]==value};
        }else{
            every = data;
        }
		let confName = Utils.CommonUtil.getClassName(t);
        let conf : T[] = this.mConfig[confName];
        if(!conf)
            return [];
        let row:T[] = Utils.ArrayUtil.findAll(conf,every);
        return row;
    }
	/**
     * 获取配置表全部内容
     * @param confName 配置表名(类名)
     * 
     */
    public static getConfig<T>(t: {new(): T}):T[]{
		let confName = Utils.CommonUtil.getClassName(t);
        if(!this.mConfig) return;
        let conf:any[] = this.mConfig[confName];
        if(!conf)
            return null;
        return conf;
    }
    /**
     * 获取配置表全部内容
     * @param confName 配置表名(字符串)
     */
    public static getConfigByName(confName: string) {
        let conf:any[] = this.mConfig[confName];
        if(!conf)
            return null;
        return conf;
    }
    private static mConfig: any;
	/**设置初始化配置 */
	public static initConfig(conf: any) {
        this.mConfig = conf;
	}
}