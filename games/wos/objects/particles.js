//wrapper to hold all particles
window.Particles = {};

//function for creating particles
(function () {
	//constructor
	function particles(X, Y, Color){
		this.x = X || 0;
		this.y = Y || 0;
		this.color = Color;
		this.r = Math.random()+1;
		
		this.shapes = [];
		
		for (var i=0; i < PARTICLECOUNT; i++){
			this.shapes[i] = new Shapes.Circle(this.x, this.y, this.r, this.color);
			this.shapes[i].vx = -1.5 + Math.random()*5;
			this.shapes[i].vy = -1.5 + Math.random()*5;
		}
	}
	
	//moves particles
	particles.prototype.move = function move(){
		for (var i=0; i < PARTICLECOUNT; i++){
			this.shapes[i].x += this.shapes[i].vx;
			this.shapes[i].y += this.shapes[i].vy;
		}
	}
	
	//sets according to camera
	particles.prototype.set = function set(){
		for (var i=0; i < PARTICLECOUNT; i++){						
			this.shapes[i].set(this.shapes[i].x, this.shapes[i].y, this.r, this.color);
		}
	}
	
	//draw
	particles.prototype.draw = function draw(context, xView, yView){
		for (var i=0; i< PARTICLECOUNT; i++){
			var X = this.shapes[i].x - xView;
			var Y = this.shapes[i].y - yView;
			this.shapes[i].draw(context, X, Y);
		}
	}
	
	Particles.particles = particles;
})();