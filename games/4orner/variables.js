//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VARIABLES
var SCREEN_WIDTH = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var SCREEN_HEIGHT = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
var TEXT_PIXEL_BASE = Math.floor(Math.min(SCREEN_WIDTH, SCREEN_HEIGHT) * 0.05);

var	FOUR_COLORS = [0xe86666, 0xe8a166, 0x3d8b8b, 0x329e32], //four possible colors of the holes / balls
	BACKGROUND_COLOR = 0x222222, //background color of the stage
	DEFAULT_COLOR_FRAME = 0,
	TIMESTOP_COLOR_FRAME = 5;

var	INVENTORY_LENGTH = 10,	//how many balls you can hold at a time
	INVENTORY_DEFAULT_COLOR = 0x010101,
	INVENTORY_OPACITY = 0.5;
	
var FULL_INVENTORY_MULTIPLIER = 2,
	HALF_INVENTORY_MULTIPLIER = 0.5,
	THREE_COLOR_MULTIPLIER = 3,
	TWO_COLOR_MULTIPLIER = 4,
	SAME_COLOR_MULTIPLIER = 5,
	ALTERNATING_MULTIPLIER = 6,
	TWO_BY_TWO_MULTIPLIER = 2,
	THREE_BY_THREE_MULTIPLIER = 3,
	FOUR_BY_FOUR_MULTIPLIER = 4,
	HALF_BY_HALF_MULTIPLIER = 5;
	
var HOLE_RADIUS = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT) * .35,
	HOLE_DATA = [
		{
			color:FOUR_COLORS[0],
			frame:1,
			x:0,
			y:0
		},
		{
			color:FOUR_COLORS[1],
			frame:2,
			x:SCREEN_WIDTH,
			y:0
		},
		{
			color:FOUR_COLORS[2],
			frame:3,
			x:SCREEN_WIDTH,
			y:SCREEN_HEIGHT
		},
		{
			color:FOUR_COLORS[3],
			frame:4,
			x:0,
			y:SCREEN_HEIGHT
		}
	],
	HOLE_OPACITY = 0.5;

var GAME_MAX_BALL_SPEED = 2500,
	GAME_MAX_BALL_QUANTITY = 5,
	GAME_MIN_SPAWN_TIME = 10;
	
var BALL_QUANTITY = 1, //number of enemies to spawn at a time
	BALL_RADIUS = Math.floor(Math.min(SCREEN_WIDTH, SCREEN_HEIGHT) * 0.05),
	BALL_OPACITY = 0.8,
	BALL_MAX_SPEED = 500,
	BALL_SPAWN_TIME = 100, //time it takes to create an enemy (nothing to do with spawn animation)
	BALL_SPAWN_CIRCLE = (Math.min(SCREEN_WIDTH, SCREEN_HEIGHT) * 0.5) - BALL_RADIUS * 4; //radius of the circle whose diameter enemies spawn on randomly
	
var PLAYER_COLOR = 0x010101,
	PLAYER_TIMESTOP_COLOR = 0xFAFAFA,
	PLAYER_RADIUS = Math.floor(Math.min(SCREEN_WIDTH, SCREEN_HEIGHT) * 0.1),
	PLAYER_SHRINK_INCREMENT = Math.floor(PLAYER_RADIUS * 0.1),
	PLAYER_GROW_INCREMENT = 1,
	PLAYER_KEYBOARD_SPEED = 10;

var rtorestart = {
		text : "press r to exit to menu",
		text2 : "press the restart button"
	}
	helpTexts = [
	{
		text : "click or press enter",
		criteria : 0
	},
	{
		text : "corners change color",
		criteria : 4
	},
	{
		text : "collect balls",
		criteria : 1
	},
	{
		text : "wrong balls hurt",
		criteria : 1
	},
	{
		text : "collect more balls",
		criteria : 10
	},
	{
		text : "hold space to submit",
		text2 : "hold two fingers to submit",
		criteria : 1
	},
	{
		text : "enemies don't hurt when time is frozen",
		criteria : 9
	},
	{
		text : "alternate the balls for bonus points",
		criteria : 15
	}	
];
	
var game,
	states,
	lockDown = false, //bool to keep track of toggle down
	sfx = {},
	txt = {},
	cbmode = false; //bool to keep track of color blind mode
	
//cordova and phonegap stuff, lowlatencyaudio
var media, lla;
	
var timer = 0,
	timeonlevel = 0,
	helped = false,
	score = 0,
	level = 0;
	
var inventory = new Array(INVENTORY_LENGTH);

function resetVariables(){
	score = 0;
	level = 0;
}