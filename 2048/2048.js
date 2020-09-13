function setup() {
    createCanvas(400,400);
    textAlign(CENTER);
    noStroke();
}

var tileColours = [(0,192,180),(0,228,218),(0,224,200),(0,177,121),(0,149,99),(0,124,95),(0,88,59),(0,207,114),(0,204,97),(20,200,80),(0,197,63),(0,195,8)];
var grid = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
var res = false;
var score = 0;
var tick = 0;

var getEmptyTiles = function() {
    //store the value of each tile
  var coords = [];
  //it is 0-3 bcs there are 4 tiles 
  for(var x = 0; x <= 3; x ++){
      for(var y = 0; y <= 3; y ++){
          //the first index refers to which 
          if(!grid[x][y]){
              coords.push({x: x, y: y});
          }
      }
  }
  //return works like a break and gives out a value for the entire funciton
  return coords;
};

var canMerge = function() {
  for(var x = 0; x <= 3; x ++){
      for(var y = 0; y <= 3; y ++){
          if(x > 0 && grid[x][y] === grid[x - 1][y]){
              return true;
          }
          else if(y > 0 && grid[x][y] === grid[x][y - 1]){
              return true;
          }
      }
  }
    return false;
};

var addTile = function() {
  var free = getEmptyTiles();
  var pos = free[Math.floor(random(free.length))];
  
  if(random() < 0.75){
      grid[pos.x][pos.y] = 1;
  } else {
      grid[pos.x][pos.y] = 2;
  }
  tick = 15;
  if(free.length === 1 && !canMerge()){
      res = 'lose';
  }
};

//starting tiles
for(var i = 0; i <= random(2,5); i ++){
      addTile();
}

var transpose = function(cc) {
    var tempGrid = [];
    
    for(var y = 0; y <= 3; y ++){
        var row = [];
        for(var x = 0; x <= 3; x ++){
            // cc returns x else return 3 - x
            row.push(grid[cc ? x : 3 - x][cc ? 3 - y : y]);
        }
        tempGrid.push(row);
    }
    return tempGrid;
};

var moveTiles = function() {
  var move = false;
  
  for(var i = 0; i <= 3; i ++){
      var merged = false;
      
      for(var j = 0; j <= 3; j ++){
          if(grid[j][i]){
              var movedX = j;
              
              for(var k = 0; k < j; k ++){
                  if(!grid[k][i]){
                      grid[k][i] = grid[j][i];
                      grid[j][i] = 0;
                      
                      movedX = k;
                      move = true;
                      break;
                  }
              }
              
                  if(merged){
                      merged = false;
                  }if(movedX && grid[movedX - 1][i] === grid[movedX][i]) {
                      score += pow(2, grid[movedX][i] + 1);
                      
                      grid[movedX - 1][i]++;
                      grid[movedX][i] = 0;
                      merged = true;
                      move = true;
                      
                      if(grid[movedX - 1][i] === 11){
                          res = "win";
                      }
                  }
              }
          }
      }
  
  
  return move;
};

const drawBoard = function() {
  background(237);
  
  textSize(42);
  textAlign(LEFT);
  fill(0);
  text("2048",35,60);
  textSize(14);
  text("How To Play: Use the arrow keys to move the tiles", 35,375);
  fill(100);
  text("join the numbers to get the 2048 tile!", 35,80);
  
  fill(187,173,160);
  rect(70,90,260,260,3);
  rect(200,20,130,40,3);
  
  fill(255);
  text('Score', 245, 33);
  textSize(20);
  text(score,244,53);
  
  textAlign(CENTER,CENTER);
  for(var x = 0; x <= 3; x ++){
      for(var y = 0; y <= 3; y ++){
          fill(tileColours[grid[x][y]]);
          rect(77 + (x * 63), 97 + (y * 63),57,57,3);
          
          if(grid[x][y]){
              if(tick){
                  tick --;
              }
              if(grid[x][y] <= 2){
                  fill(118,110,100);
              } else {
                  fill(255);
              }
                  var value = pow(2,grid[x][y]);
                  textSize(60 / value.toString().length);
                  text(value, 105 + (x * 63), 126 + (y * 63));
                  //if(value === 4){
                    //  image(getImage("minecraft/cow"),105 +(x*63),126 + (y*63));
                  //}
          }
      }
  }
};

var gameOver = function() {
    fill(18,70);
    rect(0,0,400,400);
    textSize(30);
    fill(255);
    text("You " + res, 200, 200);
};

var keyPressed = function() {
  if(res || tick ){
      return;
  }  
  
  var move = false;
  
  switch(keyCode) {
      case UP_ARROW:
          grid = transpose();
          move = moveTiles();
          grid = transpose(true);
          break;
      case DOWN_ARROW: 
          grid = transpose(true);
          move = moveTiles();
          grid = transpose();
          break;
      case LEFT_ARROW:
          move = moveTiles();
          break;
      case RIGHT_ARROW:
          grid.reverse();
          move = moveTiles();
          grid.reverse();
          break;
          
  }
  
  if(move){
      addTile();
  }
};

function draw() {
  if(res){
      noLoop();
      gameOver();
  } else {
      drawBoard();
  }
};