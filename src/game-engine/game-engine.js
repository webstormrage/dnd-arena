import {IMAGES} from "../images/image-storage";


const Sprites = {
    kobold: {
        shadow: {
            color: '#FF2400',
            blur: 40,
            offset: [10, 10]
        },
        offset: [10, 7],
        scale: 1/3,
        image: IMAGES.MONSTER_KOBOLD
    },
    fighter: {
        shadow: {
            color: '#2a52be',
            blur: 40,
            offset: [10, 10]
        },
        offset: [20, 7],
        scale: 1/3,
        image: IMAGES.CHARACTER_FIGHTER
    }
}


const mockedUnits = [
    {
        sprite: Sprites.kobold,
        x: 18,
        y: 7
    },
    {
        sprite: Sprites.kobold,
        x: 18,
        y: 6
    },
    {
        sprite: Sprites.kobold,
        x: 19,
        y: 6
    },
    {
        sprite: Sprites.fighter,
        x: 16,
        y: 2
    }
];

class GameEngine {
    constructor() {
        this.units = mockedUnits;
        this.activeUnit = null;
        this.activeUnitCells = [];
    }
    getUnits() {
        return this.units;
    }
    getUnitFromCell(x, y){
        return this.units.find(u => u.x === x && u.y === y);
    }
    setUnitActive(unit){
        this.activeUnit = unit;
        const cells = [];
        for(let i = -6; i <= 6; ++i){
            for(let j = -6; j <= 6; ++j){
                const x = (unit.x + i);
                const y = (unit.y + j);
                if(x >= 0 && y >= 0 && x <= 28 && y <= 28){
                    cells.push([x, y]);
                }
            }
        }
        this.activeUnitCells = cells;
    }
    getActiveUnit(){
        return this.activeUnit;
    }
    getActiveUnitCells(){
        return this.activeUnitCells;
    }
}

export const gameEngine = new GameEngine();