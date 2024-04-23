import React, { useEffect, useState } from 'react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFooter,
    IonIcon,
    IonText, IonButtons, IonBackButton, IonCol, IonRow, IonGrid, IonItem, IonCard
} from '@ionic/react';
import TacIcon from "../components/TacIcon";
import TicIcon from "../components/TicIcon";
import GameGrid from "../components/GameGrid";
import { GameHistory } from "./HistoryPage";
import useTicTacToeLogic from "../logic/TicTacToeLogic";
import useAiPlayer from "../logic/AiPlayer";
import GameResultModal from "../components/GameResultModal";

const StartPage: React.FC = () => {
    const [round, setRound] = useState<number>(1);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [result, setResult] = useState<'Win' | 'Loss' | 'Draw'>('Draw');
    const gridSize = 5;
    const { grid, setCellValue, isPlayerTurn, setIsPlayerTurn, checkIfGameEnded, winCells, updateWinCells } = useTicTacToeLogic(gridSize);
    const { findBestMove } = useAiPlayer(grid, gridSize, checkIfGameEnded);

    const incrementRound = (): void => {
        setRound(prevRound => prevRound + 1);
    };

    const handleGameResult = (state: 'Loss' | 'Win' | 'Draw') => {
        const history: GameHistory = {
            playerName: 'Player 1',
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

        updateWinCells(grid); // Update the win cells
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="success">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" />
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
            </IonContent>
            <IonFooter>
                <IonToolbar style={{ height: '200px' }}>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="6" style={{ padding: 20 }}>
                                <IonCard style={{
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: isPlayerTurn ? 'black' : 'white',
                                    backgroundColor: isPlayerTurn ? 'var(--ion-color-warning)' : '',
                                    transition: 'background-color 0.5s ease'
                                }}>
                                    <TicIcon style={{ fontSize: '64px' }} />
                                </IonCard>
                            </IonCol>
                            <IonCol size="6" style={{ padding: 20 }}>
                                <IonCard style={{
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: !isPlayerTurn ? 'black' : 'white',
                                    backgroundColor: !isPlayerTurn ? 'var(--ion-color-warning)' : '',
                                    transition: 'background-color 0.5s ease'
                                }}>
                                    <TacIcon style={{ fontSize: '64px' , fill:'none', stroke: !isPlayerTurn ? 'black' : 'white', color: !isPlayerTurn ? 'black' : 'white'}} />
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
