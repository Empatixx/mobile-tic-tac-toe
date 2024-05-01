import {useEffect, useState} from 'react';
import {CellValue} from "./TicTacToeLogic";

type WorkerArrayType = Worker[];

const useAiPlayer = (grid: CellValue[][], gridSize: number, checkIfGameEnded: (grid: CellValue[][]) => string) => {
    // Determine the number of workers based on the available cores
    const numWorkers = gridSize * gridSize;
    const [workers, setWorkers] = useState<WorkerArrayType>([]);

    // Initialize workers on mount and terminate on unmount
    useEffect(() => {
        const newWorkers = Array.from({length: numWorkers}, () => new Worker(new URL('./monteCarloWorker.ts', import.meta.url)));
        setWorkers(newWorkers);
        return () => {
            newWorkers.forEach(worker => worker.terminate());
        };
    }, [numWorkers]);

    const findBestMove = async () => {
        const promises = [];

        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if (grid[i][j] === null) {
                    if (window.Worker) {
                        const simulationsPerMove = 900;
                        const workerIndex = (i * gridSize + j) % numWorkers; // Assign each task to a worker in a round-robin fashion
                        const promise = new Promise((resolve, reject) => {
                            const worker = workers[workerIndex];
                            worker.postMessage({
                                grid: grid.map(row => [...row]),
                                move: [i, j],
                                player: 'O',
                                simulationsPerMove
                            });

                            worker.onmessage = (event) => {
                                console.log('Worker message:', event.data);
                                resolve(event.data);
                            };

                            worker.onerror = function (error) {
                                reject(new Error(`Worker error: ${error.message}`));
                            }
                        });
                        promises.push(promise);
                    } else {
                        console.log('Web Workers are not supported in this browser');
                    }
                }
            }
        }
        return Promise.allSettled(promises).then((results) => {
            console.log('All promises settled:', results);
            let bestMove = null;
            let bestScore = -Infinity;
            const simulationsPerMove = 900;
            results.forEach(result => {
                if (result.status === 'fulfilled') {
                    const {move, winCount} = result.value;
                    const currentScore = winCount / simulationsPerMove;
                    if (currentScore > bestScore) {
                        bestMove = move;
                        bestScore = currentScore;
                    }
                }
            });
            return bestMove
        }).catch(error => {
            console.error('Error in promises:', error);
        });
    };

    return {findBestMove};
};

export default useAiPlayer;
