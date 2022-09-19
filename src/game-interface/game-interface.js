import React from 'react';
import styles from './game-interface.module.css';

function cn(...classes){
    return classes.join(' ');
}

export function GameInterface() {
    return (
        <div className={styles.bottomPanel}>
            <div className={cn(styles.item, styles.move)} title='Movement - costs 5ft per 5ft.'></div>
            <div className={cn(styles.item, styles.attack)} title='Attack - melee or ranged attack.'></div>
            <div className={cn(styles.item, styles.evasion)} title='Dodge - increase defenses.'></div>
            <div className={cn(styles.item, styles.back)} title='Disengage - prevent opportunity of attacks.'></div>
            <div className={cn(styles.item, styles.run)} title='Dash - double movement speed.'></div>
        </div>
    )
}