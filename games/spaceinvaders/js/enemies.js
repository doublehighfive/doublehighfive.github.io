var enemyNum = 30;
var fiveFewer = false;
var aliens;
var goingLeft = false;
var goingDown = false;
var redShip;
var ufoTime = 3000;

function Invader(type, x, y) {
    this.alive = true;
    this.special = false;
    this.type = type;

    this.x = x;
    this.y = y;

    this.SPRITE_WIDTH = 24;
    this.SPRITE_HEIGHT = 16;

    this.BOTTOM_LEFT_X = this.x;
    this.BOTTOM_RIGHT_X = this.x + this.SPRITE_WIDTH;
    this.BOTTOM_Y = this.y + this.SPRITE_HEIGHT;

    this.currX = 0;
    this.currY = this.SPRITE_HEIGHT * type;

    //this.laserShot = false;
    this.laser;
}

function Laser() {
    this.x;
    this.y;

    this.currX = 6; //can be 6 or 12
    this.currY = 0;
    this.SPRITE_WIDTH = 6;

    this.beingShot = false;
}

function RedShip() {
    this.x = canvas.width + 1;
    this.y = 100;

    this.speed = 10;
    this.speedHalved = false;
    this.alive = false;
}

function initAliens() {

    //initialize invader aliens
    aliens = new Array(3);
    for (var i = 0; i < aliens.length; i++) {
        aliens[i] = new Array(10);
        for (var j = 0; j < aliens[i].length; j++) {
            var ranNum = Math.random();
            aliens[i][j] = new Invader(i, 50 + (40 * j), 150 + (48 * i));
            aliens[i][j].laser = new Laser();

            if (ranNum > .9) {
                aliens[i][j].special = true;
            }
        }
    }

    if (fiveFewer) {
        for (i = 0; i < aliens[2].length; i += 2) {
            aliens[2][i].alive = false;
            enemyNum--;
        }

        fiveFewer = false;
    }
}

function moveAndDrawRedShip() {
    if (ufoTime == 0) {
        redShip.x -= redShip.speed;
        if (redShip.alive) {
            ctx.drawImage(redshipImage, redShip.x, redShip.y);
        }
    } else if (redShip.x <= 47) {
        ufoTime = 3000;
        redShip.alive = false;
        redShip.x = canvas.width + 1;
    } else {
        ufoTime--;
    }
}

function moveAndDrawEnemies() {

    //decide what direction to move in
    for (var u = 0; u < aliens.length; u++) {
        for (var v = 0; v < aliens[u].length; v++) {
            if (aliens[u][v].alive && aliens[u][v].x <= 0) {
                if (aliens[u][v].x < 0) aliens[u][v].x = 0;
                goingDown = true;
                goingLeft = false;
                break;
            }
        }
        if (!goingDown) {
            for (v = aliens[u].length - 1; v >= 0; v--) {
                if (aliens[u][v].alive && aliens[u][v].x + aliens[u][v].SPRITE_WIDTH >= canvas.width) {
                    goingDown = true;
                    goingLeft = true;
                    break;
                }
            }
        }

        if (goingDown) break;
    }

    for (var i = 0; i < aliens.length; i++) {
        for (var j = 0; j < aliens[i].length; j++) {
            if (aliens[i][j].alive) {

                //animate
                aliens[i][j].currX += aliens[i][j].SPRITE_WIDTH;
                if (aliens[i][j].currX >= aliens[i][j].SPRITE_WIDTH * 2) {
                    aliens[i][j].currX = 0;
                }


                //move
                if (goingDown) {
                    aliens[i][j].y += 8;
                    aliens[i][j].BOTTOM_Y += 8;
                    //goingDown = false;
                }

                if (goingLeft) {
                    aliens[i][j].x -= speed;
                    aliens[i][j].BOTTOM_LEFT_X -= speed;
                    aliens[i][j].BOTTOM_RIGHT_X -= speed;
                } else {
                    aliens[i][j].x += speed;
                    aliens[i][j].BOTTOM_LEFT_X += speed;
                    aliens[i][j].BOTTOM_RIGHT_X += speed;
                }



                //draw
                if (aliens[i][j].special) {
                    ctx.drawImage(invaderImage2,
                        aliens[i][j].currX, aliens[i][j].currY,
                        aliens[i][j].SPRITE_WIDTH, aliens[i][j].SPRITE_HEIGHT,
                        aliens[i][j].x, aliens[i][j].y,
                        aliens[i][j].SPRITE_WIDTH, aliens[i][j].SPRITE_HEIGHT);
                } else {
                    ctx.drawImage(invaderImage,
                        aliens[i][j].currX, aliens[i][j].currY,
                        aliens[i][j].SPRITE_WIDTH, aliens[i][j].SPRITE_HEIGHT,
                        aliens[i][j].x, aliens[i][j].y,
                        aliens[i][j].SPRITE_WIDTH, aliens[i][j].SPRITE_HEIGHT);
                }
            }
        }
    }

    goingDown = false;
}

function checkEnemyCollisions() {

    //see if bullets hit enemy
    for (var i = 0; i < aliens.length; i++) {
        for (var j = 0; j < aliens[i].length; j++) {
            for (var k = 0; k < bullets.length; k++) {
                if (bullets[k].beingShot && aliens[i][j].alive)
                {
                    if (bullets[k].y <= aliens[i][j].BOTTOM_Y
                        && bullets[k].y >= aliens[i][j].y
                        && bullets[k].x + 6 >= aliens[i][j].BOTTOM_LEFT_X
                        && bullets[k].x <= aliens[i][j].BOTTOM_RIGHT_X)
                    {
                        ctx.drawImage(explosionImage, 0, 0, 24, 16, aliens[i][j].x, aliens[i][j].y, 24, 16);
                        bullets[k].beingShot = false;
                        aliens[i][j].alive = false;
                        enemyNum--;
                        score += 50;
                        if (aliens[i][j].special) points++;
                        if (enemyNum == 0) {
                            clearInterval(gameloop);
                            gameloop = setInterval(menuTime, TIME_PER_FRAME);
                        }
                    }
                }
            }
        }
    }
}

function checkRedShipCollisions() {
    for (var i = 0; i < bullets.length; i++) {
        if (bullets[i].beingShot
            && redShip.alive
            && bullets[i].y <= redShip.y + 20
            && bullets[i].x + 6 >= redShip.x
            && bullets[i].x <= redShip.x + 47)
        {
            redShip.alive = false;
            bullets[i].beingShot = false;
            score += 200;
        }
    }
}

function moveLasers() {
    for (var i = 0; i < aliens.length; i++) {
        for (var j = 0; j < aliens[i].length; j++) {
            if (aliens[i][j].laser.beingShot) {
                aliens[i][j].laser.y += 10;
                ctx.drawImage(ammoImage, 6, 0, 6, 14,
                    aliens[i][j].laser.x, aliens[i][j].laser.y, 6, 14);
                if (aliens[i][j].laser.y + 14 >= canvas.height) {
                    aliens[i][j].laser.beingShot = false;
                }

                //animate
                aliens[i][j].laser.currX += aliens[i][j].laser.SPRITE_WIDTH;
                if (aliens[i][j].laser.currX >= aliens[i][j].laser.SPRITE_WIDTH * 2) {
                    aliens[i][j].laser.currX = 6;
                }
            }
        }
    }


}

function enemyShoot() {
    for (var i = 0; i < aliens.length; i++) {
        for (var j = 0; j < aliens[i].length; j++) {
            var rando = Math.random();
            if (Math.abs(aliens[i][j].x - player.x) <= 50
                && aliens[i][j].alive && !aliens[i][j].laser.beingShot
                && rando > .99) {
                aliens[i][j].laser.beingShot = true;
                aliens[i][j].laser.x = aliens[i][j].x + 12;
                aliens[i][j].laser.y = aliens[i][j].y + 16;
                ctx.drawImage(ammoImage, 6, 0, 6, 14,
                    aliens[i][j].laser.x, aliens[i][j].laser.y, 6, 14);
            }
        }
    }
}
