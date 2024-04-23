// src/pages/HistoryPage.tsx
import React, {useEffect, useState} from 'react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol, IonButtons, IonBackButton,
    IonActionSheet, IonModal, IonList, IonItem, IonLabel, createGesture, IonFab, IonFabButton,
} from '@ionic/react';
import {trophy, thumbsDown, desktopOutline, beer, downloadOutline} from "ionicons/icons";
import {IonButton} from "@ionic/react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale, TimeSeriesScale
} from 'chart.js';
import {Line} from "react-chartjs-2";

// Register the necessary components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale, // Register this if you use it
    TimeSeriesScale // Register this if you need it for time series data
);


export type GameHistory = {
    playerName: string;
    result: 'Won' | 'Lost' | 'Draw';
    rounds: number;
    timestamp: Date | string;
};

type Dataset = {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
};

type ChartData = {
    labels: string[];
    datasets: Dataset[];
};

const HistoryPage: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [gameHistories, setGameHistories] = useState<GameHistory[]>([]);
    const [data, setData] = useState<ChartData>({
        labels: [],
        datasets: [
            { label: 'Wins', data: [], borderColor: 'green', backgroundColor: 'rgba(0, 255, 0, 0.5)' },
            { label: 'Losses', data: [], borderColor: 'red', backgroundColor: 'rgba(255, 0, 0, 0.5)' },
            { label: 'Draws', data: [], borderColor: 'blue', backgroundColor: 'rgba(0, 0, 255, 0.5)' }]
    })
    function updateChartData(gameHistories: GameHistory[]) {
        const last7Days = [...Array(7).keys()].map(days => new Date(Date.now() - 86400000 * days));
        const labels = last7Days.map(date => date.toLocaleDateString());

        // Calculate wins and losses for each day
        const wins = last7Days.map(date =>
            gameHistories.filter(game =>  {
                const date1 = new Date(game.timestamp);
                return date1.getDay() === date.getDay() && date1.getMonth() === date.getMonth() && date1.getFullYear() === date.getFullYear() && game.result === 'Won'
            }).length
        );
        const losses = last7Days.map(date =>
            gameHistories.filter(game => {
                const date1 = new Date(game.timestamp);
                console.log('date1', date1);
                console.log('date', date);
                return date1.getDay() === date.getDay() && date1.getMonth() === date.getMonth() && date1.getFullYear() === date.getFullYear() && game.result === 'Lost'
            }).length
        );
        const draws = last7Days.map(date =>
            gameHistories.filter(game => {
                const date1 = new Date(game.timestamp);
                return date1.getDay() === date.getDay() && date1.getMonth() === date.getMonth() && date1.getFullYear() === date.getFullYear() && game.result === 'Draw'
            }).length
        );

        // Update chart data
        setData(prevData => ({
            labels: labels,
            datasets: [
                { ...prevData.datasets[0], data: wins },
                { ...prevData.datasets[1], data: losses },
                { ...prevData.datasets[2], data: draws }
            ]
        }));
    }
    useEffect(() => {
        const loadHistories = () => {
            const storedHistories = localStorage.getItem('gameHistories');
            const gameHistories: GameHistory[] = storedHistories ? JSON.parse(storedHistories) : [];
            setGameHistories(gameHistories);
            updateChartData(gameHistories);
        };
        loadHistories();
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'gameHistories') {
                const newHistories = event.newValue ? JSON.parse(event.newValue) : [];
                setGameHistories(newHistories);
                updateChartData(newHistories);
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
        
    }, []);
    const handleExportToJson = () => {
        const dataStr = JSON.stringify(gameHistories);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'game-histories.json';
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    };
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="tertiary">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/"/>
                    </IonButtons>
                    <IonTitle>Settings</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={handleExportToJson}>
                            <IonIcon icon={downloadOutline} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {gameHistories.map((history, index) => (
                    <IonCard key={index}>
                        <IonGrid>
                            <IonRow>
                                <IonCol size="9">
                                    <IonCardHeader>
                                        <IonCardTitle
                                            style={{color: history.result === 'Lost' ? '#d32f2f' : history.result  === 'Won' ? '#2e7d32' : 'orange'}}>
                                            {history.result}
                                        </IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        Name: {history.playerName} <br/>
                                        Total Rounds: {history.rounds} <br/>
                                        Date: {Intl.DateTimeFormat('cs-CZ').format(new Date(history.timestamp))}
                                    </IonCardContent>
                                </IonCol>
                                <IonCol size="3" className="ion-text-right">
                                    <IonIcon
                                        icon={history.result === 'Won' ? trophy : history.result === 'Lost' ? thumbsDown : beer}
                                        style={{fontSize: '48px'}}
                                    />
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonCard>
                ))}
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={() => setShowModal(true)}>
                        <IonIcon icon={desktopOutline} />
                    </IonFabButton>
                </IonFab>
                <IonModal
                    isOpen={showModal}
                    initialBreakpoint={0.5}
                    breakpoints={[0.25, 0.5]}
                    backdropDismiss={true}
                    onDidDismiss={() => setShowModal(false)}>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Last 7 days...</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <Line data={data}/>
                    </IonContent>
                </IonModal>
            </IonContent>
        </IonPage>
    );
};

export default HistoryPage;
