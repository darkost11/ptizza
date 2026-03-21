const scoreDisplay = document.querySelector("#score");
const highScoreDisplay = document.querySelector("#high-score")
const pauseButton = document.querySelector("#pause-button");
const startMessage = document.querySelector(".start-message");
const gameOverMessage = document.querySelector(".game-over-message");
const retryButton = document.querySelector(".game-over-message .retry");
const menuButton = document.querySelector(".menu");
const levelsContainer = document.querySelector(".levels-container");
const levelDescription = document.querySelector("#level-description");
const levelsContainerText = document.querySelector("#select-level");
const levelButtons = levelsContainer.children;

let startMessageOpacityArgument = 0;
let startMessageBlinkingSpeed = 0.06;
const startMessageAnimationSpeed = 2;

let currentScore;
let currentHighScore;
let shouldDrawRequiredScore;


// Loading assets
function loadAssets(){
    if (isBackgroundLoaded() && isBirdLoaded() && isObstacleLoaded()){
        console.log("Assets loaded successfully");
        return;
    }
    requestAnimationFrame(loadAssets);
}

function isBirdLoaded(){
    return SPRITE.complete;
}

function isObstacleLoaded(){
    return (OBSTACLE_IMAGE.complete && OBSTACLE_EDGE_IMAGE.complete);
}

function isBackgroundLoaded() {
    
    for (const image of backgroundImages) {
        if (!image) return false;
        if (!image.complete) return false;
        if (image.naturalWidth === 0 || image.naturalHeight === 0) return false;
    }
    
    return true;
}

// Displaying elements
function updateScoreDisplay(){
    scoreDisplay.textContent = `SCORE: ${currentScore}`;

    updateCurrentHighScore();
    if (shouldDrawRequiredScore){
        highScoreDisplay.textContent = `HIGH: ${currentHighScore}/${getRequiredScore(currentLevel + 1)}`
    }
    else {
        highScoreDisplay.textContent = `HIGH: ${currentHighScore}`;
    }
}

function updateRequiredScoreFlag(){
    shouldDrawRequiredScore = (currentLevel === unlockedLevels && !isGameComplete());
}

function displayPauseButton(){
    pauseButton.style.setProperty("display", "block");
}

function hidePauseButton(){
    pauseButton.style.setProperty("display", "none")
}

function displayScore(){
    scoreDisplay.style.setProperty("display", "block");
    highScoreDisplay.style.setProperty("display", "block");
}

function hideScore(){
    scoreDisplay.style.setProperty("display", "none");
    highScoreDisplay.style.setProperty("display", "none");
}

function displayStartMessage(){
    startMessage.style.setProperty("display", "block");
}
function hideStartMessage(){
    startMessage.style.setProperty("display", "none");
}

function updateStartMessage(){
    let opacity = 100 * (Math.cos(startMessageOpacityArgument) + 1) / 2;
    startMessageOpacityArgument = (startMessageOpacityArgument + startMessageBlinkingSpeed * dt) % (2 * Math.PI);
    startMessage.style.setProperty("opacity", `${opacity}%`);
}
function displayGameOverMessage(){
    gameOverMessage.style.setProperty("display", "block");
}

function hideGameOverMessage(){
    gameOverMessage.style.setProperty("display", "none");
}

function displayLevelsContainerText(){
    levelsContainerText.style.setProperty("display", "block")
}

function hideLevelsContainerText(){
    levelsContainerText.style.setProperty("display", "none");
}

function displayLevelDescription(){
    levelDescription.style.setProperty("display", "block");
}

function hideLevelDescription(){
    levelDescription.style.setProperty("display", "none");
}

function displayLevels(){
    levelsContainer.style.setProperty("display", "grid");
}

function hideLevels(){
    levelsContainer.style.setProperty("display", "none");
}


// Displaying MENU, HUD
function displayHUD(){
    hideMenu();
    hideGameOverMessage();
    updateScoreDisplay();
    showHUD();
}

function displayMenu(){
    hideHUD();
    showMenu();
}

function showMenu(){
    clearCanvas();
    displayLevels();
    displayLevelsContainerText();
    displayLevelDescription();
}

function hideMenu(){
    hideLevels();
    hideLevelsContainerText();
    hideLevelDescription();
}

function showHUD(){
    displayScore();
    displayPauseButton();
    displayStartMessage();
}

function hideHUD(){
    hideScore();
    hidePauseButton();
    hideStartMessage();
    hideGameOverMessage();
}

// Level grid
function initLevelGrid(){
    for (let i = 1; i <= numberLevels; i++){
        
        const level = document.createElement("div");
        const text = document.createElement("div");
        level.classList.add("level-button");
        level.setAttribute("data-level", i);
        text.classList.add("text");
        level.appendChild(text);
        
        const lock = document.createElement("div");
        lock.classList.add("locked");
        lock.textContent = "Locked";
        text.appendChild(lock);
        
        levelsContainer.appendChild(level);
    }
}

function updateUnlockedLevelsDisplay(){
    for (let i = 1; i <= unlockedLevels; i++){
        let levelButton = levelButtons[i - 1];
        let levelButtonText = levelButton.querySelector(".text")
        levelButtonText.innerHTML = i;
    }
}