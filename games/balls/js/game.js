var initId = 0;
var player = function(){
	this.object = null;
	this.canJump = false;
	this.falling = true;
	this.boost = false;
};
var ball = function(){
	this.object = null;
	this.canJump = false;
	this.falling = true;
	this.boost = false;
};
var world = createWorld();
var ctx;
var canvasWidth;
var canvasHeight;
var canvasTop;
var canvasLeft;
var keys = [];
var playerBd;
var ballBd;
var time = 0;

function step() {
	if (ball.object.GetCenterPosition().y < 50 && ball.object.GetCenterPosition().x > canvasWidth-125){  
		showWin();
		setTimeout("step()", 10);
		return;
	}
	
	handleInteractions();
	
	var stepping = false;
	var timeStep = 1/60;
	var iteration = 1;
	world.Step(timeStep, iteration);
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	drawWorld(world, ctx);
	setTimeout("step()", 10);
	time = time+1;
	if (time == 500 && player.boost == true){
		player.boost = false;
		time = 0;
	}
}

function showWin(){
	ctx.fillStyle = '#000';
	ctx.font = '50px helvetica';
	ctx.textBaseline = 'center';
	ctx.fillText('PURE WIN!', 120, 200);
}

function handleInteractions(){
	var collision = world.m_contactList;
	player.canJump = false;
	player.falling = true;
	player.fillstyle = "#FF0000";
	if (collision != null){
		if (collision.GetShape1().GetUserData() == 'player' || collision.GetShape2().GetUserData() == 'player'){
			if ((collision.GetShape1().GetUserData() == 'ground' || collision.GetShape2().GetUserData() == 'ground')){
				var playerObj = (collision.GetShape1().GetUserData() == 'player' ? collision.GetShape1().GetPosition() :  collision.GetShape2().GetPosition());
				var groundObj = (collision.GetShape1().GetUserData() == 'ground' ? collision.GetShape1().GetPosition() :  collision.GetShape2().GetPosition());
				if (playerObj.y < groundObj.y){
					player.canJump = true;
					player.falling = false;
				}
			}
		}
	}
	
	var vel = player.object.GetLinearVelocity();
	var spd = 100;
	var spds = 250;
	
	if (player.boost == true){
		spd = spd*3;
		spds = spds*2;
	}
	
//http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes//

	//shift key
	if (keys[16]){
	  player.boost = true;
	}
	//slow speed when falling
	if (player.falling == true){
	  spd = spd/1.1;
	}
	//down arrow
	if (keys[40] || keys[83]){ 
	  if (player.falling == true){
		vel.y = spds*2;
		}
	}
	//up arrow
	if (keys[87] || keys[38]){
	  if (player.canJump){
		vel.y = -spds;
		}
	}
	// left and right arrows
	if (keys[37] || keys[65]){
	  vel.x = -1*spd;
	}
	else if (keys[39] || keys[68]){
	  vel.x = spd;
	}
	player.object.SetLinearVelocity(vel);
}

function createCrate(w, x, y) {
	createBox(w, x, y, 10, 10, true, 'ground');
/*	createBall(w, 100, 475, 15, 10, 1, 100);*/
}

function createGame() {
	//top
	createBox(world, 0, 0 ,750, 1, true);
	//bottom
	createBox(world, 0, 500 ,750, 1, true, 'ground');
	//left
	createBox(world, 0, 0 , 1, 500, true);
	//right
	createBox(world, 750, 500 , 1, 500, true);
	//top right
	createBox(world, 375, 125, 50, 25, true, 'ground');
	//middle 
	createBox(world, 250, 250, 50, 25, true, 'ground');
	//bottom left	
	createBox(world, 125, 375, 50, 25, true, 'ground');
	//winning box
// 	createBox(world, 400, 50, 5, 5, true);
}

function initGame(){
	// create player ball
	var playerSd = new b2CircleDef();
	playerSd.density = 10;
	playerSd.radius = 15;
	playerSd.restitution = 0;
	playerSd.friction = 1000;
	playerSd.userData = 'player';
	playerBd = new b2BodyDef();
	playerBd.linearDamping = 0.03;
	playerBd.allowSleep = false;
	playerBd.AddShape(playerSd);
	playerBd.position.Set(50,400);
	player.object = world.CreateBody(playerBd);
	// create ball
	var ballSd = new b2CircleDef();
	ballSd.density = 7.5;
	ballSd.radius = 10;
	ballSd.restitution = 1;
	ballSd.friction = 100;
	ballSd.userData = 'ball';
	ballBd = new b2BodyDef();
	ballBd.AddShape(ballSd);
	ballBd.position.Set(100,475);
	ball.object = world.CreateBody(ballBd);
}

function handleKeyDown(event){
	keys[event.keyCode] = true;
}

function handleKeyUp(event){
	keys[event.keyCode] = false;
}

function refreshWorld() {
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	drawWorld(world, ctx);
	//world.ballBd.position.Set(50,400);
	world.DestroyBody(player.object);
	initGame();
}

Event.observe(window, 'load', function() {
	world = createWorld();
	ctx = $('game').getContext('2d');
	var canvasElm = $('game');
	canvasWidth = parseInt(canvasElm.width);
	canvasHeight = parseInt(canvasElm.height);
	canvasTop = parseInt(canvasElm.style.top);
	canvasLeft = parseInt(canvasElm.style.left);
	Event.observe('game', 'click', function(e) {
	  createCrate(world, Event.pointerX(e) - 420, Event.pointerY(e) - 150);
	});
	createGame();
	initGame();
	step();
	
	window.addEventListener('keydown',handleKeyDown,true);
	window.addEventListener('keyup',handleKeyUp,true);
});

// disable vertical scrolling from arrows
document.onkeydown=function(){return event.keyCode!=38 && event.keyCode!=40}
