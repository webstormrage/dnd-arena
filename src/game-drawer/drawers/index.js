import {imageStorage, IMAGES} from "../../images/image-storage";

function drawMap(ctx, options){
    const [x0, y0] = options.range;
    const scale = options.scale;
    const img = imageStorage.getImage(IMAGES.MAP_FOREST_CROSSROADS);
    //ctx.drawImage(img, Math.round(x0*scale), Math.round(y0*scale), Math.round(img.width*scale), Math.round(img.height*scale));
    ctx.scale(scale, scale);
    ctx.translate(x0, y0);
    ctx.drawImage(img, 0, 0);
}

export function drawAll(ctx, options){
    drawMap(ctx, options);
}