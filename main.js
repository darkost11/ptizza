/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const MAX_WIDTH = 600;
let WIDTH, HEIGHT;

function resizeCanvas(){
    HEIGHT = canvas.height = window.innerHeight - 100;
    if (window.innerWidth < MAX_WIDTH) {
        WIDTH = canvas.width = window.innerWidth - 20;
        setSmallScreenMode();
    }
    else {
        WIDTH = canvas.width = MAX_WIDTH;
        setBigScreenMode();
    }

    canvas.style.setProperty("width", `${WIDTH}px`);
    canvas.style.setProperty("height", `${HEIGHT}px`);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let lastTime;
let dt;

// Preload assets
currentLevel = 1;
launchLevel();
goToMenu()

function updateDeltaTime(){
    let currentTime = Date.now() / 1000 * 60;
    dt = currentTime - lastTime;
    lastTime = currentTime;
}

function initGame(){
    initLevelFunctions[currentLevel]();
    initBackgroundLayers();
    loadAssets();

    hitbox = createHitbox();
    hitbox.y = startingY;
    hitbox.vel = 0;

    obstacles = createObstacles();

    currentScore = 0;
    displayHUD();
   
    lastTime = Date.now() / 1000 * 60;
    currentState = GameState.WAITING;
    wait();
};

function wait(){
    if (isInGame() || isInMenu()){
        return;
    }
    updateDeltaTime();
    updateStartMessage();
    drawEverything();
    requestAnimationFrame(wait);
}


function startGame(){
    startMoving();
    hideStartMessage();

    if (isGamePaused()){
        togglePause();
    }
    
    doBirdAction();
    mainLoop();
}

function mainLoop(){
    updateDeltaTime();
    if (!isGamePaused()){
        drawEverything();

        if (isCollisionDetected()){
            gameOver();
            return;
        }

        updateEverything();
    }
    requestAnimationFrame(mainLoop);
}

function clearCanvas(){
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function drawEverything(){
    clearCanvas();
    drawBackgroundLayers();
    drawObstacles();
    drawBird();
}

function updateEverything(){
    updateObstacles();
    updateVelocity();
    moveBackgroundLayers();
}