// monteCarloWorker.ts - the Web Worker script
export type CellValue = 'O' | 'X' | null;
export type Player = 'O' | 'X';
export type Result = 'O' | 'X' | 'Draw' | 'Progress';

const checkIfGameEnded = (grid: CellValue[][]): Result => {
    const gridSize = grid.length;
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
};

// Function to perform a single Monte Carlo simulation
const runSimulation = (grid: CellValue[][], player: Player): Result => {
    const gridSize = grid.length;
    const moves = [];
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid[i][j] === null) {
                moves.push([i, j]);
            }
        }
    }

    while (moves.length > 0) {
        const moveIdx = Math.floor(Math.random() * moves.length);
        const [row, col] = moves.splice(moveIdx, 1)[0];
        grid[row][col] = player;
        player = player === 'O' ? 'X' : 'O'; // Toggle player
        const result = checkIfGameEnded(grid);
        if (result !== 'Progress') {
            return result;
        }
    }

    return 'Draw'; // If no more moves and no winner, it's a draw
};

self.addEventListener('message', (event) => {
    const { grid, move, player, simulationsPerMove } = event.data;
    let winCount = 0;
    for (let sim = 0; sim < simulationsPerMove; sim++) {
        const gridCopy = grid.map((row: any) => [...row]);
        gridCopy[move[0]][move[1]] = player; // AI makes its move
        const result = runSimulation(gridCopy, player === 'O' ? 'X' : 'O'); // Opponent's turn next
        if (result === player) {
            winCount++;
        } else if (result === 'Draw') {
            winCount += 0.5;
        }
    }
    postMessage({ move, winCount });
});
