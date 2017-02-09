var player;
var shelters;
var bullets = new Array(3);

function Player() {
    this.x = canvas.width/2;
    this.y = 450;
}

function Bullet() {
    this.x = player.x + 10;
    this.y = player.y - 14;
    this.beingShot = false; //if not being shot, it can be shot
}

function Shelter(x) {
    this.currX = 0;
    this.currY = 0;
    this.SPRITE_WIDTH = 44;

    this.x = x;
    this.y = canvas.height - 150;

    this.damage = 0;
    this.destroyed = false;
}

function drawShelters() {
    for (var i = 0; i < shelters.length; i++) {
        shelters[i].currX = shelters[i].damage * shelters[i].SPRITE_WIDTH;
        if (shelters[i].damage <= 5) {
            ctx.drawImage(shelterImage, shelters[i].currX, 0, 44, 32, 64 + (80 * i), canvas.height - 150, 44, 32);
        }
    }
}

function drawPlayer() {
    ctx.drawImage(playerImage, player.x, player.y);
}

function movePlayer(evt) {
    if (evt.keyCode == 65) { //'A'
        player.x -= speed;
        if (player.x < 0) player.x = 0;
    } else if (evt.keyCode == 68) { //'D'
        player.x += speed;
        if (player.x + 26 > canvas.width) player.x = canvas.width - 26;
    }

    if (evt.keyCode == 87) { //'W'
        shoot();
    }


}

function moveBullets() {
    for (var i = 0; i < bullets.length; i++) {
        if (bullets[i].beingShot) {
            ctx.drawImage(ammoImage, 0, 0, 6, 14, bullets[i].x, bullets[i].y, 6, 14);
            bullets[i].y -= 8;
            if (bullets[i].y < 100) bullets[i].beingShot = false;
        }
    }
}

function shoot() {
    for (var i = 0; i < bullets.length; i++) {
        if (!bullets[i].beingShot) {
            bullets[i].beingShot = true;
            bullets[i].x = player.x + 10;
            bullets[i].y = player.y - 14;
            ctx.drawImage(ammoImage, 0, 0, 6, 14, bullets[i].x, bullets[i].y, 6, 14);
            break;
        }
    }
}

function checkPlayerCollisions() {
    for (var i = 0; i < aliens.length; i++) {
        for (var j = 0; j < aliens[i].length; j++) {
            if (aliens[i][j].laser.beingShot)
            {
                if (aliens[i][j].laser.y + 14 >= player.y
                    && aliens[i][j].laser.y <= player.y + 16
                    && aliens[i][j].laser.x + 6 >= player.x
                    && aliens[i][j].laser.x <= player.x + 26)
                {
                    lives--;
                    if (lives == 0) {
                        clearInterval(gameloop);
                        gameloop = setInterval(lose, TIME_PER_FRAME);
                    }

                    aliens[i][j].laser.beingShot = false;
                }
            }
        }
    }
}

function checkShelterCollisions() {
    for (var i = 2; i >= 0; i--) {
        for (var j = 0; j < aliens[i].length; j++) {
            //see if enemies hit shelters (you lose)
            if (aliens[i][j].alive && aliens[i][j].BOTTOM_Y >= shelters[0].y) {
                for (i = 0; i < aliens.length; i++) {
                    for (j = 0; j < aliens[i].length; j++) {
                        aliens[i][j].alive = false;
                    }
                }

                clearInterval(gameloop);
                gameloop = setInterval(lose, TIME_PER_FRAME);
            }

            //see if a laser hits a shelter, damaging it
            for (var k = 0; k < shelters.length; k++) {
                if (aliens[i][j].laser.beingShot
                    && !shelters[k].destroyed
                    && aliens[i][j].laser.y + 14 >= shelters[k].y
                    && aliens[i][j].laser.x + 6 >= shelters[k].x
                    && aliens[i][j].laser.x <= shelters[k].x + shelters[k].SPRITE_WIDTH)
                {
                    shelters[k].damage++;
                    aliens[i][j].laser.beingShot = false;

                    if (shelters[k].damage > 5) {
                        shelters[k].destroyed = true;
                    }
                }
            }
        }
    }

    for (i = 0; i < shelters.length; i++) {
        for (j = 0; j < bullets.length; j++) {
            if (bullets[j].beingShot) {
                if (!shelters[i].destroyed
                    && bullets[j].x + 6 >= shelters[i].x
                    && bullets[j].x <= shelters[i].x + shelters[i].SPRITE_WIDTH
                    && bullets[j].y >= shelters[i].y - 32)
                {
                    bullets[j].beingShot = false;
                }
            }
        }
    }
}
