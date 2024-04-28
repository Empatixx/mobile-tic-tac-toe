import React, {useState} from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonCol,
    IonContent,
    IonFooter,
    IonGrid,
    IonHeader,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import TacIcon from "../components/TacIcon";
import TicIcon from "../components/TicIcon";
import GameGrid from "../components/GameGrid";
import {GameHistory} from "./HistoryPage";
import useTicTacToeLogic from "../logic/TicTacToeLogic";
import useAiPlayer from "../logic/AiPlayer";
import GameResultModal from "../components/GameResultModal";
import {db} from "../db/SettingsDB";

const applauseSound = new Audio('./win.mp3');

const StartPage: React.FC = () => {
    const [round, setRound] = useState<number>(1);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [result, setResult] = useState<'Win' | 'Loss' | 'Draw'>('Draw');
    const [gameEnded, setGameEnded] = useState<boolean>(false);
    const gridSize = 10;
    const {
        grid,
        setCellValue,
        isPlayerTurn,
        setIsPlayerTurn,
        checkIfGameEnded,
        winCells,
        updateWinCells,
        resetGameGrid
    } = useTicTacToeLogic(gridSize);
    const {findBestMove} = useAiPlayer(grid, gridSize, checkIfGameEnded);

    const incrementRound = (): void => {
        setRound(prevRound => prevRound + 1);
    };
    const resetGame = (): void => {
        setRound(1);
        setShowModal(false);
        setGameEnded(false);
        setResult('Draw'); // Or however you initialize this state
        setIsPlayerTurn(true); // Or however you determine the starting player
        resetGameGrid(); // Call the reset function from your game logic hook
        if (!applauseSound.paused) {
            applauseSound.pause();
            applauseSound.currentTime = 0;
        }
    };
    const handleGameResult = (state: 'Loss' | 'Win' | 'Draw') => {
        const loadPlayerName = async () => {
            return await db.getSetting('playerName') || 'Anonymous';
        }
        loadPlayerName().then((playerName) => {
            const history: GameHistory = {
                playerName: playerName,
                result: state === 'Win' ? 'Won' : state === 'Loss' ? 'Lost' : 'Draw',
                rounds: round,
                timestamp: new Date()
            };
            const storedHistories = localStorage.getItem('gameHistories');
            const histories: GameHistory[] = storedHistories ? JSON.parse(storedHistories) : [];
            histories.push(history);
            localStorage.setItem('gameHistories', JSON.stringify(histories));

            setResult(state); // Set the result
            setShowModal(true); // Show the modal
            setGameEnded(true); // Set the game as ended
            updateWinCells(grid); // Update the win cells
            if (state === 'Win' || state === 'Draw') {
                applauseSound.play();
            }
        });
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="success">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/"/>
                    </IonButtons>
                    <IonTitle>Round {round}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <GameGrid incrementRound={incrementRound}
                          onGameOver={handleGameResult}
                          gridSize={gridSize}
                          isPlayerTurn={isPlayerTurn}
                          setIsPlayerTurn={setIsPlayerTurn}
                          checkIfGameEnded={checkIfGameEnded}
                          grid={grid}
                          winCells={winCells}
                          setCellValue={setCellValue}
                          findBestMove={findBestMove}
                />
                {gameEnded && (
                    <IonRow>
                        <IonCol size="12">
                            <IonButton
                                expand="block"
                                color="warning"
                                onClick={resetGame}
                                style={{ marginTop: '20px' }}>
                                RESET
                            </IonButton>
                        </IonCol>
                    </IonRow>
                )}
            </IonContent>
            <IonFooter>
                <IonToolbar style={{height: '200px'}}>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="6" style={{padding: 20}}>
                                <IonCard style={{
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: isPlayerTurn ? 'black' : 'white',
                                    backgroundColor: isPlayerTurn ? 'var(--ion-color-warning)' : '',
                                    transition: 'background-color 0.5s ease'
                                }}>
                                    <TicIcon style={{fontSize: '64px'}}/>
                                </IonCard>
                            </IonCol>
                            <IonCol size="6" style={{padding: 20}}>
                                <IonCard style={{
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: !isPlayerTurn ? 'black' : 'white',
                                    backgroundColor: !isPlayerTurn ? 'var(--ion-color-warning)' : '',
                                    transition: 'background-color 0.5s ease'
                                }}>
                                    <TacIcon style={{
                                        fontSize: '64px',
                                        fill: 'none',
                                        stroke: !isPlayerTurn ? 'black' : 'white',
                                        color: !isPlayerTurn ? 'black' : 'white'
                                    }}/>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <GameResultModal
                        isOpen={showModal}
                        onDismiss={() => setShowModal(false)}
                        result={result}
                    />
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};

export default StartPage;
