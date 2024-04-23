import React, {useEffect, useState} from 'react';
import {IonCol, IonRow, IonGrid, IonCard, IonContent} from '@ionic/react';
import './GameGrid.css';
import GridCell from './GridCell';
import useTicTacToeLogic, {CellValue} from "../logic/TicTacToeLogic";
import useAiPlayer from "../logic/AiPlayer";

type GameGridProps = {
    isPlayerTurn: boolean;
    setIsPlayerTurn: (isPlayerTurn: boolean) => void;
    checkIfGameEnded: (grid: CellValue[][]) => string;
    grid: CellValue[][];
    winCells: number[][];
    setCellValue: (rowIndex: number, colIndex: number, value: CellValue) => void;
    findBestMove: () => any;
    gridSize: number;
    incrementRound: () => void;
    onGameOver: (state: 'Loss' | 'Win' | 'Draw') => void;
};

const GameGrid: React.FC<GameGridProps> = ({
                                               isPlayerTurn
                                               , setIsPlayerTurn,
                                               checkIfGameEnded,
                                               grid,
                                               setCellValue,
                                               findBestMove,
                                               gridSize,
                                               incrementRound,
                                               onGameOver,
                                               winCells,
                                           }) => {
    const onPlayerClick = () => {
        if (!isPlayerTurn) return;
        setIsPlayerTurn(false);
        console.log('Player moved')
        incrementRound();
    }
    const canPlayerClick = (rowIndex: number, colIndex: number): boolean => {
        return grid[rowIndex][colIndex] === null && isPlayerTurn;
    }

    useEffect(() => {
        const state: string = checkIfGameEnded(grid);
        if (!state || state === 'Progress') {
            return;
        }
        const isPlayerWin = state === 'X';
        onGameOver(isPlayerWin ? 'Win' : state === 'Draw' ? 'Draw' : 'Loss');
    }, [checkIfGameEnded(grid)]);

    useEffect(() => {
        if (!isPlayerTurn) {
            const state = checkIfGameEnded(grid);
            if (state === 'Progress') { // Check if it's AI's turn and game hasn't ended
                console.log('AI moved');
                // Here, findBestMove should operate on a copy or return data that is used to update the state properly
                const move = findBestMove();
                if (move) {
                    const [row, col] = move;
                    setTimeout(() => {
                        setCellValue(row, col, 'O');  // Ensure setCellValue is designed to manage state properly
                        setIsPlayerTurn(true);
                        incrementRound();
                    }, 1000);
                }
            }
        }
    }, [isPlayerTurn]);
    const prepareGrid = () => {
        return Array.from({length: gridSize}, (_, i) => (
            <IonRow key={i}>
                {Array.from({length: gridSize}, (_, j) => (
                    <GridCell
                        key={`${i}-${j}`}
                        rowIndex={i}
                        colIndex={j}
                        cellValue={grid[i][j]}
                        isWinCell={winCells.some(cell => cell[0] === i && cell[1] === j)}
                        setCellValue={setCellValue}
                        onAction={onPlayerClick}
                        canPlayerClick={canPlayerClick}
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
