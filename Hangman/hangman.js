function setup() {
    createCanvas(400,400);
}

var hangman = [['c','o','m','p','i','l','e','r'],
                ['c','o','d','e'],
                ['j','a','v','a','s','c','r','i','p','t'],
                ['t','e','c','h'],
                ['c','o','m','p','u','t','e','r'],
                ['i','t','e','r','a','t','i','o','n'],
                ['a','r','r','a','y']];
var correct = [];
var incorrect = [];
var selection = Math.floor(Math.random() * hangman.length);
var win = false;
var angle = 300;
var speed = 5;

const start1 = function() {
    background(13,12,13);
    fill(244,244,247);
    textSize(17);
    text("Guess the word!",19,20);
};

var drawSpaces = function() {
    for(var i = 0; i < hangman[selection].length; i++){
        fill(0);
        line(i*29+1,100,i*29+21,100);
    }  
};

var drawText = function() {
    for(var i = 0; i < hangman[selection].length; i ++){
        for(var j = 0; j < correct.length; j ++){
            if(correct[j] === hangman[selection][i]){
                fill(255);
                text(hangman[selection][i],i*29+5,95);
            }
        }
    }
};

var drawIncorrect = function() {
    for(var i = 0; i < incorrect.length; i ++){
        fill(255);
        text(incorrect[i],300,(i*23)+190);
    }  
};

var drawPerson = function() {
    stroke(245,235,245);
    noFill();
    line(100,150,100,350);
    line(100,150,200,150);
    line(200,150,200,180);
    if(incorrect.length > 0){
        ellipse(200,200,40,40);
    }
    if(incorrect.length > 1){
        line(200,220,200,280);
    }
    if(incorrect.length > 2){
        line(200,280,170,320);
    }
    if(incorrect.length > 3){
        line(200,280,230,320);
    }
    if(incorrect.length > 4){
        line(200,240,160,230);
    }
    if(incorrect.length > 5){
        line(200,240,240,230);
        fill(255,0,255);
        textSize(24);
        text("Game Over",140,380);
        fill(0,255,0);
        textSize(20);
        noLoop();
    }
};

var winScreen = function() {
    background(0);
    fill(255);
    textSize(50);
    text("You Win",100,100);
    fill(255,0,255);
    textSize(24);
    text("You Guessed The Word",75,380);
    tint(255);
};

var checkWin = function() {
    var total = 0;
    for(var i = 0; i < hangman[selection].length; i ++){
        for(var j = 0; j < correct.length; j ++){
            if(correct[j] === hangman[selection][i]){
                total ++;
            }
        }
    }
   if(total === hangman[selection].length){
        return true;
    } else {
        return false;
    }
};

function draw() {
    start1();
    drawSpaces();
    drawText();
    drawIncorrect();
    drawPerson();
    if(checkWin() === true){
        win = true;
        winScreen();
    }
};

function keyPressed() {
    const checkCorrect = function() {
        for(var i = 0; i < hangman[selection].length; i ++){
            if(key === hangman[selection][i]) {
                return true;
            }
        }  
        return false;   
    }
    console.log('a')
    if(checkCorrect() === true){
        correct.push(key);
    }
    if(checkCorrect() === false){
        incorrect.push(key);
    }
};
