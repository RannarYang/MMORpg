interface IList {
	push(node: AStarNode):void;
	pop(): AStarNode;
	getLength(): number;
	getVector(): AStarNode[];
	reset(): void;
	valueChanged(node:AStarNode):void;
}