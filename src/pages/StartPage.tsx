import React, {useState} from 'react';
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
import GameGrid from "../components/GameGrid"; // Import icons for X and O

const StartPage: React.FC = () => {
    const [round, setRound] = useState<number>(1);

    // Function to increment the round count
    const incrementRound = (): void => {
        setRound(prevRound => prevRound + 1);
    };
    const handleGameResult = (result: 'win' | 'lose' | 'draw') => {
        console.log(result);
    }

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
                <GameGrid onAction={incrementRound} onGameResult={handleGameResult}/>
            </IonContent>
            <IonFooter>
                <IonToolbar style={{ height: '200px' }}>
                    <IonGrid>
                        <IonRow>
                            {/* First player's card occupying the left half */}
                            <IonCol size="6" style={{ padding: 20 }}>
                                <IonCard style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <TacIcon style={{ fontSize: '64px' }}/> {/* First player icon */}
                                </IonCard>
                            </IonCol>

                            {/* Second player's card occupying the right half */}
                            <IonCol size="6" style={{ padding: 20 }}>
                                <IonCard style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <TicIcon style={{ fontSize: '64px' }}/> {/* Second player icon */}
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonToolbar>
            </IonFooter>

        </IonPage>
    );
};

export default StartPage;