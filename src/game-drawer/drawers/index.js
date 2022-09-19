import {imageStorage, IMAGES} from "../../images/image-storage";
import {gameEngine} from "../../game-engine/game-engine";

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


function drawUnit(ctx, unit, { isUnitActive }){
    const imageScale = unit.sprite.scale * ( isUnitActive ? 1.1 : 1);
    const img = imageStorage.getImage(unit.sprite.image);
    ctx.shadowOffsetX = unit.sprite.shadow.offset[0];
    ctx.shadowOffsetY = unit.sprite.shadow.offset[1];
    ctx.shadowColor = unit.sprite.shadow.color;
    ctx.shadowBlur = unit.sprite.shadow.blur;
    ctx.drawImage(img,
        unit.x*cellSize + unit.sprite.offset[0],
        unit.y*cellSize + unit.sprite.offset[1],
        img.width * imageScale,
        img.height * imageScale
    );
}

function drawUnits(ctx, units, activeUnit){
    units.forEach(unit => drawUnit(ctx, unit, { isUnitActive: activeUnit === unit }));
}

function drawCells(ctx, cells){
    cells.forEach(cell => {
        const [x, y] = cell;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(x*cellSize, y*cellSize, cellSize, cellSize);
    });
}

export function drawAll(ctx, options){
    applyTransform(ctx, options);
    drawMap(ctx, options);
    drawCells(ctx, gameEngine.getActiveUnitCells());
    drawUnits(ctx, gameEngine.getUnits(), gameEngine.getActiveUnit());
}