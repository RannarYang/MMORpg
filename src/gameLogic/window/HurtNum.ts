class HurtNum implements IRecycleable {
	private _duration: number = 500;
	private _spanX: number;
	private _spanY: number;
	private _startTime: number = 0;
	private _progress: number;
	private _txt: Laya.Text = new Laya.Text();
	private _originPos: Laya.Point = new Laya.Point();
	private _tempX: number;
	private _tempY: number;
	private _isRecycled: boolean;
	private _type: number;
	private _scaleFactor: number;
	
	constructor(){

	}
	
	public start(pos: Laya.Point, text: string, type: number, spanX: number = 100, spanY: number = 200, during: number = 800): void {
		this._spanX = spanX;
		this._spanY = spanY;
		this._duration = during;
		this._txt.wordWrap = true;
		this._txt.width = 150;
		this._txt.text = text;
		this._type = type;
		if(this._type == ActorType.Player)
		{
			this._txt.font = GameConfig.BmpFntName2;
			this._spanX *= -1;
			this._scaleFactor = 0.2;
		} else {
			this._txt.font = GameConfig.BmpFntName;
			this._scaleFactor = 0.3;
		}
		this._originPos.x = pos.x;
		this._originPos.y = pos.y;
		//_txt.pos(_originPos.x, _originPos.y);
		this._txt.visible = false;
		SceneManager.I.addToLayer(this._txt, LayerEnum.TipLayer,this._originPos.x, this._originPos.y);
		
		this._startTime = Laya.timer.currTimer;
		Laya.timer.frameLoop(GameConfig.FrameLoopDelay, this, this.update);
	}
	
	private update(e:Event):void {
		if(!this._txt.visible)
			this._txt.visible = true;
		this._progress = (Laya.timer.currTimer - this._startTime) / this._duration;
		if(this._progress >= 1)
		{
			this._progress = 1;	
			this.recycleSelf();
		}
		else
		{
			this._tempX = this._progress * this._spanX;
			this._tempY = this.pow(this._progress - (1.0/3)) * (this._spanY * (this.pow(1)/this.pow(2.0/3)));
			this._txt.x = this._tempX + this._originPos.x;
			this._txt.y = this._tempY + this._originPos.y;
			///_txt.alpha = 1 - _progress;
			this._txt.scaleX = (2 + (1 - this._progress * 1.5)) * this._scaleFactor;
			this._txt.scaleY = (2 + (1 - this._progress * 1.5)) * this._scaleFactor;
		}
	}
	
	private pow(x: number): number{
		return Math.pow(x, 2);
	}
	
	public onRecycle():void {
		Laya.timer.clear(this, this.update);
		this._txt.removeSelf();
		this._spanX = 0;
		this._spanY = 0;
		this._startTime = 0;
		this._progress = 0;
		this._originPos.x = 0;
		this._originPos.y = 0;
		this._tempX = 0;
		this._tempY = 0;
	}
	
	public recycleSelf():void{
		ObjPool.I.recycleObj(this, HurtNum);
	}
	
	public isRecycled: boolean;
	
}
		
