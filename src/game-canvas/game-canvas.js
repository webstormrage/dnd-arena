import React, { useRef, useEffect } from 'react';
import { gameDrawer } from "../game-drawer/game-drawer";

function GameCanvas() {
    const canvasRef = useRef();
    useEffect(() => {
        if(canvasRef.current){
            gameDrawer.setCanvas(canvasRef.current);
        }
    }, [canvasRef]);
    return (
        <canvas ref={canvasRef}/>
    );
}

export default GameCanvas;
