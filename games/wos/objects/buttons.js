//wrapper to hold all buttons
window.Buttons = {};

//function for creating a start button
(function () {
	//constructor
	function Button(w, h, x, y, phrase, color){
		this.w = w;
		this.h = h;
		this.x = x
		this.y = y
		this.phrase = phrase
		this.color = color;
		this.rectangle = new Shapes.Rectangle(this.x, this.y, this.w, this.h);
	}
	
	//draw
	Button.prototype.draw = function draw(context){
		this.rectangle.draw(context, this.color);
		context.font = "18px Arial, sans-serif";
		context.textAlign = "center";
		context.textBaseline = "middle";
		context.fillStyle = this.color;
		context.fillText(this.phrase, this.x + this.w/2, this.y + this.h/2);
	}
	
	Buttons.button = Button;
})();