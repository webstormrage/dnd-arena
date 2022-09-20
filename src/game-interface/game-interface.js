import React, {useCallback, useEffect, useState} from 'react';
import styles from './game-interface.module.css';
import {gameEngine} from "../game-engine/game-engine";
import {Actions} from "../constants/actions";

function cn(...classes){
    return classes.map(cl => {
        if(cl && typeof cl === 'object'){
            const cls = [];
            for(let key in cl){
                if(cl[key]){
                    cls.push(key);
                }
            }
            return cls.join(' ');
        }
        return cl;
    }).join(' ');
}

export function GameInterface() {

    const [activeButton, setActiveButton] = useState(null);

    const updateActiveAction = useCallback(() => {
        setActiveButton(gameEngine.getActiveAction());
    },[setActiveButton]);

    useEffect(() => {
        gameEngine.subcribe(updateActiveAction);
        return () => {
            gameEngine.unsubscribe(updateActiveAction);
        }
    },[updateActiveAction]);

    const handleMovementClick = async () => {
        const { action } = await gameEngine.setActiveAction(Actions.MOVEMENT);
        setActiveButton(action);
    }

    const handleAttackClick = async () => {
        //const { action } = await gameEngine.setActiveAction(Actions.ATTACK);
        setActiveButton(Actions.ATTACK);
    }

    const handleDodgeClick = async () => {
        //const { action } = await gameEngine.setActiveAction(Actions.DODGE);
        setActiveButton(Actions.DODGE);
    }

    const handleDisengageClick = async () => {
        //const { action } = await gameEngine.setActiveAction(Actions.DISENGAGE);
        setActiveButton(Actions.DISENGAGE);
    }

    const handleDashClick = async () => {
        //const { action } = await gameEngine.setActiveAction(Actions.DASH);
        setActiveButton(Actions.DASH);
    }
    return (
        <div className={styles.bottomPanel}>
            <div className={cn(styles.item, styles.move, {
                [styles.active]: activeButton === Actions.MOVEMENT
            })} title='Movement - costs 5ft per 5ft.' onClick={handleMovementClick}/>
            <div className={cn(styles.item, styles.attack, {
                [styles.active]: activeButton === Actions.ATTACK
            })} title='Attack - melee or ranged attack.' onClick={handleAttackClick} />
            <div className={cn(styles.item, styles.evasion, {
                [styles.active]: activeButton === Actions.DODGE
            })} title='Dodge - increase defenses.' onClick={handleDodgeClick} />
            <div className={cn(styles.item, styles.back, {
                [styles.active]: activeButton === Actions.DISENGAGE
            })} title='Disengage - prevent opportunity of attacks.' onClick={handleDisengageClick} />
            <div className={cn(styles.item, styles.run, {
                [styles.active]: activeButton === Actions.DASH
            })} title='Dash - double movement speed.' onClick={handleDashClick} />
        </div>
    )
}