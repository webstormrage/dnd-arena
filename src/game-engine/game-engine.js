import {IMAGES} from "../images/image-storage";

const UnitTypes = {
    NPC_KOBOLD: 'kobold',
    CHARACTER_FIGHTER: 'fighter'
}

const Sprites = {
    [UnitTypes.NPC_KOBOLD]: {
        shadow: {
            color: '#FF2400',
            blur: 40,
            offset: [10, 10]
        },
        offset: [10, 7],
        scale: 1/3,
        image: IMAGES.MONSTER_KOBOLD
    },
    [UnitTypes.CHARACTER_FIGHTER]: {
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

class GameEngine {
    constructor() {
        this.units = [];
        this.activeUnit = null;
        this.activeUnitCells = [];
        this.updateUnits();
    }
    updateUnits(){
        fetch('/units')
            .then(r => r.json())
            .then(units => {
                this.units = units.map(unit => {
                    return {
                        ...unit,
                        sprite: Sprites[unit.type]
                    }
                })
            })
    }
    getUnits() {
        return this.units;
    }
    getUnitFromCell(x, y){
        return this.units.find(u => u.x === x && u.y === y);
    }
    async setUnitActive(unit){
        const response = await fetch(`/units/movement/cells?id=${unit.id}`);
        const { cells } = await response.json();
        this.activeUnitCells = cells;
        this.activeUnit = unit;
    }
    getActiveUnit(){
        return this.activeUnit;
    }
    getActiveUnitCells(){
        return this.activeUnitCells;
    }
}

export const gameEngine = new GameEngine();