// Bron: Grok - Wat zijn JavaScript?
// Bron: Grok - Basis uitleggen van JavaScript
// Bron: Grok - Controle mijn code of het correct zijn
// Bron: Grok - Hoe kan ik een hit sound en gameover sound toevoegen ?
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const duckImage = new Image(); //Bron: DALL E - Maak een achtergrond voor Duck Hunt game
duckImage.src = "img/duck.png";

const hitSound = new Audio("audio/hit.mp3"); //Bron: https://pixabay.com/sound-effects
const gameOverSound = new Audio("audio/gameover.mp3"); //Bron: https://pixabay.com/sound-effects

let duck = { 
    x: 0, 
    y: 120, 
    width: 50, 
    height: 50, 
    speedX: 5, 
    arcProgress: 0 
};

let score = 0;
let timeLeft = 30; //Bron: Grok - Hoe kan ik een timer toevoegen aan mijn game?
let gameOver = false;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!gameOver) {
        ctx.drawImage(duckImage, duck.x, duck.y, duck.width, duck.height);
    }

    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Point: " + score, 10, 30);
    ctx.fillText("Time: " + Math.ceil(timeLeft), 10, 60);

    if (gameOver) {
        ctx.fillStyle = "red";
        ctx.font = "40px Arial";
        ctx.fillText("Jouw score zijn: " + score, 200, canvas.height / 2);
    }
}

function update() { //Bron: Grok - Hoe laat ik mijn Duck een andere route te volgen?
    if (!gameOver) {
        duck.x += duck.speedX;
        duck.arcProgress += duck.speedX / canvas.width;

        duck.y = canvas.height / 2 - Math.sin(duck.arcProgress * Math.PI) * (canvas.height / 2 - duck.height);

        if (duck.x > canvas.width) {
            duck.x = -duck.width;
            duck.arcProgress = 0;
        }

        timeLeft -= 1 / 60;
        if (timeLeft <= 0) {
            timeLeft = 0;
            gameOver = true;
            gameOverSound.play();
        }
    }
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

canvas.addEventListener("click", (event) => {
    if (!gameOver) {
        const rect = canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;
        if (clickX >= duck.x && clickX <= duck.x + duck.width &&
            clickY >= duck.y && clickY <= duck.y + duck.height) {
            score += 1;
            duck.x = -duck.width;
            duck.arcProgress = 0;
            hitSound.play();
        }
    }
});

duckImage.onload = function() {
    gameLoop();
};

duckImage.onerror = () => {
    console.error("Duck adbeelding kon niet worden geladen. Controleer de bron!");
};