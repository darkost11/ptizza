document.addEventListener("keydown", event => {
    
    if ((event.key === " " || event.key === "w" || event.key === "W"
        || event.key === "ArrowUp")){
        if (isWaiting())
            startGame();
        else if (isGameOver()){
            launchLevel();
        }
        else if (isInGame()){
            doBirdAction();
        }
    }
    
    else if (event.key === "Enter" && isGameOver()){
        launchLevel();
    }

    else if (event.key === "Escape") {
        if (isWaiting() || isGameOver()){
            goToMenu();
        }
        else {
            togglePause();
        }
    }

    else if (['1', '2', '3', '4', '5', '6'].includes(event.key) && isInMenu()){
        currentLevel = parseInt(event.key);
        if (currentLevel <= unlockedLevels){
            launchLevel();
        }
        
    }
})

canvas.addEventListener("pointerdown", event => {
    if (isWaiting()){
        startGame();
    }
    else if (isInGame()){
        doBirdAction();
    } 
})


// Buttons

pauseButton.addEventListener('click', event => {
    togglePause();
})

retryButton.addEventListener("click", () => {
    launchLevel(); 
})

menuButton.addEventListener("click", () => {
    goToMenu();
})


// Levels

function updateLevelHoverListeners(){

    levelsContainer.removeEventListener("mouseenter", handleLevelMouseEnter);
    levelsContainer.removeEventListener("mouseleave", handleLevelMouseLeave);

    levelsContainer.addEventListener("mouseenter", handleLevelMouseEnter, true);
    levelsContainer.addEventListener("mouseleave", handleLevelMouseLeave, true);    
}

function handleLevelMouseEnter(event){
    if (event.target.classList.contains("level-button")) {
        const level = parseInt(event.target.dataset.level);

        if (level <= unlockedLevels){
            levelDescription.textContent = `LEVEL ${level}. HIGH: ${getHighScore(level)}`;
        } else if (level == unlockedLevels + 1){
            levelDescription.textContent = `LEVEL ${level - 1}'S HIGH: ${getHighScore(level - 1)}/${getRequiredScore(level)}`;
        }
        else {
            levelDescription.textContent = `UNLOCK LEVEL ${level - 1} FIRST`;
        }
    }
}

function handleLevelMouseLeave(event){
    if (event.target.classList.contains("level-button")){
        levelDescription.textContent = "";
    }
}

function updateLevelClickListeners(){
    for (; nextLevel <= unlockedLevels; nextLevel++){
        let levelButton = levelButtons[nextLevel - 1];
        let capturedNextLevel = nextLevel;
        levelButton.addEventListener("click", () => {
            currentLevel = capturedNextLevel;
            launchLevel();
        });
        console.log(`Handler ${nextLevel} has been added... to ${levelButton}`);
    }
}

function appendLevelClickListener(){
    let levelButton = levelButtons[unlockedLevels - 1];
    levelButton.addEventListener("click", () => {
        currentLevel = unlockedLevels;
        launchLevel();
    })
}
