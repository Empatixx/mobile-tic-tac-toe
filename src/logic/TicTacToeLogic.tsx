import { useState, useEffect } from 'react';

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
    const checkIfGameEnded = function(grid: CellValue[][]) : string{
        const checkLine = (cells: CellValue[]): boolean => {
            const firstCell = cells[0];
            return firstCell !== null && cells.every(cell => cell === firstCell);
        };

        for (const row of grid) {
            if (checkLine(row)) {
                return row[0]!;
            }
        }

        for (let col = 0; col < gridSize; col++) {
            const column = grid.map(row => row[col]);
            if (checkLine(column)) {
                return column[0]!;
            }
        }

        const diagonalTLBR = grid.map((row, index) => row[index]);
        if (checkLine(diagonalTLBR)) {
            return diagonalTLBR[0]!;
        }

        const diagonalTRBL = grid.map((row, index) => grid[index][gridSize - 1 - index]);
        if (checkLine(diagonalTRBL)) {
            return diagonalTRBL[0]!;
        }

        const isDraw = grid.every(row => row.every(cell => cell !== null));
        if (isDraw) {
            return 'Draw';
        }
        return 'Progress';
    }
    const updateWinCells = (grid: CellValue[][]) => {
        const checkLine = (cells: CellValue[]): boolean => {
            const firstCell = cells[0];
            return firstCell !== null && cells.every(cell => cell === firstCell);
        };

        for (let i = 0; i < gridSize; i++) {
            if (checkLine(grid[i])) {
                const winnary = Array.from({ length: gridSize }, (_, j) => [i, j]);
                setWinCells(winnary);
            }
        }

        for (let i = 0; i < gridSize; i++) {
            const column = grid.map(row => row[i]);
            if (checkLine(column)) {
                const winnary = Array.from({ length: gridSize }, (_, j) => [j, i]);
                setWinCells(winnary);
            }
        }

        const diagonalTLBR = grid.map((row, index) => row[index]);
        if (checkLine(diagonalTLBR)) {
            const winnary = Array.from({ length: gridSize }, (_, j) => [j, j]);
            setWinCells(winnary);
        }

        const diagonalTRBL = grid.map((row, index) => grid[index][gridSize - 1 - index]);
        if (checkLine(diagonalTRBL)) {
            const winnary = Array.from({ length: gridSize }, (_, j) => [j, gridSize - 1 - j]);
            setWinCells(winnary);
        }
    }
    const resetGameGrid = () => {
        const newGrid = Array(gridSize).fill(Array(gridSize).fill(null));
        setGrid(newGrid);
        setWinCells([]);
    }

    return { grid, setCellValue, isPlayerTurn, checkIfGameEnded, setIsPlayerTurn, winCells, updateWinCells, resetGameGrid, setGrid };
};

export default useTicTacToeLogic;