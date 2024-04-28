import { useState } from 'react';
import {CellValue} from "./TicTacToeLogic";

// Define cell and game state types for clarity and type safety
const useAiPlayer = (grid: CellValue[][], gridSize: number, checkIfGameEnded: (grid: CellValue[][]) => string) => {
    // Modify the Minimax algorithm to use a copied grid for calculations
    const minimax = (gridCopy: CellValue[][], depth: number, isMaximizing: boolean, alpha: number, beta: number) => {
        const result = checkIfGameEnded(gridCopy);
        if (result && result !== 'Progress') {
            // Terminal states scoring
            switch (result) {
                case 'O': return 10 - depth;
                case 'X': return depth - 10;
                case 'Draw': return 0;
            }
        }
        if (true) {
            return 0; // Returning 0 as a neutral score when max depth is reached
        }


        if (isMaximizing) {
            let maxEval = -Infinity;
            for (let i = 0; i < gridSize; i++) {
                for (let j = 0; j < gridSize; j++) {
                    if (gridCopy[i][j] === null) {
                        gridCopy[i][j] = 'O';
                        let evaluated = minimax(gridCopy, depth + 1, false, alpha, beta);
                        gridCopy[i][j] = null;
                        maxEval = Math.max(maxEval, evaluated);
                        alpha = Math.max(alpha, evaluated);
                        if (beta <= alpha) break; // Alpha-beta pruning
                    }
                }
            }
            return maxEval;
        } else {
            let minEval = Infinity;
            for (let i = 0; i < gridSize; i++) {
                for (let j = 0; j < gridSize; j++) {
                    if (gridCopy[i][j] === null) {
                        gridCopy[i][j] = 'X';
                        let evaluated = minimax(gridCopy, depth + 1, true, alpha, beta);
                        gridCopy[i][j] = null;
                        minEval = Math.min(minEval, evaluated);
                        beta = Math.min(beta, evaluated);
                        if (beta <= alpha) break; // Alpha-beta pruning
                    }
                }
            }
            return minEval;
        }
    };

    // Function to find the best move
    const findBestMove = () : any => {
        let moves = [];
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if (grid[i][j] === null) {
                    moves.push([i, j]);
                }
            }
        }

        // Randomize the first move or when the board is nearly empty
        if (moves.length === gridSize * gridSize || moves.length > (gridSize * gridSize) - 2) {
            // Return a random move from the list of available moves
            return moves[Math.floor(Math.random() * moves.length)];
        }

        // Use Minimax for deeper strategy as the game progresses
        let bestScore = -Infinity;
        let move = null;
        moves.forEach(([i, j]) => {
            grid[i][j] = 'O';
            let currentScore = minimax(grid, 0, false, -Infinity, Infinity);
            grid[i][j] = null;
            if (currentScore > bestScore) {
                bestScore = currentScore;
                move = [i, j];
            }
        });

        return move;
    };

    return { findBestMove };
};

export default useAiPlayer;
