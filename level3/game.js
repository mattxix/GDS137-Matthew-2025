//Declare my variables

var canvas;
var context;
var timer;
//1000 ms or 1 second / FPS
var interval = 1000/60;
var player;
var speedY;
var p1Wins = 0;
var p2Wins = 0;

	//Set Up the Canvas
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	
	
	//Instantiate the Player
	player = new GameObject(50, canvas.height / 2 , 20, 100);
	player2 = new GameObject(canvas.width - 50, canvas.height / 2 , 20, 100);
	ball = new GameObject(canvas.width / 2, canvas.height / 2 ,25,25);
    speedY = 8;
    ball.vx = 8;
	ball.vy = 0;
    

	//Set the Animation Timer
	timer = setInterval(animate, interval);

function animate()
{
	//Erase the Screen
	context.clearRect(0,0,canvas.width, canvas.height);	
	ball.move();
    context.font = "20px Georgia";
    context.textAlign = 'center';
    context.fillText("Player 1 | Player 2", canvas.width / 2 + 1, 25);
    context.fillText(p1Wins + " - " + p2Wins, canvas.width / 2, 50);
    context.save();
    context.strokeStyle = "rgb(50, 75, 50)";
    context.beginPath();
    context.moveTo(canvas.width / 2, 0);
    context.lineTo(canvas.width / 2, canvas.height);
    context.closePath();
    context.lineWidth = 2; 
    context.stroke();
    context.restore();
	
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
	if(up)
	{
		console.log("Moving Up");
		player2.y += -10;
	}
	if(down)
	{
		console.log("Moving Down");
		player2.y += 10;
	}

    //player 1
   if (player.y < 0 + player.height/2){
    player.y = player.height / 2 ;
   }
   if (player.y > canvas.height - player.height/2){
    player.y = canvas.height - player.height / 2  ;
   }
   //player 2
   if (player2.y < 0 + player2.height/2){
    player2.y = player2.height / 2 ;
   }
   if (player2.y > canvas.height - player2.height/2){
    player2.y = canvas.height - player2.height / 2  ;
   }


    
    	//--------------Bounce of Right----------------------
	if(ball.x > canvas.width - ball.width/2)
        {
            ball.x = canvas.width / 2;
            ball.y = canvas.height / 2;
            ball.vx = -8;
	        ball.vy = 0;
            p1Wins += 1;
        }
        //---------------------------------------------------
        //--------------Bounce of Left----------------------
        if(ball.x < (canvas.width - canvas.width) - ball.width/2)
        {
            ball.x = canvas.width / 2;
            ball.y = canvas.height / 2;
            ball.vx = 8;
	        ball.vy = 0;
            p2Wins += 1;

        }
        
        //--------------Bounce of Top----------------------
        if(ball.y < (canvas.height - canvas.height) + ball.width/2)
        {
            ball.vy = -ball.vy;	
            
        }
        //---------------------------------------------------
        //--------------Bounce of Top----------------------
        if(ball.y > canvas.height - ball.width/2)
        {
            ball.vy = -ball.vy;	
        
        }
        //---------------------------------------------------
        //player 1 
        if(ball.hitTestObject(player)){

            if(ball.y > player.y - player.height / 6 && ball.y < player.y + player.height / 6) // Middle
                {
                    ball.vx = -ball.vx;
                    ball.vy = 0;
                }else if(ball.y < player.y - player.height / 6){ // Top
                    ball.vx = -ball.vx;	
                    ball.vy = -speedY;	
                } else if (ball.y > player.y + player.height / 6) // Bottom
                    {
                        ball.vx =  -ball.vx;	
                        ball.vy =  speedY;		
                    }
        }
        //player 2
        if(ball.hitTestObject(player2)){

            if(ball.y > player2.y - player2.height / 6 && ball.y < player2.y + player2.height / 6) // Middle
                {
                    ball.vx = -ball.vx;
                    ball.vy = 0;
                }else if(ball.y < player2.y - player2.height / 6){ // Top
                    ball.vx = -ball.vx;	
                    ball.vy = -speedY;	
                } else if (ball.y > player2.y + player2.height / 6) // Bottom
                    {
                        ball.vx =  -ball.vx;	
                        ball.vy =  speedY;		
                    }
        }


	
	//Update the Screen
	player.drawRect();
	player2.drawRect();
	ball.drawCircle();
    
   
}