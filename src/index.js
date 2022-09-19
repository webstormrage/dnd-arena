import React from 'react';
import ReactDOM from 'react-dom/client';
import GameCanvas from './game-canvas/game-canvas';
import {GameInterface} from "./game-interface/game-interface";
import {gameDrawer} from './game-drawer/game-drawer';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GameCanvas/>
        <GameInterface/>
    </React.StrictMode>
);

gameDrawer.start();