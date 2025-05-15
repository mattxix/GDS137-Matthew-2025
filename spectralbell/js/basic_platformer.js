//Declare my variables

var canvas;
var context;
var timer;
var interval;
var player;
var explode;
var activate = 0;
var activate2 = 0;
var enemies = [];
var numEnemies;
var fireDirectionY;
var fireDirectionX;
var speed = 0;
var speedUnrounded;



	canvas = document.getElementById("canvas");
	canvas.addEventListener("mousemove", track);
	canvas.style.backgroundColor="#CCCCCF";
	var mouse = {x:0,y:0};
	context = canvas.getContext("2d");	

	player = new GameObject({x:100, y:canvas.height/2-100,});
	player.width = 50;
	player.height = 50;
	player.color = "#779ECB";

	explode = new GameObject({x:10000, y:5000,});
	explode.width = 250;
	explode.height = 250;
	explode.color = "#66ff33";

	

	/*platform0 = new GameObject();
		platform0.width = 200;
		platform0.x = platform0.width/2;
		platform0.y = canvas.height - platform0.height/2;
		platform0.color = "#66ff33";
	*/
	goal = new GameObject({width:24, height:50, x:canvas.width-50, y:100, color:"#00ffff"});
	

	var fX = .99;
	var fY = .98;
	
	var gravity = 0;

	interval = 1000/60;
	timer = setInterval(animate, interval);
	
function track(e)
{
	var rect = canvas.getBoundingClientRect();
	mouse.x = e.clientX - rect.left;
	mouse.y = e.clientY - rect.top;
}
function launch()
{
	gravity = .325;
	//player.vx = 25;
	var dx = mouse.x - player.x;
	var dy = mouse.y - player.y;
	var radians = Math.atan2(dy, dx);
	fireDirectionX = Math.cos(radians) * speed;
	fireDirectionY = Math.sin(radians) * speed;
	player.vx = fireDirectionX;
	player.vy = fireDirectionY;
	activate = 2;
}
function blowUp()
{
	activate = 2;
	explode.x = player.x; 
	explode.y = player.y; 
	player.x = -10000
}

//--------------Enemy Random Spawn----------------------
numEnemies = 12; 
var enemyColors = [
	"#bbabb3",
	"#a4909a",
	"#8c7680",
	"#756169",
	"#69585f",
	"#54474c",
	"#30272b"];
for (i = 0; i < numEnemies; i++)
{
	enemies[i] = new GameObject;
	var randSize = (Math.round(Math.random() * (70 - (55) + 1) + (55)));
	enemies[i].color = enemyColors[(Math.floor(Math.random() * (6.9 - (0)) + (0)))];
	enemies[i].width = randSize;
	enemies[i].height = randSize;
	enemies[i].x = (Math.random() * ((canvas.width - 75) - (canvas.width*.40) + 1) + (canvas.width*.40));
	enemies[i].y = (Math.random() * ((canvas.height - 75) - (0) + 1) + (0));
}
//==============================================


function animate()
{
	
	context.clearRect(0,0,canvas.width, canvas.height);	

	var dx = mouse.x - player.x;
	var dy = mouse.y - player.y;
	
	var dist = Math.sqrt(dx * dx + dy * dy);
	
	var radians = Math.atan2(dy, dx);
	
	if(w )
	{
		
	}

	if(a)
	{
	
	}
	if(d)
	{
		
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
	
	
	/*
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
	*/
	

		
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
	//==============================================
	//--------------Bounce of Left----------------------
	if(player.x < (canvas.width - canvas.width) + player.width/2)
	{
		player.vx = -player.vx;	
	}
	//==============================================
	//--------------Bounce of Top----------------------
	if(player.y < (canvas.height - canvas.height) + player.width/2)
	{
		player.vy = -player.vy;	
	}
	//==============================================
	//--------------Bounce of Bottom----------------------
	if(player.y > canvas.height - player.width/2)
	{
		player.y = canvas.height - player.width/2
		player.vy = -player.vy;	
	}
	//==============================================
	
	//--------------Point at mouse / drawing lines----------------------
	

	if (activate == 0){
	player.angle = radians * 180/Math.PI;
	speed = Math.round(dist/25);
	speedUnrounded = dist/25;
	context.save();
	context.strokeStyle = "#000000";
	context.beginPath();
	context.moveTo(player.x, player.y);
	context.lineTo(mouse.x , mouse.y);
	context.stroke();
	context.restore();
	context.font = "20px Trebuchet MS";
	context.fillStyle = "black";
	context.textAlign = 'center';
	context.fillText("Speed: " + speed + "mph", player.x, player.y - 50);

	var x = player.x;
	var y = player.y;
	var dx = mouse.x - player.x;
	var dy = mouse.y - player.y;
	var radians = Math.atan2(dy, dx);
	fireDirectionX = Math.cos(radians) * speedUnrounded;
	fireDirectionY = Math.sin(radians) * speedUnrounded;
	
	for (i=0; i < 100; i++){
		
		
		if (i % 2 == 0){
			context.save();
			context.strokeStyle ="#4664FF";
			context.beginPath();
			context.moveTo(x, y);
			context.lineTo(x + fireDirectionX , y + fireDirectionY);
			context.stroke();
			context.restore();
		}	
		fireDirectionY += .325;
		fireDirectionX *= fX;
		fireDirectionY *= fY;
		x += fireDirectionX;
		y += fireDirectionY;
		
		
	}

	}

	//spins player after launch
	if (activate != 0){
		player.angle += player.vx/(Math.PI*2*player.width/2)*360;
	}
	
	//==============================================
		

	//platform0.drawRect();

	//Show hit points
	player.drawRect();
	explode.drawCircle();
	
	goal.drawCircle();
	for (i = 0; i < enemies.length; i++)
		{
			enemies[i].drawRect();
		}
}

