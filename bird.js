const SPRITE = new Image();
let maxVelocity;
let minVelocity;
let hitboxRadius;
let freeFall;
let jumpForce;
let startingY;
let maxRotationAngle;
let gravityMode;
let hitbox;

const Bird = {
    RED: "assets/bird/red.png",
    YELLOW: "assets/bird/yellow.png",
    PURPLE: "assets/bird/purple.png",
    GREEN: "assets/bird/green.png",
    TURQUOISE: "assets/bird/turquoise.png",
    GREY: "assets/bird/grey.png",
}

function createHitbox(){
    return {
        radius: hitboxRadius,
        x: hitboxRadius + WIDTH/10,
        y: HEIGHT/2,
        vel: 0, 
    }
}

function drawBird(){
    let birdX = hitbox.x - hitboxRadius - hitboxRadius/12
    let birdY = hitbox.y - hitboxRadius - hitboxRadius/12
    let birdSize = hitboxRadius*2;
    let birdAngle = (hitbox.vel/maxVelocity) * (maxRotationAngle);
    ctx.save();
    ctx.translate(birdX + hitboxRadius, birdY + hitboxRadius)
    ctx.beginPath();
    ctx.rotate(birdAngle);
    ctx.drawImage(SPRITE, -hitboxRadius, -hitboxRadius, birdSize, birdSize)
    ctx.closePath();
    ctx.restore();
}

function drawHitbox(){
    ctx.beginPath();
    ctx.arc(hitbox.x, hitbox.y, hitbox.radius, 0, 2*Math.PI);
    ctx.fillStyle = "blue"
    ctx.fill(); 
    ctx.closePath();
}

function jump(){
    hitbox.vel = Math.max(hitbox.vel - jumpForce, minVelocity);
}

function toggleGravity(){
    freeFall *= -1;
}

function doBirdAction(){
    if (gravityMode)
        toggleGravity();
    else
        jump();
}

function updateVelocity(){

    if (freeFall > 0)
        hitbox.vel = Math.min(hitbox.vel + freeFall * dt, maxVelocity);
    else 
        hitbox.vel = Math.max(hitbox.vel + freeFall * dt, -maxVelocity);

    if (hitbox.y + hitbox.vel < 0) hitbox.y = 0;
    else hitbox.y = hitbox.y + hitbox.vel * dt;   
}

function isCollisionDetected(){
    return (isObstacleCollisionDetected() ||
        hitbox.y > HEIGHT + 2 * hitboxRadius);
}