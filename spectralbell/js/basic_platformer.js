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
var score = 0;
var flag = 0;
var ammo = 5;
var expoAmmo = 3;
var enemysOut = 0;
var minus = 0;
var bPlat;
var RPlat;
var start = 0;
var state = 'menu';
var button;
var ibutton;
var stateFlag = 0;
var state = menu;


	canvas = document.getElementById("canvas");
	canvas.addEventListener("mousemove", track);
	var mouse = {x:0,y:0};
	context = canvas.getContext("2d");	
	function reset(){

		canvas.style.backgroundColor="#392c31";
		

		player = new GameObject({x:100, y:canvas.height/2-100,});
		player.width = 50;
		player.height = 50;
		player.color = "#28b7c2";

		explode = new GameObject({x:10000, y:5000,});
		explode.width = 250;
		explode.height = 250;
		explode.color = "#286ac2";

		bPlat = new GameObject({x:700, y:canvas.height,});
		bPlat.width = 250;
		bPlat.height = 25;
		bPlat.color = "#28b7c2";
		bPlat.vx = 4;

		RPlat = new GameObject({x:canvas.width, y:500,});
		RPlat.width = 25;
		RPlat.height = 250;
		RPlat.color = "#28b7c2";
		RPlat.vy = 4;

		button = new GameObject({x:canvas.width/2, y:canvas.height/2 + 135,});
		button.width = 300;
		button.height = 75;
		button.color = "#28b7c2";

		ibutton = new GameObject({x:canvas.width/2, y:canvas.height/2 + 250,});
		ibutton.width = 300;
		ibutton.height = 75;
		ibutton.color = "#28b7c2";
		ammo = 5;
		expoAmmo = 3; 
		speed = 0;

		//--------------Enemy Random Spawn----------------------
		numEnemies = 12; 
		var enemyColors = [
			"#87231c",
			"#741e18",
			"#611914",
			"#4d1410"
			];
		for (i = 0; i < numEnemies; i++)
		{
			enemies[i] = new GameObject;
			var randSize = (Math.round(Math.random() * (70 - (55) + 1) + (55)));
			enemies[i].color = enemyColors[(Math.floor(Math.random() * (3.9 - (0)) + (0)))];
			enemies[i].width = randSize;
			enemies[i].height = randSize;
			enemies[i].x = (Math.random() * ((canvas.width - 75) - (canvas.width*.40) + 1) + (canvas.width*.40));
			enemies[i].y = Math.random() * (canvas.height - 75 * 2) + 75;
			enemies[i].hit = false;
		}
		//==============================================

		player.x = 100;
		player.y = canvas.height/2-100;
		activate = 0;
		gravity = 0;
		player.vx = 0;
		player.vy = 0;
		activate2 = 0;
		minus = 0;
		score = 0;
		enemysOut = 0

		
	}
	reset();

	
	

	/*platform0 = new GameObject();
		platform0.width = 200;
		platform0.x = platform0.width/2;
		platform0.y = canvas.height - platform0.height/2;
		platform0.color = "#66ff33";
	*/
	//goal = new GameObject({width:24, height:50, x:canvas.width-50, y:100, color:"#00ffff"});
	

	var fX = .99;
	var fY = .98;
	
	var gravity = 0;

	interval = 1000/60;
	timer = setInterval(animate, interval);
function menu(){
		
		context.restore();
		context.clearRect(0,0,canvas.width, canvas.height);	
		button.drawRect();
		ibutton.drawRect();
		context.restore();
		context.font = "100px Trebuchet MS";
    	context.textAlign = 'center';
		context.fillStyle = "white";
    	context.fillText("Spectral Bell", canvas.width/2, canvas.height/2);
    	context.save();
		/*
		context.restore();
		context.font = "25px Trebuchet MS";
    	context.textAlign = 'center';
		context.fillStyle = "white";
    	context.fillText("Final Score: " + score, canvas.width/2, canvas.height/2 + 50);
    	context.save();
		*/
		context.restore();
		context.font = "40px Trebuchet MS";
		context.fillStyle = "white";
		context.textAlign = 'center';
		context.fillText("Press to Start", canvas.width/2, canvas.height/2 + 150);
		context.save();

		context.restore();
		context.font = "40px Trebuchet MS";
		context.fillStyle = "white";
		context.textAlign = 'center';
		context.fillText("Instructions", canvas.width/2, canvas.height/2 + 265);
		context.save();
		canvas.addEventListener('click', function(e) {
    		var rect = canvas.getBoundingClientRect();
    		var mouseX = e.clientX - rect.left;
    		var mouseY = e.clientY - rect.top;
    		if (mouseX >= button.x - button.width / 2 &&
    		    mouseX <= button.x + button.width / 2 &&
    		    mouseY >= button.y - button.height / 2 &&
    		    mouseY <= button.y + button.height / 2) 
			{
    		    reset();
				state = game;
    		}
		});
		canvas.addEventListener('click', function(e) {
    		var rect = canvas.getBoundingClientRect();
    		var mouseX = e.clientX - rect.left;
    		var mouseY = e.clientY - rect.top;
    		if (mouseX >= ibutton.x - ibutton.width / 2 &&
    		    mouseX <= ibutton.x + ibutton.width / 2 &&
    		    mouseY >= ibutton.y - ibutton.height / 2 &&
    		    mouseY <= ibutton.y + ibutton.height / 2) 
			{
				state = instructions;
    		}
		});
	
}
function instructions()
{
		context.clearRect(0,0,canvas.width, canvas.height);	
		context.drawImage(ints, 0, 0);
		button.drawRect();
		context.restore();
		context.font = "40px Trebuchet MS";
		context.fillStyle = "white";
		context.textAlign = 'center';
		context.fillText("Press to Start", canvas.width/2, canvas.height/2 + 150);
		context.save();
}
function win(){
		player.x = canvas.width/2;
		player.y = canvas.height/2;
		player.vy = 0;
		player.vx = 0;

		context.restore();
		context.clearRect(0,0,canvas.width, canvas.height);
		button.drawRect();	
		context.restore();
		context.font = "100px Trebuchet MS";
    	context.textAlign = 'center';
		context.fillStyle = "white";
    	context.fillText("GOOD WIN!", canvas.width/2, canvas.height/2);
    	context.save();

		context.restore();
		context.font = "25px Trebuchet MS";
    	context.textAlign = 'center';
		context.fillStyle = "white";
    	context.fillText("Final Score: " + score, canvas.width/2, canvas.height/2 + 50);
    	context.save();

		context.restore();
		context.font = "40px Trebuchet MS";
		context.fillStyle = "white";
		context.textAlign = 'center';
		context.fillText("Play Again?", canvas.width/2, canvas.height/2 + 150);
		context.save();
		canvas.addEventListener('click', function(e) {
    		var rect = canvas.getBoundingClientRect();
    		var mouseX = e.clientX - rect.left;
    		var mouseY = e.clientY - rect.top;
    		if (mouseX >= button.x - button.width / 2 &&
    		    mouseX <= button.x + button.width / 2 &&
    		    mouseY >= button.y - button.height / 2 &&
    		    mouseY <= button.y + button.height / 2) 
			{
				stateFlag = 1;
    		    reset();
				state = game;
    		}
		});
}
function lose(){
		context.clearRect(0,0,canvas.width, canvas.height);	
		button.drawRect();
		context.restore();
		context.font = "100px Trebuchet MS";
    	context.textAlign = 'center';
		context.fillStyle = "white";
    	context.fillText("GAME OVER...", canvas.width/2, canvas.height/2);
    	context.save();

		context.restore();
		context.font = "40px Trebuchet MS";
		context.fillStyle = "white";
		context.textAlign = 'center';
		context.fillText("Play Again?", canvas.width/2, canvas.height/2 + 150);
		context.save();
		canvas.addEventListener('click', function(e) {
    		var rect = canvas.getBoundingClientRect();
    		var mouseX = e.clientX - rect.left;
    		var mouseY = e.clientY - rect.top;
    		if (mouseX >= button.x - button.width / 2 &&
    		    mouseX <= button.x + button.width / 2 &&
    		    mouseY >= button.y - button.height / 2 &&
    		    mouseY <= button.y + button.height / 2) 
			{
				console.log("h");
				stateFlag = 1;
				reset();
				state = game;
				
    		}
		});
}

function minusScore(){
	score -= 100;
	minus = 1;
}

function peggle(enemy){
	enemy.x = 7000;
}

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
function expoOff(){
	explode.x = 8000;
}
function blowUp()
{
	activate = 2;
	var tempX = player.x;
	var tempY = player.y;
	explode.x = tempX; 
	explode.y = tempY; 
	flag = 2;
	player.x = -10000
	setTimeout(expoOff, 400)
}


function game(){
	context.clearRect(0,0,canvas.width, canvas.height);	
	
	var dx = mouse.x - player.x;
	var dy = mouse.y - player.y;
	
	var dist = Math.sqrt(dx * dx + dy * dy);
	
	var radians = Math.atan2(dy, dx);
	
	if(w )
	{
		player.y += -6;
	}

	if(s)
	{
		player.y += 6;
	}
	if(d)
	{
		
	}
	if(sp && activate == 0 && ammo > 0)
	{
		ammo -= 1;
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
		minus = 0;
	}
	if (f && activate2 == 0 && expoAmmo > 0)
	{
		expoAmmo -= 1;
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
		activate2 = 5;
		
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
	
	//-------------Borders-------------
	if(player.y < 75 && activate == 0){
		player.y = 76;
	}
	if(player.y > canvas.height - 75 && activate == 0){
		player.y = canvas.height - 76;
	}

		
	

	//--------------Bounce of Right----------------------
	if((player.hitTestObject(RPlat)))
	{
		player.vx = -player.vx;	
		player.x = canvas.width - player.width/2;
		RPlat.x = 4000;
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
	//--------------Reset Bottom----------------------
	if(player.y > (canvas.height) + player.width*7)
	{
		player.x = 100;
		player.y = canvas.height/2-100;
		activate = 0;
		gravity = 0;
		player.vx = 0;
		player.vy = 0;
		activate2 = 0;
		if (minus != 1)
		minusScore();
		minus = 0;
			
	}
	//==============================================
	//--------------reset right----------------------
	if(player.x > (canvas.width) + player.width*4)
	{
		player.x = 100;
		player.y = canvas.height/2-100;
		activate = 0;
		gravity = 0;
		player.vx = 0;
		player.vy = 0;
		activate2 = 0;
		if (minus != 1)
		minusScore();
		minus = 0;	
	}
	//==============================================
	//--------------Bounce of Bottom----------------------
	
	if((player.hitTestObject(bPlat)))
	{
		player.y = canvas.height - player.width/2
		player.vy = -player.vy;	
		bPlat.y = 4000;
		
	}
	
	
	//==============================================
	
	//--------------Point at mouse / drawing lines----------------------
	

	if (activate == 0){
	player.angle = radians * 180/Math.PI;
	speed = Math.round(dist/25);
	speedUnrounded = dist/25;
	context.save();
	context.strokeStyle = "white";
	context.beginPath();
	context.moveTo(player.x, player.y);
	context.lineTo(mouse.x , mouse.y);
	context.stroke();
	context.restore();
	context.font = "20px Trebuchet MS";
	context.fillStyle = "white";
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
			context.strokeStyle ="#7ed3da";
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

	bPlat.move();
	if (bPlat.x <= 0 + bPlat.width/2 || bPlat.x >= canvas.width - bPlat.width/2) {
    bPlat.vx *= -1; 
}
	RPlat.move();
	if (RPlat.y <= 0 + RPlat.height/2 || RPlat.y >= canvas.height - RPlat.height/2) {
    RPlat.vy *= -1; 
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
	

	
	//goal.drawCircle();
	for (i = 0; i < enemies.length; i++)
		{
			let enemy = enemies[i];

			if (!enemy.hit){
				if(player.hitTestObject(enemy))
				{
					//Bounce of the enemies
					player.vy = -player.vy;
					if(player.x < enemy.x - player.width/2){
						//player.vx = -player.vx;
					}

					enemy.color = "000000";
					enemy.hit = true;
					score+= 100;
					enemysOut ++;
					setTimeout(() => peggle(enemy), 500);
					//enemy.x = 7000;
					//player.vx = -player.vx;
				}
				if(explode.hitTestObject(enemy))
				{
					enemy.x = 9000;
					enemy.hit = true;
					score+= 100;
					enemysOut ++;
				}

				}

			enemy.drawCircle();
		}

	
	context.font = "30px Trebuchet MS";
    context.textAlign = 'right';
	context.fillStyle = "white";
    context.fillText("Score: " + score, canvas.width - 50, 50);
    context.save();

	context.restore();
	context.font = "30px Trebuchet MS";
    context.textAlign = 'right';
	context.fillStyle = "white";
    context.fillText("Balls Left: " + ammo, canvas.width - 50, 100);
    context.save();

	context.restore();
	context.font = "30px Trebuchet MS";
    context.textAlign = 'right';
	context.fillStyle = "white";
    context.fillText("Explosions Left: " + expoAmmo, canvas.width - 50, 150);
    context.save();
	
	/*if(player.y > canvas.height + player.width/2 + 50)
	{
		context.restore();
		context.font = "50px Trebuchet MS";
		context.fillStyle = "white";
		context.textAlign = 'center';
		context.fillText("Press R to Reset Ball...", canvas.width/2, canvas.height - 50);
		context.save();
		if (minus != 1)
		minusScore();
		
	}*/
	bPlat.drawRect();
	RPlat.drawRect();
	stateFlag = 0;

	if(ammo <= 0 && stateFlag == 0 && (player.y > canvas.height + player.width/2 || player.x > canvas.width + player.width/2)){
		state = lose;
	}
}

function animate()
{
	state();
	if (enemysOut >= numEnemies && stateFlag == 0)
	{
		state = win;
	}
	
}
