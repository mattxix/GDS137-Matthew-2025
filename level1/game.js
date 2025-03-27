
var canvas;
var context;
var timer;
var interval = 1000/60;
var ball;
var background;


	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	
	const element = document.getElementById('myElement');
    
	ball = new Ball();
	background = new Screen();
	
	//------Declare the Player's speed on the x and y axis------
	ball.vx = 10;
	ball.vy = -8;
	//----------------------------------------------------
	//----
	background.width = canvas.width;
	background.height = canvas.height;
	
	//----
	timer = setInterval(animate, interval);





function animate()
{
	context.clearRect(0,0,canvas.width, canvas.height);	
	
	//----Movement Using the Player's move() function----
	ball.move();
	//---------------------------------------------------
	
	//--------------Bounce of Right----------------------
	if(ball.x > canvas.width - ball.width/2)
	{
		ball.vx = -ball.vx;	
		ball.color = "#f093f2"
	}
	//---------------------------------------------------
	//--------------Bounce of Left----------------------
	if(ball.x < (canvas.width - canvas.width) + ball.width/2)
	{
		ball.vx = -ball.vx;	
		ball.color = "#2245FF"
	}
	//---------------------------------------------------
	//--------------Bounce of Top----------------------
	if(ball.y < (canvas.height - canvas.height) + ball.width/2)
	{
		ball.vy = -ball.vy;	
		ball.color = "#124309"
	}
	//---------------------------------------------------
	//--------------Bounce of Top----------------------
	if(ball.y > canvas.height - ball.width/2)
	{
		ball.vy = -ball.vy;	
		ball.color = "#F3F3F9"
	}
	//---------------------------------------------------
	background.draw();
	ball.draw();
}
