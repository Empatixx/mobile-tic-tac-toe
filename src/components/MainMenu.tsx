// src/pages/MenuPage.tsx
import React from 'react';
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonImg } from '@ionic/react';
import './MainMenu.css';

const MainMenu: React.FC = () => {
    return (
        <IonPage>
            <IonContent className="ion-padding">
                <h1 className="title">Tic Tac Toe</h1>
                <IonCard>
                    <img src="/favicon.png" alt="Start Icon" style={{
                        width: '256px',
                        height: '256px',
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}/>
                    <IonCardHeader>
                        <IonCardTitle>Start</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        Begin your game here!
                        <IonButton expand="block" routerLink="/start" fill="solid" color="success">
                            Start Game
                        </IonButton>
                    </IonCardContent>
                </IonCard>

                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Settings</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        Adjust your settings.
                        <IonButton expand="block" routerLink="/settings" fill="solid" color="primary">
                            Go to Settings
                        </IonButton>
                    </IonCardContent>
                </IonCard>

                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Highscore</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        Check out the high scores!
                        <IonButton expand="block" routerLink="/history" fill="solid" color="tertiary">
                            View Highscores
                        </IonButton>
                    </IonCardContent>
                </IonCard>

            </IonContent>
        </IonPage>
    );
};

export default MainMenu;
