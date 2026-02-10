const GameState = {
    MENU: "MENU",
    LOADING: "LOADING",
    WAITING: "WAITING",
    IN_GAME: "IN_GAME",
    PAUSED: "PAUSED", 
    GAME_OVER: "GAME_OVER"
}

let currentState;

function goToMenu(){
    currentState = GameState.MENU;
    saveHighScores();
    updateLevels();
    displayMenu();
}

function launchLevel(){
    currentState = GameState.LOADING;
    initGame();
}

function startMoving(){
    currentState = GameState.IN_GAME;
}

function togglePause(){
    if (isInGame()){
        currentState = GameState.PAUSED;
        pauseButton.src = "assets/resume.png";
    }
    else if (isGamePaused()){
        currentState = GameState.IN_GAME;
        pauseButton.src = "assets/pause.png";
    }
}

function gameOver(){
    currentState = GameState.GAME_OVER;
    displayGameOverMessage();

    saveHighScores();
    countUnlockedLevels();
}

function isInMenu(){
    return currentState === GameState.MENU;
}
function isGameLoading(){
    return currentState === GameState.LOADING;
}
function isWaiting(){
    return currentState === GameState.WAITING;
}
function isInGame(){
    return currentState === GameState.IN_GAME;
}
function isGamePaused(){
    return currentState === GameState.PAUSED;
}
function isGameOver(){
    return currentState === GameState.GAME_OVER;
}

