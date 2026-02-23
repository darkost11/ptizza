const initLevelFunctions = [
    null,
    initLevelOne, 
    initLevelTwo, 
    initLevelThree, 
    initLevelFour, 
    initLevelFive,
    initLevelSix
];

const numberLevels = 6;
let unlockedLevels;
let nextLevel = 1;
let currentLevel;

initLevelGrid();

// For small screen mode
let levelThreeSpeedMultiplier;
let levelThreeObstacleDistanceMultiplier;
let levelThreeMinObstacleHeight;
let levelFiveSpeedMultiplier;
let levelFiveObstacleDistanceMultiplier;
let levelFiveAccelerationMultiplier;

function countUnlockedLevels(){
    let totalUnlocked = 0;
    for (let i = 1; i <= numberLevels; i++){
        let prevLevelHighScore = highScores[i - 1];
        let requiredHighScore = REQUIRED_SCORES[i];
        console.log(prevLevelHighScore, requiredHighScore);
        if (prevLevelHighScore >= requiredHighScore){
            totalUnlocked++;
        } else {
            break;
        } 
    }
    unlockedLevels = totalUnlocked;
}

function isGameComplete() {
    return (highScores[numberLevels] >= REQUIRED_SCORES[numberLevels + 1]);
}

function updateLevels(){
    countUnlockedLevels();
    updateUnlockedLevelsDisplay();
    updateLevelClickListeners();
    updateLevelHoverListeners();
}

function setSmallScreenMode(){
    levelThreeSpeedMultiplier = 0.75;
    levelThreeObstacleDistanceMultiplier = 0.9;
    levelThreeMinObstacleHeight = HEIGHT / 8;
    levelFiveSpeedMultiplier = 0.7;
    levelFiveObstacleDistanceMultiplier = 0.8;
    levelFiveAccelerationMultiplier = 0.8;
}

function setBigScreenMode(){
    levelThreeSpeedMultiplier = 1;
    levelThreeObstacleDistanceMultiplier = 1;
    levelThreeMinObstacleHeight = HEIGHT / 20;
    levelFiveSpeedMultiplier = 1;
    levelFiveObstacleDistanceMultiplier = 1;
    levelFiveAccelerationMultiplier = 1;
}

// Level config
function initDefaultSetting(){
    // score
    currentHighScore = getHighScore(currentLevel);
    updateRequiredScoreFlag();

    // bird
    maxVelocity = 10;
    minVelocity = -12;
    hitboxRadius = 34;
    freeFall = 0.6;
    jumpForce = 20;
    gravityMode = false;
    startingY = HEIGHT / 2;
    maxRotationAngle = Math.PI / 24;
    SPRITE.src = Bird.RED;

    // obstacles
    obstacleWidth = 120;
    gapSize = 210;
    minObstacleHeight = HEIGHT / 20;
    maxObstacleHeight = HEIGHT / 2;
    obstacleDistance = 200;
    obstacleStartingX = 320;  
    obstacleEdgeHeight = 40;
    obstacleOscillation = false;

    diagonalCollisionMargin = hitboxRadius / 6;
    horizontalCollisionMargin = hitboxRadius / 4;
    verticalCollisionMargin = hitboxRadius / 12; 

    obstacleSpeed = OBSTACLE_DEFAULT_SPEED;
    setObstacleSprite(Pipe.PURPLE, PipeEdge.PURPLE);

    // background
    setBackground(FOREST_BACKGROUND);
}

function initLevelOne(){
    initDefaultSetting();
}

function initLevelTwo(){
    initDefaultSetting();

    gapSize = 260;
    obstacleSpeed = 2.5;
    obstacleDistance = 70;
    minObstacleHeight = HEIGHT / 12;
    maxObstacleHeight = HEIGHT / 2 - 50;
}

function initLevelThree(){
    initDefaultSetting();

    maxRotationAngle = Math.PI / 36;
    startingY = HEIGHT - 100;
    hitboxRadius = 30;
    
    gapSize = 180;
    obstacleSpeed = 8 * levelThreeSpeedMultiplier;
    obstacleDistance = 320 * levelThreeObstacleDistanceMultiplier;
    minObstacleHeight = levelThreeMinObstacleHeight;
    horizontalCollisionMargin = hitboxRadius / 4;
    diagonalCollisionMargin = hitboxRadius / 2;
    verticalCollisionMargin = hitboxRadius / 8;

    SPRITE.src = Bird.YELLOW;
    setObstacleSprite(Pipe.GREEN, PipeEdge.GREEN);
    setBackground(SKY_BACKGROUND);
}

function initLevelFour(){
    initDefaultSetting();

    gapSize = 220;
    obstacleOscillation = true;
    oscillationRange = 80;
    oscillationSpeed = 0.5;

    SPRITE.src = Bird.GREY;
    setObstacleSprite(Pipe.BLUE, PipeEdge.BLUE);
    setBackground(DUSK_SKY_BACKGROUND);
}

function initLevelFive(){
    initLevelThree();

    gravityMode = true;
    freeFall = freeFall * levelFiveAccelerationMultiplier;
    maxVelocity = 10;

    obstacleDistance =  320 * levelFiveObstacleDistanceMultiplier;
    obstacleSpeed = 7 * levelFiveSpeedMultiplier;

    SPRITE.src = Bird.GREEN;
    setObstacleSprite(Pipe.PURPLE, PipeEdge.PURPLE);
    setBackground(PURPLE_SKY_BACKGROUND);
}

function initLevelSix(){
    initDefaultSetting();
    
    startingY += 100;
    hitboxRadius = 80;

    gapSize = 290;
    obstacleDistance = 230;
    obstacleWidth = 240;
    obstacleSpeed = 4;

    diagonalCollisionMargin = hitboxRadius / 6;
    horizontalCollisionMargin = hitboxRadius / 4;
    verticalCollisionMargin = hitboxRadius / 12; 
}
