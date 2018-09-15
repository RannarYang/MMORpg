/*
 * @Description: 一般工具类
 * @Author: Ran Yang 
 * @Date: 2018-01-04 15:38:53 
 * @Last Modified by: Ran Yang
 * @Last Modified time: 2018-05-11 11:43:47
 */
module Utils {
	export class CommonUtil {
		/**
		 * 根据 类 获取类名
		 */
		public static getClassName<T>(clzss: {new(): T}): string {
			let cName = clzss['ClassName']
			if(!cName) {
				throw new Error('无法获得ClassName: '+ clzss.toString())
			}
			return cName;
		}
		/**克隆对象 */
		public static clone(obj:any):any {
			var newobj = obj instanceof Array ? [] : {};
			if (typeof obj !== 'object') {
				return obj;
			} else if (JSON) {
				var str = JSON.stringify(obj);//系列化对象
				newobj = JSON.parse(str); //还原
			} else {
				for (var i in obj) {
					newobj[i] = (typeof obj[i] === 'object' ? arguments.callee(obj[i]) : obj[i]);
				}
			}
			return newobj;
		}
		/**
		 * 判断两个矩形是否相交
		 * @param x01 矩形1左上角的横坐标
		 * @param x02 矩形1左上角的纵坐标
		 * @param width01 矩形1的宽度
		 * @param height01 矩形1的高度
		 * @param x11 矩形2左上角的横坐标
		 * @param x11 矩形2左上角的纵坐标
		 * @param width02 矩形2的宽度
		 * @param height02 矩形2的高度
		 */
		public static isRectIntersect(x01: number, y01: number, width01: number, height01: number,  x11: number, y11: number, width02: number, height02: number) : boolean {  
			let x02 = x01 + width01;
			let y02 = y01 + height01;
			let x12 = x11 + width02;
			let y12 = y11 + height02;
			let zx = Math.abs(x01 + x02 -x11 - x12);  
			let x  = Math.abs(x01 - x02) + Math.abs(x11 - x12);  
			let zy = Math.abs(y01 + y02 - y11 - y12);  
			let y  = Math.abs(y01 - y02) + Math.abs(y11 - y12);  
			if(zx <= x && zy <= y)  
				return true;  
			else  
				return false;  
		}  
	}
}
