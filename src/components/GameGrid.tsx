import React, {useEffect, useState} from 'react';
import {IonCol, IonRow, IonGrid, IonCard, IonContent} from '@ionic/react';
import './GameGrid.css';
import GridCell from './GridCell';
import useTicTacToeLogic from "./TicTacToeLogic";
type GameGridProps = {
    onAction: () => void;
    onGameOver: (state: 'Loss' | 'Win' | 'Draw') => void;
};

const GameGrid: React.FC<GameGridProps> = ({ onAction, onGameOver }) => {
    const gridSize = 5;
    const { grid, setCellValue } = useTicTacToeLogic(gridSize, onGameOver);
    const prepareGrid = () => {
        return Array.from({ length: gridSize }, (_, i) => (
            <IonRow key={i}>
                {Array.from({ length: gridSize }, (_, j) => (
                    <GridCell
                        key={`${i}-${j}`}
                        rowIndex={i}
                        colIndex={j}
                        cellValue={grid[i][j]}
                        setCellValue={setCellValue}
                        onAction={onAction}
                    />
                ))}
            </IonRow>
        ));
    };

    return (
        <IonCard>
            <IonGrid className="grid-container">
                {prepareGrid()}
            </IonGrid>
        </IonCard>
    );
};
export default GameGrid;
