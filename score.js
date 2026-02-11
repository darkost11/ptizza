const REQUIRED_SCORES = [
    null,
    0,
    30,
    50, 
    30,
    30,
    30,
    10
]

const STARTING_SCORES = [
    null,
    0,
    0,
    0,
    0,
    0,
    0
]

let highScores = [];
loadHighScores();


function resetHighScores(){
    localStorage.setItem(
        "highScores", 
        JSON.stringify(STARTING_SCORES)
    )
    saveHighScores();
}

function loadHighScores(){
    const data = localStorage.getItem("highScores");
    if (!data || (JSON.parse(data).length != numberLevels + 1)){
        resetHighScores();
        highScores = STARTING_SCORES;
    }
    else { 
        highScores = JSON.parse(data);
    }
}

function saveHighScores(){
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

function getHighScore(level){
    if (level <= 0 || level > numberLevels){
        throw new RangeError("Trying to access invalid level's high score")
    } 
    else {
        return highScores[level];
    }
}

function setHighScore(level, newScore){
    if (level <= 0 || level > numberLevels){
        throw new RangeError("Trying to modify invalid level's high score")
    } 
    else {
        highScores[level] = newScore;
        console.log(`high score of level ${level} is set to ${newScore}`);
    }
    saveHighScores();
}

function incrementHighScore(level){
    setHighScore(level, getHighScore(level) + 1);
}

function updateCurrentHighScore(){
    if (currentScore > getHighScore(currentLevel)) {
        incrementHighScore(currentLevel);
    }
    currentHighScore = getHighScore(currentLevel);
}

function setRequiredHighScores(){
    highScores = STARTING_SCORES;
    for (let level = 1; level <= numberLevels; level++){
        highScores[level] = REQUIRED_SCORES[level + 1]
    }
    saveHighScores();
}

function getRequiredScore(level){
    return REQUIRED_SCORES[level];
}