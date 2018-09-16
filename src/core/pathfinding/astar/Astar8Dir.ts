
/**
 * 基于二叉堆的A*寻路<br/>
 * 使用到了B+树以及完全二叉树的顺序存储 
 * @author Liu lhw1987654@gmail.com
 */
class Astar8Dir {
	public openedNodeList: IList;
	public closedNodeList: AStarNode[];
	private _nodeGrid: NodeGrid;
	private _end: AStarNode;
	private _start: AStarNode;
	public lastPathLength: number = 0;

	public constructor(nodeGrid :NodeGrid, list:IList) {
		this._nodeGrid = nodeGrid;
		this.openedNodeList = list;
	}

	public findPath(startX: number, startY: number, endX: number, endY: number): any[] {
		this.closedNodeList = [];
		this.openedNodeList.reset();
		//trace("Using", openedNodeList);
		this._end = this._nodeGrid.getNode(endX, endY);
		this._start = this._nodeGrid.getNode(startX, startY);
		let cur:AStarNode=null;
		this.openedNodeList.push(this._start);
		do {
			cur = this.openedNodeList.pop();
			//trace(openedNodeList);
			this.closedNodeList.push(cur);
			cur.closed=true;
			this.getNextNode(cur);
		} while (cur != this._end && this.openedNodeList.getLength() > 0);

		if (this.openedNodeList.getLength() == 0)
			return [];

		let rs = [];
		this.lastPathLength = cur ? cur.f : NaN;
		while (cur)
		{
			rs.push(cur.index);
			cur=cur.parent;
		}
		
		return rs;
	}
	
	public findFloydPath(startX: number, startY: number, endX: number, endY: number) : any[] {
		let res: any[] = this.findPath(startX, startY, endX, endY);
		return this.floyd(res);
	}

	protected getNextNode(cur:AStarNode):void {
		let tnd: AStarNode = null;

		let t: AStarNode = this._nodeGrid.getTopNode(cur.x, cur.y);

		this.addToOpenedNodeList(t, cur);

		let r: AStarNode = this._nodeGrid.getRightNode(cur.x, cur.y);
		this.addToOpenedNodeList(r, cur);

		let b: AStarNode = this._nodeGrid.getBottomNode(cur.x, cur.y);
		this.addToOpenedNodeList(b, cur);

		let l: AStarNode= this._nodeGrid.getLeftNode(cur.x, cur.y);
		this.addToOpenedNodeList(l, cur);
		//////////////////////////////////////////

		if (t != null && t.walkable) {
			if (l != null && l.walkable) {
				tnd = this._nodeGrid.getTopLeftNode(cur.x, cur.y);
				this.addToOpenedNodeList(tnd, cur);
			}

			if (r != null && r.walkable) {
				tnd = this._nodeGrid.getTopRightNode(cur.x, cur.y);
				this.addToOpenedNodeList(tnd, cur);
			}
		}


		if (b != null && b.walkable) {
			if (r != null && r.walkable) {
				tnd = this._nodeGrid.getBottomRightNode(cur.x, cur.y);
				this.addToOpenedNodeList(tnd, cur);
			}


			if (l != null && l.walkable) {
				tnd = this._nodeGrid.getBottomLeftNode(cur.x, cur.y);
				this.addToOpenedNodeList(tnd, cur);
			}

		}

	}

	private addToOpenedNodeList(t: AStarNode, cur: AStarNode): void {
		if (t && t.walkable && !t.closed) {
			if (t.opened) {
				if (t.g > t.getG(cur)) {
					t.parent=cur;
					t.computeF(cur, this._end);
					this.openedNodeList.valueChanged(t);
				}
			}
			else
			{
				t.opened=true;
				t.parent=cur;
				t.computeF(cur, this._end);
				this.openedNodeList.push(t);
			}
		}
	}
	
	
	/** 弗洛伊德路径平滑处理  form http://wonderfl.net/c/aWCe **/
	public floyd(path: any[]): any  {
		if (path == null)
			return null;
		let floydPath: any[] = [];
		floydPath = path.concat();//拷贝
		floydPath.reverse();
		let len: number = floydPath.length;
		let node1: AStarNode;
		let node2: AStarNode;
		if (len > 2) {
			let vector: Laya.Point = new Laya.Point(0, 0);
			let tempVector: Laya.Point = new Laya.Point(0, 0);
			//遍历路径数组中全部路径节点，合并在同一直线上的路径节点
			//假设有1,2,3,三点，若2与1的横、纵坐标差值分别与3与2的横、纵坐标差值相等则
			//判断此三点共线，此时可以删除中间点2
			node1 = this._nodeGrid.nodeList[floydPath[len - 1]];
			node2 = this._nodeGrid.nodeList[floydPath[len - 2]];
			this.floydVector(vector, node1, node2);
			for (let i: number = floydPath.length - 3; i >= 0; i--) {
				node1 = this._nodeGrid.nodeList[floydPath[i + 1]];
				node2 = this._nodeGrid.nodeList[floydPath[i]];
				this.floydVector(tempVector, node1, node2);
				if (vector.x == tempVector.x && vector.y == tempVector.y) {
					floydPath.splice(i + 1, 1);
					//trace("**********:" + i);
				} 
				else {
					vector.x = tempVector.x;
					vector.y = tempVector.y;
				}
			}
		}
		//合并共线节点后进行第二步，消除拐点操作。算法流程如下：
		//如果一个路径由1-10十个节点组成，那么由节点10从1开始检查
		//节点间是否存在障碍物，若它们之间不存在障碍物，则直接合并
		//此两路径节点间所有节点。
		len = floydPath.length;
		for (let i = len - 1; i >= 0; i--) {
			node1 = this._nodeGrid.nodeList[floydPath[i]];
			for (let j: number = 0; j <= i - 2; j++) {
				node2 = this._nodeGrid.nodeList[floydPath[j]];
				if ( this._nodeGrid.hasBarrier(node1.x, node1.y, node2.x, node2.y) == false ) {
					for (let k: number = i - 1; k > j; k--) {
						floydPath.splice(k, 1);
						//trace("&&&&&&&&&&:" + i);
					}
					i = j;
					len = floydPath.length;
					break;
				}
			}
		}
		
		return floydPath;
	}
	
	private floydVector(target: Laya.Point, n1:AStarNode, n2:AStarNode):void {
		target.x = n1.x - n2.x;
		target.y = n1.y - n2.y;
	}
	
}
