function setup() {
    createCanvas(400,400);
}

var spriteRadius = 16;

var pipeGap = spriteRadius*9;
var pipeWidth = 40;
var distBetweenPipes = 400;
var pipeSpeed = 5;

var gravity = 0.7;
var jumpVelocity = gravity*-16;
var velocityY = 0;

var spriteX = 400/2;
var spriteY = 400/2;

var score = 0;
var scores = [];
var highscore = 0;
  
var menu = true;
var gameOver = false;

var pipes = [];
var lastIndex = 2;

var pipe = function(x,y) {
  this.x = x;
  this.y = y;
  this.canScore = true;
};

var drawPipes = function(i) {
    fill(0,170,0);
    rect(pipes[i].x,0,pipeWidth,pipes[i].y-pipeGap/2);
    rect(pipes[i].x,pipes[i].y+pipeGap/2,pipeWidth,height-pipes[i].y+pipeGap/2);
};

var setPipePosition = function(setX,setY,i) {
    pipes[i].x = setX;
    pipes[i].y = setY;
    pipes[i].canScore = true;
};

var pipeUpdates = function(i) {
  pipes[i].x -= pipeSpeed;
  if(pipes[i].x + pipeWidth < 0){
      setPipePosition(pipes[lastIndex++].x + distBetweenPipes,random(80,height-80),i);
      if(lastIndex === 3){
          lastIndex = 0;
      }
  }
};

var isColliding = function(birdX,birdY,i) {
    var pipeY = pipes[i].y - pipeGap/2;
    var pipeX = birdX;
    if(dist(pipeX,pipeY,birdX,birdY) <= spriteRadius && (pipeX >= pipes[i].x && pipeX <= pipes[i].x + pipeWidth)) {
        return true;
    }
    
    pipeY = pipes[i].y + pipeGap/2;
    if(dist(pipeX,pipeY,birdX,birdY) <= spriteRadius && (pipeX >= pipes[i].x && pipeX <= pipes[i].x + pipeWidth)) {
        return true;
    }
    
    if(birdX >= pipes[i].x && birdX <= pipes[i].x + pipeWidth) {
        if(birdY <= pipes[i].y - pipeGap /2 || birdY >= pipes[i].y + pipeGap/2) {
            return true;
        }    
    }
    
    return false;
};

var centerText = function(string,y) {
  textAlign(CENTER);
  fill(0);
  text(string,width/2,y+2);
  fill(255);
  text(string,width/2,y);
};

var updateSprite = function() {
  velocityY += gravity;
  spriteY += velocityY;
  translate(spriteX,spriteY);
  var rotation = constrain(velocityY/jumpVelocity*-45,-45,45);
  rotate(rotation);
  fill(255,242,0);
  rect(-spriteRadius*1.5,-spriteRadius*1.5,spriteRadius*3,spriteRadius*3);
  rotate(-rotation);
  translate(-spriteX,-spriteY);
};

var gameUpdates = function(i) {
    if(gameOver === false){
        pipeUpdates(i);
        if(pipes[i].x < spriteX && pipes[i].canScore === true){
            pipes[i].canScore = false;
            score ++;
        }
    }
    
    drawPipes(i);
    if(isColliding(spriteX,spriteY,i) === true){
        gameOver = true;
    }
        
    if(spriteY > height - spriteRadius) {
        gameOver = true;
    }
        
    if(gameOver){
        scores.push(score);
        for(var i = 0; i < scores.length; i ++){
            if(scores[i] >= highscore){
                highscore = scores[i];
            }
        }
    }
};

var drawText = function() {
  if(menu) {
    centerText("Flappy Box",height/2);
    textSize(20);
    centerText("Press space to start",height/2+60);
  } else if(gameOver){
      centerText("Game Over",height/2);
      textSize(20);
      centerText("Score: " + score, height/2+50);
      centerText("High Score: " + highscore, height/2 + 80);
  } else {
      centerText(score,50);
  }
};

var setupPipes = function() {
  for(var i = 0; i < 3; i ++){
      pipes.push(new pipe(700+i*distBetweenPipes,Math.random(80,400-80)));
  }  
};
setupPipes();

function draw() {
  textSize(40);
  background(0,200,255);
  if(!menu){
      for(var i = 0; i < pipes.length; i ++){
          gameUpdates(i);
      }
      updateSprite();
  }
  drawText();
};

var resetGame = function() {
  gameOver = false;
  menu = true;   
  spriteY = height/2-100;
  score = 0;
  velocityY = 0;
  lastIndex = 2;
  for(var i = 0; i < pipes.length; i ++){
      setPipePosition(450+i*distBetweenPipes,random(80,height-80),i);
  }
};

var mouseClicked = function() {
    if(!gameOver){
        velocityY = jumpVelocity;
    } else if(spriteY > height + spriteRadius) {
        resetGame();
        return;
    }
    
    if(menu === true) {
        menu = false;
    }
};

var keyPressed = function() {
  if(keyCode === 32){
    mouseClicked();
  }
};