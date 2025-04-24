//Declare my variables

var canvas;
var context;
var timer;
var interval;
var player;
var explode;
var activate = 0;
var activate2 = 0;


	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	

	player = new GameObject({x:100, y:canvas.height/2-100,});
	player.width = 50;
	player.height = 50;

	explode = new GameObject({x:10000, y:5000,});
	explode.width = 250;
	explode.height = 250;
	explode.color = "#66ff33";

	platform0 = new GameObject();
		platform0.width = 200;
		platform0.x = platform0.width/2;
		platform0.y = canvas.height - platform0.height/2;
		platform0.color = "#66ff33";
		
	goal = new GameObject({width:24, height:50, x:canvas.width-50, y:100, color:"#00ffff"});
	

	var fX = .99;
	var fY = .98;
	
	var gravity = 0;

	interval = 1000/60;
	timer = setInterval(animate, interval);
	
function launch()
{
	gravity = .325;
	player.vx = 20;
	activate = 2;
}
function blowUp()
{
	activate = 2;
	explode.x = player.x; 
	explode.y = player.y; 
	player.x = -10000
}

function animate()
{
	
	context.clearRect(0,0,canvas.width, canvas.height);	

	if(w )
	{
		
	}

	if(a)
	{
		//player.vx += -player.ax * player.force;
	}
	if(d)
	{
		//player.vx += player.ax * player.force;
	}
	if(sp && activate == 0)
	{
		activate = 1;
	}
	if (r)
	{
		player.x = 100;
		player.y = canvas.height/2-100;
		activate = 0;
		gravity = 0;
		player.vx = 0;
		player.vy = 0;
		activate2 = 0;
	}
	if (f && activate2 == 0)
	{
		activate2 = 1;
	}
	
	player.vy += gravity;

	player.vx *= fX;
	player.vy *= fY;
	
	if (activate == 1 )
	{
		launch();
	}
	if (activate2 == 1 )
	{
		blowUp();
		
	}
	
	player.x += Math.round(player.vx);
	player.y += Math.round(player.vy);
	
	

	while(platform0.hitTestPoint(player.bottom()) && player.vy >=0)
	{
		player.y--;
		player.vy = 0;
		player.canJump = true;
	}
	while(platform0.hitTestPoint(player.left()) && player.vx <=0)
	{
		player.x++;
		player.vx = 0;
	}
	while(platform0.hitTestPoint(player.right()) && player.vx >=0)
	{
		player.x--;
		player.vx = 0;
	}
	while(platform0.hitTestPoint(player.top()) && player.vy <=0)
	{
		player.y++;
		player.vy = 0;
	}
	

		
	if(player.hitTestObject(goal))
	{
		goal.y = 10000;
		context.textAlign = "center";
		context.drawText("You Win!!!", canvas.width/2, canvas.height/2);
	}

	//--------------Bounce of Right----------------------
	if(player.x > canvas.width - player.width/2)
	{
		player.vx = -player.vx;	
		player.x = canvas.width - player.width/2;
	}
	//---------------------------------------------------
	//--------------Bounce of Left----------------------
	if(player.x < (canvas.width - canvas.width) + player.width/2)
	{
		player.vx = -player.vx;	
	}
	//---------------------------------------------------
	//--------------Bounce of Top----------------------
	if(player.y < (canvas.height - canvas.height) + player.width/2)
	{
		player.vy = -player.vy;	
	}
	//---------------------------------------------------
	//--------------Bounce of Bottom----------------------
	if(player.y > canvas.height - player.width/2)
	{
		player.y = canvas.height - player.width/2
		player.vy = -player.vy;	
	}
	//---------------------------------------------------
	
	
	
	platform0.drawRect();

	//Show hit points
	player.drawCircle();
	explode.drawCircle();
	goal.drawCircle();
}

