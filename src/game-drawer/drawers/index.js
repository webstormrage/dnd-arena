import {imageStorage, IMAGES} from "../../images/image-storage";

const cellSize = 70;

function drawMap(ctx){
    const img = imageStorage.getImage(IMAGES.MAP_FOREST_CROSSROADS);
    ctx.drawImage(img, 0, 0);
}

function applyTransform(ctx, options) {
    const [x0, y0] = options.range;
    const scale = options.scale;
    ctx.scale(scale, scale);
    ctx.translate(x0, y0);
}

function drawFighter(ctx, x, y){
    const img = imageStorage.getImage(IMAGES.CHARACTER_FIGHTER);
    ctx.drawImage(img, x*cellSize + 20, y*cellSize + 7, img.width/3, img.height/3);
}

function drawCobold(ctx, x, y){
    const img = imageStorage.getImage(IMAGES.MONSTER_KOBOLD);
    ctx.drawImage(img, x*cellSize + 20, y*cellSize + 7, img.width/3, img.height/3);
}

export function drawAll(ctx, options){
    applyTransform(ctx, options);
    drawMap(ctx, options);
    drawFighter(ctx, 16, 2);
    drawCobold(ctx, 18, 7);
    drawCobold(ctx, 18, 6);
    drawCobold(ctx, 19, 6);
}