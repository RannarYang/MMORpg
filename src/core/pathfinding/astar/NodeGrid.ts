
/**
 * 
 * 查找节点周围的点， 具体逻辑自己看
 * @author  Liu lhw1987654@gmail.com
 * 
 */
class NodeGrid {
	public nodeList: AStarNode[] = [];
	public colNum: number = 0;
	public rowNum: number = 0;

	public constructor(col: number, row: number) {
		this.colNum=col;
		this.rowNum=row;
	}


	public reset():void {
		for (let i in this.nodeList) {
			this.nodeList[i].reset();
		}
	}

	///////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////
	public getNode(x: number , y: number ):AStarNode {
		return this.nodeList[y * this.colNum + x];
	}

	public getTopLeftNode(x: number , y: number ):AStarNode {
		if (y == 0)
			return null;
		if (x == 0)
			return null;
		let index: number =(y - 1) * this.colNum + x - 1;
		return this.nodeList[index];
	}


	public getTopRightNode(x: number , y: number ):AStarNode {
		if (y == 0)
			return null;

		if (this.colNum == x + 1)
			return null;
		let index: number =(y - 1) * this.colNum + x + 1;
		return this.nodeList[index];
	}

	public getTopNode(x: number , y: number ):AStarNode {
		if (y == 0)
			return null;
		let index: number =(y - 1) * this.colNum + x;
		return this.nodeList[index];
	}

	public getLeftNode(x: number , y: number ): AStarNode {
		if (x == 0)
			return null;
		let index: number = y * this.colNum + x - 1;
		return this.nodeList[index];
	}

	public getRightNode(x: number , y: number ): AStarNode {
		if (this.colNum == x + 1)
			return null;
		let index: number =y * this.colNum + x + 1;
		return this.nodeList[index];
	}

	public getBottomLeftNode(x: number , y: number ):AStarNode {
		if (x == 0)
			return null;
		if (this.rowNum == y + 1)
			return null;
		let index: number =(y + 1) * this.colNum + x - 1;
		return this.nodeList[index];
	}

	public getBottomRightNode(x: number , y: number ):AStarNode {
		if (this.colNum == x + 1)
			return null;
		if (this.rowNum == y + 1)
			return null;
		let index: number =(y + 1) * this.colNum + x + 1;
		return this.nodeList[index];
	}

	public getBottomNode(x: number , y: number ):AStarNode {
		if (this.rowNum == y + 1)
			return null;
		let index: number =(y + 1) * this.colNum + x;
		return this.nodeList[index];
	}
	
	public hasBarrier( startX: number, startY: number, endX: number, endY: number ): boolean {
		//如果起点终点是同一个点那傻子都知道它们间是没有障碍物的
		if( startX == endX && startY == endY )return false;		
		if( this.getNode(endX, endY).walkable == false )return true;
		
		//两节点中心位置
		let point1:Laya.Point = new Laya.Point( startX + 0.5, startY + 0.5 );
		let point2:Laya.Point = new Laya.Point( endX + 0.5, endY + 0.5 );
		
		let distX: number = Math.abs(endX - startX);
		let distY: number = Math.abs(endY - startY);									
		
		/**遍历方向，为true则为横向遍历，否则为纵向遍历*/
		let loopDirection: boolean = distX > distY ? true : false;
		
		/**起始点与终点的连线方程*/
		let lineFuction:Function;
		
		/** 循环递增量 */
		let i: number;
		
		/** 循环起始值 */
		let loopStart: number;
		
		/** 循环终结值 */
		let loopEnd: number;
		
		/** 起终点连线所经过的节点 */
		let nodesPassed = [];
		let elem:AStarNode;
		
		//为了运算方便，以下运算全部假设格子尺寸为1，格子坐标就等于它们的行、列号
		if( loopDirection )
		{				
			lineFuction = this.getLineFunc(point1, point2, 0);
			
			loopStart = Math.min( startX, endX );
			loopEnd = Math.max( startX, endX );
			
			//开始横向遍历起点与终点间的节点看是否存在障碍(不可移动点) 
			for(let i=loopStart; i<=loopEnd; i++ )
			{
				//由于线段方程是根据终起点中心点连线算出的，所以对于起始点来说需要根据其中心点
				//位置来算，而对于其他点则根据左上角来算
				if( i==loopStart ) i += 0.5;
				//根据x得到直线上的y值
				let yPos: number = lineFuction(i);
				
				
				nodesPassed = this.getNodesUnderPoint( i, yPos );
				for(let key in nodesPassed ) {
					if( nodesPassed[key].walkable == false ) return true;
				}
				
				if( i == loopStart + .5 )i -= .5;
			}
		} else {
			lineFuction = this.getLineFunc(point1, point2, 1);
			
			loopStart = Math.min( startY, endY );
			loopEnd = Math.max( startY, endY );
			
			//开始纵向遍历起点与终点间的节点看是否存在障碍(不可移动点)
			for( i=loopStart; i<=loopEnd; i++ )
			{
				if( i==loopStart )i += .5;
				//根据y得到直线上的x值
				let xPos: number = lineFuction(i);
				
				nodesPassed = this.getNodesUnderPoint( xPos, i );
				for(let key in nodesPassed ) {
					if( nodesPassed[key].walkable == false )return true;
				}
				
				if( i == loopStart + .5 )i -= .5;
			}
		}
		
		return false;	
	}
	
	
	/**
	 * 得到一个点下的所有节点 
	 * @param xPos		点的横向位置
	 * @param yPos		点的纵向位置
	 * @param grid		所在网格
	 * @param exception	例外格，若其值不为空，则在得到一个点下的所有节点后会排除这些例外格
	 * @return 			共享此点的所有节点
	 * 
	 */		
	public getNodesUnderPoint( xPos: number, yPos: number, exception: any[] = null ): any[] {
		let result: any[] = [];
		let xIsInt: boolean = xPos % 1 == 0;
		let yIsInt: boolean = yPos % 1 == 0;
		
		//点由四节点共享情况
		if( xIsInt && yIsInt ) {
			result[0] = this.getNode( xPos - 1, yPos - 1);
			result[1] = this.getNode( xPos, yPos - 1);
			result[2] = this.getNode( xPos - 1, yPos);
			result[3] = this.getNode( xPos, yPos);
		}
			//点由2节点共享情况
			//点落在两节点左右临边上
		else if( xIsInt && !yIsInt ) {
			result[0] = this.getNode( xPos - 1, parseInt(yPos + "") );
			result[1] = this.getNode( xPos, parseInt(yPos + "") );
		}
			//点落在两节点上下临边上
		else if( !xIsInt && yIsInt )
		{
			result[0] = this.getNode( parseInt(xPos + ""), yPos - 1 );
			result[1] = this.getNode( parseInt(xPos + ""), yPos );
		}
			//点由一节点独享情况
		else
		{
			result[0] = this.getNode( parseInt(xPos + ""), parseInt(yPos + "") );
		}
		
		//在返回结果前检查结果中是否包含例外点，若包含则排除掉
		if( exception && exception.length > 0 )
		{
			for( let i: number=0; i<result.length; i++ )
			{
				if( exception.indexOf(result[i]) != -1 )
				{
					result.splice(i, 1);
					i--;
				}
			}
		}
		
		return result;
	}
	
	/**
	 * 根据两点确定这两点连线的二元一次方程 y = ax + b或者 x = ay + b
	 * @param ponit1
	 * @param point2
	 * @param type		指定返回函数的形式。为0则根据x值得到y，为1则根据y得到x
	 * 
	 * @return 由参数中两点确定的直线的二元一次函数
	 */		
	public getLineFunc(ponit1: Laya.Point, point2: Laya.Point, type: number=0):Function {
		let resultFuc:Function;
		
		
		// 先考虑两点在一条垂直于坐标轴直线的情况，此时直线方程为 y = a 或者 x = a 的形式
		if( ponit1.x == point2.x ) {
			if( type == 0 ) {
				throw new Error("两点所确定直线垂直于y轴，不能根据x值得到y值");
			} else if( type == 1 ) {
				resultFuc =	function( y: number ): number
				{
					return ponit1.x;
				}
				
			}
			return resultFuc;
		} else if( ponit1.y == point2.y ) {
			if( type == 0 ) {
				resultFuc =	function( x: number ): number
				{
					return ponit1.y;
				}
			} else if( type == 1 ) {
				throw new Error("两点所确定直线垂直于y轴，不能根据x值得到y值");
			}
			return resultFuc;
		}
		
		// 当两点确定直线不垂直于坐标轴时直线方程设为 y = ax + b
		let a: number;
		
		// 根据
		// y1 = ax1 + b
		// y2 = ax2 + b
		// 上下两式相减消去b, 得到 a = ( y1 - y2 ) / ( x1 - x2 ) 
		a = (ponit1.y - point2.y) / (ponit1.x - point2.x);
		
		let b: number;
		
		//将a的值代入任一方程式即可得到b
		b = ponit1.y - a * ponit1.x;
		
		//把a,b值代入即可得到结果函数
		if( type == 0 )
		{
			resultFuc =	function( x: number ): number
			{
				return a * x + b;
			}
		}
		else if( type == 1 )
		{
			resultFuc =	function( y: number ): number
			{
				return (y - b) / a;
			}
		}
		
		return resultFuc;
	}
	
}

