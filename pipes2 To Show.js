var game = function () {
	/*
	*   These are needed to initiate the game and the framework properly.
	*/
	var flarie; // The Flarie framework instance.
	var instance; // The Phaser.Game instance.
	var game; // The game scope.
	var gameConfig = {
		scene: {
			preload: preload,
			create: create,
			update: update
		}
	};

	// Pipes
	var pipeGroup0;
	var pipeGroup1;
	var pipeGroup2;
	var pipeGroup3;
	var pipeGroup10;
	var pipeGroup20;
	var pipeGroup111;
	var pipeGroup51;
	var pipeGroup52;
	var pipeGroup53;
	var pipeGroup222;
	var pipeGroup61;
	var pipeGroup62;
	var pipeGroup63;
	var pipeGroup11;
	var pipeGroup21;
	var shadeGroup;

	var container;
	var secondList = [];

	// Pipe Rotation
	var isRotating = false;
	var isScaling = false;

	var Direction = {
		Up: 270,
		Right: 0,
		Down: 90,
		Left: 180
	  };

	var twinPos1;
	var twinPos2;
	var twinPos3;
	var twinPos4;
	var twinPos5;
	var twinPos6;
	var twinPos7;
	var twinPos8;
	var twinPos9;
	var twinPos10;
	var twinPos11;
	var twinPos12;

	// Timerbar
	var starTimer;
	var easyTimer = 30000;
	var mediumTimer = 90000;
	var hardtimer = 180000;
	var longTimer = 300000;

	// Levels
	var gameGrid = [];
	var exitAngle;
	var entranceAngle;
	var curvedPipeEntrance;
	var curvedPipeExit;
	var tileDistanceX;
	var tileDistanceY;
	var startXPos;
	var startYPos;
	var levelFinished;

	// audio
	var wrongSound;
	var successSound;
	var pipeTurning;
	var waterInPipe;

	// Debug

	var cursors;
	var chosenLevel;

	// Graphics
	var squareShadeColor;
	var squareShadeAlpha;
	var squareShadeSpecialAlpha;
	var squareShadeSpecialOne;
	var squareShadeSpecialTwo;
	var squareShadeSpecialThree;

	// How to create levels 
	// 0 = Empty space
	// 1 = Pipe 1
	// 2 = Pipe 2
	// 3 = Pipe 3
	// 10 = Entrance Pipe
	// 11 = filled pipe 1, used to extend entrance to border.
	// 12 = Curved Entrance Pipe
	// 20 = Exit Pipe
	// 21 = empty pipe 1, used to extand exit to border.
	// 22 = curved exit pipe
	// 111 = green rotatable exit pipe 1 in game grid that has to be filled to clear the game.
	// 222 = green rotatable exit pipe 2 in game grid that has to be filled to clear the game.
	// 51 = twin color 1 connected pipe 1's
	// 52 = twin color 2 connected pipe 1's
	// 53 = twin color 3 connected pipe 1's
	// 61 = twin color 1 connected pipe 2's
	// 62 = twin color 2 connected pipe 2's
	// 63 = twin color 3 connected pipe 2's

	gameGrid = [
		// Level 1
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 22, 21, 21, 21],
				[0, 0, 0, 1, 1, 1, 0, 0, 0],
				[0, 0, 0, 2, 2, 1, 0, 0, 0],
				[0, 0, 0, 1, 2, 3, 0, 0, 0],
				[11, 11, 11, 12, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 2
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 3, 1, 2, 0, 0, 0],
				[0, 0, 0, 2, 2, 2, 20, 21, 21],
				[0, 0, 0, 2, 2, 3, 0, 0, 0],
				[11, 11, 11, 12, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 3
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[21, 21, 21, 22, 0, 0, 0, 0, 0],
				[0, 0, 0, 2, 1, 2, 0, 0, 0],
				[0, 0, 0, 2, 1, 2, 0, 0, 0],
				[0, 0, 0, 2, 2, 0, 0, 0, 0],
				[0, 0, 0, 0, 12, 11, 11, 11, 11],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 4
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[21, 21, 22, 0, 0, 12, 11, 11, 11],
				[0, 0, 1, 2, 2, 2, 0, 0, 0],
				[0, 0, 3, 2, 2, 2, 0, 0, 0],
				[0, 0, 2, 1, 1, 3, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 5
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[21, 20, 3, 3, 2, 2, 10, 11, 11],
				[0, 0, 2, 2, 1, 1, 0, 0, 0],
				[0, 0, 2, 3, 2, 2, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 6
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 22, 21, 21, 21, 21],
				[0, 0, 2, 2, 1, 3, 0, 0, 0],
				[0, 0, 3, 2, 3, 1, 20, 21, 21],
				[0, 0, 1, 2, 3, 2, 0, 0, 0],
				[11, 11, 12, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 7
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[21, 20, 2, 2, 2, 2, 0, 0, 0],
				[0, 0, 1, 3, 2, 1, 0, 0, 0],
				[0, 0, 1, 2, 3, 3, 0, 0, 0],
				[0, 0, 2, 2, 2, 1, 0, 0, 0],
				[0, 0, 0, 0, 0, 12, 11, 11, 11],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 8
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 2, 1, 2, 2, 0, 0, 0],
				[0, 0, 1, 2, 2, 3, 20, 21, 0],
				[21, 20, 3, 2, 2, 1, 0, 0, 0],
				[0, 0, 2, 2, 2, 2, 0, 0, 0],
				[11, 11, 12, 0, 22, 21, 21, 21, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 9
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[21, 21, 21, 22, 0, 0, 0, 0, 0],
				[21, 20, 3, 2, 2, 2, 20, 21, 21],
				[0, 0, 1, 2, 2, 1, 0, 0, 0],
				[0, 0, 3, 3, 1, 1, 0, 0, 0],
				[0, 0, 2, 2, 2, 3, 0, 0, 0],
				[11, 11, 12, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 10
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[21, 20, 3, 2, 2, 2, 0, 0, 0],
				[0, 0, 1, 2, 2, 1, 0, 0, 0],
				[21, 20, 3, 2, 1, 2, 0, 0, 0],
				[0, 0, 3, 3, 2, 1, 10, 11, 11],
				[21, 20, 2, 2, 2, 2, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 11
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 2, 2, 2, 2, 10, 11, 11],
				[0, 0, 1, 1, 3, 2, 0, 0, 0],
				[0, 0, 1, 2, 2, 2, 0, 0, 0],
				[0, 0, 3, 1, 2, 1, 0, 0, 0],
				[0, 0, 2, 2, 2, 1, 20, 21, 21],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 12
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[21, 21, 21, 21, 22, 0, 0, 0, 0],
				[0, 0, 3, 2, 3, 2, 1, 0, 0],
				[0, 0, 2, 2, 3, 2, 2, 20, 21],
				[0, 0, 3, 1, 2, 1, 3, 0, 0],
				[0, 0, 2, 3, 2, 2, 2, 0, 0],
				[0, 0, 0, 0, 12, 11, 11, 11, 11],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 13
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[11, 11, 11, 12, 0, 0, 0, 0, 0],
				[0, 0, 3, 1, 2, 2, 1, 0, 0],
				[0, 0, 2, 2, 3, 2, 2, 0, 0],
				[0, 0, 3, 1, 0, 1, 3, 0, 0],
				[0, 0, 2, 3, 2, 2, 2, 20, 21],
				[0, 0, 1, 2, 3, 2, 3, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 14
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 3, 2, 2, 2, 1, 20, 21],
				[0, 0, 2, 2, 3, 2, 2, 0, 0],
				[21, 20, 3, 2, 1, 2, 2, 10, 11],
				[0, 0, 2, 2, 2, 2, 2, 0, 0],
				[0, 0, 1, 2, 3, 2, 3, 0, 0],
				[0, 0, 0, 0, 22, 21, 21, 21, 21]
			]
		},
		// Level 15
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 22, 21, 21, 21],
				[0, 0, 3, 2, 2, 2, 1, 0, 0],
				[0, 0, 2, 2, 3, 2, 2, 0, 0],
				[11, 10, 1, 2, 1, 2, 3, 20, 21],
				[0, 0, 2, 2, 2, 2, 2, 0, 0],
				[21, 20, 1, 2, 3, 2, 3, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 16
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 2, 1, 3, 1, 10, 11, 11],
				[0, 0, 2, 2, 3, 1, 0, 0, 0],
				[21, 20, 1, 3, 2, 222, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 17
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[21, 20, 2, 2, 2, 222, 0, 0, 0],
				[0, 0, 1, 3, 2, 1, 0, 0, 0],
				[0, 0, 1, 2, 3, 3, 0, 0, 0],
				[0, 0, 2, 111, 2, 1, 0, 0, 0],
				[0, 0, 0, 0, 0, 12, 11, 11, 11],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 18
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 222, 1, 1, 3, 1, 20, 21],
				[0, 0, 2, 2, 3, 2, 2, 0, 0],
				[0, 0, 3, 1, 111, 1, 3, 0, 0],
				[11, 10, 2, 3, 2, 2, 2, 20, 21],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 19
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[11, 11, 12, 0, 0, 0, 0, 0, 0],
				[0, 0, 2, 1, 2, 2, 1, 0, 0],
				[0, 0, 2, 2, 3, 2, 2, 20, 21],
				[0, 0, 3, 1, 111, 1, 3, 0, 0],
				[0, 0, 2, 3, 2, 2, 2, 0, 0],
				[0, 0, 222, 2, 3, 2, 3, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 20
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 111, 1, 2, 2, 1, 20, 21],
				[0, 0, 2, 2, 3, 222, 2, 0, 0],
				[21, 20, 3, 1, 3, 1, 3, 0, 0],
				[0, 0, 222, 3, 2, 2, 2, 0, 0],
				[0, 0, 3, 1, 3, 2, 3, 0, 0],
				[0, 0, 0, 0, 0, 12, 11, 11, 11]
			]
		},
		// Level 21
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 1, 1, 222, 2, 2, 10, 11],
				[0, 0, 222, 2, 3, 2, 1, 0, 0],
				[21, 20, 3, 111, 3, 1, 3, 20, 21],
				[0, 0, 2, 3, 222, 2, 2, 0, 0],
				[0, 0, 3, 1, 3, 2, 111, 0, 0],
				[21, 21, 21, 22, 0, 0, 0, 0, 0]
			]
		},
		// Level 22
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 2, 2, 1, 111, 1, 3, 0, 0],
				[0, 222, 2, 2, 3, 2, 2, 10, 11],
				[0, 2, 111, 2, 1, 1, 3, 0, 0],
				[0, 3, 2, 3, 2, 1, 2, 0, 0],
				[20, 2, 2, 222, 1, 3, 2, 0, 0],
				[0, 0, 0, 0, 0, 0, 22, 21, 21]
			]
		},
		// Level 23
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 222, 2, 2, 1, 111, 3, 20, 0],
				[0, 2, 2, 2, 3, 2, 2, 0, 0],
				[10, 2, 1, 2, 1, 3, 3, 20, 0],
				[0, 3, 222, 3, 3, 1, 222, 0, 0],
				[0, 2, 1, 2, 1, 3, 2, 20, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 24
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[21, 21, 21, 22, 0, 0, 0, 0, 0],
				[0, 0, 3, 2, 222, 2, 2, 0, 0],
				[0, 0, 2, 1, 1, 111, 1, 0, 0],
				[21, 20, 2, 2, 3, 1, 1, 0, 0],
				[0, 0, 2, 2, 1, 1, 2, 10, 11],
				[0, 0, 2, 3, 2, 1, 222, 0, 0],
				[21, 20, 2, 2, 111, 3, 2, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 25
		{
			level: [
				[11, 11, 11, 12, 0, 0, 0, 0, 0],
				[0, 3, 2, 2, 2, 222, 2, 0, 0],
				[0, 1, 222, 2, 1, 1, 3, 20, 0],
				[20, 2, 2, 2, 3, 2, 1, 0, 0],
				[0, 2, 1, 1, 2, 1, 3, 0, 0],
				[0, 3, 2, 3, 2, 1, 2, 0, 0],
				[0, 2, 111, 2, 1, 3, 2, 0, 0],
				[21, 21, 21, 22, 0, 0, 0, 0, 0]
			]
		},
		// Level 26
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 2, 111, 3, 1, 3, 3, 20, 0],
				[0, 222, 1, 1, 222, 3, 2, 0, 0],
				[20, 2, 2, 2, 3, 2, 1, 20, 0],
				[0, 3, 111, 1, 2, 2, 1, 0, 0],
				[0, 2, 2, 3, 111, 3, 3, 20, 0],
				[0, 1, 2, 2, 2, 1, 2, 0, 0],
				[21, 21, 22, 0, 12, 11, 11, 11, 0]
			]
		},
		// Level 27
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 3, 2, 3, 2, 1, 2, 10, 0],
				[20, 1, 2, 222, 1, 1, 3, 0, 0],
				[0, 2, 1, 2, 3, 2, 222, 0, 0],
				[0, 2, 111, 2, 2, 1, 3, 20, 0],
				[20, 3, 2, 3, 222, 1, 1, 0, 0],
				[0, 2, 1, 2, 111, 3, 2, 0, 0],
				[0, 0, 0, 0, 0, 22, 21, 21, 0]
			]
		},
		// Level size of 6x7
		// Level 28
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 3, 222, 2, 2, 2, 2, 20, 0],
				[0, 1, 2, 2, 111, 3, 3, 0, 0],
				[0, 2, 2, 3, 3, 2, 1, 20, 0],
				[10, 2, 111, 1, 2, 3, 2, 0, 0],
				[0, 3, 3, 3, 2, 1, 2, 20, 0],
				[0, 2, 1, 2, 1, 3, 2, 0, 0],
				[0, 222, 1, 2, 111, 2, 1, 20, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 29
		{
			level: [
				[0, 0, 0, 0, 22, 21, 21, 21, 0],
				[0, 222, 2, 111, 2, 1, 2, 0, 0],
				[0, 1, 1, 1, 1, 3, 2, 0, 0],
				[0, 1, 1, 3, 2, 2, 2, 0, 0],
				[0, 3, 111, 1, 2, 2, 111, 0, 0],
				[0, 1, 1, 1, 2, 1, 1, 0, 0],
				[0, 1, 2, 2, 222, 1, 1, 0, 0],
				[0, 3, 1, 2, 2, 3, 2, 0, 0],
				[11, 11, 11, 12, 0, 0, 0, 0, 0]
			]
		},
		// Level 30
		{
			level: [
				[11, 11, 11, 12, 0, 0, 0, 0, 0],
				[0, 3, 2, 2, 2, 2, 2, 0, 0],
				[0, 1, 2, 2, 111, 1, 3, 0, 0],
				[20, 1, 2, 3, 3, 2, 1, 20, 0],
				[0, 2, 111, 1, 222, 3, 2, 0, 0],
				[20, 3, 3, 3, 2, 1, 2, 20, 0],
				[0, 2, 111, 2, 1, 3, 2, 0, 0],
				[20, 2, 1, 2, 3, 222, 2, 20, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 31
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 2, 61, 1, 3, 20, 21, 21],
				[0, 0, 1, 2, 51, 2, 0, 0, 0],
				[11, 10, 1, 1, 1, 2, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 32
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[21, 20, 2, 61, 1, 222, 0, 0, 0],
				[0, 0, 51, 3, 61, 2, 0, 0, 0],
				[0, 0, 3, 2, 3, 3, 0, 0, 0],
				[0, 0, 222, 1, 2, 1, 0, 0, 0],
				[0, 0, 0, 0, 0, 12, 11, 11, 11],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 33
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 12, 11, 11, 11],
				[21, 20, 2, 111, 3, 2, 111, 0, 0],
				[0, 0, 51, 2, 3, 2, 61, 0, 0],
				[21, 20, 3, 2, 111, 2, 3, 0, 0],
				[0, 0, 51, 3, 2, 61, 1, 0, 0],
				[0, 0, 2, 2, 3, 111, 3, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 34
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 2, 2, 61, 2, 2, 20, 21],
				[0, 0, 1, 2, 3, 111, 51, 0, 0],
				[0, 0, 3, 51, 1, 61, 3, 0, 0],
				[21, 20, 2, 3, 1, 1, 1, 0, 0],
				[0, 0, 1, 2, 3, 222, 2, 10, 11],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 35
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 222, 3, 111, 51, 1, 20, 21],
				[0, 0, 2, 111, 61, 2, 61, 0, 0],
				[11, 10, 2, 2, 2, 2, 2, 20, 21],
				[0, 0, 2, 2, 61, 3, 3, 0, 0],
				[0, 0, 1, 222, 1, 222, 2, 20, 21],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 36
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 12, 11, 11, 11, 11],
				[0, 0, 3, 61, 2, 1, 222, 0, 0],
				[21, 20, 2, 51, 2, 2, 3, 20, 21],
				[0, 0, 222, 3, 111, 3, 2, 0, 0],
				[0, 0, 2, 2, 111, 61, 1, 0, 0],
				[21, 20, 2, 2, 2, 2, 2, 20, 21],
				[0, 0, 61, 1, 3, 2, 61, 0, 0],
				[21, 21, 21, 21, 22, 0, 0, 0, 0]
			]
		},
		// Level 37
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 51, 2, 3, 2, 1, 2, 20, 0],
				[20, 3, 2, 2, 111, 1, 3, 0, 0],
				[0, 2, 1, 2, 3, 61, 222, 0, 0],
				[0, 2, 51, 2, 2, 51, 2, 20, 0],
				[0, 3, 2, 3, 222, 3, 1, 0, 0],
				[10, 2, 1, 2, 1, 3, 61, 0, 0],
				[0, 0, 0, 0, 0, 22, 21, 21, 0]
			]
		},
		// Level 38
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[20, 1, 2, 3, 111, 2, 3, 0, 0],
				[0, 2, 3, 1, 61, 111, 1, 0, 0],
				[0, 61, 222, 1, 3, 2, 2, 20, 0],
				[0, 2, 61, 2, 222, 51, 2, 0, 0],
				[0, 1, 2, 3, 2, 2, 2, 0, 0],
				[20, 2, 51, 2, 111, 3, 2, 10, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 39
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[20, 1, 222, 2, 222, 61, 2, 10, 0],
				[0, 51, 2, 2, 51, 3, 3, 0, 0],
				[0, 2, 2, 3, 3, 2, 1, 0, 0],
				[20, 2, 111, 1, 61, 3, 2, 0, 0],
				[0, 3, 3, 3, 2, 111, 2, 0, 0],
				[0, 2, 51, 222, 1, 3, 2, 0, 0],
				[20, 2, 1, 61, 111, 2, 1, 20, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 40
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[21, 21, 21, 22, 0, 0, 0, 0, 0],
				[0, 3, 61, 2, 2, 2, 61, 0, 0],
				[0, 51, 222, 2, 1, 1, 3, 0, 0],
				[10, 1, 2, 3, 3, 2, 1, 20, 0],
				[0, 222, 1, 51, 222, 3, 2, 0, 0],
				[20, 3, 3, 3, 222, 1, 2, 20, 0],
				[0, 2, 111, 2, 1, 3, 2, 0, 0],
				[20, 2, 51, 2, 3, 61, 2, 20, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 41
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[21, 21, 22, 0, 0, 0, 0, 0, 0],
				[0, 0, 2, 51, 2, 61, 0, 0, 0],
				[0, 0, 1, 2, 2, 1, 0, 0, 0],
				[0, 0, 1, 2, 62, 1, 0, 0, 0],
				[0, 0, 2, 52, 2, 2, 0, 0, 0],
				[0, 0, 0, 0, 0, 12, 11, 11, 11],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 42
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[21, 21, 21, 21, 22, 0, 0, 0, 0],
				[0, 0, 52, 2, 3, 61, 1, 0, 0],
				[0, 0, 2, 2, 62, 2, 2, 0, 0],
				[0, 0, 3, 1, 222, 1, 3, 20, 21],
				[0, 0, 2, 3, 2, 2, 61, 0, 0],
				[11, 11, 11, 11, 12, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 43
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 61, 1, 222, 2, 1, 10, 11],
				[21, 20, 2, 2, 3, 2, 2, 0, 0],
				[0, 0, 62, 1, 3, 111, 3, 20, 21],
				[0, 0, 2, 3, 2, 2, 62, 0, 0],
				[21, 20, 3, 51, 3, 2, 3, 20, 21],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 44
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[21, 21, 21, 22, 0, 0, 0, 0, 0],
				[0, 0, 61, 2, 2, 222, 2, 0, 0],
				[0, 0, 62, 51, 1, 1, 52, 0, 0],
				[11, 10, 2, 2, 3, 111, 111, 0, 0],
				[0, 0, 2, 2, 111, 1, 2, 20, 21],
				[0, 0, 2, 3, 2, 1, 1, 0, 0],
				[21, 20, 2, 2, 52, 3, 61, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 45
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 52, 2, 3, 2, 51, 2, 10, 0],
				[20, 1, 222, 2, 3, 1, 3, 0, 0],
				[0, 62, 51, 2, 3, 2, 222, 0, 0],
				[0, 2, 1, 2, 62, 1, 2, 20, 0],
				[20, 3, 61, 3, 2, 1, 1, 0, 0],
				[0, 2, 1, 2, 111, 2, 3, 20, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 46
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 2, 1, 1, 62, 2, 1, 20, 0],
				[0, 1, 222, 1, 2, 51, 61, 0, 0],
				[10, 2, 2, 3, 111, 3, 1, 20, 0],
				[0, 51, 222, 2, 2, 2, 62, 0, 0],
				[20, 1, 3, 2, 111, 1, 2, 20, 0],
				[0, 222, 52, 3, 2, 2, 2, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 47
		{
			level: [
				[0, 0, 0, 0, 0, 0, 22, 21, 0],
				[0, 51, 2, 2, 2, 1, 2, 0, 0],
				[0, 222, 61, 1, 52, 3, 222, 0, 0],
				[0, 2, 1, 3, 3, 2, 62, 0, 0],
				[0, 2, 111, 1, 1, 111, 2, 0, 0],
				[0, 62, 1, 1, 3, 1, 2, 0, 0],
				[0, 2, 3, 1, 1, 111, 2, 0, 0],
				[0, 2, 1, 3, 51, 1, 2, 0, 0],
				[11, 12, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 48
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[20, 3, 111, 3, 1, 2, 222, 0, 0],
				[0, 2, 61, 2, 222, 3, 2, 0, 0],
				[20, 1, 3, 52, 2, 2, 51, 0, 0],
				[0, 2, 2, 51, 1, 61, 2, 10, 0],
				[20, 2, 2, 52, 3, 1, 2, 0, 0],
				[0, 62, 1, 1, 2, 222, 2, 0, 0],
				[20, 1, 3, 1, 2, 111, 62, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 49
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[10, 2, 2, 51, 2, 2, 2, 20, 0],
				[0, 62, 3, 222, 1, 2, 3, 0, 0],
				[0, 2, 2, 2, 2, 62, 52, 0, 0],
				[0, 2, 1, 2, 2, 111, 2, 0, 0],
				[0, 51, 62, 111, 2, 1, 61, 0, 0],
				[0, 222, 1, 2, 2, 111, 2, 0, 0],
				[0, 2, 1, 61, 1, 62, 61, 0, 0],
				[20, 1, 1, 3, 2, 1, 1, 20, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 50
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[20, 3, 2, 61, 2, 2, 2, 20, 0],
				[0, 1, 2, 2, 1, 3, 2, 0, 0],
				[0, 111, 2, 3, 2, 3, 222, 0, 0],
				[0, 1, 51, 222, 2, 111, 2, 0, 0],
				[20, 2, 2, 3, 3, 1, 1, 10, 0],
				[0, 2, 62, 2, 2, 1, 2, 0, 0],
				[0, 61, 3, 52, 2, 1, 2, 0, 0],
				[0, 62, 1, 2, 3, 1, 2, 0, 0],
				[20, 1, 111, 2, 52, 61, 2, 20, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 51
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 62, 1, 2, 53, 2, 20, 21],
				[0, 0, 2, 51, 1, 2, 1, 0, 0],
				[11, 10, 1, 3, 52, 3, 2, 0, 0],
				[0, 0, 2, 2, 63, 2, 2, 0, 0],
				[0, 0, 61, 1, 2, 2, 1, 20, 21],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 52
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[21, 21, 21, 22, 0, 0, 0, 0, 0],
				[0, 0, 2, 2, 2, 52, 222, 0, 0],
				[0, 0, 51, 2, 3, 1, 2, 0, 0],
				[21, 20, 3, 2, 62, 2, 2, 20, 21],
				[0, 0, 63, 2, 2, 3, 2, 0, 0],
				[0, 0, 222, 1, 61, 2, 63, 0, 0],
				[0, 0, 0, 0, 0, 12, 11, 11, 11]
			]
		},
		// Level 53
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 111, 2, 1, 1, 3, 20, 21],
				[0, 0, 3, 2, 52, 2, 3, 0, 0],
				[0, 0, 63, 222, 3, 2, 2, 20, 21],
				[0, 0, 2, 2, 2, 51, 2, 0, 0],
				[0, 0, 2, 3, 62, 53, 3, 20, 21],
				[0, 0, 61, 1, 2, 2, 111, 0, 0],
				[11, 11, 11, 12, 0, 22, 21, 21, 21]
			]
		},
		// Level 54
		{
			level: [
				[0, 0, 0, 0, 12, 11, 11, 11, 0],
				[0, 61, 2, 3, 2, 222, 62, 0, 0],
				[20, 2, 53, 2, 3, 1, 3, 20, 0],
				[0, 3, 2, 62, 3, 61, 1, 0, 0],
				[0, 2, 111, 2, 1, 62, 222, 0, 0],
				[20, 1, 1, 3, 2, 1, 1, 20, 0],
				[0, 222, 51, 2, 63, 1, 63, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 55
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[20, 3, 63, 2, 222, 62, 2, 20, 0],
				[0, 2, 2, 51, 111, 61, 2, 0, 0],
				[10, 2, 62, 3, 222, 3, 3, 20, 0],
				[0, 2, 2, 2, 2, 63, 1, 0, 0],
				[0, 2, 61, 2, 3, 1, 63, 0, 0],
				[20, 2, 222, 3, 52, 3, 1, 20, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 56
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 2, 1, 111, 3, 2, 2, 20, 0],
				[20, 3, 63, 1, 52, 3, 2, 0, 0],
				[0, 222, 3, 111, 3, 222, 2, 20, 0],
				[10, 1, 2, 2, 61, 3, 62, 0, 0],
				[0, 222, 51, 3, 2, 53, 2, 20, 0],
				[20, 2, 62, 222, 1, 3, 2, 0, 0],
				[0, 61, 3, 111, 63, 2, 1, 20, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 57
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 222, 61, 2, 3, 222, 3, 20, 0],
				[20, 3, 1, 111, 2, 62, 1, 0, 0],
				[0, 62, 3, 63, 111, 2, 111, 0, 0],
				[0, 1, 222, 2, 51, 3, 2, 0, 0],
				[0, 222, 63, 111, 2, 53, 2, 10, 0],
				[20, 2, 111, 2, 222, 2, 3, 0, 0],
				[0, 2, 3, 62, 111, 51, 2, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 58
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[10, 2, 2, 51, 63, 61, 2, 20, 0],
				[0, 1, 3, 222, 222, 62, 3, 0, 0],
				[0, 222, 63, 222, 3, 111, 2, 20, 0],
				[20, 1, 2, 2, 222, 3, 62, 0, 0],
				[0, 2, 3, 53, 111, 222, 3, 20, 0],
				[0, 1, 222, 2, 2, 62, 111, 0, 0],
				[20, 3, 52, 2, 111, 111, 3, 20, 0],
				[0, 2, 51, 3, 63, 52, 61, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 59
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 3, 222, 62, 1, 222, 2, 20, 0],
				[20, 2, 1, 53, 51, 2, 2, 0, 0],
				[0, 2, 2, 222, 2, 2, 61, 0, 0],
				[0, 222, 52, 2, 111, 222, 1, 10, 0],
				[0, 63, 111, 2, 51, 1, 62, 0, 0],
				[0, 2, 51, 111, 3, 3, 63, 0, 0],
				[20, 222, 62, 1, 3, 3, 2, 20, 0],
				[0, 2, 222, 2, 222, 63, 222, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level 60
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 222, 2, 222, 52, 222, 2, 20, 0],
				[0, 53, 111, 61, 2, 2, 3, 0, 0],
				[20, 3, 2, 2, 53, 222, 62, 0, 0],
				[0, 2, 61, 3, 222, 2, 2, 0, 0],
				[10, 2, 111, 2, 222, 63, 3, 20, 0],
				[0, 2, 62, 2, 2, 2, 2, 0, 0],
				[20, 2, 111, 52, 2, 51, 222, 0, 0],
				[0, 1, 2, 3, 111, 2, 2, 0, 0],
				[0, 222, 51, 222, 63, 222, 2, 20, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},	
		// Level size of 6x8
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 3, 2, 2, 2, 2, 2, 0, 0],
				[10, 1, 2, 2, 1, 3, 3, 0, 0],
				[0, 2, 2, 3, 3, 2, 1, 0, 0],
				[0, 2, 1, 1, 2, 3, 3, 0, 0],
				[0, 3, 3, 3, 2, 1, 2, 0, 0],
				[0, 2, 1, 2, 3, 3, 2, 20, 0],
				[0, 2, 1, 2, 3, 3, 2, 0, 0],
				[0, 1, 3, 3, 3, 3, 1, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},
		// Level max size of 6x9
		{
			level: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 3, 2, 2, 2, 2, 2, 0, 0],
				[10, 1, 2, 2, 1, 3, 3, 0, 0],
				[0, 2, 2, 3, 3, 2, 1, 0, 0],
				[0, 2, 1, 1, 2, 3, 3, 0, 0],
				[0, 3, 3, 3, 2, 1, 2, 0, 0],
				[0, 2, 1, 2, 3, 3, 2, 20, 0],
				[0, 2, 1, 2, 3, 3, 2, 0, 0],
				[0, 1, 3, 3, 3, 3, 1, 0, 0],
				[0, 2, 1, 2, 1, 3, 2, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		},		
	];

	function preload() {
		game = this;
		flarie.setReferences(instance, game, startGame, userDied);
		flarie.applyGameSettings(flarie.ScoreBarStyle.StarsOnly, flarie.TimerBarColor.Blue);
		flarie.enableJuice = true;
		flarie.enableAdventure();
		// load graphic colors
		squareShadeColor = flarie.assets.squareShadeColor;
		squareShadeAlpha = (flarie.assets.squareShadeAlpha / 100);
		squareShadeSpecialOne = flarie.assets.squareShadeSpecialOne;
		squareShadeSpecialAlpha = (flarie.assets.squareShadeSpecialAlpha / 100);
		squareShadeSpecialTwo = flarie.assets.squareShadeSpecialTwo;
		squareShadeSpecialThree = flarie.assets.squareShadeSpecialThree;
		// load images:
		game.load.spritesheet('pipe1', flarie.assets.pipe1, { frameWidth: 100, frameHeight: 100 });
		game.load.spritesheet('pipe2', flarie.assets.pipe2, { frameWidth: 100, frameHeight: 100 });
		game.load.spritesheet('pipe3', flarie.assets.pipe3, { frameWidth: 100, frameHeight: 100 });
		game.load.spritesheet('pipe4', flarie.assets.pipe4, { frameWidth: 100, frameHeight: 100 });
		game.load.image('waterdrop', flarie.assets.waterdrop);

		// load audio
		game.load.audio('wrongSound', flarie.assets.wrongAudio);
		game.load.audio('successSound', flarie.assets.successAudio);
		game.load.audio('pipeTurning', flarie.assets.pipeTurningAudio);
		game.load.audio('waterInPipe', flarie.assets.waterInPipeAudio);

		// Adventure
		flarie.addEventListener(flarie.Events.PlayLevel, chooseLevel);
		flarie.adventure.debug = true;
		
	}

	function create() {
		flarie.createGlobals();
		wrongSound = flarie.addSound('wrongSound', 0.5);
		successSound = flarie.addSound('successSound', 0.4);
		pipeTurning = flarie.addSound('pipeTurning', 0.2);
		waterInPipe = flarie.addSound('waterInPipe', 0.2);
		pipeTurning.setRate(2);


		flarie.loadingComplete();

		if (DEBUG) {
			flarie.turnSoundOn();
			startGame();
		}
	}

	function createWorld() {
		pipeGroup0 = game.add.group();
		pipeGroup1 = game.add.group();
		pipeGroup111 = game.add.group();
		pipeGroup51 = game.add.group();
		pipeGroup52 = game.add.group();
		pipeGroup53 = game.add.group();
		pipeGroup2 = game.add.group();
		pipeGroup222 = game.add.group();
		pipeGroup61 = game.add.group();
		pipeGroup62 = game.add.group();
		pipeGroup63 = game.add.group();
		pipeGroup3 = game.add.group();
		pipeGroup10 = game.add.group();
		pipeGroup11 = game.add.group();
		pipeGroup20 = game.add.group();
		pipeGroup21 = game.add.group();
		shadeGroup = game.add.group();

		container = game.add.container();
		container.setDepth(4);

		levelDefinitions();
		createPipeLevel();
		pipeDeclarations();
		pipeRandomRotation();
		pipeTwinControlledRotation();
		firstWaterSourceSpread();
		activateWater();
		preActivateWater();
		tweenInGameStart();
		createEmitter();
		waterSuperDelay();

		game.time.addEvent({ delay: 1000, callback: function() { flarie.updateTimerBar(0, starTimer * flarie.timerBar.getCurrentValue()); }});
		flarie.addEventListener(flarie.Events.TimerBarComplete, endGame);
		//flarie.scoreText.alpha = 0;

		cursors = game.input.keyboard.createCursorKeys();
	}
	// creating the particle emitter
	function createEmitter(){
        
		waterEmitter = game.add.particles('waterdrop').createEmitter({
		   on: false,
		   lifespan: 500,
		   alpha: { start: 1, end: 0 },
		   scale: { start: 0.1, end: 0 },
		   speedX: { min: -300, max: 300 },
		   speedY: { min: -300, max: 300 }, 
		   angle: { min: -180, max: 180 },
		   rotate: {min: 0, max: 360 },
		   blendMode: 'ADD',
		   //emitZone: { type: 'random', source: shape1 }
	   });

    }

    function activateParticle(gameObject)
    {
		posX = gameObject.x;
		posY = gameObject.y;
		waterEmitter.manager.setDepth(12);
		waterEmitter.explode(20, posX ,posY);
		//flarie.playSound(successSound);
    }

	function chooseLevel(_levelID) {
		flarie.resetStartGame();
		chosenLevel = _levelID - 1;
		flarie.beginGame(createWorld);
	}

	function levelDefinitions() {

		switch (true) {
			case chosenLevel == 0:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 180;
				curvedPipeExit = 0;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = -20;
				startYPos = 270;
				starTimer = easyTimer;
				break;
			case chosenLevel == 1:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 180;
				curvedPipeExit = 0;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = -20;
				startYPos = 270;
				starTimer = easyTimer;
				break;
			case chosenLevel == 2:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 270;
				curvedPipeExit = 90;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = -20;
				startYPos = 270;
				starTimer = easyTimer;
				break;
			case chosenLevel == 3:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 0;
				curvedPipeExit = 90;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = 30;
				startYPos = 270;
				starTimer = easyTimer;
				break;
			case chosenLevel == 4:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 270;
				curvedPipeExit = 0;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = 30;
				startYPos = 270;
				starTimer = easyTimer;
				break;
			case chosenLevel == 5:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 180;
				curvedPipeExit = 0;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = 30;
				startYPos = 270;
				starTimer = easyTimer;
				break;
			case chosenLevel == 6:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 270;
				curvedPipeExit = 0;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = 30;
				startYPos = 220;
				starTimer = mediumTimer;
				break;
			case chosenLevel == 7:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 180;
				curvedPipeExit = 270;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = 30;
				startYPos = 220;
				starTimer = mediumTimer;
				break;
			case chosenLevel == 8:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 180;
				curvedPipeExit = 90;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = 30;
				startYPos = 220;
				starTimer = mediumTimer;
				break;
			case chosenLevel == 9:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 180;
				curvedPipeExit = 90;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = 30;
				startYPos = 180;
				starTimer = mediumTimer;
				break;
			case chosenLevel == 10:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 180;
				curvedPipeExit = 90;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = 30;
				startYPos = 180;
				starTimer = mediumTimer;
				break;
			case chosenLevel == 11:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 270;
				curvedPipeExit = 90;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = -20;
				startYPos = 220;
				starTimer = mediumTimer;
				break;
			case chosenLevel == 12:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 90;
				curvedPipeExit = 90;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = -20;
				startYPos = 180;
				starTimer = mediumTimer;
				break;
			case chosenLevel == 13:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 0;
				curvedPipeExit = 270;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = -20;
				startYPos = 180;
				starTimer = mediumTimer;
				break;
			case chosenLevel == 14:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 0;
				curvedPipeExit = 0;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = -20;
				startYPos = 180;
				starTimer = mediumTimer;
				break;
			case chosenLevel == 15:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 0;
				curvedPipeExit = 180;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = 30;
				startYPos = 270;
				starTimer = easyTimer;
				break;
			case chosenLevel == 16:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 270;
				curvedPipeExit = 90;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = 30;
				startYPos = 220;
				starTimer = mediumTimer;
				break;
			case chosenLevel == 17:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 90;
				curvedPipeExit = 90;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = -20;
				startYPos = 220;
				starTimer = mediumTimer;
				break;
			case chosenLevel == 18:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 90;
				curvedPipeExit = 270;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = -20;
				startYPos = 180;
				starTimer = mediumTimer;
				break;
			case chosenLevel == 19:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 270;
				curvedPipeExit = 180;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = -20;
				startYPos = 180;
				starTimer = hardtimer;
				break;
			case chosenLevel == 20:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 90;
				curvedPipeExit = 180;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = -20;
				startYPos = 180;
				starTimer = hardtimer;
				break;
			case chosenLevel == 21:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 90;
				curvedPipeExit = 270;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = 30;
				startYPos = 180;
				starTimer = hardtimer;
				break;
			case chosenLevel == 22:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 90;
				curvedPipeExit = 270;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = 30;
				startYPos = 180;
				starTimer = hardtimer;
				break;
			case chosenLevel == 23:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 90;
				curvedPipeExit = 90;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = -20;
				startYPos = 125;
				starTimer = hardtimer;
				break;
			case chosenLevel == 24:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 90;
				curvedPipeExit = 180;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = 30;
				startYPos = 220;
				starTimer = hardtimer;
				break;
			case chosenLevel == 25:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 270;
				curvedPipeExit = 180;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = 30;
				startYPos = 220;
				starTimer = hardtimer;
				break;
			case chosenLevel == 26:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 270;
				curvedPipeExit = 270;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = 30;
				startYPos = 220;
				starTimer = hardtimer;
				break;
			case chosenLevel == 27:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 270;
				curvedPipeExit = 270;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = 30;
				startYPos = 170;
				starTimer = hardtimer;
				break;
			case chosenLevel == 28:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 180;
				curvedPipeExit = 0;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = 30;
				startYPos = 170;
				starTimer = hardtimer;
				break;
			case chosenLevel == 29:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 90;
				curvedPipeExit = 270;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = 30;
				startYPos = 170;
				starTimer = hardtimer;
				break;
			case chosenLevel == 30:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = Direction.Right;
				curvedPipeExit = Direction.Right;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = 30;
				startYPos = 270;
				starTimer = easyTimer;
				twinPos1 = Direction.Down;
				twinPos2 = Direction.Up;
				break;
			case chosenLevel == 31:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 270;
				curvedPipeExit = 90;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = 30;
				startYPos = 220;
				starTimer = mediumTimer;
				twinPos1 = Direction.Down;
				twinPos2 = Direction.Up;
				twinPos3 = Direction.Left;
				break;
			case chosenLevel == 32:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 0;
				curvedPipeExit = 270;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = -20;
				startYPos = 180;
				starTimer = mediumTimer;
				twinPos1 = Direction.Down;
				twinPos2 = Direction.Right;
				twinPos3 = Direction.Left;
				twinPos4 = Direction.Left;
				break;
			case chosenLevel == 33:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 0;
				curvedPipeExit = 270;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = -20;
				startYPos = 180;
				starTimer = mediumTimer;
				twinPos1 = Direction.Right;
				twinPos2 = Direction.Left;
				twinPos3 = Direction.Left;
				twinPos4 = Direction.Down;
				break;
			case chosenLevel == 34:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 0;
				curvedPipeExit = 270;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = -20;
				startYPos = 180;
				starTimer = mediumTimer;
				twinPos1 = Direction.Right;
				twinPos2 = Direction.Up;
				twinPos3 = Direction.Left;
				twinPos4 = Direction.Down;
				break;
			case chosenLevel == 35:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 0;
				curvedPipeExit = 180;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = -20;
				startYPos = 125;
				starTimer = longTimer;
				twinPos1 = Direction.Right;
				twinPos2 = Direction.Up;
				twinPos3 = Direction.Left;
				twinPos4 = Direction.Right;
				twinPos5 = Direction.Down;
				break;
			case chosenLevel == 36:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 270;
				curvedPipeExit = 270;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = 30;
				startYPos = 220;
				starTimer = longTimer;
				twinPos1 = Direction.Right;
				twinPos2 = Direction.Up;
				twinPos3 = Direction.Up;
				twinPos4 = Direction.Right;
				twinPos5 = Direction.Down;
				break;
			case chosenLevel == 37:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 270;
				curvedPipeExit = 270;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = 30;
				startYPos = 220;
				starTimer = longTimer;
				twinPos1 = Direction.Up;
				twinPos2 = Direction.Up;
				twinPos3 = Direction.Left;
				twinPos4 = Direction.Right;
				twinPos5 = Direction.Down;
				break;
			case chosenLevel == 38:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 270;
				curvedPipeExit = 270;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = 30;
				startYPos = 170;
				starTimer = longTimer;
				twinPos1 = Direction.Up;
				twinPos2 = Direction.Up;
				twinPos3 = Direction.Left;
				twinPos4 = Direction.Right;
				twinPos5 = Direction.Down;
				break;
			case chosenLevel == 39:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 90;
				curvedPipeExit = Direction.Down;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = 30;
				startYPos = 75;
				starTimer = longTimer;
				twinPos1 = Direction.Up;
				twinPos2 = Direction.Up;
				twinPos3 = Direction.Left;
				twinPos4 = Direction.Right;
				twinPos5 = Direction.Down;
				twinPos6 = Direction.Down;
				break;
			case chosenLevel == 40:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 270;
				curvedPipeExit = 90;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = 30;
				startYPos = 220;
				starTimer = mediumTimer;
				twinPos1 = Direction.Up;
				twinPos2 = Direction.Up;
				twinPos3 = Direction.Left;
				twinPos4 = Direction.Right;
				twinPos5 = Direction.Down;
				twinPos6 = Direction.Down;
				break;
			case chosenLevel == 41:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 180;
				curvedPipeExit = 90;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = -20;
				startYPos = 220;
				starTimer = hardtimer;
				twinPos1 = Direction.Up;
				twinPos2 = Direction.Up;
				twinPos3 = Direction.Left;
				twinPos4 = Direction.Right;
				twinPos5 = Direction.Down;
				twinPos6 = Direction.Down;
				break;
			case chosenLevel == 42:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 270;
				curvedPipeExit = 180;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = -20;
				startYPos = 180;
				starTimer = hardtimer;
				twinPos1 = Direction.Up;
				twinPos2 = Direction.Up;
				twinPos3 = Direction.Left;
				twinPos4 = Direction.Right;
				twinPos5 = Direction.Down;
				break;
			case chosenLevel == 43:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 90;
				curvedPipeExit = 90;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = -20;
				startYPos = 120;
				starTimer = longTimer;
				twinPos1 = Direction.Up;
				twinPos2 = Direction.Up;
				twinPos3 = Direction.Left;
				twinPos4 = Direction.Down;
				twinPos5 = Direction.Left;
				break;
			case chosenLevel == 44:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 270;
				curvedPipeExit = 270;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = 30;
				startYPos = 220;
				starTimer = longTimer;
				twinPos1 = Direction.Up;
				twinPos2 = Direction.Up;
				twinPos3 = Direction.Left;
				twinPos4 = Direction.Down;
				twinPos5 = Direction.Left;
				break;
			case chosenLevel == 45:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 270;
				curvedPipeExit = 270;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = 30;
				startYPos = 220;
				starTimer = longTimer;
				twinPos1 = Direction.Up;
				twinPos2 = Direction.Up;
				twinPos3 = Direction.Left;
				twinPos4 = Direction.Down;
				twinPos5 = Direction.Left;
				twinPos6 = Direction.Right;
				twinPos7 = Direction.Left;
				twinPos8 = Direction.Down;
				twinPos9 = Direction.Down;
				twinPos10 = Direction.Left;
				twinPos11 = Direction.Down;
				twinPos12 = Direction.Down;
				break;
			case chosenLevel == 46:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 180;
				curvedPipeExit = 0;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = 30;
				startYPos = 170;
				starTimer = longTimer;
				twinPos1 = Direction.Up;
				twinPos2 = Direction.Up;
				twinPos3 = Direction.Down;
				twinPos4 = Direction.Down;
				twinPos5 = Direction.Left;
				twinPos6 = Direction.Up;
				break;
			case chosenLevel == 47:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 180;
				curvedPipeExit = 0;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = 30;
				startYPos = 170;
				starTimer = longTimer;
				twinPos1 = Direction.Up;
				twinPos2 = Direction.Up;
				twinPos3 = Direction.Down;
				twinPos4 = Direction.Down;
				twinPos5 = Direction.Left;
				twinPos6 = Direction.Up;
				break;
			case chosenLevel == 48:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 90;
				curvedPipeExit = Direction.Down;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = 30;
				startYPos = 125;
				starTimer = longTimer;
				twinPos1 = Direction.Up;
				twinPos2 = Direction.Up;
				twinPos3 = Direction.Left;
				twinPos4 = Direction.Up;
				twinPos5 = Direction.Down;
				twinPos6 = Direction.Left;
				twinPos7 = Direction.Up;
				twinPos8 = Direction.Up;
				twinPos9 = Direction.Down;
				twinPos10 = Direction.Left;
				twinPos11 = Direction.Down;
				twinPos12 = Direction.Down;
				break;
			case chosenLevel == 49:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 90;
				curvedPipeExit = Direction.Down;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = 30;
				startYPos = 70;
				starTimer = longTimer;
				twinPos1 = Direction.Up;
				twinPos2 = Direction.Left;
				twinPos3 = Direction.Down;
				twinPos4 = Direction.Up;
				twinPos5 = Direction.Down;
				break;
			case chosenLevel == 50:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 90;
				curvedPipeExit = 180;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = -20;
				startYPos = 180;
				starTimer = hardtimer;
				twinPos1 = Direction.Up;
				twinPos2 = Direction.Left;
				twinPos3 = Direction.Down;
				twinPos4 = Direction.Up;
				twinPos5 = Direction.Down;
				twinPos6 = Direction.Down;
				break;
			case chosenLevel == 51:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 270;
				curvedPipeExit = 90;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = -20;
				startYPos = 180;
				starTimer = hardtimer;
				twinPos1 = Direction.Right;
				twinPos2 = Direction.Left;
				twinPos3 = Direction.Down;
				twinPos4 = Direction.Up;
				twinPos5 = Direction.Down;
				twinPos6 = Direction.Down;
				break;
			case chosenLevel == 52:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 180;
				curvedPipeExit = 270;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = -20;
				startYPos = 120;
				starTimer = longTimer;
				twinPos1 = Direction.Up;
				twinPos2 = Direction.Up;
				twinPos3 = Direction.Left;
				twinPos4 = Direction.Down;
				twinPos5 = Direction.Left;
				twinPos6 = Direction.Down;
				break;
			case chosenLevel == 53:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 0;
				curvedPipeExit = 270;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = 30;
				startYPos = 220;
				starTimer = longTimer;
				twinPos1 = Direction.Up;
				twinPos2 = Direction.Up;
				twinPos3 = Direction.Left;
				twinPos4 = Direction.Down;
				twinPos5 = Direction.Left;
				twinPos6 = Direction.Down;
				twinPos7 = Direction.Up;
				console.log('level 54?');
				break;
			case chosenLevel == 54:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 0;
				curvedPipeExit = 270;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = 30;
				startYPos = 220;
				starTimer = longTimer;
				twinPos1 = Direction.Up;
				twinPos2 = Direction.Right;
				twinPos3 = Direction.Down;
				twinPos4 = Direction.Up;
				twinPos5 = Direction.Up;
				twinPos6 = Direction.Down;
				twinPos7 = Direction.Down;
				twinPos8 = Direction.Down;
				twinPos9 = Direction.Down;
				twinPos10 = Direction.Left;
				twinPos11 = Direction.Down;
				twinPos12 = Direction.Down;
				console.log('level 55?');
				break;
			case chosenLevel == 55:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 270;
				curvedPipeExit = 270;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = 30;
				startYPos = 170;
				starTimer = longTimer;
				twinPos1 = Direction.Up;
				twinPos2 = Direction.Down;
				twinPos3 = Direction.Up;
				twinPos4 = Direction.Left;
				twinPos5 = Direction.Up;
				twinPos6 = Direction.Left;
				twinPos7 = Direction.Right;
				twinPos8 = Direction.Right;
				twinPos9 = Direction.Down;
				console.log('level 56?');
				break;
			case chosenLevel == 56:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 270;
				curvedPipeExit = 270;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = 30;
				startYPos = 170;
				starTimer = longTimer;
				twinPos1 = Direction.Left;
				twinPos2 = Direction.Right;
				twinPos3 = Direction.Left;
				twinPos4 = Direction.Left;
				twinPos5 = Direction.Up;
				twinPos6 = Direction.Left;
				twinPos7 = Direction.Up;
				twinPos8 = Direction.Down;
				twinPos9 = Direction.Down;
				break;
			case chosenLevel == 57:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 90;
				curvedPipeExit = Direction.Down;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = 30;
				startYPos = 120;
				starTimer = longTimer;
				twinPos1 = Direction.Up;
				twinPos2 = Direction.Right;
				twinPos3 = Direction.Left;
				twinPos4 = Direction.Up;
				twinPos5 = Direction.Down;
				twinPos6 = Direction.Right;
				twinPos7 = Direction.Left;
				twinPos8 = Direction.Down;
				twinPos9 = Direction.Down;
				break;
			case chosenLevel == 58:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = Direction.Right;
				curvedPipeExit = Direction.Left;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = 30;
				startYPos = 120;
				starTimer = longTimer;
				twinPos1 = Direction.Down;
				twinPos2 = Direction.Up;
				twinPos3 = Direction.Left;
				twinPos4 = Direction.Right;
				twinPos5 = Direction.Down;
				twinPos6 = Direction.Left;
				twinPos7 = Direction.Left;
				twinPos8 = Direction.Down;
				twinPos9 = Direction.Down;
				twinPos10 = Direction.Left;
				twinPos11 = Direction.Down;
				twinPos12 = Direction.Down;
				break;
			case chosenLevel == 59:
				exitAngle = 0;
				entranceAngle = 0;
				curvedPipeEntrance = 90;
				curvedPipeExit = Direction.Down;
				tileScale = 0.5;
				tileDistanceX = 100;
				tileDistanceY = 100;
				startXPos = 30;
				startYPos = 70;
				starTimer = longTimer;
				twinPos1 = Direction.Up;
				twinPos2 = Direction.Up;
				twinPos3 = Direction.Right;
				twinPos4 = Direction.Up;
				twinPos5 = Direction.Down;
				twinPos6 = Direction.Left;
				twinPos7 = Direction.Left;
				twinPos8 = Direction.Down;
				twinPos9 = Direction.Right;
				twinPos10 = Direction.Up;
				twinPos11 = Direction.Down;
				twinPos12 = Direction.Down;
				break;
		}
	}

	function createPipeLevel() {
		var data = gameGrid[chosenLevel];

		for (i = 0; i < data.level.length; i++) {
			for (j = 0; j < data.level[i].length; j++) {
				if (data.level[i][j] == 0) {
					thePipeToAdd = game.add.sprite(startXPos + tileDistanceX * j, startYPos + tileDistanceY * i);
					pipeGroup0.add(thePipeToAdd);
					container.add(thePipeToAdd);
				}
				if (data.level[i][j] == 1) {
					thePipeToAdd = game.add.sprite(startXPos + tileDistanceX * j, startYPos + tileDistanceY * i, 'pipe1', 0);
					shadeToAdd = game.add.graphics();
					shadeToAdd.fillStyle('0x'+squareShadeColor, squareShadeAlpha);
					shadeToAdd.fillRoundedRect((thePipeToAdd.x - 50), (thePipeToAdd.y - 50), 99, 99, 10);
					pipeGroup1.add(thePipeToAdd);
					shadeGroup.add(shadeToAdd);
					container.add(thePipeToAdd);
				}
				if (data.level[i][j] == 51) {
					thePipeToAdd = game.add.sprite(startXPos + tileDistanceX * j, startYPos + tileDistanceY * i, 'pipe1', 0);
					shadeToAdd = game.add.graphics();
					shadeToAdd.fillStyle('0x'+squareShadeSpecialOne, squareShadeSpecialAlpha);
					shadeToAdd.fillRoundedRect((thePipeToAdd.x - 50), (thePipeToAdd.y - 50), 99, 99, 10);
					pipeGroup51.add(thePipeToAdd);
					shadeGroup.add(shadeToAdd);
					container.add(thePipeToAdd);
				}
				if (data.level[i][j] == 52) {
					thePipeToAdd = game.add.sprite(startXPos + tileDistanceX * j, startYPos + tileDistanceY * i, 'pipe1', 0);
					shadeToAdd = game.add.graphics();
					shadeToAdd.fillStyle('0x'+squareShadeSpecialTwo, squareShadeSpecialAlpha);
					shadeToAdd.fillRoundedRect((thePipeToAdd.x - 50), (thePipeToAdd.y - 50), 99, 99, 10);
					pipeGroup52.add(thePipeToAdd);
					shadeGroup.add(shadeToAdd);
					container.add(thePipeToAdd);
				}
				if (data.level[i][j] == 53) {
					thePipeToAdd = game.add.sprite(startXPos + tileDistanceX * j, startYPos + tileDistanceY * i, 'pipe1', 0);
					shadeToAdd = game.add.graphics();
					shadeToAdd.fillStyle('0x'+squareShadeSpecialThree, squareShadeSpecialAlpha);
					shadeToAdd.fillRoundedRect((thePipeToAdd.x - 50), (thePipeToAdd.y - 50), 99, 99, 10);
					pipeGroup53.add(thePipeToAdd);
					shadeGroup.add(shadeToAdd);
					container.add(thePipeToAdd);
				}
				if (data.level[i][j] == 111) {
					thePipeToAdd = game.add.sprite(startXPos + tileDistanceX * j, startYPos + tileDistanceY * i, 'pipe1', 4);
					shadeToAdd = game.add.graphics();
					shadeToAdd.fillStyle('0x'+squareShadeColor, squareShadeAlpha);
					shadeToAdd.fillRoundedRect((thePipeToAdd.x - 50), (thePipeToAdd.y - 50), 99, 99, 10);
					pipeGroup111.add(thePipeToAdd);
					shadeGroup.add(shadeToAdd);
					container.add(thePipeToAdd);
				}
				if (data.level[i][j] == 2) {
					thePipeToAdd = game.add.sprite(startXPos + tileDistanceX * j, startYPos + tileDistanceY * i, 'pipe2', 0);
					shadeToAdd = game.add.graphics();
					shadeToAdd.fillStyle('0x'+squareShadeColor, squareShadeAlpha);
					shadeToAdd.fillRoundedRect((thePipeToAdd.x - 50), (thePipeToAdd.y - 50), 99, 99, 10);
					pipeGroup2.add(thePipeToAdd);
					shadeGroup.add(shadeToAdd);
					container.add(thePipeToAdd);
				}
				if (data.level[i][j] == 61) {
					thePipeToAdd = game.add.sprite(startXPos + tileDistanceX * j, startYPos + tileDistanceY * i, 'pipe2', 0);
					shadeToAdd = game.add.graphics();
					shadeToAdd.fillStyle('0x'+squareShadeSpecialOne, squareShadeSpecialAlpha);
					shadeToAdd.fillRoundedRect((thePipeToAdd.x - 50), (thePipeToAdd.y - 50), 99, 99, 10);
					pipeGroup61.add(thePipeToAdd);
					shadeGroup.add(shadeToAdd);
					container.add(thePipeToAdd);
				}
				if (data.level[i][j] == 62) {
					thePipeToAdd = game.add.sprite(startXPos + tileDistanceX * j, startYPos + tileDistanceY * i, 'pipe2', 0);
					shadeToAdd = game.add.graphics();
					shadeToAdd.fillStyle('0x'+squareShadeSpecialTwo, squareShadeSpecialAlpha);
					shadeToAdd.fillRoundedRect((thePipeToAdd.x - 50), (thePipeToAdd.y - 50), 99, 99, 10);
					pipeGroup62.add(thePipeToAdd);
					shadeGroup.add(shadeToAdd);
					container.add(thePipeToAdd);
				}
				if (data.level[i][j] == 63) {
					thePipeToAdd = game.add.sprite(startXPos + tileDistanceX * j, startYPos + tileDistanceY * i, 'pipe2', 0);
					shadeToAdd = game.add.graphics();
					shadeToAdd.fillStyle('0x'+squareShadeSpecialThree, squareShadeSpecialAlpha);
					shadeToAdd.fillRoundedRect((thePipeToAdd.x - 50), (thePipeToAdd.y - 50), 99, 99, 10);
					pipeGroup63.add(thePipeToAdd);
					shadeGroup.add(shadeToAdd);
					container.add(thePipeToAdd);
				}
				if (data.level[i][j] == 222) {
					thePipeToAdd = game.add.sprite(startXPos + tileDistanceX * j, startYPos + tileDistanceY * i, 'pipe2', 4);
					shadeToAdd = game.add.graphics();
					shadeToAdd.fillStyle('0x'+squareShadeColor, squareShadeAlpha);
					shadeToAdd.fillRoundedRect((thePipeToAdd.x - 50), (thePipeToAdd.y - 50), 99, 99, 10);
					pipeGroup222.add(thePipeToAdd);
					shadeGroup.add(shadeToAdd);
					container.add(thePipeToAdd);
				}
				if (data.level[i][j] == 3) {
					thePipeToAdd = game.add.sprite(startXPos + tileDistanceX * j, startYPos + tileDistanceY * i, 'pipe3', 0);
					shadeToAdd = game.add.graphics();
					shadeToAdd.fillStyle('0x'+squareShadeColor, squareShadeAlpha);
					shadeToAdd.fillRoundedRect((thePipeToAdd.x - 50), (thePipeToAdd.y - 50), 99, 99, 10);
					pipeGroup3.add(thePipeToAdd);
					shadeGroup.add(shadeToAdd);
					container.add(thePipeToAdd);
				}
				if (data.level[i][j] == 10) {
					thePipeToAdd = game.add.sprite(startXPos + tileDistanceX * j, startYPos + tileDistanceY * i, 'pipe1', 3);
					thePipeToAdd.angle = entranceAngle;
					//thePipeToAdd.scale = tileScale;
					pipeGroup10.add(thePipeToAdd);
					container.add(thePipeToAdd);
				}
				if (data.level[i][j] == 11) {
					thePipeToAdd = game.add.sprite(startXPos + tileDistanceX * j, startYPos + tileDistanceY * i, 'pipe1', 3);
					thePipeToAdd.angle = entranceAngle;
					//thePipeToAdd.scale = tileScale;
					pipeGroup11.add(thePipeToAdd);
					container.add(thePipeToAdd);
				}
				if (data.level[i][j] == 12) {
					thePipeToAdd = game.add.sprite(startXPos + tileDistanceX * j, startYPos + tileDistanceY * i, 'pipe2', 3);
					thePipeToAdd.angle = curvedPipeEntrance;
					//thePipeToAdd.scale = tileScale;
					pipeGroup10.add(thePipeToAdd);
					container.add(thePipeToAdd);
				}
				if (data.level[i][j] == 20) {
					thePipeToAdd = game.add.sprite(startXPos + tileDistanceX * j, startYPos + tileDistanceY * i, 'pipe1', 3);
					thePipeToAdd.angle = exitAngle;
					//thePipeToAdd.scale = tileScale;
					pipeGroup20.add(thePipeToAdd);
					container.add(thePipeToAdd);
				}
				if (data.level[i][j] == 21) {
					thePipeToAdd = game.add.sprite(startXPos + tileDistanceX * j, startYPos + tileDistanceY * i, 'pipe1', 3);
					thePipeToAdd.angle = exitAngle;
					//thePipeToAdd.scale = tileScale;
					pipeGroup21.add(thePipeToAdd);
					container.add(thePipeToAdd);
				}
				if (data.level[i][j] == 22) {
					thePipeToAdd = game.add.sprite(startXPos + tileDistanceX * j, startYPos + tileDistanceY * i, 'pipe2', 3);
					thePipeToAdd.angle = curvedPipeExit;
					//thePipeToAdd.scale = tileScale;
					pipeGroup20.add(thePipeToAdd);
					container.add(thePipeToAdd);
				}
			}
		}
	}

	function pipeDeclarations() {
		pipeGroup1.children.iterate(function (child) {
			child.name = 'pipe1';
			child.visible = true;
			child.alpha = 0;
			child.up = false;
			child.down = false;
			child.right = true;
			child.left = true;
			child.setDepth(4);
			child.water = false;
			child.InGame = true;
			child.InPlay = true;
			child.on('pointerdown', function () { rotatePipes(child); });
			child.setInteractive();
		});
		pipeGroup111.children.iterate(function (child) {
			child.name = 'pipe1';
			child.visible = true;
			child.alpha = 0;
			child.up = false;
			child.down = false;
			child.right = true;
			child.left = true;
			child.setDepth(4);
			child.water = false;
			child.isExit = true;
			child.tag = 'checkpipe';
			child.InPlay = true;
			child.on('pointerdown', function () { rotatePipes(child); });
			child.setInteractive();
		});
		pipeGroup51.children.iterate(function (child) {
			child.name = 'pipe5';
			child.visible = true;
			child.alpha = 0;
			child.up = false;
			child.down = false;
			child.right = true;
			child.left = true;
			child.setDepth(4);
			child.water = false;
			child.tag = 'twin1';
			child.InPlay = true;
			child.twin = true;
			child.on('pointerdown', function () { rotateTwinPipes(child); });
			child.setInteractive();
		});
		pipeGroup52.children.iterate(function (child) {
			child.name = 'pipe5';
			child.visible = true;
			child.alpha = 0;
			child.up = false;
			child.down = false;
			child.right = true;
			child.left = true;
			child.setDepth(4);
			child.water = false;
			child.tag = 'twin2';
			child.InPlay = true;
			child.twin = true;
			child.on('pointerdown', function () { rotateTwinPipes(child); });
			child.setInteractive();
		});
		pipeGroup53.children.iterate(function (child) {
			child.name = 'pipe5';
			child.visible = true;
			child.alpha = 0;
			child.up = false;
			child.down = false;
			child.right = true;
			child.left = true;
			child.setDepth(4);
			child.water = false;
			child.tag = 'twin3';
			child.InPlay = true;
			child.twin = true;
			child.on('pointerdown', function () { rotateTwinPipes(child); });
			child.setInteractive();
		});
		pipeGroup2.children.iterate(function (child) {
			child.name = 'pipe2';
			child.visible = true;
			child.alpha = 0;
			child.up = false;
			child.down = true;
			child.right = true;
			child.left = false;
			child.setDepth(4);
			child.water = false;
			child.InGame = true;
			child.InPlay = true;
			child.on('pointerdown', function () { rotatePipes(child); });
			child.setInteractive();
		});
		pipeGroup222.children.iterate(function (child) {
			child.name = 'pipe2';
			child.visible = true;
			child.alpha = 0;
			child.up = false;
			child.down = true;
			child.right = true;
			child.left = false;
			child.setDepth(4);
			child.water = false;
			child.isExit = true;
			child.tag = 'checkpipe';
			child.InPlay = true;
			child.on('pointerdown', function () { rotatePipes(child); });
			child.setInteractive();
		});
		pipeGroup61.children.iterate(function (child) {
			child.name = 'pipe6';
			child.visible = true;
			child.alpha = 0;
			child.up = false;
			child.down = true;
			child.right = true;
			child.left = false;
			child.setDepth(4);
			child.water = false;
			child.tag = 'twin1';
			child.InPlay = true;
			child.twin = true;
			child.on('pointerdown', function () { rotateTwinPipes(child); });
			child.setInteractive();
		});
		pipeGroup62.children.iterate(function (child) {
			child.name = 'pipe6';
			child.visible = true;
			child.alpha = 0;
			child.up = false;
			child.down = true;
			child.right = true;
			child.left = false;
			child.setDepth(4);
			child.water = false;
			child.tag = 'twin2';
			child.InPlay = true;
			child.twin = true;
			child.on('pointerdown', function () { rotateTwinPipes(child); });
			child.setInteractive();
		});
		pipeGroup63.children.iterate(function (child) {
			child.name = 'pipe6';
			child.visible = true;
			child.alpha = 0;
			child.up = false;
			child.down = true;
			child.right = true;
			child.left = false;
			child.setDepth(4);
			child.water = false;
			child.tag = 'twin3';
			child.InPlay = true;
			child.twin = true;
			child.on('pointerdown', function () { rotateTwinPipes(child); });
			child.setInteractive();
		});
		pipeGroup3.children.iterate(function (child) {
			child.name = 'pipe3';
			child.visible = true;
			child.alpha = 0;
			child.up = true;
			child.down = false;
			child.right = true;
			child.left = true;
			child.setDepth(4);
			child.water = false;
			child.InGame = true;
			child.InPlay = true;
			child.on('pointerdown', function () { rotatePipes(child); });
			child.setInteractive();
		});
		pipeGroup0.children.iterate(function (child) {
			child.name = 'empty';
			child.up = false;
			child.down = false;
			child.right = false;
			child.left = false;
			child.water = false;
		});
		pipeGroup10.children.iterate(function (child) {
			child.name = 'start';
			child.alpha = 0;
			child.up = true;
			child.down = true;
			child.right = true;
			child.left = true;
			child.water = true;
		});
		pipeGroup11.children.iterate(function (child) {
			child.name = 'filledEntrancePipe';
			child.alpha = 0;
			child.up = false;
			child.down = false;
			child.right = false;
			child.left = false;
			child.water = true;
		});
		pipeGroup20.children.iterate(function (child) {
			child.name = 'exit';
			child.alpha = 0;
			child.up = true;
			child.down = true;
			child.right = true;
			child.left = true;
			child.water = false;
			child.isExit = true;
			child.tag = 'exit';
		});
		pipeGroup21.children.iterate(function (child) {
			child.name = 'emptyExitPipe';
			child.alpha = 0;
			child.up = false;
			child.down = false;
			child.right = true;
			child.left = true;
			child.water = false;
			child.isExit = true;
		});
		shadeGroup.children.iterate(function (child) {
			child.alpha = 0;
			child.setDepth(3);
		});
	}

	function pipeRandomRotation() {
		var totalPipes = container.getAll('InGame', true);

		for (i = 0; i < totalPipes.length; i++) {
			var value = Phaser.Math.Between(0, 3);
			var angleToSet;

			if (totalPipes[i].name == 'pipe1') {
				if (value == 0) {
					angleToSet = 0;
					totalPipes[i].angle = angleToSet;
					totalPipes[i].up = false;
					totalPipes[i].down = false;
					totalPipes[i].right = true;
					totalPipes[i].left = true;
					totalPipes[i].value = 0;
					totalPipes[i].rot = 1;
				}
				if (value == 1) {
					angleToSet = 90;
					totalPipes[i].angle = angleToSet;
					totalPipes[i].up = true;
					totalPipes[i].down = true;
					totalPipes[i].right = false;
					totalPipes[i].left = false;
					totalPipes[i].value = 90;
					totalPipes[i].rot = 2;
				}
				if (value == 2) {
					angleToSet = 180;
					totalPipes[i].angle = angleToSet;
					totalPipes[i].up = false;
					totalPipes[i].down = false;
					totalPipes[i].right = true;
					totalPipes[i].left = true;
					totalPipes[i].value = 180;
					totalPipes[i].rot = 1;
				}
				if (value == 3) {
					angleToSet = 270;
					totalPipes[i].angle = angleToSet;
					totalPipes[i].up = true;
					totalPipes[i].down = true;
					totalPipes[i].right = false;
					totalPipes[i].left = false;
					totalPipes[i].value = 270;
					totalPipes[i].rot = 2;
				}
			}
			if (totalPipes[i].name == 'pipe2') {
				if (value == 0) {
					angleToSet = 0;
					totalPipes[i].angle = angleToSet;
					totalPipes[i].up = false;
					totalPipes[i].down = true;
					totalPipes[i].right = true;
					totalPipes[i].left = false;
					totalPipes[i].value = 0;
					totalPipes[i].rot = 1;
				}
				if (value == 1) {
					angleToSet = 90;
					totalPipes[i].angle = angleToSet;
					totalPipes[i].up = false;
					totalPipes[i].down = true;
					totalPipes[i].right = false;
					totalPipes[i].left = true;
					totalPipes[i].value = 90;
					totalPipes[i].rot = 2;
				}
				if (value == 2) {
					angleToSet = 180;
					totalPipes[i].angle = angleToSet;
					totalPipes[i].up = true;
					totalPipes[i].down = false;
					totalPipes[i].right = false;
					totalPipes[i].left = true;
					totalPipes[i].value = 180;
					totalPipes[i].rot = 3;
				}
				if (value == 3) {
					angleToSet = 270;
					totalPipes[i].angle = angleToSet;
					totalPipes[i].up = true;
					totalPipes[i].down = false;
					totalPipes[i].right = true;
					totalPipes[i].left = false;
					totalPipes[i].value = 270;
					totalPipes[i].rot = 4;
				}
			}
			if (totalPipes[i].name == 'pipe3') {
				if (value == 0) {
					angleToSet = 0;
					totalPipes[i].angle = angleToSet;
					totalPipes[i].up = true;
					totalPipes[i].down = false;
					totalPipes[i].right = true;
					totalPipes[i].left = true;
					totalPipes[i].value = 0;
					totalPipes[i].rot = 1;
				}
				if (value == 1) {
					angleToSet = 90;
					totalPipes[i].angle = angleToSet;
					totalPipes[i].up = true;
					totalPipes[i].down = true;
					totalPipes[i].right = true;
					totalPipes[i].left = false;
					totalPipes[i].value = 90;
					totalPipes[i].rot = 2;
				}
				if (value == 2) {
					angleToSet = 180;
					totalPipes[i].angle = angleToSet;
					totalPipes[i].up = false;
					totalPipes[i].down = true;
					totalPipes[i].right = true;
					totalPipes[i].left = true;
					totalPipes[i].value = 180;
					totalPipes[i].rot = 3;
				}
				if (value == 3) {
					angleToSet = 270;
					totalPipes[i].angle = angleToSet;
					totalPipes[i].up = true;
					totalPipes[i].down = true;
					totalPipes[i].right = false;
					totalPipes[i].left = true;
					totalPipes[i].value = 270;
					totalPipes[i].rot = 4;
				}
			}
		}

		var extraPipes1 = container.getAll('name', 'pipe1');

		for (i = 0; i < extraPipes1.length; i++) {
			var value2 = Phaser.Math.Between(0, 3);
			var angleToSet2;
			if (value2 == 0) {
				angleToSet2 = 0;
				extraPipes1[i].angle = angleToSet2;
				extraPipes1[i].up = false;
				extraPipes1[i].down = false;
				extraPipes1[i].right = true;
				extraPipes1[i].left = true;
				extraPipes1[i].value = 0;
				extraPipes1[i].rot = 1;
			}
			if (value2 == 1) {
				angleToSet2 = 90;
				extraPipes1[i].angle = angleToSet2;
				extraPipes1[i].up = true;
				extraPipes1[i].down = true;
				extraPipes1[i].right = false;
				extraPipes1[i].left = false;
				extraPipes1[i].value = 90;
				extraPipes1[i].rot = 2;
			}
			if (value2 == 2) {
				angleToSet2 = 180;
				extraPipes1[i].angle = angleToSet2;
				extraPipes1[i].up = false;
				extraPipes1[i].down = false;
				extraPipes1[i].right = true;
				extraPipes1[i].left = true;
				extraPipes1[i].value = 180;
				extraPipes1[i].rot = 1;
			}
			if (value2 == 3) {
				angleToSet2 = 270;
				extraPipes1[i].angle = angleToSet2;
				extraPipes1[i].up = true;
				extraPipes1[i].down = true;
				extraPipes1[i].right = false;
				extraPipes1[i].left = false;
				extraPipes1[i].value = 270;
				extraPipes1[i].rot = 2;
			}
		}
		var extraPipes2 = container.getAll('name', 'pipe2');
		for (i = 0; i < extraPipes2.length; i++) {
			var value3 = Phaser.Math.Between(0, 3);
			var angleToSet3;
			if (value3 == 0) {
				angleToSet3 = 0;
				extraPipes2[i].angle = angleToSet3;
				extraPipes2[i].up = false;
				extraPipes2[i].down = true;
				extraPipes2[i].right = true;
				extraPipes2[i].left = false;
				extraPipes2[i].value = 0;
				extraPipes2[i].rot = 1;
			}
			if (value3 == 1) {
				angleToSet3 = 90;
				extraPipes2[i].angle = angleToSet3;
				extraPipes2[i].up = false;
				extraPipes2[i].down = true;
				extraPipes2[i].right = false;
				extraPipes2[i].left = true;
				extraPipes2[i].value = 90;
				extraPipes2[i].rot = 2;
			}
			if (value3 == 2) {
				angleToSet3 = 180;
				extraPipes2[i].angle = angleToSet3;
				extraPipes2[i].up = true;
				extraPipes2[i].down = false;
				extraPipes2[i].right = false;
				extraPipes2[i].left = true;
				extraPipes2[i].value = 180;
				extraPipes2[i].rot = 3;
			}
			if (value3 == 3) {
				angleToSet3 = 270;
				extraPipes2[i].angle = angleToSet3;
				extraPipes2[i].up = true;
				extraPipes2[i].down = false;
				extraPipes2[i].right = true;
				extraPipes2[i].left = false;
				extraPipes2[i].value = 270;
				extraPipes2[i].rot = 4;
			}
		}
			
	}
	function pipeTwinControlledRotation() {
		var totalPipes = container.getAll('twin', true);

		var one = false;
		var two = false;
		var three = false;
		var four = false;
		var five = false;
		var six = false;
		var seven = false;
		var eight = false;
		var nine = false;
		var ten = false;
		var eleven = false;
		var twelve = false;

		for (i = 0; i < totalPipes.length; i++) {

			var angleToSet;

			switch (true) {
				case one == false:
					value = twinPos1;
					one = true;
					break;
				case two == false:
					value = twinPos2;
					two = true;
					break;
				case three == false:
					value = twinPos3;
					three = true;
					break;
				case four == false:
					value = twinPos4;
					four = true;
					break;
				case five == false:
					value = twinPos5;
					five = true;
					break;
				case six == false:
					value = twinPos6;
					six = true;
					break;
				case seven == false:
					value = twinPos7;
					seven = true;
					break;
				case eight == false:
					value = twinPos8;
					eight = true;
					break;
				case nine == false:
					value = twinPos9;
					nine = true;
					break;
				case ten == false:
					value = twinPos10;
					ten = true;
					break;
				case eleven == false:
					value = twinPos11;
					eleven = true;
					break;
				case twelve == false:
					value = twinPos12;
					twelve = true;
					break;
			}

			if (totalPipes[i].name == 'pipe5') {
				if (value == 0) {
					angleToSet = 0;
					totalPipes[i].angle = angleToSet;
					totalPipes[i].up = false;
					totalPipes[i].down = false;
					totalPipes[i].right = true;
					totalPipes[i].left = true;
					totalPipes[i].value = 0;
				}
				if (value == 90) {
					angleToSet = 90;
					totalPipes[i].angle = angleToSet;
					totalPipes[i].up = true;
					totalPipes[i].down = true;
					totalPipes[i].right = false;
					totalPipes[i].left = false;
					totalPipes[i].value = 90;
				}
				if (value == 180) {
					angleToSet = 180;
					totalPipes[i].angle = angleToSet;
					totalPipes[i].up = false;
					totalPipes[i].down = false;
					totalPipes[i].right = true;
					totalPipes[i].left = true;
					totalPipes[i].value = 180;
				}
				if (value == 270) {
					angleToSet = 270;
					totalPipes[i].angle = angleToSet;
					totalPipes[i].up = true;
					totalPipes[i].down = true;
					totalPipes[i].right = false;
					totalPipes[i].left = false;
					totalPipes[i].value = 270;
				}
			}
			if (totalPipes[i].name == 'pipe6') {
				if (value == 0) {
					angleToSet = 0;
					totalPipes[i].angle = angleToSet;
					totalPipes[i].up = false;
					totalPipes[i].down = true;
					totalPipes[i].right = true;
					totalPipes[i].left = false;
					totalPipes[i].value = 0;
				}
				if (value == 90) {
					angleToSet = 90;
					totalPipes[i].angle = angleToSet;
					totalPipes[i].up = false;
					totalPipes[i].down = true;
					totalPipes[i].right = false;
					totalPipes[i].left = true;
					totalPipes[i].value = 90;
				}
				if (value == 180) {
					angleToSet = 180;
					totalPipes[i].angle = angleToSet;
					totalPipes[i].up = true;
					totalPipes[i].down = false;
					totalPipes[i].right = false;
					totalPipes[i].left = true;
					totalPipes[i].value = 180;
				}
				if (value == 270) {
					angleToSet = 270;
					totalPipes[i].angle = angleToSet;
					totalPipes[i].up = true;
					totalPipes[i].down = false;
					totalPipes[i].right = true;
					totalPipes[i].left = false;
					totalPipes[i].value = 270;
				}
			}
		}
	}

	function rotatePipes(gameObject) {
		if (isRotating || isScaling) { return; }
		tweenRotatePipe(gameObject);
		tweenScalePipe(gameObject);
	}
	function rotateTwinPipes(gameObject) {
		if (isRotating || isScaling) { return; }
		if (gameObject.tag == 'twin1')
		{	
			var twinPipes1 = container.getAll('tag', 'twin1');
			for (i = 0; i < twinPipes1.length; i++) {
				tweenTwinRotatePipe(twinPipes1[i]);
				tweenTwinScalePipe(twinPipes1[i]);
				switchPipeDirections(twinPipes1[i]);
				if (i + 1 === twinPipes1.length)
				{
					waterDelay();
				}
			}
		}
		if (gameObject.tag == 'twin2')
		{
			var twinPipes2 = container.getAll('tag', 'twin2');
			for (i = 0; i < twinPipes2.length; i++) {
				tweenTwinRotatePipe(twinPipes2[i]);
				tweenTwinScalePipe(twinPipes2[i]);
				switchPipeDirections(twinPipes2[i]);
				if (i + 1 === twinPipes2.length)
				{
					waterDelay();
				}
			}
		}
		if (gameObject.tag == 'twin3')
		{
			var twinPipes3 = container.getAll('tag', 'twin3');
			for (i = 0; i < twinPipes3.length; i++) {
				tweenTwinRotatePipe(twinPipes3[i]);
				tweenTwinScalePipe(twinPipes3[i]);
				switchPipeDirections(twinPipes3[i]);
				if (i + 1 === twinPipes3.length)
				{
					waterDelay();
				}
			}
		}

	}

	function waterDelay()
	{
		game.time.addEvent({ delay: 150, callback: function() { firstWaterSourceSpread(); }});
		game.time.addEvent({ delay: 150, callback: function() { activateWater(); }});
	}
	function waterSuperDelay()
	{
		//game.time.addEvent({ delay: 10, callback: function() { firstWaterSourceSpread() }});
		game.time.addEvent({ delay: 10, callback: function() { activateWater(); }});
	}
	function tweenTwinRotatePipe(gameObject)
	{
		//if (isRotating) { return; };
		isRotating = true;
		flarie.playSound(pipeTurning);
		var theObjectAngle = gameObject.angle;
		game.tweens.add({
			targets: gameObject,
			props: { angle: theObjectAngle + 90 },
			duration: 150,
			onComplete: function () {
				isRotating = false;
				// switchPipeDirections(gameObject);
				//firstWaterSourceSpread();
				//activateWater();
				int = 0;
				if (gameObject.water == true)
				{
					activateParticle(gameObject);
					flarie.juice.vibrate();
					flarie.playSound(waterInPipe);
				}
			}
		});
	}
	function tweenTwinScalePipe(gameObject)
	{
		//if (isScaling) { return; };
		isScaling = true;
		game.tweens.add({
            targets: gameObject,
            scale: (0.5 , 0.4),
            yoyo: true,
            duration: 150,
            repeat: 0,
			onComplete: function ()
			{
				isScaling = false;
			}
        });
	}

	function tweenRotatePipe(gameObject)
	{
		if (isRotating) { return; }
		//console.log('What is rotation number before? ' + gameObject.rot);
		isRotating = true;
		var theObjectAngle = gameObject.angle;
		flarie.playSound(pipeTurning);
		game.tweens.add({
			targets: gameObject,
			props: { angle: theObjectAngle + 90 },
			duration: 150,
			onComplete: function () {
				isRotating = false;
				switchPipeDirections(gameObject);
				firstWaterSourceSpread();
				activateWater();
				int = 0;
				//console.log('What is rotation number after? ' + gameObject.rot);
				if (gameObject.water == true)
				{
					activateParticle(gameObject);
					flarie.juice.vibrate();
					//Sound to fill the pipe with water
					flarie.playSound(waterInPipe);
					//Sound that the pipe is turned
					//flarie.playSound(pipeTurning);
				} else {
					//Sound that the pipe is turned
					//flarie.playSound(pipeTurning);
				}
			}
		});
	}

	function tweenScalePipe(gameObject)
	{
		if (isScaling) { return; }
		isScaling = true;
		game.tweens.add({
            targets: gameObject,
            scale: (0.5 , 0.4),
            yoyo: true,
            duration: 150,
            repeat: 0,
			onComplete: function ()
			{
				isScaling = false;
			}
        });
	}
	//Change frame when checking water, keep all that are true water
	function firstWaterSourceSpread()
	{
		var updateExits = container.getAll('isExit', true);
		for (i = 0; i < updateExits.length; i++) {
			updateExits[i].water = false;
		}
		var pipesTocheck = container.getAll('InGame', true);
		for (i = 0; i < pipesTocheck.length; i++) {
			pipesTocheck[i].water = false;
		}
		var pipesTocheck2 = container.getAll('twin', true);
		for (i = 0; i < pipesTocheck2.length; i++) {
			pipesTocheck2[i].water = false;
		}
		var start = container.getByName('start');
		var list = searchPipeConnections(start);
		var northTile = list[0];
		var southTile = list[1];
		var westTile = list[2];
		var eastTile = list[3];
		var acceptedNorth = list[4];
		var acceptedSouth = list[5];
		var acceptedWest = list[6];
		var acceptedEast = list[7];

		if (acceptedNorth && northTile.water == false) { northTile.water = true; secondList.push(northTile);}
		if (acceptedSouth && southTile.water == false) { southTile.water = true; secondList.push(southTile);}
		if (acceptedWest && westTile.water == false) { westTile.water = true; secondList.push(westTile);}
		if (acceptedEast && eastTile.water == false) { eastTile.water = true; secondList.push(eastTile);}
		completeWaterFlowCheck(secondList);
	}
	function completeWaterFlowCheck(secondList)
	{		
		for (i = 0; i < secondList.length; i++) {
			if (secondList[i].water == true)
			{
				var list = searchPipeConnections(secondList[i]);
				var northTile = list[0];
				var southTile = list[1];
				var westTile = list[2];
				var eastTile = list[3];
				var acceptedNorth = list[4];
				var acceptedSouth = list[5];
				var acceptedWest = list[6];
				var acceptedEast = list[7];
		
				if (acceptedNorth && northTile.water == false) { 
					northTile.water = true; 
					secondList.push(northTile); 
				}
				if (acceptedSouth && southTile.water == false) { 
					southTile.water = true; 
					secondList.push(southTile); 
				}
				if (acceptedWest && westTile.water == false) { 
					westTile.water = true; 
					secondList.push(westTile); 
				}
				if (acceptedEast && eastTile.water == false) { 
					eastTile.water = true; 
					secondList.push(eastTile); 
				}
			}
		}
	}

	function preActivateWater() {
		var totalPipes = container.getAll('InGame', true);
		for (i = 0; i < totalPipes.length; i++) {
			if (totalPipes[i].water == true) {
			
				if (totalPipes[i].name == 'pipe1') {
					if (totalPipes[i].value == 0) {
						angleToSet = 90;
						totalPipes[i].angle = angleToSet;
						totalPipes[i].up = true;
						totalPipes[i].down = true;
						totalPipes[i].right = false;
						totalPipes[i].left = false;
					}
					if (totalPipes[i].value == 90) {
						angleToSet = 0;
						totalPipes[i].angle = angleToSet;
						totalPipes[i].up = false;
						totalPipes[i].down = false;
						totalPipes[i].right = true;
						totalPipes[i].left = true;
					}
					if (totalPipes[i].value == 180) {
						angleToSet = 270;
						totalPipes[i].angle = angleToSet;
						totalPipes[i].up = true;
						totalPipes[i].down = true;
						totalPipes[i].right = false;
						totalPipes[i].left = false;
					}
					if (totalPipes[i].value == 270) {
						angleToSet = 180;
						totalPipes[i].angle = angleToSet;
						totalPipes[i].up = false;
						totalPipes[i].down = false;
						totalPipes[i].right = true;
						totalPipes[i].left = true;
					}
				}
				if (totalPipes[i].name == 'pipe2') {
					if (totalPipes[i].value == 0) {
						angleToSet = 180;
						totalPipes[i].angle = angleToSet;
						totalPipes[i].up = true;
						totalPipes[i].down = false;
						totalPipes[i].right = false;
						totalPipes[i].left = true;

					}
					if (totalPipes[i].value == 90) {
						angleToSet = 270;
						totalPipes[i].angle = angleToSet;
						totalPipes[i].up = true;
						totalPipes[i].down = false;
						totalPipes[i].right = true;
						totalPipes[i].left = false;
					}
					if (totalPipes[i].value == 180) {
						angleToSet = 0;
						totalPipes[i].angle = angleToSet;
						totalPipes[i].up = false;
						totalPipes[i].down = true;
						totalPipes[i].right = true;
						totalPipes[i].left = false;
					}
					if (totalPipes[i].value == 270) {
						angleToSet = 90;
						totalPipes[i].angle = angleToSet;
						totalPipes[i].up = false;
						totalPipes[i].down = true;
						totalPipes[i].right = false;
						totalPipes[i].left = true;
					}
				}
			}
		}
		// checkWaterFlow();
		firstWaterSourceSpread();
	}

	function activateWater() {	
		var pipesTocheck = container.getAll('InPlay', true);
		for (i = 0; i < pipesTocheck.length; i++) {
			if (pipesTocheck[i].water == true) {
				pipesTocheck[i].setFrame(1);
			}
			if (pipesTocheck[i].water == false) {
				pipesTocheck[i].setFrame(0);
			}
		}
		var updateExits = container.getAll('isExit', true);
		for (i = 0; i < updateExits.length; i++) {
			if (updateExits[i].water == true) {
				updateExits[i].setFrame(3);
			}
			if (updateExits[i].water == false) {
				updateExits[i].setFrame(2);
			}
			if (updateExits[i].tag == 'checkpipe') {
				updateExits[i].setFrame(4);
			}
		}
		var updatecheckPoints = container.getAll('tag', 'checkpipe');
		for (i = 0; i < updatecheckPoints.length; i++) {
			if (updatecheckPoints[i].water == true) {
				updatecheckPoints[i].setFrame(5);
			}
			if (updatecheckPoints[i].water == false) {
				updatecheckPoints[i].setFrame(4);
			}
		}

		var exit = container.getAll('isExit', true);
		levelFinished = true;

		for (i = 0; i < exit.length; i++) {
			if (exit[i].water !== true) {
				levelFinished = false;
				break;
			}
		}

		if (levelFinished == true) {
			for (i = 0; i < pipesTocheck.length; i++) {
				pipesTocheck[i].disableInteractive();
			}
			tweenLevelComplete();
		}
		if (levelFinished == false) {
			secondList.length = 0;
		}
	}

	// searches and gets the tiles around the gameObject
	function searchPipeConnections(gameObject) {
		var int = container.getIndex(gameObject);
		var n = int - 9;
		var s = int + 9;
		var w = int - 1;
		var e = int + 1;

		var northTile = container.getAt(n);
		var southTile = container.getAt(s);
		var westTile = container.getAt(w);
		var eastTile = container.getAt(e);

		var acceptedNorth = false;
		var acceptedSouth = false;
		var acceptedWest = false;
		var acceptedEast = false;

		if (n >= container.length || 0 > n) { n = null; }
		if (s >= container.length || 0 > s) { s = null; }
		if (w >= container.length || 0 > w) { w = null; }
		if (e >= container.length || 0 > e) { e = null; }

		if (n !== null && northTile.down == true && gameObject.up == true) { acceptedNorth = true; }
		if (s !== null && southTile.up == true && gameObject.down == true) { acceptedSouth = true; }
		if (w !== null && westTile.right == true && gameObject.left == true) { acceptedWest = true; }
		if (e !== null && eastTile.left == true && gameObject.right == true) { acceptedEast = true; }

		return [northTile, southTile, westTile, eastTile, acceptedNorth, acceptedSouth, acceptedWest, acceptedEast];
	}
	// Checks what kind of pipe that has been rotated
	function switchPipeDirections(gameObject) {
		switch (true) {
			case gameObject.name == 'pipe1':
				switchPipe1(gameObject);
				break;
			case gameObject.name == 'pipe2':
				switchPipe2(gameObject);
				break;
			case gameObject.name == 'pipe3':
				switchPipe3(gameObject);
				break;
			case gameObject.name == 'pipe5':
				switchPipe1(gameObject);
				break;
			case gameObject.name == 'pipe6':
				switchPipe2(gameObject);
				break;
		}
	}

	function switchPipe1(gameObject) {
		switch (true) {
			case gameObject.up == true:
				gameObject.up = !gameObject.up;
				gameObject.down = !gameObject.down;
				gameObject.left = !gameObject.left;
				gameObject.right = !gameObject.right;
				break;
			case gameObject.up == false:
				gameObject.up = !gameObject.up;
				gameObject.down = !gameObject.down;
				gameObject.left = !gameObject.left;
				gameObject.right = !gameObject.right;
				break;
		}
	}

	function switchPipe2(gameObject) {
		switch (true) {
			case gameObject.down == true && gameObject.right == true:
				gameObject.right = !gameObject.right;
				gameObject.left = !gameObject.left;
				break;
			case gameObject.down == true && gameObject.left == true:
				gameObject.down = !gameObject.down;
				gameObject.up = !gameObject.up;
				break;
			case gameObject.up == true && gameObject.left == true:
				gameObject.left = !gameObject.left;
				gameObject.right = !gameObject.right;
				break;
			case gameObject.up == true && gameObject.right == true:
				gameObject.up = !gameObject.up;
				gameObject.down = !gameObject.down;
				break;
		}
	}

	function switchPipe3(gameObject) {
		switch (true) {
			case gameObject.up == true && gameObject.right == true && gameObject.left == true:
				gameObject.down = !gameObject.down;
				gameObject.left = !gameObject.left;
				break;
			case gameObject.up == true && gameObject.right == true && gameObject.down == true:
				gameObject.left = !gameObject.left;
				gameObject.up = !gameObject.up;
				break;
			case gameObject.right == true && gameObject.left == true && gameObject.down == true:
				gameObject.up = !gameObject.up;
				gameObject.right = !gameObject.right;
				break;
			case gameObject.up == true && gameObject.left == true && gameObject.down == true:
				gameObject.right = !gameObject.right;
				gameObject.down = !gameObject.down;
				break;
		}
	}

	function update() {
		if (!flarie.gameStarted) { return; }

		if (cursors.left.isDown) {
			userDied();
		}

		if(flarie.timerBar.getCurrentValue() < 0.66 && flarie.stars ==3){
			flarie.removeStar();
			starPoints = 2;
		}
		if(flarie.timerBar.getCurrentValue() < 0.33 && flarie.stars == 2){
			flarie.removeStar();
			starPoints = 1;
		}
		if(flarie.timerBar.getCurrentValue() < 0.01 && flarie.stars == 1){
			if(isRotating) { return; }
			if (levelFinished == true) {
				starPoints = 1;
			} else
			{
				flarie.removeStar();
				starPoints = 0;
			}
			var allInteractablePipes = container.getAll('InGame', true);
			for (i = 0; i < allInteractablePipes.length; i++) {
				allInteractablePipes[i].disableInteractive();
			}
		}
	}

	function tweenLevelComplete() {
		flarie.timerBar.pause();
		var pipesTocheck = container.getAll('water', true);

		for (i = 0; i < pipesTocheck.length; i++) {
			if (pipesTocheck[i].water == true) {
				pipesTocheck[i].setFrame(3);
			}
		}
		game.time.addEvent({ delay: 600, callback: function() { tweenUnfilledPipes(); }});
		flarie.playSound(successSound);
	}

	function tweenUnfilledPipes() {
		game.tweens.add({
			targets: container.getAll('water', false),
			props: { alpha: 0 },
			duration: 500,
			onComplete: function () {
				game.time.addEvent({ delay: 600, callback: function() { nextLevelText(); }});
				//levelScore();
			}
		});
	}


	function endGame()
	{
		flarie.juice.shake(0.1, 1000);
        var color = { r: 255, g: 255, b: 255 };
        flarie.juice.flash(color, 750);
		flarie.playSound(wrongSound);

		var allInteractablePipes = container.getAll('InGame', true);
		for (i = 0; i < allInteractablePipes.length; i++) {
			allInteractablePipes[i].disableInteractive();
		}

		starPoints = 0;
		game.time.addEvent({ delay: 600, callback: function() { nextLevelText(); }});
	}

	function startGame() {
		flarie.adventure.setState(true);
	}

	function userDied() {
		if (!flarie.gameStarted) { return; }
		flarie.endGame();
		game.tweens.killAll();
		shadeGroup.destroy(true);
		container.removeAll(true);
		waterEmitter.remove();

		// reset variables
		currentLevel = 0;
		isRotating = false;
		isScaling = false;
		int = 0;
		starOneLost = false;
		starTwoLost = false;
		starThreeLost = false;
		starPoints = 3;
		secondList = [];

		flarie.callApp();
	}
};
game(); 