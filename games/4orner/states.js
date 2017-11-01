//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////GAME STATES

function gameisover(){
	states = "over";

	for (var x in inventory){
		inventory[x].visible = false;
	}
	
	player.radius = 0;
	player.bodyReset();
	player.alive = false;
	
	txt.title.text = "final score";
	txt.title.x = SCREEN_WIDTH * 0.5 - txt.title.width * 0.5;
	
	toggleText(["restartText", "title", "finalScoreNum"],
			   ["scoreText", "hintText"]);
	txt.finalScoreNum.text = score || "0";
	txt.finalScoreNum.x = SCREEN_WIDTH * 0.5 - txt.finalScoreNum.width * 0.5;
}

function restartthegame(){
	states = "menustart";
	balls.removeAll(true);
	txt.hintText.state = txt.hintText.criteria = 0;
	txt.title.text = "4orner";
	txt.title.x = SCREEN_WIDTH * 0.5 - txt.title.width * 0.5;
	toggleText(["title", "start", "about", "help", "quit"],
			   ["restartText", "hintText", "scoreText", "finalScoreNum"]);
	resetVariables();
	txt.scoreText.changed = true;
	timer = BALL_SPAWN_TIME;
	player.resetPlayer();
	
	inventory.forEach(function(elem){
		elem.frame = 0;
		elem.visible = false;
	});
}

function startthegame(){
	states = "start";
	resetVariables();
	toggleText(["scoreText"], ["title", "start", "about", "help", "quit"]);

	inventory.forEach(function(elem){
		elem.visible = true;
	});
}

function pausethegame(){
	if (states == "start"){
		states = "pause";
		balls.forEach(function(ball){
			ball.body.velocity.x = ball.body.velocity.y = 0;
		});
		if (game.device.cordova){
			lla.stop("background");
		}
		else {
			sfx.background.pause();
		}
		txt.title.text = "paused";
		txt.title.x = SCREEN_WIDTH * 0.5 - txt.title.width * 0.5;
		toggleText(["title", "restartText"]);
	}
	else if (states == "pause")	{
		states = "start";
		if (game.device.cordova){
			lla.loop("background");
		}
		else {
			sfx.background.resume();
		}
		toggleText(null, ["title", "restartText"]);
	}
}

function helpme(){
	states = "help";
	if (txt.hintText.state >= helpTexts.length -1){
		txt.hintText.state = 1;
		toggleText(["restartText"]);
	}
	else {
		txt.hintText.state++;
	}
	if (txt.hintText.state == 5){
		if (game.device.desktop){
			txt.hintText.text = helpTexts[txt.hintText.state].text;
		}
		else {
			txt.hintText.text = helpTexts[txt.hintText.state].text2;		
		}
	}
	else {
		txt.hintText.text = helpTexts[txt.hintText.state].text;
	}
	txt.hintText.criteria = 0;
	toggleText(["hintText", "scoreText"], ["title", "start", "about", "help", "quit"]);
	
	inventory.forEach(function(elem){
		elem.visible = true;
	});
}

function setmeup(){
	if (states != "about"){
		states = "about";
		txt.title.text = "4orner",
		txt.title.x = SCREEN_WIDTH * 0.5 - txt.title.width * 0.5;
		txt.about.text = "back";
		txt.help.text = "colorblind?";
		toggleText(null,["quit", "start"]);

		if (game.device.desktop){
			addAboutText([
				"mouse, arrow keys, or WASD to move",
				"enter to lock mouse position",
				"p to pause",
				"r to restart",
				"space to stop time",
				"",
				"please visit my personal website",
				"at www.1minlee.com"
			]);
		}
		else {
			addAboutText([
				"touch to move",
				"two finger touch to stop time",
				"",
				"please visit my personal website",
				"at www.1minlee.com"
			]);
		}
	}
}

function menu(){
	txt.help.text = "tutorial";
	if (states != "menustart"){
		states = "menustart";
		toggleText(["start", "about", "help", "quit"],["hintText"]);
	}
}

function goodbye(){
	var message = "do you really want to leave?";
	txt.title.text = "i love you, goodbye"
	txt.title.x = SCREEN_WIDTH * 0.5 - txt.title.width * 0.5
	states = "quit";
	game.time.events.add(1000, function(){
		if (confirm(message)){
			if (game.device.desktop){
				window.location = "http://www.1minlee.com";
			}
			else {
				navigator.app.exitApp();
			}
		}
		else {
			states = "menustart";
			game.input.activePointer.isDown = false;
			player.resetPlayer();
			txt.title.text = "welcome back"
			txt.title.x = SCREEN_WIDTH * 0.5 - txt.title.width * 0.5
		};
	});
}