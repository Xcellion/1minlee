//wrapper to hold all maps
window.Maps = {};

(function(){
	function Map(W, H){
		//map dimensions
		this.w = W;
		this.h = H;
		this.stars = AMOUNTSTARS; //number of stars
		
		//map texture
		this.image = null;
	}
	
	//generate an example of a large map
	Map.prototype.generate = function(){
		var ctx = document.createElement("canvas").getContext("2d");		
		ctx.canvas.width = this.w;
		ctx.canvas.height = this.h;		
	    
		for (var  i = 0; i <= this.stars; i++) {
			var x = Math.floor((Math.random()*this.w)+1);
			var y = Math.floor((Math.random()*this.h)+1);
			var w = Math.floor((Math.random()*5));
			var h = Math.floor((Math.random()*5));
			ctx.beginPath;
			ctx.fillStyle = "white";
			ctx.rect (x, y, w, h);
			ctx.fill();
			ctx.closePath();			
		}		
		
		//store the generate map as this image texture
		this.image = new Image();
		this.image.src = ctx.canvas.toDataURL("image/png");		
		
		//clear context
		ctx = null;
	}
	
	//draw the map adjusted to camera
	Map.prototype.draw = function(context, xView, yView){					
		var sx, sy, dx, dy;
		var sWidth, sHeight, dWidth, dHeight;
		
		//offset point to crop the image
		sx = xView;
		sy = yView;
		
		//dimensions of cropped image			
		sWidth =  context.canvas.width;
		sHeight = context.canvas.height;
		//location on canvas to draw the cropped image
		dx = 0;
		dy = 0;
		//match destination with source to not scale the image
		dWidth = sWidth;
		dHeight = sHeight;											context.drawImage(this.image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);			
	}
	
	Maps.Map = Map;
	
})();