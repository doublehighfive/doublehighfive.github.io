
///////////////
//LOAD IMAGES//
///////////////

//player sprite
var playerImage = new Image();
playerImage.ready = false;
playerImage.onload = setAssetReady;
playerImage.src = "img/player.png";

//shelter sprites
var shelterImage = new Image();
shelterImage.ready = false;
shelterImage.onload = setAssetReady;
shelterImage.src = "img/shelterspritesheet.png";

//invaders
var invaderImage = new Image();
invaderImage.ready = false;
invaderImage.onload = setAssetReady;
invaderImage.src = "img/invaderspritesheet.png";

//special invaders
var invaderImage2 = new Image();
invaderImage2.ready = false;
invaderImage2.onload = setAssetReady;
invaderImage2.src = "img/specialinvaderspritesheet.png";

//digits
var digitsImage = new Image();
digitsImage.ready = false;
digitsImage.onload = setAssetReady;
digitsImage.src = "img/digitspritesheet.png";

//buttons
var buttonsImage = new Image();
buttonsImage.ready = false;
buttonsImage.onload = setAssetReady;
buttonsImage.src = "img/buttonsspritesheet.png";

//endscreens
var endImage = new Image();
endImage.ready = false;
endImage.onload = setAssetReady;
endImage.src = "img/endscreens.png";

//ammo
var ammoImage = new Image();
ammoImage.ready = false;
ammoImage.onload = setAssetReady;
ammoImage.src = "img/ammo.png";

//red ship
var redshipImage = new Image();
redshipImage.ready = false;
redshipImage.onload = setAssetReady;
redshipImage.src = "img/red ship.png";

//start image (logo)
var logoImage = new Image();
logoImage.ready = false;
logoImage.onload = setAssetReady;
logoImage.src = "img/space invaders logo.png";

//words
var wordsImage = new Image();
wordsImage.ready = false;
wordsImage.onload = setAssetReady;
wordsImage.src = "img/wordspritesheet.png";

//explosion
var explosionImage = new Image();
explosionImage.ready = false;
explosionImage.onload = setAssetReady;
explosionImage.src = "img/explosion.png";

//start button
var startImage = new Image();
startImage.ready = false;
startImage.onload = setAssetReady;
startImage.src = "img/start.png";

//next level button
var nextImage = new Image();
nextImage.ready = false;
nextImage.onload = setAssetReady;
nextImage.src = "img/nextbutton.png";

function setAssetReady() {
    this.ready = true;
}

var TEXT_PRELOADING = "Loading ...",
    TEXT_PRELOADING_X = 200,
    TEXT_PRELOADING_Y = 200,
    TIME_PER_FRAME = 100;

//Display Preloading
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.fillStyle = "#000";
ctx.fillText(TEXT_PRELOADING, TEXT_PRELOADING_X, TEXT_PRELOADING_Y);
var preloader = setInterval(preloading, TIME_PER_FRAME);
var gameloop;

function preloading()
{
    if (playerImage.ready && invaderImage.ready
        && invaderImage2.ready && digitsImage.ready
        && buttonsImage.ready && endImage.ready
        && ammoImage.ready && redshipImage.ready
        && logoImage.ready && wordsImage.ready
        && explosionImage.ready && startImage.ready)
    {
        clearInterval(preloader);
        start();
    }
}
