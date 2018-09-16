
/**
 * 节点核心类
 * @author  Liu lhw1987654@gmail.com
 * 
 */
class AStarNode {
	public static IDEAL: number  = 0;
	public static OPENED: number  = 1;
	public static CLOSED: number  = 3;

	public static G: number  = 10;
	public static VG: number  = 14;

	/**
	 * coefficient of friction, 摩擦系数<br/>
	 * 0 means not accessable.
	 */
	public cof:number = 0;
	public index: number = 0;
	public x: number = 0;
	public y: number = 0;
	public walkable: boolean = true;
	////////////////////////////////////
	public parent: AStarNode;
	public f:number = 0;
	public g:number = 0;
	public h:number = 0;
	////////////////////////////////////
	protected status: number = 0;
	
	
	///////////////////////////////////
	//地图标记  0不可走 1 可走 2透明
	public walkFlag: number = 0;            

	/**
	 * 
	 * @param index 节点ID
	 * @param x 节点坐标X轴
	 * @param y 节点坐标Y轴
	 * @param cof 节点的摩擦系数，这个东东很重要， 比如马路的摩擦系数为0.1， 草地的摩擦系数为0.5。
	 * 
	 */
	constructor(index: number , x: number , y: number , walkFlag: number = 1) {
		this.index=index;
		this.x=x;
		this.y=y;
		//this.cof=cof;
		this.walkFlag = walkFlag;
		if(walkFlag == 0)
			this.walkable = false;
	}

	public get angle(): number {
		if (!this.parent)
			return 360;

		let x: number = this.x - this.parent.x;
		let y: number = this.y - this.parent.y;
		let angle: number = 0;
		if (x == -1) {
			if (y == -1) {
				angle = 45;
			} else if (y == 0) {
				angle = 0
			}
			else if (y == 1) {
				angle = -45
			}
		} else if (x == 0) {
			if (y == -1) {
				angle = 90;
			}
			else if (y == 1) {
				angle = -90
			}
		} else if (x == 1) {
			if (y == -1) {
				angle = 135;
			} else if (y == 0) {
				angle = 180
			} else if (y == 1) {
				angle = -135
			}
		}

		return  ((angle + 360) % 360);
	}

	public get opened(): boolean {
		return this.status == 1;
	}

	public set opened(value: boolean) {
		this.status = value ? 1 : 0;
	}

	public get closed(): boolean {
		return this.status == -1;
	}

	public set closed(value: boolean) {
		this.status = value ? -1 : 0;
	}

	public reset(): void {
		this.status = 0;
		this.parent = null;
		this.f = 0;
		this.g = 0;
		this. h = 0;
	}


	/**
	 *从网格上那个方格移动到终点B的预估移动耗费。
	 * 这经常被称为启发式的，可能会让你有点迷惑。
	 * 这样叫的原因是因为它只是个猜测。
	 * 我们没办法事先知道路径的长度，因为路上可能存在各种障碍(墙，水，等等)。
	 * 虽然本文只提供了一种计算H的方法，但是你可以在网上找到很多其他的方法。
	 * @return
	 *
	 */
	public getH1(end:AStarNode): number {
		return (Math.abs(this.x - end.x) + Math.abs(this.y - end.y)) * AStarNode.G;
	}
	
	public getH(end:AStarNode): number {
		let dx:number  = Math.abs(this.x - end.x);
		let dy:number  = Math.abs(this.y - end.y);
		let diag:number  = dx < dy ? dx : dy;
		let straight:number  = dx + dy;
		return AStarNode.VG * diag + AStarNode.G * (straight - 2 * diag);
	}

	/**
	 * G表示沿路径从起点到当前点的移动耗费。在这个例子里，我们令水平或者垂直移动的耗费为10，
	 * 对角线方向耗费为14。我们取这些值是因为沿对角线的距离是沿水平或垂直移动耗费的的根号2，
	 * 或者约1.414倍。为了简化，我们用10和14近似。
	 * @param nodeA
	 * @param nodeB
	 * @return
	 *
	 */
	public getG(parent:AStarNode): number {
		let x: number = this.x - parent.x;
		let y: number = this.y - parent.y;
		if (x != 0 && y != 0)
		{
			//trace("getG", x, y, x != 0 && y != 0);
			return AStarNode.VG + parent.g;
		}
		return AStarNode.G + parent.g;
	}

	/**
	 *　F是评分， F的值是G和H的和。
	 * @param nodeA
	 * @param nodeB
	 * @return
	 *
	 */
	public computeF(parent:AStarNode, end:AStarNode): number {
		this.h = this.getH(end);
		this.g = this.getG(parent);
		this.f = this.h + this.g;
		return this.f;
	}

	public toString(): string {
		return "Node(x,y,f)=(" + this.x + "," + this.y + "," + this.f + ")";
	}

	public static compare(a:AStarNode, b:AStarNode): number {
		if (a.f < b.f)
			return 1;
		if (a.f > b.f)
			return -1;
		return 0;
	}
}
