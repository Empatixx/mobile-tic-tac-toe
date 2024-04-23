import React from 'react';
import { IonCol } from '@ionic/react';
import TicIcon from './TicIcon';
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

const GridCell: React.FC<GridCellProps> = ({onAction, rowIndex, colIndex, cellValue, setCellValue, canPlayerClick, isWinCell}) => {
    const toggleIcon = (): void => {
        if (!canPlayerClick(rowIndex, colIndex)) return;
        if (cellValue === null) {
            setCellValue(rowIndex, colIndex, 'X'); // Assume 'X' is the current player for simplicity
            onAction();
        }
    };

    // Define the color based on isWinCell
    const cellColor = isWinCell ? 'gold' : 'rgb(31, 27, 35)';

    return (
        <IonCol onClick={toggleIcon}>
            <div className="grid-cell">
                {
                    cellValue === 'X' ?
                        <TicIcon style={{
                            fontSize: '48px',
                            color: cellColor
                        }}/> : cellValue === 'O' ?
                            <TacIcon style={{
                                fontSize: '48px',
                                fill: 'none',
                                stroke: cellColor,
                                color: cellColor
                            }}/>
                            : null
                }
            </div>
        </IonCol>
    );
};

export default GridCell;
