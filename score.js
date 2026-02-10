const REQUIRED_SCORES = [
    null,
    0,
    30, // 1
    60, 
    60,
    40,
    60
]

let highScores;
loadHighScores();

function resetHighScores(){
    localStorage.setItem(
        "highScores", 
        JSON.stringify([
            null,
            0,
            0,
            0,
            0,
            0,
            0
        ])
    )
}

function loadHighScores(){
    const data = localStorage.getItem("highScores");
    if (!data){
        resetHighScores();
    }

    highScores = JSON.parse(data);
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

function unlockAllLevels(){
    for (let level = 1; level < numberLevels; level++){
        highScores[level] = REQUIRED_SCORES[level + 1]
    }
    saveHighScores();
}

function getRequiredScore(level){
    return REQUIRED_SCORES[level];
}