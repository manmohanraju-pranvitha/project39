
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivaltime;
var PLAY=1;
var END=0;
var gamestate=PLAY;
var stopimg;
var background,backgroundimg;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 stopimg=loadImage("sprite_8.png");
 backgroundimg=loadImage("ooooo.jpg");
}



function setup() {
  createCanvas(400,400);
  background=createSprite(0,0,400,400);
  background.addImage(backgroundimg);
  background.scale=1.9;
monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
 // ground.velocityX=-5;
 // ground.x=ground.width/2;
 // console.log(ground.x);
 ground.visible=false;
  FoodGroup=createGroup();
  obstaclesGroup=createGroup();
 // monkey.setcollider("circle",0,0);
  
}


function draw() {
 // background("white");
 background.velocityX=-3;
 // stroke("white");
 // textSize(20);
 // fill("white");
  // text("survivaltime" + survivaltime,200,30);
  
  if(gamestate===PLAY){
    stroke("black");
    textSize(20);
    fill("black");
    survivaltime=Math.ceil(frameCount/frameRate())
   // text("survival Time: "+survivaltime,100,50);
  if(background.x<0){
    background.x=background.width/2;
  }
  if(keyDown("space") ){
    monkey.velocityY=-12;
  }
  monkey.velocityY=monkey.velocityY+0.5;
 
spawnbanana();
  spawnobstacles();
    
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
      survivaltime=survivaltime + 10;
      
    }
    if(obstaclesGroup.isTouching(monkey)){
gamestate=END;
      
    }
  }
  
 else if(gamestate===END){
    background.velocityX=0;
    monkey.velocityX=0;
    monkey.changeAnimation(stopimg);
   FoodGroup.setLifetimeEach(-1);
   obstaclesGroup.setLifetimeEach(-1);
   FoodGroup.setVelocityXEach(0);
   obstaclesGroup.setVelocityXEach(0);
    
  }
   monkey.collide(ground);
  drawSprites();
  stroke("white");
  textSize(20);
 fill("white");
   text("survivaltime" + survivaltime,200,30);
}
function spawnbanana(){
  if(frameCount% 80===0){
    banana=createSprite(180,60,40,10);
    banana.y=Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.velocityX=-4;
    banana.scale=0.1;
 banana.lifetime=100;
    FoodGroup.add(banana);
  }
}
function spawnobstacles(){
  if(frameCount% 300===0){
     obstacle=createSprite(200,330,10,40);
    obstacle.velocityX=-6;
    obstacle.addImage(obstacleImage);
  obstacle.lifetime=20;
    obstacle.scale=0.1;
    obstaclesGroup.add(obstacle);
  }
}





