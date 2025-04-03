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
	ball = new GameObject(canvas.width / 2, canvas.height / 2 ,50,50);
    ball.vx = 8;
	ball.vy = -8;

	//Set the Animation Timer
	timer = setInterval(animate, interval);

function animate()
{
	//Erase the Screen
	context.clearRect(0,0,canvas.width, canvas.height);	
	ball.move();
	
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

    
   if (player.y < 0 + player.height/2){
    player.y = player.height / 2 ;
   }
   if (player.y > canvas.height - player.height/2){
    player.y = canvas.height - player.height / 2  ;
   }


    
    	//--------------Bounce of Right----------------------
	if(ball.x > canvas.width - ball.width/2)
        {
            ball.vx = -ball.vx;	
            
        }
        //---------------------------------------------------
        //--------------Bounce of Left----------------------
        if(ball.x < (canvas.width - canvas.width) - ball.width/2)
        {
            ball.x = canvas.width / 2;
            ball.y = canvas.width / 2;
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
        
        if(ball.hitTestObject(player)){
            ball.vx = -ball.vx;	
        }


	
	//Update the Screen
	player.drawRect();
	ball.drawCircle();
   
}