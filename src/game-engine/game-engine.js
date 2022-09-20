import {IMAGES} from "../images/image-storage";
import {Actions} from "../constants/actions";

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
        this.activeAction = null;
        this.activeActionCells = [];
        this.updateUnits();
        this.subscribers = [];
    }
    subcribe(callback){
        this.subscribers.push(callback);
    }
    unsubscribe(callback){
        const index = this.subscribers.indexOf(callback);
        if(index === -1){
            return;
        }
        this.subscribers.splice(index,1);
    }
    notify = () => {
        setTimeout(() => this.subscribers.forEach(c => c()));
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
    setUnitActive(unit){
        this.activeUnit = unit;
        this.activeActionCells = [];
        this.activeAction = null;
        this.notify();
    }
    getActiveUnit(){
        return this.activeUnit;
    }
    getActiveActionCells(){
        return this.activeActionCells;
    }
    getActiveAction(){
        return this.activeAction;
    }
    async setActiveAction(action) {
        if(!this.activeUnit){
            return
        }
        this.activeAction = action;
        const response = await fetch(`/units/movement/cells?id=${this.activeUnit.id}`);
        const { cells } = await response.json();
        this.activeActionCells = cells;
        this.notify();
        return {
            action: this.activeAction,
            cells: this.activeActionCells
        }
    }
    async triggerActiveAction(x, y) {
        if(!this.activeAction || !this.activeUnit){
            return;
        }
        // Workaround until other actions are implemented
        if(this.activeAction !== Actions.MOVEMENT){
            return;
        }
        const response = await fetch(`/units/movement/cell?unitId=${this.activeUnit.id}&x=${x}&y=${y}`, { method: 'POST' });
        const units = await response.json();
        this.units = units.map(unit => {
            return {
                ...unit,
                sprite: Sprites[unit.type]
            };
        });
        this.activeAction = null;
        this.activeActionCells = [];
        this.notify();
    }
}

export const gameEngine = new GameEngine();