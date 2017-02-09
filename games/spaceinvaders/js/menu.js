function menuTime() {

    window.addEventListener('click', clickButton);

    drawBackground();
    //draw buttons
    ctx.drawImage(buttonsImage, 0, 0, 118, 118, 132, 150, 118, 118); //+1 life
    ctx.drawImage(buttonsImage, 118, 0, 118, 118, 250, 150, 118, 118); //half speed
    ctx.drawImage(buttonsImage, 236, 0, 118, 118, 132, 268, 118, 118); //heal barriers
    ctx.drawImage(buttonsImage, 354, 0, 118, 118, 250, 268, 118, 118); //-5 enemies

    ctx.drawImage(nextImage, (canvas.width / 2) - 58, 450);
}

function clickButton(evt) {
    var menuX = 132;
    var menuY = 150;
    var buttonSize = 118;

    //next level
    if (evt.pageX >= (canvas.width / 2) - 58
        && evt.pageX <= (canvas.width / 2) + 58
        && evt.pageY >= 450
        && evt.pageY <= 478)
    {
        window.removeEventListener('click', clickButton);
        resetLevel();
    }
    //+1 life
    else if (evt.pageX >= menuX
        && evt.pageX < menuX + buttonSize
        && evt.pageY > menuY
        && evt.pageY < menuY + buttonSize) {
        if (points >= 5) {
            lives++;
            points -= 5;
        }
    }
    //half speed
    else if (evt.pageX >= menuX + buttonSize
        && evt.pageX < menuX + (buttonSize * 2)
        && evt.pageY > menuY
        && evt.pageY < menuY + 118)
    {
        if (points >= 3 && !redShip.speedHalved) {
            redShip.speed /= 2;
            redShip.speedHalved = true;
            points -= 3;
        }
    }
    //heal barriers by 1
    else if (evt.pageX >= menuX
        && evt.pageX < menuX + buttonSize
        && evt.pageY > menuY + buttonSize
        && evt.pageY < menuY + (buttonSize * 2))
    {
        if (points >= 2) {
            for (var i = 0; i < shelters.length; i++) {
                if (shelters[i].damage > 0) {
                    shelters[i].damage--;
                    //shelters[i].currX -= shelters[i].SPRITE_WIDTH;
                }
            }
            points -= 2;
        }
    }
    //5 fewer enemies
    else if (evt.pageX >= menuX + buttonSize
        && evt.pageX < menuX + (buttonSize * 2)
        && evt.pageY > menuY + buttonSize
        && evt.pageY < menuY + (buttonSize * 2))
    {
        if (points >= 2) {
            fiveFewer = true;
            points -= 2;
        }
    }

}