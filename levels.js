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

function updateLevels(){
    countUnlockedLevels();
    updateUnlockedLevelsDisplay();
    updateLevelClickListeners();
    updateLevelHoverListeners();
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
    startingY = HEIGHT/2;
    maxRotationAngle = Math.PI / 24;
    SPRITE.src = Bird.RED;

    // obstacles
    obstacleWidth = 120;
    minObstacleHeight = 30;
    maxObstacleHeight = 300;
    gapSize = 210;
    obstacleDistance = 200 ;
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
    obstacleSpeed = 2.5;
    obstacleDistance = 70;
    gapSize = 260;
    minObstacleHeight = 60;
    maxObstacleHeight = 160;
}

function initLevelThree(){
    initDefaultSetting();
    maxRotationAngle = Math.PI / 36;
    startingY = HEIGHT - 100;
    
    obstacleSpeed = 8;
    obstacleDistance = 320;
    hitboxRadius = 30;
    gapSize = 180;
    horizontalCollisionMargin = hitboxRadius / 8;
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
    maxVelocity = 10;
    obstacleSpeed = 7;

    SPRITE.src = Bird.GREEN;
    setObstacleSprite(Pipe.PURPLE, PipeEdge.PURPLE);
    setBackground(PURPLE_SKY_BACKGROUND);
}

function initLevelSix(){
    initDefaultSetting();
    
    hitboxRadius = 80;
    gapSize = 290;
    obstacleDistance = 230;
    obstacleWidth = 240;
    obstacleSpeed = 4; 
    startingY += 100;

    diagonalCollisionMargin = hitboxRadius / 6;
    horizontalCollisionMargin = hitboxRadius / 4;
    verticalCollisionMargin = hitboxRadius / 12; 
}
