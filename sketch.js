
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, survialTime;
var ground;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  

  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

  bananaImage = loadImage("banana.png");
 
  obstacleImage = loadImage("obstacle.png");
 
}


function setup() {
  //Canvas
  createCanvas(400,400);

  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  TimeGroup = createGroup();

  monkey = createSprite(50, 250, 10, 10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(70, 350, 800, 10);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  


  survialTime = 0;
  
}

function draw() {

  background (300);

  stroke("black");
    fill("black");
      textSize(20);
  
  text("Survial Time:"+  survialTime, 100, 50);

  monkey.collide(ground);
  //PLAY
  if(gameState === PLAY){
      monkey.changeAnimation("running", monkey_running);
    
    survialTime = survialTime+Math.round(getFrameRate()/30);
     console.log (getFrameRate());
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    if(keyDown("space")) {
        monkey.velocityY = -12;
    }    
    
    if(FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
     
    }

  monkey.velocityY = monkey.velocityY + 0.8;
  

  obstacleGroup.setLifetimeEach(-1);
  
  //Adding Functions
  food();
  obstacles();
    
    
      
    
    
    if(obstacleGroup.isTouching(monkey)){
        
        gameState = END;
      
    }
  }

   if (gameState === END) {
    
    FoodGroup.setLifetimeEach  (-1);
     obstacleGroup.setLifetimeEach  (-1);
ground.velocityX = 0;
     monkey.velocityY = 0;
     text("Game over", 100, 240);
      obstacleGroup.setVelocityXEach = 0;
     FoodGroup.setVelocityXEach = 0;
   }
 
  
  
 


  drawSprites();
}


function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400,350,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    FoodGroup.add(banana);
  }
}

function obstacles() {
  if (frameCount % 300 === 0){
    obstacle = createSprite(250,325,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacle.scale = 0.1 ;
     obstacleGroup.add(obstacle);
  }

}


 
 


