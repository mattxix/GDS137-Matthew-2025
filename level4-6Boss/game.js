//Declare my variables

var canvas;
var context;
var timer;
//1000 ms or 1 second / FPS
var interval = 1000/60;
var player;
var speedY;
var score;
var gravity = 1;
score = 0;
var frictionX = .85;	
var frictionY = .97;



	//Set Up the Canvas
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
    
	
	//Instantiate the Player
	player = new GameObject(canvas.width/2, canvas.height - 50 , 50, 50);
    player.color = "#ffff00"
	ball = new GameObject(canvas.width / 2, canvas.height / 2 ,80,80);
    ball.color = "#ff00ff";

    var amount = 5;
    var amount2 = 5;
	var particlesSq = [];
	var particlesCir = [];
	var colors = ["Black", "#88ff88"];
	
	function Colorfunction(){
		player.color = "#ffff00"
	}

	for(var i = 0; i < amount; i++)
	{
		particlesSq[i] = new GameObject({width:1, height:1});
		particlesSq[i].width = 30;
		particlesSq[i].height = 30;
		var randomColor = Math.round(Math.random());
		particlesSq[i].color = colors[randomColor]
	
		particlesSq[i].x = Math.random() * canvas.width;
		particlesSq[i].y = Math.random() * canvas.height;
		particlesSq[i].vy = Math.random() * 10 + 5;
	}

	for(var i = 0; i < amount2; i++)
	{
		particlesCir[i] = new GameObject({width:1, height:1});
		particlesCir[i].width = 30;
		particlesCir[i].height = 30;
		var randomColor = Math.round(Math.random());
		particlesCir[i].color = colors[randomColor]
	
		particlesCir[i].x = Math.random() * canvas.width;
		particlesCir[i].y = Math.random() * canvas.height;
		particlesCir[i].vy = Math.random() * 10 + 5;
	}

	//Set the Animation Timer
	timer = setInterval(animate, interval);

function animate()
{
	//Erase the Screen
	context.clearRect(0,0,canvas.width, canvas.height);	
	ball.move();
    gravity
   
    
    
	
	//Move the Player to the right
	if(d)
        {	
            player.vx +=  player.ax * player.force;
        }
    if(a)
        {
            player.vx += player.ax * -player.force;
        }
    player.x += player.vx;
	player.y += player.vy;
    if(d)
        {	
            player.vx += player.ax * player.force;
        }
    if(a)
        {
            player.vx += player.ax * -player.force;
        }
    player.vx *= frictionX;
    player.x += player.vx;
	/*if(w)
	{
		console.log("Moving Up");
		player.y += -10;
	}
	if(s)
	{
		console.log("Moving Down");
		player.y += 10;
	}
	if(up)
	{
		console.log("Moving Up");
		player.y += -10;
	}
	if(down)
	{
		console.log("Moving Down");
		player.y += 10;
	}*/

    //player 1
   if (player.y < 0 + player.height/2){
    player.y = player.height / 2 ;
   }

   if (player.y > canvas.height - player.height/2){
    player.y = canvas.height - player.height / 2  ;
   }

   
   for(var p = 0; p < particlesSq.length; p++)
	{	
		particlesSq[p].x += particlesSq[p].vx;
		particlesSq[p].y += particlesSq[p].vy;
			
		if(particlesSq[p].hitTestObject(player)){
 
            particlesSq[p].y = canvas.height + 1000;
			player.color = "#00ff00"
			score++;
			setTimeout(Colorfunction, 500);

        }

		if(particlesSq[p].y > canvas.height + particlesSq[p].height/2)
		{
			particlesSq[p].y = 0 - particlesSq[p].height/2
			particlesSq[p].x = (Math.random() * (canvas.width - 0 + 1) + 0);
			particlesSq[p].vy = (Math.random() * (5 - 3 + 1) + 3);
			var randomColor = Math.round(Math.random());
			particlesSq[p].color = colors[randomColor]
		}
		
		particlesSq[p].drawRect();
	}

   for(var p = 0; p < particlesCir.length; p++)
	{	
		particlesCir[p].x += particlesCir[p].vx;
		particlesCir[p].y += particlesCir[p].vy;
			
		if(particlesCir[p].hitTestObject(player)){
 
            particlesCir[p].y = canvas.height + 1000;
			player.color = "#ff0000"
			score = 0;
			setTimeout(Colorfunction, 500);
			for(var j = 0; j < particlesCir.length; j++){
				particlesCir[j].y = 0 - particlesCir[j].height/2;
				particlesCir[j].x = (Math.random() * (canvas.width - 0 + 1) + 0);
				particlesCir[j].vy = (Math.random() * (5 - 3 + 1) + 3);
				var randomColor = Math.round(Math.random());
				particlesCir[j].color = colors[randomColor]

				particlesSq[j].y = 0 - particlesSq[j].height/2
				particlesSq[j].x = (Math.random() * (canvas.width - 0 + 1) + 0);
				particlesSq[j].vy = (Math.random() * (5 - 3 + 1) + 3);
				var randomColor = Math.round(Math.random());
				particlesSq[j].color = colors[randomColor]
			}
			
        }

		if(particlesCir[p].y > canvas.height + particlesCir[p].height/2)
		{
			particlesCir[p].y = 0 - particlesCir[p].height/2
			particlesCir[p].x = (Math.random() * (canvas.width - 0 + 1) + 0);

			particlesCir[p].vy = (Math.random() * (5 - 3 + 1) + 3);
			var randomColor = Math.round(Math.random());
			particlesCir[p].color = colors[randomColor]
		}
		
		particlesCir[p].drawCircle();
	}

	if(player.x > canvas.width - player.width/2){
		player.x = canvas.width - player.width/2;
	}
	if(player.x < player.width/2){
		player.x = player.width/2;
	}
	

    
       


	
	//Update the Screen
    
    player.drawRect();
    context.font = "bold 30px Arial";
    context.textAlign = 'left';
    context.fillText("Score: " + score, 50, 50);
    context.strokeStyle = "#555555";
    context.save();
   
}
