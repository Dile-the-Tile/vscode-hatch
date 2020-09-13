function setup() {
    createCanvas(400,400);
    textAlign(CENTER);
}

var score1 = 0;
var score2 = 0;
var letterIndex = 0;
var letterIndex2 = 0;
var netRadius = 30;
var netX = 200;
var netY = 50;
var aimL = 50;
var angle = 0;
var arrowSpeed = 0.1;
var settings = true;
var numOfTurns = 0;

var ball = {
    radius: 10,
    x: 200,
    y: 200,
    speedX: 0,
    speedY: 0,
    shot: false
};

var shootBall = function(angle) {
    if(!ball.shot) {
        ball.shot = true;
        ball.speedX = 12*cos(-angle);
        ball.speedY = 12*sin(-angle);
    }
};

var resetBall = function() {
    ball.shot = false;
    ball.speedX = 0;
    ball.speedY = 0;
    ball.x = random(100,300);
    ball.y = random(100,300);
};

var moveBall = function() {
    ball.x += ball.speedX;
    ball.y += ball.speedY;
    if(numOfTurns % 2 === 1) {
        if(dist(ball.x,ball.y,netX,netY) < netRadius) {
            score1 ++;
            resetBall();
        }
        if(ball.y < 0 || ball.y > 400 || ball.x < 0 || ball.x > 400){
            letterIndex ++;
            resetBall();
        }
    } else {
        if(dist(ball.x,ball.y,netX,netY) < netRadius) {
            score2 ++;
            resetBall();
        }
        if(ball.y < 0 || ball.y > 400 || ball.x < 0 || ball.x > 400){
            letterIndex2 ++;
            resetBall();
        }
    }
};

var drawBackground = function() {
    background(237,155,73);
    stroke(255);
    strokeWeight(2);
    noFill();
    arc(200,150,100,100,360,540);
    line(150,150,250,150);
    line(150,150,150,0);
    line(250,150,250,0);
    arc(200,75,300,300,360,540);
    line(50,75,50,0);
    line(350,75,350,0);
    stroke(0);
    strokeWeight(5);
    fill(247,134,145);
    rectMode(CENTER);
    rect(200,netY-netRadius-5,netRadius*3,10);
    noFill();
    ellipse(netX,netY,netRadius*2,netRadius*2);
};

var drawBall = function() {
    stroke(0);
    strokeWeight(3);
    fill(255,157,0);
    ellipse(ball.x,ball.y,ball.radius*2,ball.radius*2);
};

var drawAim = function() {
    if(ball.shot === false){
        stroke(0,9,255);
        strokeWeight(2);
        var lineX = ball.x + aimL*cos(angle);
        var lineY = ball.y - aimL*sin(angle);
        line(ball.x,ball.y,lineX,lineY);
        angle += arrowSpeed;
        angle = angle%360;
    }  
};

var drawLetters = function() {
    textSize(20);
    fill(0);
    text("Team Dogs\n" + score1, 100, 40);
    text("Team Cats\n" + score2, 300, 40);
    textSize(40);
    text("DOG".substring(0,letterIndex),100,350);
    text("CAT".substring(0,letterIndex2),300,350);
    if(letterIndex === "DOG".length) {
        text("CATS win", 200, 270);
        noLoop();
    }
    if(letterIndex2 === "CAT".length) {
        text("DOGS win", 200, 270);
        noLoop();
    }
};

const drawSettings1 = function() {
    rectMode(CORNER);
    background(237,155,73);
    fill(0);
    textSize(40);
    text("Welcome to HORSE", 200, 200);
    textSize(18);
    text("Select Difficulty", 200, 250);
    fill(180);
    rect(60,275,80,50);
    rect(160,275,80,50);
    rect(260,275,80,50);
    fill(0);
    text("EASY",width/4,305);
    text("MEDIUM",width/2,305);
    text("HARD",width/4*3,305);
};

function draw() {
    if(settings){
        drawSettings1();
    } else {
        drawBackground();
        drawBall();
        drawAim();
        drawLetters();
        moveBall();
    }
};

var mouseClicked = function() {
    if(settings){
        if(mouseY > 275 && mouseY < 325){
            if(mouseX > 60 && mouseX < 140){
                arrowSpeed = 0.1;
            }
            if(mouseX > 160 && mouseX < 240){
                arrowSpeed = 0.3;
            }
            if(mouseX > 260 && mouseX < 340){
                arrowSpeed = 0.5;
            }
            settings = false;
        }    
    }
};
function keyPressed() {
    if(!settings){
        if(keyCode === 32){
            shootBall(angle);
            numOfTurns ++;
        }  
    }
};