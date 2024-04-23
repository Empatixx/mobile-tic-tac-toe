import React, {useState, useEffect} from 'react';
import {IonCol, IonRow, IonGrid, IonCard} from '@ionic/react';
import TicIcon from './TicIcon';
import './GameGrid.css';
import TacIcon from "./TacIcon";

type GridCellProps = {
    onAction: () => void;
    rowIndex: number;
    colIndex: number;
    cellValue: 'X' | 'O' | null;
    setCellValue: (rowIndex: number, colIndex: number, value: 'X' | 'O') => void;
    canPlayerClick: (rowIndex: number, colIndex: number) => boolean;
    isWinCell: boolean;
};

// Update GridCell with new props
const GridCell: React.FC<GridCellProps> = ({onAction, rowIndex, colIndex, cellValue, setCellValue, canPlayerClick}) => {
    const toggleIcon = (): void => {
        if (!canPlayerClick(rowIndex, colIndex)) return;
        if (cellValue === null) {
            setCellValue(rowIndex, colIndex, 'X'); // Assume 'X' is the current player for simplicity
            onAction();
        }
    };
    return (
        <IonCol onClick={toggleIcon}>
            <div className="grid-cell">
                {
                    cellValue === 'X' ?
                        <TicIcon style={{
                            fontSize: '48px',
                            color: 'rgb(31, 27, 35)'
                        }}/> : cellValue === 'O' ?
                            <TacIcon style={{
                                fontSize: '48px',
                                fill: 'none',
                                stroke: 'rgb(31, 27, 35)',
                                color: 'rgb(31, 27, 35)'
                            }}/>
                            : null
                }
            </div>
        </IonCol>
    );
};

export default GridCell;