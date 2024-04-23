import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonToggle, IonIcon, IonButtons, IonBackButton } from '@ionic/react';
import { moon, notifications, volumeHigh } from 'ionicons/icons';

const SettingsPage: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" />
                    </IonButtons>
                    <IonTitle>Settings</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonList>
                    <IonItem>
                        <IonIcon slot="start" icon={notifications} />
                        <IonLabel>Enable Notifications</IonLabel>
                        <div slot="end" className="ion-text-end">
                            <IonToggle name="notifications" />
                        </div>
                    </IonItem>
                    <IonItem>
                        <IonIcon slot="start" icon={moon} />
                        <IonLabel>Enable Dark Mode</IonLabel>
                        <div slot="end" className="ion-text-end">
                            <IonToggle name="darkMode" />
                        </div>
                    </IonItem>
                    <IonItem>
                        <IonIcon slot="start" icon={volumeHigh} size="large" />
                        <IonLabel>Enable Sounds</IonLabel>
                        <div slot="end" className="ion-text-end">
                            <IonToggle name="sounds"/>
                        </div>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default SettingsPage;
