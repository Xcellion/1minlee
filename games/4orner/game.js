//start the game!
game = new Phaser.Game(SCREEN_WIDTH, SCREEN_HEIGHT, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
	if (game.device.cordova){
 		media = {
			"ticktock" : "assets/sounds/ticktock.wav",
			"timestop" : "assets/sounds/timestop.wav",
			"successLow" : "assets/sounds/successLow.wav",
			"successHigh" : "assets/sounds/successHigh.wav",
			"successMed" : "assets/sounds/successMed.wav",
			"hurt" : "assets/sounds/hurt.wav",
			"error" : "assets/sounds/error.wav",
			"neutral0" : "assets/sounds/neutral0.wav",
			"neutral1" : "assets/sounds/neutral1.wav",
			"collect0" : "assets/sounds/collect0.wav",
			"collect1" : "assets/sounds/collect1.wav",
			"collect2" : "assets/sounds/collect2.wav",
			"collect3" : "assets/sounds/collect3.wav",
			"collect4" : "assets/sounds/collect4.wav",
			"collect5" : "assets/sounds/collect5.wav",
			"collect6" : "assets/sounds/collect6.wav",
			"colorchange1" : "assets/sounds/colorchange1.wav",
			"colorchange2" : "assets/sounds/colorchange2.wav",
			"colorchange3" : "assets/sounds/colorchange3.wav",
			"colorchange4" : "assets/sounds/colorchange4.wav",
			"background" : "assets/sounds/background.ogg"
		};
		
 		if (window.plugins && window.plugins.LowLatencyAudio) {
			lla = window.plugins.LowLatencyAudio;
			for (var x in media){
				if (parseInt(x.charAt(x.length-1))){
					lla.preloadAudio(x, media[x], 0.5, 1, function(msg){
					}, function(msg){
						alert( 'error: ' + msg );
					});
				}
				else {
					lla.preloadAudio(x, media[x], 1, 1, function(msg){
					}, function(msg){
						alert( 'error: ' + msg );
					});
				}
			}
		}
	}
	else {
		game.load.audio('background', ['assets/sounds/background.ogg', 'assets/sounds/mp3/background.mp3']);
		game.load.audio('ticktock', ['assets/sounds/ticktock.wav', 'assets/sounds/mp3/ticktock.mp3']);

		game.load.audio('timestop', ['assets/sounds/timestop.wav', 'assets/sounds/mp3/timestop.mp3']);
		
		game.load.audio('successLow', ['assets/sounds/successLow.wav', 'assets/sounds/mp3/successLow.mp3']);
		game.load.audio('successHigh', ['assets/sounds/successHigh.wav', 'assets/sounds/mp3/successHigh.mp3']);
		game.load.audio('successMed', ['assets/sounds/successMed.wav', 'assets/sounds/mp3/successMed.mp3']);
		
		game.load.audio('hurt', ['assets/sounds/hurt.wav', 'assets/sounds/mp3/hurt.mp3']);
		game.load.audio('error', ['assets/sounds/error.wav', 'assets/sounds/mp3/error.mp3']);
		
		game.load.audio('neutral0', ['assets/sounds/neutral0.wav', 'assets/sounds/mp3/neutral0.mp3']);
		game.load.audio('neutral1', ['assets/sounds/neutral1.wav', 'assets/sounds/mp3/neutral1.mp3']);
		
		game.load.audio('colorchange1', ['assets/sounds/colorchange1.wav', 'assets/sounds/mp3/colorchange1.mp3']);
		game.load.audio('colorchange2', ['assets/sounds/colorchange2.wav', 'assets/sounds/mp3/colorchange2.mp3']);
		game.load.audio('colorchange3', ['assets/sounds/colorchange3.wav', 'assets/sounds/mp3/colorchange3.mp3']);
		game.load.audio('colorchange4', ['assets/sounds/colorchange4.wav', 'assets/sounds/mp3/colorchange4.mp3']);
		
		game.load.audio('collect0', ['assets/sounds/collect0.wav', 'assets/sounds/mp3/collect0.mp3']);
		game.load.audio('collect1', ['assets/sounds/collect1.wav', 'assets/sounds/mp3/collect1.mp3']);
		game.load.audio('collect2', ['assets/sounds/collect2.wav', 'assets/sounds/mp3/collect2.mp3']);
		game.load.audio('collect3', ['assets/sounds/collect3.wav', 'assets/sounds/mp3/collect3.mp3']);
		game.load.audio('collect4', ['assets/sounds/collect4.wav', 'assets/sounds/mp3/collect4.mp3']);
		game.load.audio('collect5', ['assets/sounds/collect5.wav', 'assets/sounds/mp3/collect5.mp3']);
		game.load.audio('collect6', ['assets/sounds/collect6.wav', 'assets/sounds/mp3/collect6.mp3']);
		game.load.audio('collect7', ['assets/sounds/collect7.wav', 'assets/sounds/mp3/collect7.mp3']);
	}
	
	game.load.spritesheet('inventory_box', 'assets/images/inventory_box.png', 25, 25, 6);
	game.load.spritesheet('particles', 'assets/images/particles.png', 3, 3, 6);
   
	game.load.image('cb_triangle', 'assets/images/cb_triangle.png');
	game.load.image('cb_hexagon', 'assets/images/cb_hexagon.png');
	game.load.image('cb_star', 'assets/images/cb_star.png');
	game.load.image('cb_square', 'assets/images/cb_square.png');
   
	game.load.image('white_arrow', 'assets/images/white_arrow.png');
    game.load.image('pause', 'assets/images/pause.png');
    game.load.image('restart', 'assets/images/restart.png');
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////CREATE FUNCTIONS

function create() {
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.stage.backgroundColor = BACKGROUND_COLOR;
	game.physics.p2.setImpactEvents(true);
	game.physics.p2.restitution = 1;
	
	emitter = game.add.emitter(0, 0, 100);
	
	if (game.device.cordova){
		sfx.background = {};
		lla.loop("background", function(){}, function(error){alert(error)});
	}
	else {
		sfx.background = game.add.audio("background");
		sfx.background.loop = true;
		sfx.background.play();
		
		sfx.ticktock = game.add.audio("ticktock");
		sfx.ticktock.loop = true;

		sfx.timestop = game.add.audio("timestop");
		sfx.timestop.allowMultiple = true;

		sfx.successLow = game.add.audio("successLow");
		sfx.successLow.allowMultiple = true;

		sfx.successHigh = game.add.audio("successHigh");
		sfx.successMed = game.add.audio("successMed");
		
		sfx.hurt = game.add.audio("hurt");
		sfx.hurt.allowMultiple = true;
		
		sfx.error = game.add.audio("error");
		
		for (var i=0; i < 2; i++){
			sfx["neutral"+i] = game.add.audio("neutral"+i);
			sfx["neutral"+i].allowMultiple = true;
			sfx["neutral"+i].volume = 0.5;
		}
		
		for (var i=0; i < 7; i++){
			sfx["collect"+i] = game.add.audio("collect"+i);
			sfx["collect"+i].allowMultiple = true;
			sfx["collect"+i].volume = 0.5;
		}
		
		for (var i=1; i < 5; i++){
			sfx["colorchange"+i] = game.add.audio("colorchange"+i);
			sfx["colorchange"+i].allowMultiple = true;
			sfx["colorchange"+i].volume = 0.5;
		}
	}
	
	ballsCG = game.physics.p2.createCollisionGroup();
	playerCG = game.physics.p2.createCollisionGroup();
	
	game.physics.p2.updateBoundsCollisionGroup();
	
	displayObjects = game.add.group();
    balls = game.add.group();
	players = game.add.group();
	holes = game.add.group();

	//nested groups to get proper z-indexing
	displayObjects.add(players);
	displayObjects.add(balls);
	displayObjects.add(holes);
	
	displayObjects.forEach(function(group){
	    group.enableBody = true;
		group.physicsBodyType = 1;
		game.physics.enable(group);
	});
	
	displayObjects.add(emitter);

	createInventory();
	createHole();
	createPlayer();
	createGameMenu();

	firstTouch = game.input.activePointer;
	secondTouch = game.input.pointer2;
	enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
	spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	if (game.device.desktop){
		pauseBtn = game.input.keyboard.addKey(Phaser.Keyboard.P);
		pauseBtn.onDown.add(pausethegame);
		
		restartBtn = game.input.keyboard.addKey(Phaser.Keyboard.R);		
		restartBtn.onDown.add(function(){
			if (states == "over" || states == "pause" || states == "help"){
				restartthegame();
			}
			else if (states == "start"){
				gameisover();
			}
		});
	}
	else {
		pauseBtn = game.add.sprite(SCREEN_WIDTH * 0.5 + TEXT_PIXEL_BASE, SCREEN_HEIGHT - TEXT_PIXEL_BASE, "pause");
		pauseBtn.width = TEXT_PIXEL_BASE;
		pauseBtn.height = TEXT_PIXEL_BASE;
		pauseBtn.anchor.setTo(0.5, 0.5);
		pauseBtn.inputEnabled = true;
		pauseBtn.events.onInputDown.add(pausethegame);
		
		restartBtn = game.add.sprite(SCREEN_WIDTH * 0.5 - TEXT_PIXEL_BASE, SCREEN_HEIGHT - TEXT_PIXEL_BASE, "restart");
		restartBtn.width = TEXT_PIXEL_BASE;
		restartBtn.height = TEXT_PIXEL_BASE;
		restartBtn.anchor.setTo(0.5, 0.5);
		restartBtn.inputEnabled = true;
		restartBtn.events.onInputDown.add(function(){
			if (states == "over" || states == "pause" || states == "help"){
				restartthegame();
			}
			else if (states == "start"){
				gameisover();
			}
		});
	}	
	cursors = game.input.keyboard.createCursorKeys();
	wasd = {
		up : game.input.keyboard.addKey(Phaser.Keyboard.W),
		left : game.input.keyboard.addKey(Phaser.Keyboard.A),
		down : game.input.keyboard.addKey(Phaser.Keyboard.S),
		right : game.input.keyboard.addKey(Phaser.Keyboard.D)
	}
	numkey = {
		one : game.input.keyboard.addKey(Phaser.Keyboard.ONE),
		two : game.input.keyboard.addKey(Phaser.Keyboard.TWO),
		three : game.input.keyboard.addKey(Phaser.Keyboard.THREE),
		four : game.input.keyboard.addKey(Phaser.Keyboard.FOUR)
	}
	
	game.input.onDown.add(function(pointer){
		if (pointer.id == 0 || pointer.id == 1){
			if (firstTouch != pointer){
				firstTouch = pointer;
			}
		}
		else if (pointer.id == 2){
			if (states != "pause"){
				inputDown();
			}
		}
		if (states != "over" && !lockDown){
			document.body.style.cursor = 'pointer';
		}
	});
	game.input.onUp.add(function(pointer){
		if (pointer.id == 0 || pointer.id == 1){
			firstTouch = pointer;
		}
		else if (pointer.id == 2){
			inputUp();
		}
		if (states != "over" && !lockDown){
			document.body.style.cursor = 'default';
		}
	});
	
	game.input.keyboard.onDownCallback = function(b){
		if (states == "menu"){
			menu();
		}
	};
	
	enter.onDown.add(function(){
		lockDown = !lockDown;
		if (document.body.style.cursor != 'none'){
			document.body.style.cursor = 'none';
		}
		else {
			document.body.style.cursor = 'default';
		}
	});
		
	spacebar.onDown.add(inputDown);
	spacebar.onUp.add(inputUp);
	
	if (document.getElementById("loading_gif").style.zIndex == ""){
		document.getElementById("loading_gif").style.zIndex = "1";
	}
}

function createInventory(){
	for (var i = 0; i < inventory.length; i++){
		inventory[i] = game.add.sprite(SCREEN_WIDTH * 0.5 - 125 + 25*i, TEXT_PIXEL_BASE*3, "inventory_box");
		inventory[i].frame = 0;
		inventory[i].visible = false;
	}
}

function createPlayer(){
	player = players.create(SCREEN_WIDTH * 0.5, SCREEN_HEIGHT * 0.5);

	player.color = PLAYER_COLOR;
	player.currentColor = player.color;
	player.colorFrame = DEFAULT_COLOR_FRAME;
	player.currentFrame = player.colorFrame;
	player.radius = PLAYER_RADIUS;
	
	//collision body stuff
	player.body.fixedRotation = true;
	player.body.addCircle(player.radius);
	player.body.setCollisionGroup(playerCG);
	player.body.collides(ballsCG, playerCollideBall);
	
	player.bodyCircle = game.add.graphics();
	player.bodyCircle.beginFill(player.color, player.opacity);
	player.bodyCircle.drawCircle(0, 0, player.radius*2);
	player.addChild(player.bodyCircle);
	
	player.resetPlayer = function(){
		this.alive = true;
		this.body.x = SCREEN_WIDTH * 0.5;
		this.body.y = SCREEN_HEIGHT * 0.5;
		this.radius = PLAYER_RADIUS;
		this.bodyReset(PLAYER_COLOR);
		this.currentColor = this.color;
		this.colorFrame = DEFAULT_COLOR_FRAME;
		this.currentFrame = this.colorFrame;
		
		this.body.setCircle(this.radius);
		this.body.setCollisionGroup(playerCG);
		this.body.collides(ballsCG, playerCollideBall);
	}
	
	player.bodyReset = function(color){
		this.color = color;
		this.bodyCircle.clear();
		this.bodyCircle.beginFill(this.color, this.opacity);
		this.bodyCircle.drawCircle(0, 0, this.radius*2);
	}

	//timestop stuff
	player.timestopGFX = game.add.graphics();
	player.addChild(player.timestopGFX);
	player.timestopRadius = player.radius;
	
	player.timestop = function() {
		this.colorFrame = TIMESTOP_COLOR_FRAME;
		this.bodyReset(PLAYER_TIMESTOP_COLOR);
		
		balls.forEach(function(ball){
			ball.color = PLAYER_TIMESTOP_COLOR;
			ball.bodyReset();
		});
		
		if (game.device.cordova){
			lla.stop("background", function(){}, function(error){alert(error)});
			lla.loop("ticktock", function(){}, function(error){alert(error)});
		}
		else {
			sfx.background.pause();
			sfx.ticktock.play();
		}
		if (!txt.scoreText.changed){
			if (game.device.cordova){
				lla.play("timestop", function(){}, function(error){alert(error)});
			}
			else {
				sfx.timestop.play();
			}
		}
	}	
	
	player.resetTimestop = function(){
		this.colorFrame = this.currentFrame;
		this.bodyReset(this.currentColor);
		
		balls.forEach(function(ball){
			ball.color = ball.originalColor;
			ball.bodyReset();
		});
		
		this.timestopGFX.clear();
		this.timestopRadius = this.radius;
		
		if (cbmode){
			player.removeChild(player.cb);
			player.addChild(player.cb);
		}
		
		if (game.device.cordova){
			lla.loop("background", function(){}, function(error){alert(error)});
			lla.stop("ticktock", function(){}, function(error){alert(error)});
		}
		else {
			sfx.background.resume();
			sfx.ticktock.pause();
		}
	}
	
	player.timestopAnim = function(){
		this.timestopGFX.clear();
		this.timestopGFX.beginFill(PLAYER_COLOR, this.opacity);
		this.timestopGFX.drawCircle(0, 0, this.timestopRadius*2);
		this.addChild(this.timestopGFX);
		this.swapChildren(this.timestopGFX, this.bodyCircle);
		this.timestopRadius += 100;
	}
	
	player.growing = player.shrinking = false;
	
	player.change = function(){
		if (this.growing || this.shrinking){
			if (this.growing){
				this.radius++;
				if (this.radius % PLAYER_GROW_INCREMENT == 0){
					this.growing = false;
				}			
			}
			else if (this.shrinking){
				this.radius--;
				if (this.radius % PLAYER_SHRINK_INCREMENT == 0){
					this.shrinking = false;
				}
			}
			this.bodyReset(this.color);
			this.body.setCircle(this.radius);
			this.body.setCollisionGroup(playerCG);
			this.body.collides(ballsCG, playerCollideBall);
		}
	}
}

function createHole(){	
	for (var i=0; i< HOLE_DATA.length; i++){
		var hole = holes.create(HOLE_DATA[i].x, HOLE_DATA[i].y);
		hole.body.radius = HOLE_RADIUS;
		hole.body.addCircle(hole.body.radius);
		hole.body.static = true;
		hole.color = HOLE_DATA[i].color;
		hole.colorFrame = HOLE_DATA[i].frame;
		hole.opacity = HOLE_OPACITY;
		hole.outside = true;
		
		var circle = game.add.graphics();
		circle.beginFill(hole.color, hole.opacity);
		circle.drawCircle(0, 0, hole.body.radius*2);
		hole.addChild(circle);
	}
}

function createBalls(color, frame, quantity){
	var quant = quantity || Math.min(BALL_QUANTITY + Math.floor(level * 0.2), GAME_MAX_BALL_QUANTITY);
	for (var i = 0; i < quant; i++){
		var angle = Math.random() * Math.PI * 2;
		var spawnx = (Math.cos(angle) * BALL_SPAWN_CIRCLE) + SCREEN_WIDTH* 0.5;
		var spawny = (Math.sin(angle) * BALL_SPAWN_CIRCLE) + SCREEN_HEIGHT* 0.5;
		
		var ball = balls.create(spawnx, spawny);
		
		ball.radius = 0;
		ball.spawning = true;
		
		var rand = Math.floor(Math.random()*HOLE_DATA.length);
		ball.color = color || HOLE_DATA[rand].color;
		ball.colorFrame = frame || HOLE_DATA[rand].frame;
		ball.originalColor = ball.color;
		ball.opacity = BALL_OPACITY;
		ball.speed = Math.min(BALL_MAX_SPEED + (25 * level), GAME_MAX_BALL_SPEED);
		
		ball.body.addCircle(ball.radius);
		ball.body.setCollisionGroup(ballsCG);
		ball.body.fixedRotation = true;
		ball.body.collides([ballsCG, playerCG]);
								
		ball.rotateClockwise = function(angle){
			angle++;
			if (angle == 181){
				angle = -180;
			}
			return angle;
		}
		
		ball.rotateCounter = function(angle){
			angle--;
			if (angle == -181){
				angle = 180;
			}
			return angle;
		}
		
		var dx = player.x - ball.x;
		var dy = player.y - ball.y;
		ball.angle = Math.atan2(dy, dx);
		
		ball.bodyCircle = game.add.graphics();
		ball.bodyCircle.beginFill(ball.color, ball.opacity);
		ball.bodyCircle.drawCircle(0, 0, ball.radius*2);
		ball.addChild(ball.bodyCircle);
	
		ball.bodyReset = function(){
			this.bodyCircle.clear();
			this.bodyCircle.beginFill(this.color, this.opacity);
			this.bodyCircle.drawCircle(0, 0, this.radius*2);
		}
		
		if (cbmode){
			var sprite_string;
			switch (ball.colorFrame){
				case 1:
					sprite_string = "cb_triangle";
					break;
				case 2:
					sprite_string = "cb_hexagon";
					break;
				case 3:
					sprite_string = "cb_square";
					break;
				case 4:
					sprite_string = "cb_star";
					break;
			}
			ball.cb = game.add.sprite(0, 0, sprite_string);
			ball.cb.anchor.setTo(0.5, 0.5);
			ball.addChild(ball.cb);
		}
		
		var arrow = game.add.sprite(0, 0, "white_arrow");
		arrow.anchor.setTo(0.4, 0.5);
		ball.arrow = arrow;
		ball.addChild(arrow);
		
		ball.angleReset = function(){
			this.arrow.x = this.radius * Math.cos(this.angle);
			this.arrow.y = this.radius * Math.sin(this.angle);
			this.arrow.rotation = this.angle;
		}
	}
}

function spawnBalls(ball){
	if (ball && ball.body){
		if (ball.radius >= BALL_RADIUS && ball.spawning){
			ball.spawning = false;
		}
		if (!ball.spawning){
			updateBallVelocity(ball);
		}
		else {
			ball.radius += Math.floor(BALL_RADIUS * 0.1);
			ball.body.setCircle(ball.radius);
			ball.body.setCollisionGroup(ballsCG);
			ball.body.collides([ballsCG, playerCG]);
			ball.bodyReset();
			ball.angleReset();
		}
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////MENU

function createGameMenu(){
	txt.title = game.add.text(SCREEN_WIDTH * 0.5, SCREEN_HEIGHT * 0.2, "4orner", {font:TEXT_PIXEL_BASE*2 + "px aaarghnormal", fill:"#FFFFFF"});
	txt.title.x -= txt.title.width * 0.5;

	txt.hintText = game.add.text(SCREEN_WIDTH * 0.5, SCREEN_HEIGHT * 0.5, helpTexts[0].text, {font:TEXT_PIXEL_BASE + "px aaarghnormal", fill:"#FFFFFF"});
	txt.hintText.anchor.setTo(0.5, 0.5);
	txt.hintText.state = 0;
	txt.hintText.criteria = 0;
	
	txt.aboutText = [];
	
	if (game.device.desktop){
		txt.restartText = game.add.text(SCREEN_WIDTH * 0.5, SCREEN_HEIGHT * 0.5 + TEXT_PIXEL_BASE*2, rtorestart.text, {font:TEXT_PIXEL_BASE + "px aaarghnormal", fill:"#FFFFFF"});
	}
	else {
		txt.restartText = game.add.text(SCREEN_WIDTH * 0.5, SCREEN_HEIGHT * 0.5 + TEXT_PIXEL_BASE*2, rtorestart.text2, {font:TEXT_PIXEL_BASE + "px aaarghnormal", fill:"#FFFFFF"});
	}
	txt.restartText.anchor.setTo(0.5, 0.5);

	txt.about = game.add.text(TEXT_PIXEL_BASE, TEXT_PIXEL_BASE, "about", {font:TEXT_PIXEL_BASE*1.5 + "px aaarghnormal", fill:"#FFFFFF"});
	
	txt.help = game.add.text(SCREEN_WIDTH - TEXT_PIXEL_BASE, TEXT_PIXEL_BASE, "tutorial", {font:TEXT_PIXEL_BASE*1.5 + "px aaarghnormal", fill:"#FFFFFF"});
	txt.help.anchor.setTo(1, 0);
	
	txt.start = game.add.text(SCREEN_WIDTH - TEXT_PIXEL_BASE, SCREEN_HEIGHT - TEXT_PIXEL_BASE, "start", {font:TEXT_PIXEL_BASE*1.5 + "px aaarghnormal", fill:"#FFFFFF"});
	txt.start.anchor.setTo(1, 1);
	
	txt.quit = game.add.text(TEXT_PIXEL_BASE, SCREEN_HEIGHT - TEXT_PIXEL_BASE, "quit", {font:TEXT_PIXEL_BASE*1.5 + "px aaarghnormal", fill:"#FFFFFF"});
	txt.quit.anchor.setTo(0, 1);
		
    txt.scoreText = game.add.text(SCREEN_WIDTH * 0.5, 5, "0", {font:TEXT_PIXEL_BASE*1.5 + "px aaarghnormal", fill:"#FFFFFF"});
	txt.scoreText.x -= txt.scoreText.width * 0.5;
	txt.scoreText.changed = false;

	txt.finalScoreNum = game.add.text(SCREEN_WIDTH * 0.5, txt.title.y + 85, score, {font:TEXT_PIXEL_BASE*2 + "px aaarghnormal", fill:"#FFFFFF"});
	
	for (var x in txt){
		if (x != "title"){
			txt[x].visible = false;
		}
	}

	game.time.events.add(1500, function(){
		txt.hintText.visible = true;
		states = "menu";
	});
}

function toggleText(visible, invisible){
	if (visible){
		for (var i = 0; i < visible.length; i++){
			txt[visible[i]].visible = true;
		}
	}
	if (invisible){
		for (var i = 0; i < invisible.length; i++){
			txt[invisible[i]].visible = false;
		}
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////INPUT FUNCTIONS

function inputDown(){
	if (states == "start" || states == "help"){
		player.body.velocity.x = player.body.velocity.y = 0;
		
		balls.forEach(function(ball){
			ball.body.static = true;
		});
		
		score += scoreMultiplier();
		
		player.timestop();
	}
}

function inputUp(){
	if (states == "start" || states == "help"){
		player.body.velocity.x = player.body.velocity.y = 0;
		balls.forEach(function(ball){
			ball.body.dynamic = true;
			ball.body.mass = 1;
		});
		
		player.resetTimestop();
		if (txt.hintText.state == 5){
			txt.hintText.criteria++;
		}
	}
}

function keyboard_movement(){
	player.body.velocity.x = player.body.velocity.y = 0;
	if (wasd.up.isDown || cursors.up.isDown){
		player.body.y -= PLAYER_KEYBOARD_SPEED;
	}
	if (wasd.left.isDown || cursors.left.isDown){
		player.body.x -= PLAYER_KEYBOARD_SPEED;
	}
	if (wasd.down.isDown || cursors.down.isDown){
		player.body.y += PLAYER_KEYBOARD_SPEED;
	}
	if (wasd.right.isDown || cursors.right.isDown){
		player.body.x += PLAYER_KEYBOARD_SPEED;
	}
	if (numkey.one.isDown && (player.body.x != HOLE_DATA[0].x + PLAYER_RADIUS || player.body.y != HOLE_DATA[0].y + PLAYER_RADIUS)){
		player.body.x = HOLE_DATA[0].x + PLAYER_RADIUS;
		player.body.y = HOLE_DATA[0].y + PLAYER_RADIUS;
	}
	if (numkey.two.isDown && (player.body.x != HOLE_DATA[1].x - PLAYER_RADIUS || player.body.y != HOLE_DATA[1].y + PLAYER_RADIUS)){
		player.body.x = HOLE_DATA[1].x - PLAYER_RADIUS;
		player.body.y = HOLE_DATA[1].y + PLAYER_RADIUS;	
	}
	if (numkey.three.isDown && (player.body.x != HOLE_DATA[2].x - PLAYER_RADIUS || player.body.y != HOLE_DATA[2].y - PLAYER_RADIUS)){
		player.body.x = HOLE_DATA[2].x - PLAYER_RADIUS;
		player.body.y = HOLE_DATA[2].y - PLAYER_RADIUS;
	}
	if (numkey.four.isDown && (player.body.x != HOLE_DATA[3].x + PLAYER_RADIUS || player.body.y != HOLE_DATA[3].y - PLAYER_RADIUS)){
		player.body.x = HOLE_DATA[3].x + PLAYER_RADIUS;
		player.body.y = HOLE_DATA[3].y - PLAYER_RADIUS;	
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////SCORE

function scoreMultiplier(){
	var textArray = [];
	var finalMultipler = 1;
	
	var full = half = three = two = same = false,
		alternating = true,
		reds = yellows = blues = greens = false,
		numBalls = numRed = numYellow = numBlue = numGreen = 0,
		twos = threes = fours = rainbow = true;
	
	var prevFrame = prev2Frame = prev3Frame = 0;
	
	for (var i=0; i<inventory.length; i++){
		switch (inventory[i].frame){
			case 1:
				reds = true;
				numRed++;
				break;
			case 2:
				yellows = true;
				numYellow++;
				break;
			case 3:
				blues = true;
				numBlue++;
				break;
			case 4:
				greens = true;
				numGreen++;
				break;
		}
		if (inventory[i].frame != 0){
			numBalls++;
			if (inventory[i].frame == prevFrame){
				alternating = false;
			}
		}
		if (i % 2 == 1){
			if (inventory[i].frame != prevFrame){
				twos = false;
			}
		}
		if (i % 3 == 2){
			if (inventory[i].frame != prevFrame || inventory[i].frame != prev2Frame){
				threes = false;
			}
		}
		if (i % 4 == 3){
			if (inventory[i].frame != prevFrame || inventory[i].frame != prev2Frame || inventory[i].frame != prev3Frame){
				fours = false;
			}
		}
		if (i - 1 >= 0){
			prev2Frame = inventory[i-1].frame;
		}
		if (i - 2 >= 0){
			prev3Frame = inventory[i-2].frame;
		}
		prevFrame = inventory[i].frame;
	}
	
	if (numBalls == 10){
		if (game.device.cordova){
			lla.play("successHigh", function(){}, function(error){alert(error)});
		}
		else {
			sfx.successHigh.play();
		}
		full = true;
		finalMultipler *= FULL_INVENTORY_MULTIPLIER;
		
		addMultiplierText(textArray, FULL_INVENTORY_MULTIPLIER, "full inventory");
	}
	else if (numBalls >= 5){
		if (game.device.cordova){
			lla.play("successMed", function(){}, function(error){alert(error)});
		}
		else {
			sfx.successMed.play();
		}
		half = true;
		finalMultipler *= HALF_INVENTORY_MULTIPLIER;
		
		addMultiplierText(textArray, HALF_INVENTORY_MULTIPLIER, "half inventory");
	}
	else if (numBalls >= 1){
		if (game.device.cordova){
			lla.play("successLow", function(){}, function(error){alert(error)});
		}
		else {
			sfx.successLow.play();
		}
		twos = threes = fours = false;
	}
	
	if (full || half){
		switch (reds + yellows + blues + greens){
			case 1:
				same = true;
				finalMultipler *= SAME_COLOR_MULTIPLIER;
				
				addMultiplierText(textArray, SAME_COLOR_MULTIPLIER, "same color");
				break;
			case 2:
				two = true;
				finalMultipler *= TWO_COLOR_MULTIPLIER;
				
				addMultiplierText(textArray, TWO_COLOR_MULTIPLIER, "two colors");
				break;
			case 3:
				three = true;
				finalMultipler *= THREE_COLOR_MULTIPLIER;
				
				addMultiplierText(textArray, THREE_COLOR_MULTIPLIER, "three colors");
				break;
		}
		
		if (alternating){
			if (txt.hintText.state == 7){
				txt.hintText.criteria = 15;
			}
			addMultiplierText(textArray, ALTERNATING_MULTIPLIER, "alternating colors");
			finalMultipler *= ALTERNATING_MULTIPLIER;
		}
		else if (helped == false){
			helped = true;
			var hinthint = game.add.text(SCREEN_WIDTH * 0.5, SCREEN_HEIGHT * 0.5 - TEXT_PIXEL_BASE*2, "alternate for bonus points!", {font:TEXT_PIXEL_BASE + "px aaarghnormal", fill:"#FFFFFF"});
			hinthint.x -= hinthint.width * 0.5;
			game.time.events.add(2500, function(){
				hinthint.destroy();
			});
		}
	
		if (twos && !fours){
			addMultiplierText(textArray, TWO_BY_TWO_MULTIPLIER, "two by two");
			finalMultipler *= TWO_BY_TWO_MULTIPLIER;
		}
		if (threes && !fours){
			addMultiplierText(textArray, THREE_BY_THREE_MULTIPLIER, "three by three");
			finalMultipler *= THREE_BY_THREE_MULTIPLIER;
		}
		if (fours){
			addMultiplierText(textArray, FOUR_BY_FOUR_MULTIPLIER, "four by four");
			finalMultipler *= FOUR_BY_FOUR_MULTIPLIER;
		}
		if (!same){
			if (
				inventory[0].frame == inventory[1].frame &&
				inventory[0].frame == inventory[2].frame &&
				inventory[0].frame == inventory[3].frame &&
				inventory[0].frame == inventory[4].frame
				&&
				inventory[5].frame == inventory[6].frame && 
				inventory[5].frame == inventory[7].frame && 
				inventory[5].frame == inventory[8].frame && 
				inventory[5].frame == inventory[9].frame
			){
				addMultiplierText(textArray, HALF_BY_HALF_MULTIPLIER, "half by half");
				finalMultipler *= HALF_BY_HALF_MULTIPLIER;
			}
		}
	}
	
	if (numBalls > 0){
		txt.scoreText.changed = true;
	}
	
	inventory.forEach(function(elem){
		if (elem.cb){
			elem.cb.destroy();
		}
		elem.frame = 0;
	});
		
	return Math.round(numBalls * finalMultipler);
}

function addMultiplierText(array, multiplier, string){
	var texty = (array.length > 0) ? array[array.length-1].y + TEXT_PIXEL_BASE : SCREEN_HEIGHT * .65;
		
	var text = game.add.text(SCREEN_WIDTH * 0.5, texty, "x" + multiplier + " - " + string, {font:TEXT_PIXEL_BASE + "px aaarghnormal", fill:"#FFFFFF"})
	text.x -= text.width * 0.5;
	array.push(text);
	game.time.events.add(2500, function(){
		text.destroy();
	});
}

function addLevelText(){
	txt.title.text = "level " + level;
	txt.title.x = SCREEN_WIDTH * 0.5 - txt.title.width * 0.5
	toggleText(["title"]);
	game.time.events.add(1500, function(){
		if (states != "pause" && states != "over"){
			toggleText(null, ["title"]);
		}
	});
}

function addSpaceText(){
	if (game.device.desktop){
		txt.hintText.text = "press space!";
	}
	else {
		txt.hintText.text = "two finger tap!";
	}
	toggleText(["hintText"]);
	game.time.events.add(1500, function(){
		toggleText(null, ["hintText"]);
	});
}

function addAboutText(arrayText){
	var needley = txt.title.y + TEXT_PIXEL_BASE*4;
	for (var i = 0; i < arrayText.length; i++){
		var text = game.add.text(SCREEN_WIDTH * 0.5, needley, arrayText[i], {font:TEXT_PIXEL_BASE + "px aaarghnormal", fill:"#FFFFFF"});
		text.x -= text.width * 0.5;
		txt.aboutText.push(text);
		needley = text.y + 40;
	}
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////UPDATE FUNCTIONS

function update() {
	if (game.device.cordova || !sfx.background.isDecoding){
		//music done decoding, show the canvas!
		if (document.querySelector("canvas").style.display != "block"){
			document.querySelector("canvas").style.display = "block"
		}
		//only runs if game is loaded and state is defined
		if (states != "over" && states != undefined){
			if (states != "pause"){
				if (lockDown || firstTouch.isDown && (player.body.x != firstTouch.x || player.body.y != firstTouch.y)){
					player.body.x = firstTouch.x;
					player.body.y = firstTouch.y;
									
					if (states == "menu"){
						menu();
					}
				}
				
				keyboard_movement();
				checkOverlap(); //checks player overlap with holes
				
				//only runs if game is started
				if (states == "help" || states == "start"){
					//change the score and center it to the screen
					if (txt.scoreText.changed){
						txt.scoreText.text = score;
						txt.scoreText.x = (SCREEN_WIDTH * 0.5) - (txt.scoreText.width * 0.5);
						txt.scoreText.changed = false;
					}
					if (spacebar.isDown || secondTouch.isDown){
						if (player.timestopRadius <= Math.max(SCREEN_WIDTH, SCREEN_HEIGHT) * 2){
							player.timestopAnim();
						}
					}
					//only runs when time is not stopped
					else {			
						player.change(); //growing / shrinking

						balls.forEach(function(ball){
							spawnBalls(ball);
						});
						
						if (states != "help"){
							if (timer <= 0){
								createBalls();
								timer = Math.max(BALL_SPAWN_TIME - Math.floor(level * 0.5), GAME_MIN_SPAWN_TIME);
							}
							else {
								timer--;
								timeonlevel++;
							}
							if (timeonlevel > 2000){
								level++;
								helped = false;
								timeonlevel = 0;
								addLevelText();
							}
							if (score >= level * 100){
								level++;
								helped = false;
								timeonlevel = 0;
								addLevelText();
							}
						}
						
						//game over when player is reduced to nothing
						if (player.radius == 0){
							gameisover();
						}
					}
				}
				if (states == "help"){
				if (txt.hintText.criteria >= helpTexts[txt.hintText.state].criteria && spacebar.isUp){
					switch (txt.hintText.state){
						//corners change color
						case 1:
							createBalls(player.currentColor, player.currentFrame);
							break;
						//collect balls
						case 2:
							var rand = Math.floor(Math.random()*HOLE_DATA.length);
							while (rand + 1 == player.currentFrame){
								rand = Math.floor(Math.random()*HOLE_DATA.length);
							}
							createBalls(HOLE_DATA[rand].color, HOLE_DATA[rand].colorFrame, 1);
							break;
						//wrong balls hurt
						case 3:
							createBalls(player.currentColor, player.currentFrame, 10);
							break;
						//collect more balls
						case 4:
							break;
						//press space to stop time
						case 5:
							createBalls(null, null, 9);					
							break;
						//enemies can't hurt you when time is frozen
						case 6:
							createBalls(player.currentColor, player.currentFrame, 5);			
							var rand = Math.floor(Math.random()*HOLE_DATA.length);
							while (rand + 1 == player.colorFrame){
								rand = Math.floor(Math.random()*HOLE_DATA.length);
							}
							createBalls(HOLE_DATA[rand].color, HOLE_DATA[rand].colorFrame, 5);
							break;
						//alternate balls
						case 7:
							break;
					}
					helpme();
				}
			}
			}
		}
		//game over, but have left over balls still move around, stop spawning new balls
		else {
			balls.forEach(function(ball){
				spawnBalls(ball);
			});
		}
	}
	else {
		//music still decoding, hide the canvas!
		if (document.querySelector("canvas").style.display != "none"){
			document.querySelector("canvas").style.display = "none"
		}
	}
}

function checkOverlap(){
	holes.forEach(function(hole){
		if (player && player.body){
			var dx = hole.body.x - player.body.x;
			var dy = hole.body.y - player.body.y;
			var dist = Math.sqrt(dx*dx + dy*dy);
			
			//overlapped!
			if (dist < hole.body.radius + player.radius){
				if (hole.outside){
					hole.outside = false;
				}
				if (hole.color != player.color){
					if ((spacebar.isDown || secondTouch.isDown) && (states == "start" || states == "help")){
						//dont change shit when time stop and game start or tutorial
					}
					else {
						player.bodyReset(hole.color);
						player.currentFrame = hole.colorFrame; //to keep track of color even after timestop
						player.currentColor = hole.color;
						player.colorFrame = hole.colorFrame;
						if (cbmode){
							var sprite_string;
							switch (hole.colorFrame){
								case 1:
									sprite_string = "cb_triangle";
									break;
								case 2:
									sprite_string = "cb_hexagon";
									break;
								case 3:
									sprite_string = "cb_square";
									break;
								case 4:
									sprite_string = "cb_star";
									break;
							}
							if (player.cb){
								player.cb.destroy();
							}
							player.cb = game.add.sprite(0, 0, sprite_string);
							player.cb.anchor.setTo(0.5, 0.5);
							player.addChild(player.cb);
						}
						if (game.device.cordova){
							lla.play("colorchange"+hole.colorFrame, function(){}, function(error){alert(error)});
						}
						else {
							sfx["colorchange"+hole.colorFrame].play();
						}
					}
					if (states == "menustart"){
						spacebar.isDown = false;
						switch (hole.colorFrame){
							//red / about
							case 1:
								setmeup();
								break;
							//yellow / help
							case 2:
								helpme();
								break;
							//blue / start
							case 3:
								startthegame();
								break;
							//green / quit
							case 4:
								goodbye();
								break;
						}
					}
					else if (states == "help" && txt.hintText.state == 1 && spacebar.isUp){
						txt.hintText.criteria++;
					}
					else if (states == "about"){
						if (hole.colorFrame == 1){
							txt.about.text = "about";
							menu();
							for (var i = 0; i < txt.aboutText.length; i++){
								txt.aboutText[i].destroy();
							}
							txt.aboutText = [];
						}
						if (hole.colorFrame == 2){
							if (!cbmode){
								cbmode = true;
						
								holes.forEach(function(eachHole){
									var sprite_string;
									switch (eachHole.colorFrame){
										case 1:
											eachHole.cb = game.add.sprite(0, 0, "cb_triangle");
											eachHole.cb.anchor.setTo(-1,-1);
											break;
										case 2:
											eachHole.cb = game.add.sprite(0, 0, "cb_hexagon");
											eachHole.cb.anchor.setTo(2,-1);
											break;
										case 3:
											eachHole.cb = game.add.sprite(0, 0, "cb_square");
											eachHole.cb.anchor.setTo(2,2);
											break;
										case 4:
											eachHole.cb = game.add.sprite(0, 0, "cb_star");
											eachHole.cb.anchor.setTo(-1,2);
											break;
									}
									eachHole.addChild(eachHole.cb);
								});
							}
							else {
								cbmode = false;
								holes.forEach(function(eachHole){
									eachHole.cb.destroy();
								});
								player.cb.destroy();
							}
						}
					}
				}
			}
			else {
				if (!hole.outside){
					hole.outside = true;
				}
			}
		}
	});
	var outside = 0;
	holes.forEach(function(hole){
		if (hole.outside){
			outside++;
		}
		else {
			outside--;
		}
	});
	
	if (outside >= 4 && (states == "about" || states == "menustart") && player.color != PLAYER_COLOR){
		player.bodyReset(PLAYER_COLOR);
	}
}

function updateBallVelocity(ball){
	if (ball && ball.body){
		if (states == "over"){
			var dx = Math.random()*SCREEN_WIDTH - ball.x;
			var dy = Math.random()*SCREEN_HEIGHT - ball.y;
		}
		else {
			var dx = player.x - ball.x;
			var dy = player.y - ball.y;
		}
		
		targetAngle = Math.round((Math.atan2(dy, dx)) * 180/Math.PI);
		ballAngle = Math.round(ball.angle * 180/Math.PI);

		if (ballAngle < 0 && targetAngle >= 0){
			if ((Math.abs(ballAngle) + Math.abs(targetAngle)) < (360 - Math.abs(ballAngle) - Math.abs(targetAngle))){
				ballAngle = ball.rotateClockwise(ballAngle);
			}
			else {
				ballAngle = ball.rotateCounter(ballAngle);
			}
		}
		else if (ballAngle >= 0 && targetAngle < 0){
			if ((Math.abs(ballAngle) + Math.abs(targetAngle)) < (360 - Math.abs(ballAngle) - Math.abs(targetAngle))){
				ballAngle = ball.rotateCounter(ballAngle);
			}
			else {
				ballAngle = ball.rotateClockwise(ballAngle);
			}
		}
		else {
			if (ballAngle > targetAngle){
				ballAngle = ball.rotateCounter(ballAngle);
			}
			else {
				ballAngle = ball.rotateClockwise(ballAngle);
			}
		}
		
		if (ballAngle == targetAngle){
			//set velocity depending on angle to max speed
			ball.body.velocity.x = ball.speed * Math.cos(ball.angle);
			ball.body.velocity.y = ball.speed * Math.sin(ball.angle);
		}
		else {
			ball.body.velocity.x *= .95;
			ball.body.velocity.y *= .95;
		}
				
		ball.angle = ballAngle * Math.PI/180;
		ball.angleReset();
	}
}

//uses the ball's and player's body as parameter because it's technically the body that collides
function playerCollideBall(p, b){
	if (b && b.sprite && !b.sprite.spawning && p.sprite.alive){			
		//if tutorial
		if (states == "help"){
			txt.hintText.criteria++;
		}		
		//if colors match
		if (p.sprite.color == b.sprite.color){

			//time is stopped
			if (p.sprite.color == PLAYER_TIMESTOP_COLOR){
			
				//if not full, set the left most empty inventory to the collided color
				if (inventory[inventory.length-1].frame == 0){
					for (var i = 0; i < inventory.length; i++){
						if (inventory[i].frame == 0){
							inventory[i].frame = p.sprite.colorFrame;
							break;
						}
					}
					if (game.device.cordova){
						lla.play("neutral"+Math.floor(Math.random()*2), function(){}, function(error){alert(error)});
					}
					else {
						sfx["neutral"+Math.floor(Math.random()*2)].play
					}
					emitParticles(p.sprite.colorFrame, b.x, b.y);
					b.sprite.destroy(true);
				}
				
				//inventory is full, can't collect any more
				else {
					if (game.device.cordova){
						lla.play("error", function(){}, function(error){alert(error)});
					}
					else {
						sfx.error.play();
					}
				}
			}
			
			//time not stopped
			else {			
				//if not full, set the left most empty inventory to the collided color
				if (inventory[inventory.length-1].frame == 0){
					for (var i = 0; i < inventory.length; i++){
						if (i == inventory.length - 1){
							if (states != "help"){
								addSpaceText();
							}
						}
						if (inventory[i].frame == 0){
							inventory[i].frame = p.sprite.colorFrame;
							if (cbmode){
								var sprite_string;
								switch (inventory[i].frame){
									case 1:
										inventory[i].cb = game.add.sprite(0, 0, "cb_triangle");
										break;
									case 2:
										inventory[i].cb = game.add.sprite(0, 0, "cb_hexagon");
										break;
									case 3:
										inventory[i].cb = game.add.sprite(0, 0, "cb_square");
										break;
									case 4:
										inventory[i].cb = game.add.sprite(0, 0, "cb_star");
										break;
								}
								inventory[i].cb.anchor.setTo(-0.25, -0.25);
								inventory[i].addChild(inventory[i].cb);
							}
							break;
						}
					}
				}
				
				//if full, shift everything left one
				else {
					var prevFrame = p.sprite.colorFrame;
					var currFrame;
					for (var i = inventory.length-1; i >=0; i--){
						currFrame = inventory[i].frame;
						inventory[i].frame = prevFrame;
						prevFrame = currFrame;
						var sprite_string;
						if (inventory[i].cb){
							inventory[i].cb.destroy();
						}
						switch (inventory[i].frame){
							case 1:
								inventory[i].cb = game.add.sprite(0, 0, "cb_triangle");
								break;
							case 2:
								inventory[i].cb = game.add.sprite(0, 0, "cb_hexagon");
								break;
							case 3:
								inventory[i].cb = game.add.sprite(0, 0, "cb_square");
								break;
							case 4:
								inventory[i].cb = game.add.sprite(0, 0, "cb_star");
								break;
						}
						inventory[i].cb.anchor.setTo(-0.25, -0.25);
						inventory[i].addChild(inventory[i].cb);
					}
				}
				
				if (player.radius < PLAYER_RADIUS){
					player.growing = true;
				}
				score++;
				txt.scoreText.changed = true;
				if (game.device.cordova){
					lla.play("collect"+Math.floor(Math.random()*7), function(){}, function(error){alert(error)});
				}
				else {
					sfx["collect"+Math.floor(Math.random()*7)].play();
				}
				emitParticles(p.sprite.colorFrame, b.x, b.y);
				b.sprite.destroy(true);
			}
		}
		
		//lose score
		else {
			for (var i = inventory.length-1; i >= 0; i--){
				//remove the most recent collected ball
				if (inventory[i].frame != 0){
					if (inventory[i].cb){
						inventory[i].cb.destroy();
					}
					inventory[i].frame = 0;
					break;
				}
				else {
					player.shrinking = true;
				}
			}
			
			if (game.device.cordova){
				lla.play("hurt", function(){}, function(error){alert(error)});
			}
			else {
				sfx.hurt.play();
			}
			emitParticles(0, b.sprite.x, b.sprite.y);
			
			if (score != 0){
				score--;
				txt.scoreText.changed = true;
			}
			
			b.sprite.destroy(true);
		}
		
		if (txt.hintText.state == 7 && txt.hintText.criteria == 10){
			var prevFrame = 0,
				alternating = true,
				numBalls = 0;
			for (var i=0; i<inventory.length; i++){
				if (inventory[i].frame != 0){
					if (inventory[i].frame == prevFrame){
						alternating = false;
					}
					numBalls++;
					prevFrame = inventory[i].frame;
				}
			}
			if (numBalls < inventory.length){
				alternating = false;
			}
			if (alternating){
				if (game.device.desktop){
					txt.hintText.text = "press space";
				}
				else {
					txt.hintText.text = "two finger tap!";
				}
			}
			else {
				inventory.forEach(function(elem){
					elem.frame = 0;
				});
				txt.hintText.text = "try alternating again";
				player.radius = PLAYER_RADIUS;
				player.bodyReset(player.currentColor);
				txt.hintText.criteria = 0;
				createBalls(player.currentColor, player.currentFrame, 5);			
				var rand = Math.floor(Math.random()*HOLE_DATA.length);
				while (rand + 1 == player.colorFrame){
					rand = Math.floor(Math.random()*HOLE_DATA.length);
				}
				createBalls(HOLE_DATA[rand].color, HOLE_DATA[rand].colorFrame, 5);
			}
		}
	}
}

function emitParticles(frame, x, y){
    emitter.x = x;
    emitter.y = y;
	
	emitter.removeChildren();
	emitter.makeParticles('particles', frame, 20);
    emitter.start(true, 700, null, 20);
}
