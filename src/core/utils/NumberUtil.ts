module Utils {
	export class NumberUtil {
		/**
		 * 将数字转成16进制输出，格式：0x0000
		 * @param num
		 * @param charLength 0x后面的字符长度，默认为4
		 * 
		 */
		public static to16(num:number,charLength:number=4,prefix:string='0x'):string {
			let str = num.toString(16);
			while (str.length < charLength) {
				str = '0' + str;
			}
			str = prefix + str;
			return str;
		}
		/**
		 * 两个16整数的拼接位32位的数
		 * @param 放在高16位的数
		 * @param 放在低16位的数
		 */
		public static to32(high16, low16): number {
			return ((high16 << 16) & 0xFFFF0000) | (low16 & 0xFFFF);
		}

		// /**
		//  * 两个32位整数拼接为64位
		//  */
		// public static to64(high32, low32): number {
		// 	return ((high32 << 32) & 0xFFFFFFFF00000000) | (low32 & 0xFFFFFFFF);
		// }

		/**
		 * 两个32位整数拼接为64位
		 */
		public static to64(uint64: {high: number, low: number}): number {
			return uint64.high << 32 + uint64.low;
		}
		/**
		 * 获得64位的低32位 
		 * @param value
		 * @return 
		 */		
		public static getUint64Low32(value:number):number {
			return value&0xFFFFFFFF;
		}
		
		/**
		 * 获得64位的高32位 
		 * @param value
		 * @return 
		 * 
		 */		
		public static getUint64High32(value:number):number {
			return (value&0x000FFFFF00000000)>>32;
		}
		
		/**
		 * 获得32位的低16位 
		 * @param value
		 * @return 
		 */		
		public static getUint32Low16(value:number):number {
			return value&0xFFFF;
		}
		
		/**
		 * 获得32位的高16位 
		 * @param value
		 * @return 
		 * 
		 */		
		public static getUint32High16(value:number):number {
			return (value&0xFFFF0000)>>16;
		}

		/**
		 * 获得16位的低8位 
		 * @param value
		 * @return 
		 * 
		 */		
		public static getUint16Low8(value:number):number {
			return value&0xFF;
		}
		
		/**
		 * 获得16位的高8位 
		 * @param value
		 * @return 
		 * 
		 */		
		public static getUint16High8(value:number):number {
			return (value&0xFF00)>>8;
		}
		/**
		 * 限定数字的范围
		 * @param value
		 * @return
		 */
		public static clamp(value: number, min: number, max?: number): number {
			if(min !== undefined && min !== null) {
				value = Math.max(value, min);
			}
			if(max !== undefined && max !== null) {
				value = Math.min(value, max);
			}
			
			return value;
		}
		/**
		 * 将0,1...10 => '01','02'....'10' 
		 */
		public static fixNumberByAddZeroAtPrefix(num: number, strLen: number) {
			let addZeroLen = strLen - (num + '').length;
			let res = '';
			for(let i = 0; i < addZeroLen; i++) {
				res += '0';
			}
			res += num;
			return res;
		}
	}
}
