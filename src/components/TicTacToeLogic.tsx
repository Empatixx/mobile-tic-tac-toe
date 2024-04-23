import { useState, useEffect } from 'react';

type CellValue = 'X' | 'O' | null;
type GameState = 'Loss' | 'Win' | 'Draw';

const useTicTacToeLogic = (gridSize: number, onGameOver: (state: GameState) => void) => {
    const [grid, setGrid] = useState<CellValue[][]>(Array(gridSize).fill(Array(gridSize).fill(null)));

    const setCellValue = (rowIndex: number, colIndex: number, value: CellValue): void => {
        const newGrid = grid.map(row => [...row]);
        newGrid[rowIndex][colIndex] = value;
        setGrid(newGrid);
    };

    useEffect(() => {
        const checkIfGameEnded = () => {
            const checkLine = (cells: CellValue[]): boolean => {
                const firstCell = cells[0];
                return firstCell !== null && cells.every(cell => cell === firstCell);
            };

            for (const row of grid) {
                if (checkLine(row)) {
                    onGameOver(row[0] === 'X' ? 'Win' : 'Loss');
                    return;
                }
            }

            for (let col = 0; col < gridSize; col++) {
                const column = grid.map(row => row[col]);
                if (checkLine(column)) {
                    onGameOver(column[0] === 'X' ? 'Win' : 'Loss');
                    return;
                }
            }

            const diagonalTLBR = grid.map((row, index) => row[index]);
            if (checkLine(diagonalTLBR)) {
                onGameOver(diagonalTLBR[0] === 'X' ? 'Win' : 'Loss');
                return;
            }

            const diagonalTRBL = grid.map((row, index) => grid[index][gridSize - 1 - index]);
            if (checkLine(diagonalTRBL)) {
                onGameOver(diagonalTRBL[0] === 'X' ? 'Win' : 'Loss');
                return;
            }

            const isDraw = grid.every(row => row.every(cell => cell !== null));
            if (isDraw) {
                onGameOver('Draw');
                return;
            }
        };

        checkIfGameEnded();
    }, [grid, gridSize, onGameOver]);

    return { grid, setCellValue };
};

export default useTicTacToeLogic;