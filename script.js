
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");


var bird;
var obstacles = [];
var score = 0;
var gravity = 0.05;
var jumpForce = -1.5;
var isGameOver = false;


var birdImg = new Image();
birdImg.src = ""; //*Bird Image*//


var obstacleTopImg = new Image();
obstacleTopImg.src = ""; //*Wall Image*//
var obstacleBottomImg = new Image();
obstacleBottomImg.src = ""; //*Wall Image*//


function Bird(x, y) {
  this.x = x;
  this.y = y;
  this.vy = 0;


  this.draw = function() {
    ctx.drawImage(birdImg, this.x, this.y);
  }


  this.update = function() {
    this.y += this.vy;
    this.vy += gravity;
  }


  this.jump = function() {
    this.vy = jumpForce;
  }


  this.collidesWith = function(obstacle) {
    if (this.x + 34 > obstacle.x && this.x < obstacle.x + obstacle.width && (this.y < obstacle.topHeight || this.y + 24 > obstacle.bottomY)) {
      return true;
    }
    return false;
  }
}


function Obstacle(x) {
  this.x = x;
  this.topHeight = Math.floor(Math.random() * 300) + 100;
  this.bottomY = this.topHeight + 150;
  this.width = 52;


  this.draw = function() {
    ctx.drawImage(obstacleTopImg, this.x, 0, this.width, this.topHeight);
    ctx.drawImage(obstacleBottomImg, this.x, this.bottomY, this.width, canvas.height - this.bottomY);
  }


  this.update = function() {
    this.x -= 1;
  }
}


function createGameObjects() {
  bird = new Bird(50, 150);
  obstacles = [];
  obstacles.push(new Obstacle(500));
}


function update() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);


  bird.update();
  bird.draw();


  for (var i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].update();
    obstacles[i].draw();


    if (obstacles[i].x + obstacles[i].width < 0) {
      obstacles.splice(i, 1);
      score++;
      document.getElementById("score").innerHTML = score;
    }


    if (bird.collidesWith(obstacles[i])) {
      gameOver();
      break;
    }
  }


  if (obstacles[obstacles.length - 1].x < 300) {
    obstacles.push(new Obstacle(500));
  }


  if (bird.y < 0 || bird.y +
    24 > canvas.height) {
    gameOver();
  }


  if (!isGameOver) {
    requestAnimationFrame(update);
  }
}


function startGame() {
  createGameObjects();
  update();
  document.addEventListener("keydown", function(event) {
    if (event.keyCode === 87) {
      bird.jump();
    }
  });
}


function gameOver() {
  isGameOver = true;
  document.getElementById("gameover").style.display = "block";
}


function restartGame() {
  isGameOver = false;
  score = 0;
  document.getElementById("score").innerHTML = score;
  document.getElementById("gameover").style.display = "none";
  createGameObjects();
  update();
}


window.onload = function() {
  startGame();
  document.getElementById("restart-btn").addEventListener("click", function() {
    restartGame();
  });
}

var canvas = document.getElementById("game");
var fullscreenBtn = document.getElementById("fullscreen-btn");

fullscreenBtn.addEventListener("click", function() {
  canvas.requestFullscreen();
});


