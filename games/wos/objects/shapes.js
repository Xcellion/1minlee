//wrapper to hold all shapes
window.Shapes = {};

//wrapper for "class" Rectangle
(function () {
	//constructor
    function Rectangle(X, Y, W, H) {
		this.x = X;
		this.y = Y;
		this.w = W || 0;
		this.h = H || 0;
		this.right = this.x + this.w;
		this.bottom = this.y + this.h;
		this.shape = "Rectangle";
    }

    Rectangle.prototype.set = function (X, Y, W, H) {
		this.x = X;
		this.y = Y;
		this.w = W || this.w;
		this.h = H || this.h;
		this.right = (this.x + this.w);
		this.bottom = (this.y + this.h);
    }

	Rectangle.prototype.within = function(r) {
		if (r.shape == "Rectangle"){
			return (r.x <= this.x && 
					r.right >= this.right &&
					r.y <= this.y && 
					r.bottom >= this.bottom);
		}
	}		

    Rectangle.prototype.overlaps = function (r) {

    }
	
	Rectangle.prototype.draw = function (context, color) {
		context.strokeStyle = color;
		context.lineWidth = "2";
		context.strokeRect(this.x, this.y, this.w, this.h);
	}

    //add "class" Rectangle to our Shapes object
    Shapes.Rectangle = Rectangle;
})();

// wrapper for "class" Circle
(function () {
	//constructor
    function Circle(X, Y, R, C, VX, VY) {
		this.x = X;
		this.y = Y;
		this.r = R;
		this.vx = VX || 0;
		this.vy = VY || 0;
		this.color = C;
		this.shape = "Circle";
    }

    Circle.prototype.set = function (X, Y, R, C) {
        this.x = X;
        this.y = Y;
		this.r = R;
		this.color = C;
    }

    Circle.prototype.within = function (r) {
        if (r.shape == "Circle" || r.shape == "OuterRing") {
			var dx = Math.max(this.x - r.x, r.x - this.x);
			var dy = Math.max(this.y - r.y, r.y - this.y);
			var dist = this.r + r.r;
			
			return ((dx * dx) + (dy * dy) <= (dist * dist));
		}
    }

    Circle.prototype.overlaps = function (r) {
        
    }
	
	Circle.prototype.draw = function (context, X, Y) {
		context.beginPath();
		context.fillStyle = this.color;
		context.arc(X, Y, this.r, 0, Math.PI*2, false);
		context.fill();
	}

    // add "class" Circle to our Shapes object
    Shapes.Circle = Circle;
})();

//wrapper for "class" OuterRing
(function () {
	//constructor
    function OuterRing(X, Y, R, C) {
		this.x = X;
		this.y = Y;
		this.r = R;
		this.color = C;
		this.shape = "OuterRing";
    }

    OuterRing.prototype.set = function (X, Y, R, C) {
        this.x = X;
        this.y = Y;
		this.r = R;
		this.color = C;
    }

    OuterRing.prototype.within = function (r) {
		if (r.shape == "Circle" || r.shape == "OuterRing") {
			var dx = this.x - r.x;
			var dy = this.y - r.y;
			var dist = this.r + r.r;

			return (dx * dx + dy * dy <= dist * dist);
		}
    }

    OuterRing.prototype.overlaps = function (r) {
        
    }
	
	OuterRing.prototype.draw = function (context, X, Y) {
		context.beginPath();
		context.strokeStyle = this.color;
		context.arc(X, Y, this.r, 0, Math.PI*2, false);
		context.stroke();
	}

    //add "class" OuterRing to our Shapes object
    Shapes.OuterRing = OuterRing;
})();