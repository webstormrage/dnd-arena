import React from 'react';
import ReactDOM from 'react-dom/client';
import GameCanvas from './game-canvas/game-canvas';
import { gameDrawer } from './game-drawer/game-drawer';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GameCanvas />
  </React.StrictMode>
);

gameDrawer.start();