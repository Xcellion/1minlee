var MAPHEIGHT = 2000,
	MAPWIDTH = 2000,
	AMOUNTSTARS = 100;
	
var PARTICLECOUNT = 20;

var CAMERAXDEAD = window.innerWidth/2,
	CAMERAYDEAD =  window.innerHeight/2;

var PLAYERSTARTX = MAPWIDTH - CAMERAXDEAD,
	PLAYERSTARTY = MAPHEIGHT - CAMERAYDEAD,
	PLAYERCOLOR = "red",
	PLAYERSHAPE = "Circle",
	PLAYERMAXV = 10,
	PLAYERACC = 2,
	PLAYERRADIUS = 25;
	
var AIAMOUNT = 20;
	
var FRICTIONVAR = .5;
	
//initialize keys variable to store keystrokes
var Keys = {
  _pressed: {},

  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  ENTER: 13,
  A: 65,
  W: 87,
  D: 68,
  S: 83,
  R: 82,
  P: 80,
  SPACE: 32,
  
  onKeyDown: function(event){
	this._pressed[event.keyCode] = true;
  },
  
  onKeyUp: function(event){
	delete this._pressed[event.keyCode];
  },
  
  isDown: function(keyCode) {
    return this._pressed[keyCode];
  }
};
