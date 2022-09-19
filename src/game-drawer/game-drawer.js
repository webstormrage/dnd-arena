import { drawAll } from './drawers/index';
import {gameEngine} from "../game-engine/game-engine";


const MAP_SIZE = 1960;


function formatOffset(val){
    return Math.max(Math.min(val, MAP_SIZE), -MAP_SIZE)
}

function getCoord(clientX, clientY, scale, offsetX, offsetY) {
    return [clientX/scale - offsetX, clientY/scale - offsetY];
}

function getCell(clientX, clientY, scale, offsetX, offsetY) {
    const [x, y] = getCoord(clientX, clientY, scale, offsetX, offsetY);
    return [Math.floor(x/70), Math.floor(y/70)];
}

class GameDrawer {

    canvas = null;
    ctx = null;
    animationFrame = null;
    offsetX = 0;
    offsetY = 0;
    dragging = null;
    scale = 1;

    start(){
        this.animationFrame = requestAnimationFrame(this.loop);
    }
    stop(){
        cancelAnimationFrame(this.animationFrame);
    }
    setCanvas(canvas){
        if(this.canvas) {
            this.cleanupCallbacks();
        }
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.setupCallbacks();
    }

    cleanupCallbacks(){
        this.canvas.removeEventListener('mousedown', this.handleMouseDown);
        this.canvas.removeEventListener('mouseup', this.handleMouseUp);
        this.canvas.removeEventListener('mousemove', this.handleMouseMove);
        this.canvas.removeEventListener('mouseleave', this.handleMouseLeave);
        this.canvas.removeEventListener('wheel', this.handleWheel);
    }

    setupCallbacks(){
        this.canvas.addEventListener('mousedown', this.handleMouseDown);
        this.canvas.addEventListener('mouseup', this.handleMouseUp);
        this.canvas.addEventListener('mousemove', this.handleMouseMove);
        this.canvas.addEventListener('mouseleave', this.handleMouseLeave);
        this.canvas.addEventListener('wheel', this.handleWheel);
    }

    handleMouseDown = (event) => {
        this.dragging = {};
        const [x, y] = getCell(event.clientX, event.clientY, this.scale, this.offsetX, this.offsetY);
        const unit = gameEngine.getUnitFromCell(x,y);
        if(unit){
            gameEngine.setUnitActive(unit);
        }
    }

    handleMouseMove = (event) => {
        if(!this.dragging){
            return;
        }
        const {clientX, clientY} = event;
        if(!this.dragging.coords){
            this.dragging.coords = [clientX, clientY];
        } else {
            const dx = (this.dragging.coords[0] - clientX)/this.scale;
            const dy = (this.dragging.coords[1] - clientY)/this.scale;
            this.offsetX = formatOffset(this.offsetX - dx);
            this.offsetY = formatOffset(this.offsetY - dy);
            this.dragging.coords = [clientX, clientY];
        }
    }

    handleMouseUp = () => {
        this.dragging = null;
    }

    handleMouseLeave = () => {
        this.dragging = null;
    }

    handleWheel = (event) => {
        event.preventDefault();

        const scale = this.scale + event.deltaY * -0.001;
        const prevScale = this.scale;

        // Restrict scale
        this.scale = Math.min(Math.max(0.5, scale), 4);

        this.offsetX =  formatOffset(this.offsetX - event.clientX/prevScale + event.clientX/this.scale);
        this.offsetY =  formatOffset(this.offsetY - event.clientY/prevScale + event.clientY/this.scale);
    }

    setupSize(){
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    draw(){
        drawAll(this.ctx, {
            range: [this.offsetX, this.offsetY],
            size: [this.canvas.width, this.canvas.height],
            scale: this.scale
        });
    }

    loop = () => {
        if(!this.canvas || !this.ctx){
            this.animationFrame = requestAnimationFrame(this.loop);
            return;
        }
        this.setupSize();
        this.draw();
        this.animationFrame = requestAnimationFrame(this.loop);
    }
}

export const gameDrawer = new GameDrawer();
window.gd = gameDrawer;