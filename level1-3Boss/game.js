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
	player = new GameObject(canvas.width/2, canvas.height - 50 , 250, 45);
    player.color = "#00ffff"
	ball = new GameObject(canvas.width / 2, canvas.height / 2 ,80,80);
    ball.color = "#ff00ff";
    speedY = 8;
    ball.vx = 0;
	ball.vy = 0;
    ball.force = 2;


	//Set the Animation Timer
	timer = setInterval(animate, interval);

function animate()
{
	//Erase the Screen
	context.clearRect(0,0,canvas.width, canvas.height);	
	ball.move();
    gravity
    context.font = "16px Arial";
    context.textAlign = 'left';
    context.fillText("Score: " + score, 80, 25);
    context.strokeStyle = "#555555";
    context.save();
    
    ball.vy += gravity;
    
	
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
   



    
    	//--------------Bounce of Right----------------------
	if(ball.x > canvas.width - ball.width/2)
        {
            ball.x = ball.x - ball.height/2;
            ball.vx = -ball.vx;
	        
            
        }
        //---------------------------------------------------
        //--------------Bounce of Left----------------------
        if(ball.x < (canvas.width - canvas.width) + ball.width/2)
        {
            ball.x = ball.x + ball.height/2;
            ball.vx = -ball.vx;
	       

        }
        
        //--------------Bounce of Top----------------------
        if(ball.y < (canvas.height - canvas.height) + ball.width/2)
        {
            ball.y = ball.y + ball.height/2;
            ball.vy = -ball.vy;	
            
        }
        //---------------------------------------------------
        //--------------Bounce of Bottom----------------------
        if(ball.y > canvas.height - ball.width/2)
        {
            ball.y = ball.y - ball.height/2;
            ball.vy = -ball.vy * .67;
            score = 0;
        }
        //---------------------------------------------------

        if(player.x - player.width / 2 < canvas.width - canvas.width){
            player.x = canvas.width - canvas.width + player.width /2;
        }
        if(player.x + player.width / 2 > canvas.width){
            player.x = canvas.width - player.width /2;
        }

        //player 1 
        if(ball.hitTestObject(player)){

            if(ball.x + ball.height / 2 > player.x - player.width / 6 && ball.x < player.x + player.width / 6) // Middle
                {
                    ball.y = ball.y - player.height /2 ;
                    ball.vy = -35;
                    console.log("middle");
                }else if(ball.x + ball.height / 2  < player.x - player.width / 3){ // Farleft
                    ball.y = ball.y - player.height /2;
                    ball.vx = -ball.force * 5;	
                    ball.vy = -35;	
                    console.log("Farleft");
                }else if(ball.x + ball.height / 2  < player.x - player.width / 6){ // closeleft
                    ball.y = ball.y - player.height /2;
                    ball.vx = -ball.force;	
                    ball.vy = -35;	
                    console.log("closeleft");
                } else if (ball.x + ball.height / 2  > player.x + player.width / 3) // Far Right
                    {
                        ball.y = ball.y - player.height /2;
                        ball.vx =  ball.force * 5;		
                        ball.vy = -35;
                        console.log("Far right");
                    
                } else if (ball.x + ball.height / 2  > player.x + player.width / 6) // closeRight
                    {
                        ball.y = ball.y - player.height /2;
                        ball.vx =  ball.force;		
                        ball.vy = -35;
                        console.log("closeright");
                    }
                    score += 1;	
        }
        



	
	//Update the Screen
    
    player.drawRect();
    ball.drawCircle();
    context.strokeStyle = "#000000";
    context.beginPath();
    context.moveTo(ball.x, ball.y);
    context.lineTo(player.x, player.y);
    context.closePath();
    context.lineWidth = 2; 
    context.stroke();
    context.restore();
   
}
