import {useState, useEffect} from 'react';

export type CellValue = 'X' | 'O' | null;

const useTicTacToeLogic = (gridSize: number) => {
    const [grid, setGrid] = useState<CellValue[][]>(Array(gridSize).fill(Array(gridSize).fill(null)));
    const [winCells, setWinCells] = useState<number[][]>([]);
    const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true); // Initialize as player's turn

    const setCellValue = (rowIndex: number, colIndex: number, value: CellValue): void => {
        const newGrid = grid.map(row => [...row]);
        newGrid[rowIndex][colIndex] = value;
        setGrid(newGrid);
    };
    const checkIfGameEnded = function (grid: CellValue[][]): string {

        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                const cell = grid[y][x];
                if (cell === null) {
                    continue;
                }
                // horizontal
                if (x + 4 < gridSize) {
                    if (cell === grid[y][x + 1] && cell === grid[y][x + 2] && cell === grid[y][x + 3] && cell === grid[y][x + 4]) {
                        return cell;
                    }
                }
                // vertical
                if (y + 4 < gridSize) {
                    if (cell === grid[y + 1][x] && cell === grid[y + 2][x] && cell === grid[y + 3][x] && cell === grid[y + 4][x]) {
                        return cell;
                    }
                }
                // diagonal
                if (x + 4 < gridSize && y + 4 < gridSize) {
                    if (cell === grid[y + 1][x + 1] && cell === grid[y + 2][x + 2] && cell === grid[y + 3][x + 3] && cell === grid[y + 4][x + 4]) {
                        return cell;
                    }
                }
                // second diagonal
                if (x - 4 > -1 && y + 4 < gridSize) {
                    if (cell === grid[y + 1][x - 1] && cell === grid[y + 2][x - 2] && cell === grid[y + 3][x - 3] && cell === grid[y + 4][x - 4]) {
                        return cell;
                    }
                }
            }
        }

        const isDraw = grid.every(row => row.every(cell => cell !== null));
        if (isDraw) {
            return 'Draw';
        }
        return 'Progress';
    }
    const updateWinCells = (grid: CellValue[][]) => {
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                const cell = grid[y][x];
                if (cell === null) {
                    continue;
                }
                // horizontal
                if (x + 4 <= gridSize) {
                    if (cell === grid[y][x + 1] && cell === grid[y][x + 2] && cell === grid[y][x + 3] && cell === grid[y][x + 4]) {
                        setWinCells([[y, x], [y, x + 1], [y, x + 2], [y, x + 3], [y, x + 4]]);
                        return;
                    }
                }
                // vertical
                if (y + 4 <= gridSize) {
                    if (cell === grid[y + 1][x] && cell === grid[y + 2][x] && cell === grid[y + 3][x] && cell === grid[y + 4][x]) {
                        setWinCells([[y, x], [y + 1, x], [y + 2, x], [y + 3, x], [y + 4, x]]);
                        return;
                    }
                }
                // diagonal
                if (x + 4 <= gridSize && y + 4 <= gridSize) {
                    if (cell === grid[y + 1][x + 1] && cell === grid[y + 2][x + 2] && cell === grid[y + 3][x + 3] && cell === grid[y + 4][x + 4]) {
                        setWinCells([[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3], [y + 4, x + 4]]);
                        return;
                    }
                }
                // second diagonal
                if (x - 4 >= -1 && y + 4 <= gridSize) {
                    if (cell === grid[y + 1][x - 1] && cell === grid[y + 2][x - 2] && cell === grid[y + 3][x - 3] && cell === grid[y + 4][x - 4]) {
                        setWinCells([[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3], [y + 4, x - 4]]);
                        return;

                    }
                }
            }
        }
    }
    const resetGameGrid = () => {
        const newGrid = Array(gridSize).fill(Array(gridSize).fill(null));
        setGrid(newGrid);
        setWinCells([]);
    }

    return {grid, setCellValue, isPlayerTurn, checkIfGameEnded, updateWinCells, setIsPlayerTurn, winCells, resetGameGrid, setGrid};
};

export default useTicTacToeLogic;