//wrapper to hold all cameras
window.Cameras = {};

//function for creating a camera
(function () {
	//constructor
	function Camera(x, y, canvasW, canvasH, mapW, mapH){
		this.x = x || 0;
		this.y = y || 0;
		this.w = canvasW;
		this.h = canvasH;
		
		this.xDeadZone = 0;
		this.yDeadZone = 0;
				
		this.target = null;
		
		this.shape = new Shapes.Rectangle(this.x, this.y, this.w, this.h);
		this.map = new Shapes.Rectangle(0, 0, mapW, mapH);
	}
	
	Camera.prototype.set = function set(X, Y, W, H){
		this.shape.set(X, Y, W, H);
	}
	
	//gives camera a target to follow
	Camera.prototype.follow = function(object, xDeadZone, yDeadZone){
		this.target = object;
		this.xDeadZone = xDeadZone;
		this.yDeadZone = yDeadZone;
	}
	
	Camera.prototype.update = function(){
		if (this.target != null){
			//target distance from center of screen
			var disx = (Math.abs(this.target.x - this.x - this.xDeadZone)/100);
			var disy = (Math.abs(this.target.y - this.y - this.yDeadZone)/100);
			
			//speed to move camera, speeds up as target is farther from center of screen
			var speedx = Math.abs(this.target.vx)*disx || 5*disx;
			var speedy = Math.abs(this.target.vy)*disy || 5*disy;
		
			//moves camera on horizontal axis based on target's speed
			if (this.target.x - this.x  + this.xDeadZone >= this.w + 5){
				this.x+=speedx;
			}
			else if (this.target.x  - this.xDeadZone < this.x){
				this.x-=speedx;
			}

			//moves camera on vertical axis based on target's speed
			if (this.target.y - this.y + this.yDeadZone >= this.h + 5){
				this.y+=speedy;
			}
			else if (this.target.y - this.yDeadZone < this.y){
				this.y-=speedy;
			}
		}
		
		this.shape.set(this.x, this.y);
		
		//stops moving camera if at edges of the map
		if (!this.shape.within(this.map)){
			if (this.shape.x < this.map.x){
				this.x = this.map.x;
			}
			if (this.shape.y < this.map.y){				
				this.y = this.map.y;
			}
			if (this.shape.right > this.map.right){
				this.x = this.map.right - this.w;
			}
			if (this.shape.bottom > this.map.bottom){					
				this.y = this.map.bottom - this.h;
			}
		}
	}
	
	Cameras.Camera = Camera;
})();