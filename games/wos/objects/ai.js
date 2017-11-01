//wrapper to hold all ai
window.AIs = {};

//function for creating an ai
(function () {

	function getRandomColor() {
		var letters = '0123456789ABCDEF'.split('');
		var color = '#';
		for (var i = 0; i < 6; i++ ) {
			color += letters[Math.round(Math.random() * 15)];
		}
		return color;
	}
	//constructor
	function AI(W, H, shape){
		this.x = Math.floor((Math.random()*W)+1);
		this.y = Math.floor((Math.random()*H)+1);
		this.vx = Math.round((Math.random()*2-1)*30);
		this.vy = Math.round((Math.random()*2-1)*30);
		this.expanding = true;
		this.a = 2;
		
		this.casting = false;
		this.canCast = false;
		this.castRand = Math.floor((Math.random()*100));
		this.castCD = 0;
		this.invulnerable = false;
		
		//random color
		this.color = getRandomColor();
		
		this.directionCD = 0;
		this.directionX = Math.floor((Math.random() * (6- 1) + 1));
		this.directionY = Math.floor((Math.random() * (6- 1) + 1));
		if (shape == "Rectangle"){
			this.shape = new Shapes.Rectangle(this.x, this.y, 50, 50);
		}
		if (shape == "Circle"){
			this.r = Math.round(25*(Math.random()+1));
			this.shape = new Shapes.Circle(this.x, this.y, this.r, this.color);
		}
		this.spell = new Shapes.Circle(this.x - 5, this.y - 5, 5, this.color);
	}
	
	AI.prototype.set = function set(R, C){
		this.shape.set(this.x, this.y, R, C);
		this.directionCD++;
		
		//if can cast, show ability icon
		if (this.canCast == true){
			this.spell.color = "white";
			this.spell.set(this.x, this.y, 10, this.spell.color);
			if (this.castCD%25 == 0){
				this.castRand = Math.floor((Math.random() * AIAMOUNT * AIAMOUNT + 1));
			}
		}
		//else ability icon is gone
		if (this.canCast == false){
			this.spell.r = 0;
		}
		
		//wait for cooldown
		if (this.castCD <100){
			this.castCD++;
		}
		
		//can it cast?
		if (this.castCD >= 100){
			this.canCast = true;
		}
		
		var absY = Math.abs(this.vy), absX = Math.abs(this.vx);
		
		//change direction
		if (this.directionCD < 10){
			if (absY <= 20){
				//up
				if (this.directionY == 1){
					this.vy -= this.a;
				}
				//down
				if (this.directionY == 2){
					this.vy += this.a;
				}
			}
			if (absX <= 20){
				//left
				if (this.directionX == 1){
					this.vx -= this.a;
				}
				//right
				if (this.directionX == 2){
					this.vx += this.a;
				}
			}
		}
		if (this.directionCD > 10){
			this.directionX = Math.floor((Math.random() * (6- 1) + 1));
			this.directionY = Math.floor((Math.random() * (6- 1) + 1));
			this.directionCD = 0;
		}
	}
	
	//draw
	AI.prototype.draw = function draw(context, xView, yView){
		var X = this.x - xView;
		var Y = this.y - yView;

		this.shape.draw(context, X, Y);
		this.spell.draw(context, X, Y);
	}
	
	AIs.AI = AI;
})();