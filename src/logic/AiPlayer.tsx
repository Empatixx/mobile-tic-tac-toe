import { useState } from 'react';
import { CellValue } from "./TicTacToeLogic";

const useAiPlayer = (grid: CellValue[][], gridSize: number, checkIfGameEnded: (grid: CellValue[][]) => string) => {
    // Function to perform a single Monte Carlo simulation
    const runSimulation = (gridCopy: CellValue[][], player: 'O' | 'X') => {
        const moves = [];
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if (gridCopy[i][j] === null) {
                    moves.push([i, j]);
                }
            }
        }

        while (moves.length > 0) {
            const moveIdx = Math.floor(Math.random() * moves.length);
            const [row, col] = moves.splice(moveIdx, 1)[0];
            gridCopy[row][col] = player;
            player = player === 'O' ? 'X' : 'O'; // Toggle player
            const result = checkIfGameEnded(gridCopy);
            if (result !== 'Progress') {
                return result;
            }
        }

        return 'Draw'; // If no more moves and no winner, it's a draw
    };

    // Function to find the best move using Monte Carlo Tree Search
    const findBestMove = () => {
        let bestMove = null;
        let bestScore = -Infinity;
        const simulationsPerMove = 300; // Number of simulations to run per possible move

        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if (grid[i][j] === null) {
                    let winCount = 0;
                    for (let sim = 0; sim < simulationsPerMove; sim++) {
                        const gridCopy = grid.map(row => [...row]);
                        gridCopy[i][j] = 'O'; // AI makes its move
                        const result = runSimulation(gridCopy, 'X'); // Opponent's turn next
                        if (result === 'O') {
                            winCount++;
                        } else if (result === 'Draw') {
                            winCount += 0.5;
                        }
                    }

                    const score = winCount / simulationsPerMove;
                    if (score > bestScore) {
                        bestScore = score;
                        bestMove = [i, j];
                    }
                }
            }
        }

        return bestMove;
    };

    return { findBestMove };
};

export default useAiPlayer;
