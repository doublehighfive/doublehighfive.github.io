var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 550;
ctx.fillStyle = "black";

var level = 1;
var lives = 3;
var score = 0;
var points = 0;
var speed = 3;

/////////////
//GAME LOOP//
/////////////

//function to show start screen
function start() {
    ctx.drawImage(logoImage, (canvas.width/2) - (229/2), 100);
    ctx.drawImage(startImage, (canvas.width/2) - (148/2), 500);

    canvas.addEventListener('click', letsDoThis, true);
}

function letsDoThis(evt) {
    if (evt.pageX > (canvas.width/2) - (148/2)
        && evt.pageX < (canvas.width/2) - (148/2) + 148
        && evt.pageY > 500 && evt.pageY < 528)
    {
        initGame();
    }
}

//function to initialize all the objects
function initGame() {

    window.addEventListener('keydown', movePlayer, true);

    //initialize player
    player = new Player();

    //init red ship
    redShip = new RedShip();

    //initialize bullets
    for (var b = 0; b < bullets.length; b++) {
        bullets[b] = new Bullet();
    }

    enemyNum = 30;
    initAliens();

    //initialize shelters
    shelters = new Array(5);
    for ( i = 0; i < shelters.length; i++) {
        shelters[i] = new Shelter(64 + (i * 80));
    }

    clearInterval(gameloop);
    gameloop = setInterval(drawGame, TIME_PER_FRAME);
}



//function that is called to actually play the game
function drawGame() {
    //draw things that don't move or move through player input
    drawBackground();
    drawShelters();
    drawPlayer();

    //move scripted objects
    moveBullets();
    moveAndDrawEnemies();
    moveAndDrawRedShip();

    //see if any aliens shoot and move their lasers
    for (var i = 0; i < aliens.length; i++) {
        for (var j = 0; j < aliens[i].length; j++) {
            var randomNum = Math.random();
            if (randomNum > .98) enemyShoot();
        }
    }
    moveLasers();

    //check all collisions
    checkEnemyCollisions();
    checkShelterCollisions();
    checkPlayerCollisions();
    checkRedShipCollisions();
}

function resetGame(evt) {

    if (evt.pageX >= (canvas.width/2) - (148/2)
        && evt.pageX <= (canvas.width / 2) + (148/2)
        && evt.pageY >= 300
        && evt.pageY <= 328)
    {
        lives = 3;
        level = 1;
        score = 0;
        points = 0;
        fiveFewer = false;
        enemyNum = 30;

        window.removeEventListener('click', resetGame);
        initGame();
    }
}

function resetLevel() {
    level++;
    enemyNum = 30;
    initAliens();
    clearInterval(gameloop);
    gameloop = setInterval(drawGame, TIME_PER_FRAME);
}

function lose() {
    ctx.drawImage(endImage, 500, 0, 500, 375, 0, 100, 500, 375);
    ctx.drawImage(startImage, (canvas.width/2) - (148/2), 300);

    canvas.addEventListener('click', resetGame);
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawBackground() {
    clear();

    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    //lives
    ctx.drawImage(wordsImage, 0, 42, 84, 14, 10, 50, 84, 14);
    for (var l = 0; l < lives; l++) {
        if (l < 3) {
            ctx.drawImage(playerImage, 90 + (40 * l), 50);
        }
    }

    //level
    var levelX = 220;
    ctx.drawImage(wordsImage, 0, 28, 84, 14, levelX, 50, 84, 14);
    ctx.drawImage(digitsImage, (14 * level), 0, 14, 14, levelX + 90, 50, 14, 14);

    //points
    ctx.drawImage(wordsImage, 0, 14, 84, 14, 10, 25, 84, 14);
    ctx.drawImage(digitsImage, 14 * Math.floor(points / 10), 0, 14, 14, 100, 25, 14, 14);
    ctx.drawImage(digitsImage, 14 * (points % 10), 0, 14, 14, 116, 25, 14, 14);

    //score
    ctx.drawImage(wordsImage, 0, 0, 84, 14, levelX, 25, 84, 14);
    var i2 = 0;
    var modScore = score;
    for (var i = 10000; i > .999; i /= 10) {
        var digit = Math.floor(modScore / i);
        var digitX = digit * 14;
        modScore = modScore % i;

        ctx.drawImage(digitsImage, digitX, 0, 14, 14, levelX + 90 + (14 * i2), 25, 14, 14);
        i2++;
    }
}
