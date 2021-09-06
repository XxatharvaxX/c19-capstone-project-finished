var rocketImg, rocket;
var spaceImg, space;
var ateroidImg;
var obstaclesGroup;
var gameState = "play";
var score;


function preload(){

    rocketImg = loadImage("rocket-removebg-preview.png");
    spaceImg = loadImage("space bgrnd.jpg");
    asteroidImg = loadImage("asteroid-removebg-preview.png");
}

function setup() {
    createCanvas(600,600);
    space = createSprite(300,300);
    space.addImage(spaceImg);
    space.scale = 2.5;

    rocket = createSprite(300,300,50,100);
    rocket.addImage(rocketImg);
    rocket.scale = 0.5;



    obstaclesGroup = new Group();

    score = 0;
 
}

function draw() {

   
      if (gameState === "play")
  {
    background(0);

    space.velocityY = 5;

    drawSprites();

    if(space.y > 600){
        space.y = space.height/2;
      }

      score = score + Math.round(frameCount/60);

      text("Score: "+score,500,50);

    if (keyDown("space"))
    {
      rocket.velocityY = -5;
    }

    if (keyDown("left_arrow"))
    {
      rocket.x = rocket.x -3;
    }

    if (keyDown("right_arrow"))
    {
      rocket.x = rocket.x +3;
    }

    rocket.velocityY = rocket.velocityY +0.8;

    spawnObstacles();

    if (obstaclesGroup.isTouching(rocket) || rocket.y > 600)
    {
      gameState = "end";
      rocket.destroy();
    }

    

  }

  if (gameState == "end")
  {
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("GAME OVER!",230,250);
  }

  
}

function spawnObstacles()
{
  if (frameCount%100 == 0)
  {
    var obstacle1 = createSprite(200,-50);
    obstacle1.addImage(asteroidImg);
    obstacle1.x = Math.round(random(120,400));
    obstacle1.velocityY = 3;
    obstacle1.lifeTime = 10;
    obstacle1.scale = 0.35;
    obstacle1.setCollider("circle",0,0,50);
    obstacle1.debug = true;
    obstaclesGroup.add(obstacle1);
  }

}