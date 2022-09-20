import React, {useCallback, useEffect, useState} from 'react';
import styles from './game-interface.module.css';
import {gameEngine} from "../game-engine/game-engine";
import {Actions} from "../constants/actions";
import {cn} from './react-utils'

export function GameInterface() {

    const [activeButton, setActiveButton] = useState(null);
    const [activeUnit, setActiveUnit] = useState(null);

    const updateActiveAction = useCallback(() => {
        setActiveButton(gameEngine.getActiveAction());
        setActiveUnit(gameEngine.getActiveUnit());
    },[setActiveButton, setActiveUnit]);

    useEffect(() => {
        gameEngine.subcribe(updateActiveAction);
        return () => {
            gameEngine.unsubscribe(updateActiveAction);
        }
    },[updateActiveAction]);

    const handleMovementClick = async () => {
         const result = await gameEngine.setActiveAction(Actions.MOVEMENT);
         if(!result){
             return;
         }
        const { action } = result;
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
            {activeUnit && (<div className={styles.portraitCell} >
                    <img className={styles.portrait} src={activeUnit.sprite.image}/>
                </div>
                    )}
            <div className={cn(styles.item, styles.move, {
                [styles.active]: activeButton === Actions.MOVEMENT,
                [styles.disabled]: !activeUnit
            })} title='Movement - costs 5ft per 5ft.' onClick={handleMovementClick}/>
            <div className={cn(styles.item, styles.attack, {
                [styles.active]: activeButton === Actions.ATTACK,
                    [styles.disabled]: !activeUnit
            })} title='Attack - melee or ranged attack.' onClick={handleAttackClick} />
            <div className={cn(styles.item, styles.evasion, {
                [styles.active]: activeButton === Actions.DODGE,
                [styles.disabled]: !activeUnit
            })} title='Dodge - increase defenses.' onClick={handleDodgeClick} />
            <div className={cn(styles.item, styles.back, {
                [styles.active]: activeButton === Actions.DISENGAGE,
                [styles.disabled]: !activeUnit
            })} title='Disengage - prevent opportunity of attacks.' onClick={handleDisengageClick} />
            <div className={cn(styles.item, styles.run, {
                [styles.active]: activeButton === Actions.DASH,
                [styles.disabled]: !activeUnit
            })} title='Dash - double movement speed.' onClick={handleDashClick} />
        </div>
    )
}