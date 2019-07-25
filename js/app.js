let score = 0;
document.getElementById('playerScore').innerHTML = score;

// Enemies that player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for the enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // reset position of enemy
    if (this.x > 550) {
        this.x = -100;
        this.speed = 100 + Math.floor(Math.random() * 512);
    }

    // Check for collision between player and enemies
    if (player.x < this.x + 60 && player.x + 37 > this.x && player.y < this.y + 25 && 30 + player.y > this.y) {
        player.x = 200;
        player.y = 380;
        score = 0;
        document.getElementById('playerScore').innerHTML = score;
    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-horn-girl.png';
};
// This class requires an update(), render() and

Player.prototype.update = function () {
    if (this.y > 380) {
        this.y = 380;
    }
    if (this.x > 400) {
        this.x = 400;
    }
    if (this.x < 0) {
        this.x = 0;
    }
    // reset when win
    if (this.y < 0) {
        this.x = 200;
        this.y = 380;
        score = score + 1;
        document.getElementById('playerScore').innerHTML = score;
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// a handleInput() method.
Player.prototype.handleInput = function (keyPress) {
    if (keyPress == 'left') {
        this.x -= this.speed + 50;
    }
    if (keyPress == 'up') {
        this.y -= this.speed + 30;
    }
    if (keyPress == 'right') {
        this.x += this.speed + 50;
    }
    if (keyPress == 'down') {
        this.y += this.speed + 30;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];

// Place the player object in a variable called player
let player = new Player(200, 380, 50);
var bug;
var bugInitialize = [60, 140, 220];
bugInitialize.forEach(function (y) {
    bug = new Enemy(0, y, 100 + Math.floor(Math.random() * 512));
    allEnemies.push(bug);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
