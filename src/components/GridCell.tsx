import React, { useState, useEffect } from 'react';
import { IonCol, IonRow, IonGrid, IonCard } from '@ionic/react';
import TicIcon from './TicIcon';
import './GameGrid.css';
import TacIcon from "./TacIcon";

type GridCellProps = {
    onAction: () => void;
    onGameOver: (winner: 'X' | 'O' | 'draw') => void;
    rowIndex: number;
    colIndex: number;
    cellValue: 'X' | 'O' | null;
    setCellValue: (rowIndex: number, colIndex: number, value: 'X' | 'O') => void;
};

// Update GridCell with new props
const GridCell: React.FC<GridCellProps> = ({ onAction, onGameOver, rowIndex, colIndex, cellValue, setCellValue }) => {
    const toggleIcon = (): void => {
        if (cellValue === null) {
            setCellValue(rowIndex, colIndex, 'X'); // Assume 'X' is the current player for simplicity
            onAction();
        }
    };

    return (
        <IonCol onClick={toggleIcon}>
            <div className="grid-cell">
                {
                    cellValue === 'X' ? <TicIcon /> : cellValue === 'O' ? <TacIcon /> : null
                }
            </div>
        </IonCol>
    );
};
