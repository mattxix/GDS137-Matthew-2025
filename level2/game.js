//Declare my variables

var canvas;
var context;
var timer;
//1000 ms or 1 second / FPS
var interval = 1000/60;
var player;

	//Set Up the Canvas
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	
	
	//Instantiate the Player
	player = new GameObject(50, canvas.height / 2 , 20, 100);
	boundryTop = new GameObject(canvas.width / 2, -1 , canvas.width, 1);
	boundryBottom = new GameObject(canvas.width / 2, canvas.height + 1 , canvas.width, 1);

	//Set the Animation Timer
	timer = setInterval(animate, interval);

function animate()
{
	//Erase the Screen
	context.clearRect(0,0,canvas.width, canvas.height);	
	
	
	//Move the Player to the right
	/*if(d)
	{
		console.log("Moving Right");
		player.x += 2;
	}
	if(a)
	{
		console.log("Moving Left");
		player.x += -2;
	}*/
	if(w)
	{
		console.log("Moving Up");
		player.y += -10;
	}
	if(s)
	{
		console.log("Moving Down");
		player.y += 10;
	}

    if(boundryTop.hitTestObject(player)){
        player.y = player.height / 2 ;
    }
    if(boundryBottom.hitTestObject(player)){
        player.y = canvas.height - player.height / 2  ;
    }
	
	//Update the Screen
	player.drawRect();
	boundry.drawRect();
}