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
    IonActionSheet, IonModal, IonList, IonItem, IonLabel, createGesture,
} from '@ionic/react';
import {trophy, thumbsDown , desktopOutline} from "ionicons/icons";
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


type GameHistory = {
    playerName: string;
    result: 'Won' | 'Lost';
    rounds: number;
    timestamp: Date;
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
const gameHistories: GameHistory[] = [
    {playerName: 'Alice', result: 'Won', rounds: 3, timestamp: new Date()},
    {playerName: 'Bob', result: 'Lost', rounds: 5, timestamp: new Date()},
    // Add more histories here
];

const HistoryPage: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState<ChartData>({
        labels: [],
        datasets: [
            { label: 'Wins', data: [], borderColor: 'green', backgroundColor: 'rgba(0, 255, 0, 0.5)' },
            { label: 'Losses', data: [], borderColor: 'red', backgroundColor: 'rgba(255, 0, 0, 0.5)' }]
    })

    useEffect(() => {
        const last7Days = [...Array(7).keys()].map(days => new Date(Date.now() - 86400000 * days));
        const labels = last7Days.map(date => date.toLocaleDateString());

        // Calculate wins and losses for each day
        const wins = last7Days.map(date =>
            gameHistories.filter(game =>
                game.timestamp.toDateString() === date.toDateString() && game.result === 'Won'
            ).length
        );
        const losses = last7Days.map(date =>
            gameHistories.filter(game =>
                game.timestamp.toDateString() === date.toDateString() && game.result === 'Lost'
            ).length
        );

        // Update chart data
        setData(prevData => ({
            labels: labels,
            datasets: [
                { ...prevData.datasets[0], data: wins },
                { ...prevData.datasets[1], data: losses }
            ]
        }));
    }, []);
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="tertiary">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/"/>
                    </IonButtons>
                    <IonTitle>Settings</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => setShowModal(true)}>
                            <IonIcon icon={desktopOutline} />
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
                                            style={{color: history.result === 'Lost' ? '#d32f2f' : '#2e7d32'}}>
                                            {history.result}
                                        </IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        Name: {history.playerName} <br/>
                                        Total Rounds: {history.rounds} <br/>
                                        Date: {Intl.DateTimeFormat('cs-CZ').format(history.timestamp)}
                                    </IonCardContent>
                                </IonCol>
                                <IonCol size="3" className="ion-text-right">
                                    <IonIcon
                                        icon={history.result === 'Won' ? trophy : thumbsDown}
                                        style={{fontSize: '48px'}}
                                    />
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonCard>
                ))}
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
