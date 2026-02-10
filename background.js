const FOREST_BACKGROUND = {
    layer2: {src: "assets/background/forest/forest-sky.png", speed: 0.1},
    layer1: {src: "assets/background/forest/forest-moon.png", speed: 0.01},
    layer3: {src: "assets/background/forest/forest-mountain.png", speed: 0.2},
    layer4: {src: "assets/background/forest/forest-back.png", speed: 0.3},
    layer5: {src: "assets/background/forest/forest-mid.png", speed: 0.5},
    layer6: {src: "assets/background/forest/forest-short.png", speed: 0.7},
}

const DARK_FOREST_BACKGROUND = {
    layer1: {src: "assets/background/dark-forest/sky.png", speed: 0.0},
    layer2: {src: "assets/background/dark-forest/far-clouds.png", speed: 0.1},
    layer3: {src: "assets/background/dark-forest/near-clouds.png", speed: 0.2},
    layer4: {src: "assets/background/dark-forest/far-mountains.png", speed: 0.3},
    layer5: {src: "assets/background/dark-forest/mountains.png", speed: 0.5},
    layer6: {src: "assets/background/dark-forest/trees.png", speed: 0.7},
}

const SKY_BACKGROUND = {
    layer1: {src: "assets/background/sky/1.png", speed: 0.0},
    layer2: {src: "assets/background/sky/2.png", speed: 0.2},
    layer3: {src: "assets/background/sky/3.png", speed: 0.4},
    layer4: {src: "assets/background/sky/4.png", speed: 0.8},
}

const PURPLE_SKY_BACKGROUND = {
    layer1: {src: "assets/background/purple-sky/1.png", speed: 0.0},
    layer2: {src: "assets/background/purple-sky/2.png", speed: 0.1},
    layer3: {src: "assets/background/purple-sky/3.png", speed: 0.2},
    layer4: {src: "assets/background/purple-sky/4.png", speed: 0.4},
    layer5: {src: "assets/background/purple-sky/5.png", speed: 0.7},
    layer6: {src: "assets/background/purple-sky/6.png", speed: 0.8},
}

const DUSK_SKY_BACKGROUND = {
    layer1: {src: "assets/background/dusk-sky/1.png", speed: 0.0},
    layer2: {src: "assets/background/dusk-sky/2.png", speed: 0.2},
    layer3: {src: "assets/background/dusk-sky/3.png", speed: 0.4},
    layer4: {src: "assets/background/dusk-sky/4.png", speed: 0.8},
}

let background;
let backgroundImages = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image()];

function initBackgroundLayers(){
    initBackgroundLayerSpeed();

    let i = 0;
    // initialize layer images
    Object.values(background).forEach(layer => {
        backgroundImages[i].src = layer.src;
        layer.img = backgroundImages[i];
        
        // initialize layer arrays
        let imgWidth = layer.img.width;
        let imgHeight = layer.img.height;
        let scale = HEIGHT/(imgHeight);
        layer.width = imgWidth * scale;
        layer.height = imgHeight * scale;
        
        let curX = 0;
        layer.array = []
        while (curX < WIDTH + layer.width){
            layer.array.push(curX)
            curX += layer.width - 1;
        }
        i++;    
    });
}

function initBackgroundLayerSpeed(){
    Object.keys(background).forEach(key => {
        layer = background[key];
        layer.speed *= obstacleSpeed / OBSTACLE_DEFAULT_SPEED;
    })
}

function drawBackgroundLayer(layer){ 
    layer.array.forEach(curX => {
        ctx.drawImage(layer.img, curX, 0, layer.width, layer.height);
    })
}

function drawBackgroundLayers(){
    Object.values(background).forEach(layer => {
        drawBackgroundLayer(layer);
    })
}

function moveBackgroundLayer(layer){
    for (let i = 0; i < layer.array.length; i++){
        if (layer.array[i] <= -layer.width){
            layer.array[i] = layer.array.at(-1) + layer.width - 1;
            layer.array = layer.array.slice(1).concat([layer.array[i]]);
        }
        layer.array[i] -= layer.speed * dt;
    }
}

function moveBackgroundLayers(){
    Object.keys(background).forEach(key =>{
        let layer = background[key];
        moveBackgroundLayer(layer);
    })
}

function setBackground(newBackground){
    background = structuredClone(newBackground);
}