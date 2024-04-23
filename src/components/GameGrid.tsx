import React, {useState} from 'react';
import {IonCol, IonRow, IonGrid, IonCard, IonContent} from '@ionic/react';
import './GameGrid.css';
import GridCell from './GridCell';
type GameGridProps = {
    onAction: () => void;
    onGameOver: (winner: 'X' | 'O' | 'draw') => void;
};

const GameGrid: React.FC<GameGridProps> = ({ onAction, onGameOver }) => {
    const gridSize = 5;
    const [grid, setGrid] = useState<(('X' | 'O' | null)[])[]>(Array(gridSize).fill(Array(gridSize).fill(null)));

    const setCellValue = (rowIndex: number, colIndex: number, value: 'X' | 'O'): void => {
        // Copy the grid for immutability
        const newGrid = grid.map(row => [...row]);
        newGrid[rowIndex][colIndex] = value;
        setGrid(newGrid);
        checkIfGameEnded(newGrid);
    };

    const checkIfGameEnded = (currentGrid: (('X' | 'O' | null)[])) => {
        // Here you will implement the logic to check for win conditions or a draw
        // For simplicity, let's just call onGameOver if the first row is filled with 'X'
        if (currentGrid[0].every(cell => cell === 'X')) {
            onGameOver('X');
        }
        // Add more conditions for 'O' winner and draw
    };

    useEffect(() => {
        checkIfGameEnded(grid);
    }, [grid]);

    const prepareGrid = () => {
        const gridRows = [];
        for (let i = 0; i < gridSize; i++) {
            const gridColumns = [];
            for (let j = 0; j < gridSize; j++) {
                gridColumns.push(
                    <GridCell
                        key={`${i}-${j}`}
                        rowIndex={i}
                        colIndex={j}
                        cellValue={grid[i][j]}
                        setCellValue={setCellValue}
                        onAction={onAction}
                        onGameOver={onGameOver}
                    />
                );
            }
            gridRows.push(<IonRow key={i}>{gridColumns}</IonRow>);
        }
        return gridRows;
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
