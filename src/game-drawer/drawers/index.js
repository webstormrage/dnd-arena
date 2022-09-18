import {imageStorage, IMAGES} from "../../images/image-storage";

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

export function drawAll(ctx, options){
    applyTransform(ctx, options);
    drawMap(ctx, options);
}