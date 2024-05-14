import React, {useEffect, useState} from 'react';
import {IonCol, IonRow, IonGrid, IonCard, IonContent} from '@ionic/react';
import './GameGrid.css';
import GridCell from './GridCell';
import useTicTacToeLogic, {CellValue} from "../logic/TicTacToeLogic";
import useAiPlayer from "../logic/AiPlayer";
import {db} from "../db/SettingsDB";

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

const playerClickSound = new Audio('./tictoe.mp3');
const aiClickSound = new Audio('./tactoe.mp3');


const GameGrid: React.FC<GameGridProps> = ({
                                               isPlayerTurn,
                                               setIsPlayerTurn,
                                               checkIfGameEnded,
                                               grid,
                                               setCellValue,
                                               findBestMove,
                                               gridSize,
                                               incrementRound,
                                               onGameOver,
                                               winCells,
                                           }) => {
    const loadEnabledSound = async () => {
        return await db.getSetting('audioEnabled');
    }
    const onPlayerClick = () => {
        if (!isPlayerTurn) return;
        setIsPlayerTurn(false);
        console.log('Player moved')
        incrementRound();
        loadEnabledSound().then((audioEnabled) => {
            if (audioEnabled == 'true') {
                if (!playerClickSound.paused) {
                    playerClickSound.pause();
                    playerClickSound.currentTime = 0;
                }
                playerClickSound.play();
            }
        });
    }
    const canPlayerClick = (rowIndex: number, colIndex: number): boolean => {
        if (checkIfGameEnded(grid) !== 'Progress') {
            return false;
        }
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
            if (state === 'Progress') { // Check if it's AI's turn and the game hasn't ended
                console.log('AI moved');

                const startTime = Date.now();

                // This will run the AI calculation and a minimum timeout in parallel
                const movePromise = findBestMove();
                const timeoutPromise = new Promise(resolve => setTimeout(resolve, 1000));

                Promise.all([movePromise, timeoutPromise]).then(([move]) => {
                    if (move) {
                        const [row, col] = move;
                        const endTime = Date.now();
                        const elapsed = endTime - startTime;

                        console.log(`AI calculation and waiting completed in ${elapsed} ms`);

                        // Ensuring no other game state updates have occurred while waiting
                        if (!isPlayerTurn && checkIfGameEnded(grid) === 'Progress') {
                            if (!aiClickSound.paused) {
                                aiClickSound.pause();
                                aiClickSound.currentTime = 0;
                            }
                            setCellValue(row, col, 'O'); // Ensure setCellValue is designed to manage state properly
                            setIsPlayerTurn(true);
                            loadEnabledSound().then((audioEnabled) => {
                                if (audioEnabled == 'true') {
                                    if (!aiClickSound.paused) {
                                        aiClickSound.pause();
                                        aiClickSound.currentTime = 0;
                                    }
                                    console.log('audioEnabled', audioEnabled)
                                    console.log('AUDIO ENABLED');
                                    aiClickSound.play();
                                }
                            });
                            incrementRound();
                        }
                    } else {
                        console.error("No move returned by AI");
                    }
                }).catch(error => {
                    console.error('Error in findBestMove:', error);
                });
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
