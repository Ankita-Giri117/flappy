var bird = document.getElementById("bird");
var hole = document.getElementById("hole");
var block = document.getElementById("block");

var result = document.getElementById("result");
var text = document.getElementById("text");
var game = document.getElementById("game");

var bgm = document.getElementById("bgm");
var gameOverSound = document.getElementById("gameOverSound");
var scoreSound = document.getElementById("scoreSound");

var scoreDisplay = document.getElementById("score");

var jumping = 0;
var score = 0;
var gameOver = false;



// Random hole position + scoring
hole.addEventListener("animationiteration", function () {

    if (gameOver) return;

    var min = 50;
    var max = 300;
    var random = Math.floor(Math.random() * (max - min)) + min;

    hole.style.top = random + "px";

    score++;
    scoreDisplay.innerText = "Score: " + score;

    scoreSound.currentTime = 0;
    scoreSound.play();
});



// Gravity + collision
var fall = setInterval(function () {

    if (gameOver) return;

    var birdTop = parseInt(getComputedStyle(bird).getPropertyValue("top"));

    if (jumping === 0) {
        bird.style.top = (birdTop + 2) + "px";
    }

    var blockLeft = parseInt(getComputedStyle(block).getPropertyValue("left"));
    var holeTop = parseInt(getComputedStyle(hole).getPropertyValue("top"));

    // Collision detection
    if (
        birdTop > 450 ||
        (blockLeft < 100 && blockLeft > 0 &&
            (birdTop < holeTop || birdTop > holeTop + 150))
    ) {
        endGame();
    }

}, 10);



// Jump
function jump() {

    if (gameOver) return;

    bgm.play();

    jumping = 1;

    var birdTop = parseInt(getComputedStyle(bird).getPropertyValue("top"));

    if (birdTop > 6) {
        bird.style.top = (birdTop - 60) + "px";
    }

    setTimeout(function () {
        jumping = 0;
    }, 120);
}



function endGame() {

    gameOver = true;

    block.style.animationPlayState = "paused";
    hole.style.animationPlayState = "paused";

    bgm.pause();
    gameOverSound.play();

    result.style.display = "block";
    text.innerText = "Score: " + score;

    clearInterval(fall);
}



// Controls
window.addEventListener("keydown", jump);
window.addEventListener("click", jump);