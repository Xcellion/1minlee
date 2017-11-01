//wrapper to hold all players
window.Players = {};

//function for creating a player
(function () {
	//constructor
	function Player(X, Y, color, shape){
		this.x = X;
		this.y = Y;
		this.vx = 0;
		this.vy = 0;
		this.maxV = PLAYERMAXV;
		this.rr = 0;
		this.expanding = true;
		this.a = PLAYERACC;
		this.casting = false;
		this.canCast = false;
		this.castCD = 100;
		this.color = color;
		this.invulnerable = false;
		if (shape == "Rectangle"){
			this.shape = new Shapes.Rectangle(this.x, this.y, 50, 50);
		}
		if (shape == "Circle"){
			this.r = 25;
			this.shape = new Shapes.Circle(this.x, this.y, this.r, this.color);
		}
		this.outerRing = new Shapes.OuterRing(this.x, this.y, this.rr, this.color);
		this.spell = new Shapes.Circle(this.x - 5, this.y - 5, 5, this.color);
	}

	Player.prototype.startTP =  function startTP(nx, ny){
		this.casting = true;
		this.castCD = 80;
		this.canCast = false;
	}
	
	Player.prototype.set = function set(R, C){
		this.shape.set(this.x, this.y, R, C);
		this.outerRing.set(this.x, this.y, this.rr, C);
		
		//if can cast, show ability icon
		if (this.canCast == true){
			this.spell.color = "white";
			this.spell.set(this.x, this.y, 10, this.spell.color);
		}
		//else ability icon is gone
		if (this.canCast == false){
			this.spell.r = 0;
		}
		
		//wait for cooldown
		if (this.castCD <=100){
			this.castCD++;
		}
		
		//can it cast?
		if (this.castCD >= 100){
			this.canCast = true;
		}
		
		//casting
		if (this.casting == true){
			this.rr+=10;
		}
		
		//collapsing
		if (this.rr >= this.r * 10){
			this.expanding = false;
			this.casting = false;
			this.rr--;
		}
		if (this.casting == false && this.rr > 2){
			this.rr-=2;
		}
	}
	
	//draw
	Player.prototype.draw = function draw(context, xView, yView){
		var X = this.x - xView;
		var Y = this.y - yView;
		
		this.outerRing.draw(context, X, Y);
		this.shape.draw(context, X, Y);
		this.spell.draw(context, X, Y);
	}
	
	Players.Player = Player;
})();