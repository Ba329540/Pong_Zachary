var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  },
};
var game = new Phaser.Game(config);
var redPaddle;
var redScore = 0;
var redScoreText;
var bluePaddle;
var blueScore = 0;
var blueScoreText;
var ball;
var cursors;
var ballVelocityX;
var ballVelocityY;

var ballDirectionX;
var ballDirectionY;
var ballSpeedX;
var ballSpeedY;

function preload () {
  this.load.image('ball', './assets/ball.png');
  this.load.image('blue-paddle', './assets/blue-paddle.png');
  this.load.image('red-paddle', './assets/red-paddle.png');
}
function create () {
  redPaddle = this.physics.add.sprite(30, 300, 'red-paddle');
  redPaddle.setCollideWorldBounds(true);
  redPaddle.setImmovable(true);
  bluePaddle = this.physics.add.sprite(770, 300, 'blue-paddle');
  bluePaddle.setCollideWorldBounds(true);
  bluePaddle.setImmovable(true);
  ball = this.physics.add.sprite(400, 300, 'ball');
  ball.setCollideWorldBounds(true);
  ball.setBounce(1);
  resetBall();
  this.physics.add.collider(redPaddle, ball, handleBounce, null, this);
  this.physics.add.collider(bluePaddle, ball, handleBounce, null, this);

  redScoreText = this.add.text(100, 30, 'Score: ' + redScore, {
    color: 'red', align: 'center'});
    blueScoreText = this.add.text(600, 30, 'Score: ' + redScore, {
      color: 'blue', align: 'center'});
  cursors = this.input.keyboard.createCursorKeys();


}
function update () {
  if (cursors.up.isDown) {
    bluePaddle.setVelocityY(-500);
  } else if (cursors.down.isDown) {
    bluePaddle.setVelocityY(500);
  } else {
    bluePaddle.setVelocityY(0);
  }
if (redPaddle.body.position.y >= ball.body.position.y) {
  redPaddle.setVelocityY(-7000);
} else if (redPaddle.body.position.y < ball.body.position.y) {
  redPaddle.setVelocityY(7000);
} else {
  redPaddle.setVelocityY(0);
}



if  (ball.body.position.x > 770) {
  resetBall();
  redScore++;
  redScoreText.setText('Score: ' + redScore);
} else if (ball.body.position.x < 30) {
  resetBall();
  blueScore++;
  blueScoreText.setText('Score: ' + blueScore);
} else {
if (redScore === 10) {
  this.physics.pause();
  this.add.text(355, 200, 'GAME OVER');
} else if (blueScore === 10) {
  this.physics.pause();
  this.add.text(355, 200, 'You Won!');
}
}
}
function resetBall () {
  ball.setPosition(400, 300);
  ballDirectionX = (Math.random() > 0.5) ? 1 : -1;
  ballDirectionY = (Math.random() > 0.5) ? 1 : -1;
  ballSpeedX = 100 * ballDirectionX;
  ballSpeedY = 100 * ballDirectionY;
  ball.setVelocity(ballSpeedX, ballSpeedY);
}

function handleBounce (paddle) {
  var tmpSpeedX = ball.body.velocity.x;
  ball.setVelocityX(tmpSpeedX < 0 ? tmpSpeedX - 50 : tmpSpeedX + 50);
  var tmpSpeedY = ball.body.velocity.y;
  if (ball.body.position.y < paddle.body.position.y) {
    tmpSpeedY -= 50;
  } else {
    tmpSpeedY += 50;
  }
  ball.setVelocityY(tmpSpeedY);
  }
