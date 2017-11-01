/**************************************************
** WINDOWS STUFF
**************************************************/

//requestAnimFrame: a browser API for getting smooth animations
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       || 
		window.webkitRequestAnimationFrame || 
		window.mozRequestAnimationFrame    || 
		window.oRequestAnimationFrame      || 
		window.msRequestAnimationFrame     ||  
		function( callback ){
			return window.setTimeout(callback, 1000 / 60);
		};
})();

window.cancelRequestAnimFrame = ( function() {
	return window.cancelAnimationFrame          ||
		window.webkitCancelRequestAnimationFrame    ||
		window.mozCancelRequestAnimationFrame       ||
		window.oCancelRequestAnimationFrame     ||
		window.msCancelRequestAnimationFrame        ||
		clearTimeout
} )();

//window resize
window.addEventListener("resize", onResize, false);

/**************************************************
** INITIALIZE VARIABLES
**************************************************/

//initialize sounds
var flash = document.getElementById("teleport"),
	dash = document.getElementById("dash"),
	crash = document.getElementById("crash"),
	die = document.getElementById("die"),
	dying = document.getElementById("dying"),
	buttonSound = document.getElementById("button"),
	startSound = document.getElementById("start");
	
function playSound(sound){
	if (sound) {
		sound.currentTime = 0;
		sound.play();
	}
}

//initialize canvas
var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"), //create canvas context
	start = false; //boolean to tell if game started or not
	over = false, //flag variable, changed when the game is over
	init =  null; //variable to initialize animation
canvas.focus();
	
//add mousemove and mousedown events to the canvas
canvas.addEventListener("mousedown", clickDown, true);
canvas.addEventListener("mouseup", clickUp, true);

//add keydown events to the canvas
canvas.addEventListener("keydown", function (e){Keys.onKeyDown(e);
												keyDown();}, true);
canvas.addEventListener("keyup", function (e){Keys.onKeyUp(e);
												keyUp();}, true);

//set the canvas's height and width to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//initialize map object
var _map = new Maps.Map(MAPHEIGHT, MAPWIDTH);
_map.generate();

//initialize camera object
var _camera = new Cameras.Camera(MAPHEIGHT, MAPWIDTH, canvas.width, canvas.height, _map.w, _map.h);		
	
//initialize particles
var _particles = [];

//initialize game score
var _score = 0,
	_hit = 0,
	_scoreBtn = new Buttons.button(100, 50, 25, 25, "Score: " + _score, "white"),
	_hitBtn = new Buttons.button(125, 50, 25, 100, "Times Hit: " + _hit, "white");

//initialize units
var	_player = new Players.Player(PLAYERSTARTX, PLAYERSTARTY, PLAYERCOLOR , PLAYERSHAPE),
	_ai = [];
	
//initialize buttons
var _startBtn = new Buttons.button(100, 50, canvas.width/2 - 50, canvas.height/2 - 25, "START", "white"),
	_restartBtn = new Buttons.button(100, 50, canvas.width/2 - 50, canvas.height/2 - 25, "RESTART", "white"),
	_pause = 0;
	
/**************************************************
** GAME FUNCTIONS
**************************************************/
	
//function to run when browser is resized
function onResize(e) {
	//maximise the canvas
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	CAMERAXDEAD = canvas.width/2;
	CAMERAYDEAD =  canvas.height/2;
	_camera.w = canvas.width;
	_camera.h = canvas.height;
};

//function to execute on start up
function startScreen(context) {
	paintCanvas(context);
	createAI(AIAMOUNT);
	_startBtn.draw(context);
}

//function for running the whole animation
function animloop() {
	init = requestAnimFrame(animloop);
	draw(ctx);
	update();
}
	
//function to paint/clear canvas
function paintCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

//draw everything on canvas
function draw(context) {
	paintCanvas();
	_map.draw(context, _camera.x, _camera.y);		
	for (var i=0; i < _ai.length; i++){
		_ai[i].draw(context, _camera.x, _camera.y);
	}
	for (var j=0; j < _particles.length; j++){
		_particles[j].draw(context, _camera.x, _camera.y);
	}
	_player.draw(context, _camera.x, _camera.y);
	_scoreBtn.phrase = "Score: " + _score;
	_hitBtn.phrase = "Times Hit: " + _hit;
	_hitBtn.draw(context);
	_scoreBtn.draw(context);
}

//apply friction
function friction(object, i) {
	var num = i || 1;
	if (object.vx < 0){
		object.vx = object.vx + FRICTIONVAR*num;
	}
	if (object.vx > 0){
		object.vx = object.vx - FRICTIONVAR*num;
	}
	if (object.vy < 0){
		object.vy = object.vy + FRICTIONVAR*num;
	}
	if (object.vy > 0){
		object.vy = object.vy - FRICTIONVAR*num;
	}
}

function dashFrict(object){
	var absY = Math.abs(object.vy), absX = Math.abs(object.vx);
	if (absX > PLAYERMAXV + 5 || absY > PLAYERMAXV + 5){
		friction(object, 10);
		object.invulnerable = true;
	}
	else {
		if (object == _player){
			_camera.follow(_player, CAMERAXDEAD, CAMERAYDEAD);
		}
		object.invulnerable = false;
		friction(object);
	}
}

//move object
function move(object) {
	// if object strikes the top/bottom walls, invert the y-velocity vector		
	if (object.y - object.shape.r < 0) {
		object.vy = -object.vy;
		object.y = object.shape.r;
	}
	if (object.y + object.shape.r > _map.h) {
		object.vy = -object.vy;
		object.y = _map.h - object.shape.r;
	}
	// if object strikes the left/right walls, invert the  x-velocity vector
	if (object.x + object.shape.r > _map.w) {
		object.vx = -object.vx;
		object.x = _map.w - object.shape.r;
	}
	if (object.x - object.shape.r < 0) {
		object.vx = -object.vx;
		object.x = object.shape.r;
	}
	else {
		object.x += object.vx;
		object.y += object.vy;
	}
}

//function to run dash on an object
function dashFun(object){
	for (var i=0; i<5; i++){
		var j = i*object.vx*4;
		var k = i*object.vy*4;
		createParticles(object.x+j, object.y+k, object.color);
	}
	playSound(dash);
	object.vx *= 5;
	object.vy *= 5;
	object.canCast = false;
	if (object == _player){
		object.castCD = 80;
	}
	else {
		object.castCD = 0;
	}
	object.invulnerable = true;
}

//function to check is any ai is dying
function checkDying(){
	var dyingSound = false;
	for (var j=0; j < _ai.length; j++){
		//ai is within player outer ring
		if (_player.outerRing.within(_ai[j].shape)){
			dyingSound = true;
		}
	}
	return dyingSound;
}

//function to update positions, move players, check collision
function update() {
	_camera.update();
	_camera.follow(_player, CAMERAXDEAD, CAMERAYDEAD);
		
	//maximum velocity of player
	var absY = Math.abs(_player.vy), absX = Math.abs(_player.vx);

	//when keys are pressed, accelerate in that direction
	if (absY <= _player.maxV){
		if (Keys.isDown(Keys.UP) || Keys.isDown(Keys.W)){
			if (_player.y - _player.shape.r > 1){
				_player.vy -= _player.a;
			}
		}
		if (Keys.isDown(Keys.DOWN) || Keys.isDown(Keys.S)){
			if (_player.y + _player.shape.r < _map.h - 1){
				_player.vy = _player.vy + _player.a;
			}
		}
	}
	if (absX <= _player.maxV){
		if (Keys.isDown(Keys.LEFT) || Keys.isDown(Keys.A)){
			if (_player.x - _player.shape.r > 1){
				_player.vx = _player.vx - _player.a;
			}
		}
		if (Keys.isDown(Keys.RIGHT) || Keys.isDown(Keys.D)){
			if (_player.x + _player.shape.r < _map.w - 1){
				_player.vx = _player.vx + _player.a;
			}
		}
	}
	
	//check for collision
	for (var j=0; j < _ai.length; j++){
		//ai is within player outer ring
		if (_player.outerRing.within(_ai[j].shape)){
			diffX = _ai[j].x - _player.x;
			diffY = _ai[j].y - _player.y;
			
			if (diffX >= 0){
				_ai[j].directionX = 2;
			}
			else {
				_ai[j].directionX = 1;
			}
			if (diffY >= 0){
				_ai[j].directionY = 2;
			}
			else {
				_ai[j].directionY = 1;
			}
			_ai[j].directionCD = 0;
			_ai[j].a = .5;
			_ai[j].canCast = false;
			_ai[j].castCD = 0;
		}
		else {
			_ai[j].a = 2;
		}
		
		//player is within another ai
		if (_player.shape.within(_ai[j].shape)){
			if (_player.invulnerable == true && _ai[j].invulnerable == false){
				createParticles(_ai[j].x, _ai[j].y, "yellow", 5);
				_ai.splice(j, 1);
				AIAMOUNT--;
				playSound(die);
				_score++;
			}
			else {
				var playerTempVx = _player.vx;
				var playerTempVy = _player.vy;
				var aiTempVx = _ai[j].vx;
				var aiTempVy = _ai[j].vy;
			
				_player.x += aiTempVx;
				_player.y += aiTempVy;
				_ai[j].x += playerTempVx;
				_ai[j].y += playerTempVy;
				
				_player.vx = aiTempVx;
				_player.vy = aiTempVy;
				_ai[j].vx = playerTempVx;
				_ai[j].vy = playerTempVy;
				_ai[j].directionCD = 10;

				if (_ai[j].invulnerable == true){
					for (var k=0; k < 5; k++){
						createParticles(_player.x, _player.y, "red");
					}
					_score--;
					_hit++;
					playSound(crash);
				}
			}
		}
	}
	
	//checks if any ai are in the outerRing to play dying sound
	if (checkDying()){
		dying.play();
		dying.loop = true;
	}
	else {
		dying.pause();
	}
	
	//move ai
	for (var i=0; i < _ai.length; i++){
		move(_ai[i]);
		_ai[i].set (_ai[i].r, _ai[i].color);
	}
	
	move(_player);
	_player.set (_player.r, _player.color);
	
	//move particles
	for (var j=0; j < _particles.length; j++){
		_particles[j].r = Math.max(_particles[j].r - 0.05, 0.0); 
		if (_particles[j].r <= 0){
			_particles.splice(j, 1);
		}
		else {
			_particles[j].move();
			_particles[j].set();
		}
	}
	
	if (_ai.length <= 0){
		_pause++;
		if (_pause == 50){
			_pause = 0;
			gameOver();
		}
	}
	
	//dash player when space is pressed
	if ((Keys.isDown(Keys.SPACE) && _player.canCast) && (absX > 0 || absY > 0)){		
		dashFun(_player);
	}
	
	//set friction and camera when dashing
	dashFrict(_player);
	
	for (var i=0; i< _ai.length; i++) {
		var aiAbsX = Math.abs(_ai[i].vX), aiAbsY = Math.abs(_ai[i].vy);
		if ((_ai[i].canCast) && (_ai[i].castRand <= AIAMOUNT) && (aiAbsX > 15 || aiAbsY > 15)){
			dashFun(_ai[i]);
		}
		dashFrict(_ai[i]);
	}
}

//function for creating particles object
function createParticles(x, y, color, amt) {
	var c = color || "white";
	var amount = amt || 1;
	for (var i=0; i<amount; i++){
		var tempPart = new Particles.particles(x, y, c);
		_particles.push(tempPart);
	}
}

//create ai
function createAI(amount) {
	for (var i=0; i < amount; i++){
		var tempAI = new AIs.AI(_map.w/2, _map.h/2, "Circle");
		_ai.push(tempAI);
	}
}

//function to run when the game overs
function gameOver() {
	_ai = [];
	_player.x = PLAYERSTARTX;
	_player.y = PLAYERSTARTY;
	_player.rr = 0;
	_camera.x = MAPWIDTH;
	_camera.y = MAPHEIGHT;
	
	var text = "FINAL SCORE: " + _score;
	if (_score == AIAMOUNT && _hit == 0) {
		text = "FLAWLESS SCORE";
	}
	
	ctx.fillStlye = "white";
	ctx.font = "20px Arial, sans-serif";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText(text, canvas.width/2, canvas.height/2 + 75 );
	
	//stop the Animation
	cancelRequestAnimFrame(init);
	
	//set the over flag
	over = true;
	start = false;
	
	//show the restart button
	_restartBtn.draw(ctx);
}

//function to teleport the player
function teleport(x, y) {
	if (_player.canCast == true){
		_player.startTP(x, y);
		//plays the TP sound
		playSound(flash);
	}
}

//function to run on mouse down
function clickDown(e) {
	//variables for storing mouse position on click
	var mx = e.pageX,
		my = e.pageY;
	
	//teleports the player
	if (start == true){
		teleport(mx + _camera.x, my + _camera.y);
	}
	
	//clicks start button
	if (mx >= _startBtn.x && mx <= _startBtn.x + _startBtn.w && my >= _startBtn.y && my <= _startBtn.y + _startBtn.h) {
		playSound(buttonSound);
		animloop();
		start = true;
		//delete the start button after clicking it
		_startBtn = {};
	}

	//if the game is over, and the restart button is clicked
	if (over == true) {
		if (mx >= _restartBtn.x && mx <= _restartBtn.x + _restartBtn.w && my >= _restartBtn.y && my <= _restartBtn.y + _restartBtn.h) {
			playSound(buttonSound);
			gameOver();
			createAI(AIAMOUNT);
			start = true;
			_score = 0;
			_hit = 0;
			animloop();
			over = false;
		}
	}
}

//function to run on mouse up
function clickUp(){

}

//function to run on key down
function keyDown(){
	//press R to restart game
	if (Keys.isDown(Keys.R)){
		gameOver();
		createAI(AIAMOUNT);
		start = true;
		_score = 0;
		_hit = 0;
		animloop();
		over = false;
	}
	//press P to pause the game
	if (Keys.isDown(Keys.P)){
		if (start == true){
			start = false;
			cancelRequestAnimFrame(init);
		}
		else {
			start = true;
			animloop();
		}
	}
	//press Enter to start game
	if (Keys.isDown(Keys.ENTER)){
		if (start == false){
			playSound(buttonSound);
			start = true;
			animloop(ctx);
			_startBtn = {};
		}
		if (over == true){
			playSound(buttonSound);
			gameOver();
			createAI(AIAMOUNT);
			start = true;
			_score = 0;
			_hit = 0;
			animloop();
			over = false;
		}
	}
}

//function to run on key up
function keyUp(){

}

//show the start screen
startScreen(ctx);