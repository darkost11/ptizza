let obstacles;
let obstacleWidth;
let gapSize;
let obstacleDistance;
let obstacleStartingX; 
let obstacleEdgeHeight;
let obstacleSpeed; 
let obstacleOscillation;
let oscillationRange;
let minObstacleHeight;
let maxObstacleHeight;
let diagonalCollisionMargin;
let horizontalCollisionMargin;
let verticalCollisionMargin; 
let oscillationSpeed;
const OBSTACLE_DEFAULT_SPEED = 3;
const OBSTACLE_IMAGE = new Image();
const OBSTACLE_EDGE_IMAGE = new Image();

const Pipe = {
    PURPLE: "assets/pipe/purple.png",
    GREEN: "assets/pipe/green.png",
    BLUE: "assets/pipe/blue.png"
}

const PipeEdge = {
    PURPLE: "assets/pipe/purple-edge.png",
    GREEN: "assets/pipe/green-edge.png",
    BLUE: "assets/pipe/blue-edge.png"
}

class Obstacle {
    constructor(x) { 
        this.x = x;

        this.bottomH;
        this.topH;
        this.setRandomCoords();
        
        this.doesTopCollide;
        this.doesBottomCollide;
        this.validateParts();

        this.oscillationSpeed;
        this.currentOscillation = 0;
        this.setRandomOscillationDirection();
        this.updateCenterInfo();

        this.passed = false;
    }

    validateParts(){
        if (this.topH < 10) {
            this.topH = 0;
            this.doesTopCollide = false;
        } else this.doesTopCollide = true;

        if (this.bottomH > -10) {
            this.bottomH = 0;
            this.doesBottomCollide = false;
        } else this.doesBottomCollide = true
    }

    updateCenterInfo(){
        this.bottomCenter = {
            x: this.x + obstacleWidth/2,
            y: HEIGHT + this.bottomH/2 + this.currentOscillation
        }
        
        this.topCenter = {
            x: this.x + obstacleWidth/2,
            y: this.topH/2 + this.currentOscillation
        }

        this.bottomDiagonal = Math.hypot(obstacleWidth, this.bottomH);
        this.topDiagonal = Math.hypot(obstacleWidth, this.topH);
    }

    setRandomCoords(){
        let firstH = Math.random() * (maxObstacleHeight - minObstacleHeight) + minObstacleHeight;
        let secondH = HEIGHT - gapSize - firstH; 
        if (Math.random() < 0.5){
            [this.bottomH, this.topH] = [-firstH, secondH];
        }
        else {
            [this.bottomH, this.topH] = [-secondH, firstH];
        }
    }

    setRandomOscillationDirection(){
        if (Math.random() < 0.5) 
            this.oscillationSpeed = oscillationSpeed;
        else
            this.oscillationSpeed = -oscillationSpeed;
    }

    oscillate(){
        if (Math.abs(this.currentOscillation) > oscillationRange){
            this.currentOscillation = (oscillationRange - 1) * Math.sign(this.currentOscillation);
            this.oscillationSpeed *= -1;
        }
        this.currentOscillation += this.oscillationSpeed * dt;
    }

    collides(){
        if (hitbox.x - hitboxRadius + horizontalCollisionMargin > this.x + obstacleWidth ||
            hitbox.x + hitboxRadius - horizontalCollisionMargin < this.x)
            return 0;
        else if (this.doesTopCollide && hitbox.y - hitboxRadius <= this.topH - verticalCollisionMargin + this.currentOscillation
            && Math.hypot(hitbox.x - this.topCenter.x, hitbox.y - this.topCenter.y) < this.topDiagonal/2 + hitboxRadius - diagonalCollisionMargin
        ){
            return 1
        }
        else if (this.doesBottomCollide && hitbox.y + hitboxRadius >= HEIGHT + this.bottomH + verticalCollisionMargin + this.currentOscillation
            && Math.hypot(hitbox.x - this.bottomCenter.x, hitbox.y - this.bottomCenter.y) < this.bottomDiagonal/2 + hitboxRadius - diagonalCollisionMargin
        ){
            return 1;
        }
        return 0;
    }

    draw(){
        ctx.beginPath();
        ctx.drawImage(OBSTACLE_IMAGE, this.x, HEIGHT, obstacleWidth, this.bottomH + obstacleEdgeHeight + this.currentOscillation);
        ctx.closePath();
    
        ctx.beginPath();
        ctx.drawImage(OBSTACLE_IMAGE, this.x, 0, obstacleWidth, this.topH - obstacleEdgeHeight + this.currentOscillation);
        ctx.closePath();
        this.drawEdges();  
    }

    drawEdges(){
        ctx.beginPath();
        ctx.drawImage(OBSTACLE_EDGE_IMAGE, this.x, this.topH - obstacleEdgeHeight + this.currentOscillation, obstacleWidth, obstacleEdgeHeight, );
        ctx.closePath();

        ctx.beginPath();
        ctx.drawImage(OBSTACLE_EDGE_IMAGE, this.x, HEIGHT + this.bottomH + this.currentOscillation, obstacleWidth, obstacleEdgeHeight);
        ctx.closePath();
    }

    drawCenters(){
        if (this.doesBottomCollide){
            ctx.beginPath();
            ctx.arc(this.bottomCenter.x, this.bottomCenter.y, 10, 0, 2*Math.PI);
            ctx.fillStyle = "Red";
            ctx.fill();
            ctx.closePath();
        }
        
        if (this.doesTopCollide){
            ctx.beginPath();
            ctx.arc(this.topCenter.x, this.topCenter.y, 10, 0, 2*Math.PI);
            ctx.fillStyle = "Red";
            ctx.fill();
            ctx.closePath();
        }
    }
}

function createObstacles(){
    let firstObstacle = new Obstacle(obstacleStartingX);
    firstObstacle.bottomH = -HEIGHT/2 + gapSize/2;
    firstObstacle.topH = HEIGHT/2 - gapSize/2;
    firstObstacle.validateParts();
    firstObstacle.updateCenterInfo();

    let obstacles = [firstObstacle];
    for (let i = 0; true; i++){
        let obstacle = obstacles[i];
        if (obstacle.x + obstacleWidth + obstacleDistance >= (WIDTH + obstacleStartingX + obstacleDistance + obstacleWidth)){
            break
        }
        else {
            let newX = obstacle.x + obstacleWidth + obstacleDistance;
            obstacles.push(new Obstacle(newX));
        }
    }
    return obstacles;
}

function drawObstacles(){
    obstacles.forEach(obstacle => {
        obstacle.draw();
    });
}

function moveObstacles(){
    obstacles.forEach(obstacle => {
        obstacle.x -= obstacleSpeed * dt; 
        if (obstacleOscillation){
             obstacle.oscillate();
        }
        obstacle.updateCenterInfo();
    }) 
}

function updateObstacles(){
    moveObstacles();
    updatePassedObstacles();
    let first = obstacles[0];
    if (first.x + obstacleWidth <= 0){
        first.x = obstacles.at(-1).x + obstacleWidth + obstacleDistance;
        
        first.setRandomCoords();
        first.validateParts();
        first.setRandomOscillationDirection();
        first.passed = false;
        obstacles = obstacles.slice(1);
        obstacles.push(first);
    }
}

function isObstacleCollisionDetected(){
    if (obstacles.some(obstacle => {
        return obstacle.collides();
    })) return 1;

    return 0;
}

function updatePassedObstacles(){
    obstacles.forEach(obstacle => {
        if (hitbox.x > obstacle.x + obstacleWidth/2 && !obstacle.passed){
            obstacle.passed = true;
            currentScore += 1;
            updateScoreDisplay();
        }
    })
}

function setObstacleSprite(base, edge){
    OBSTACLE_IMAGE.src = base;
    OBSTACLE_EDGE_IMAGE.src = edge;
}
