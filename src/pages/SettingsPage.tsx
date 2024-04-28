// src/pages/SettingsPage.js
import React, { useEffect, useState } from 'react';
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList,
    IonItem, IonLabel, IonToggle, IonIcon, IonButtons, IonBackButton,
    IonInput, IonSelect, IonSelectOption
} from '@ionic/react';
import { moon, notifications, volumeHigh } from 'ionicons/icons';
import { db } from '../db/SettingsDB';

const SettingsPage: React.FC = () => {
    const [playerName, setPlayerName] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    const [audioEnabled, setAudioEnabled] = useState(true);

    const handleSaveSetting = async (key: any, value: any) => {
        await db.saveSetting(key, value);
    };

    useEffect(() => {
        const loadSettings = async () => {
            const loadedPlayerName = await db.getSetting('playerName') || '';
            const loadedDifficulty = await db.getSetting('difficulty') || '';
            const loadedDarkMode = (await db.getSetting('darkMode')) === 'true';
            const loadedAudioEnabled = (await db.getSetting('audioEnabled')) !== 'false';
            setPlayerName(loadedPlayerName);
            setDifficulty(loadedDifficulty);
            setDarkMode(loadedDarkMode);
            setAudioEnabled(loadedAudioEnabled);
        };
        loadSettings();
    }, []);

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
                        <IonIcon slot="start" icon={volumeHigh} />
                        <IonLabel>Enable Sounds</IonLabel>
                        <IonToggle checked={audioEnabled} onIonChange={e => {
                            setAudioEnabled(e.detail.checked);
                            handleSaveSetting('audioEnabled', e.detail.checked.toString());
                        }} />
                    </IonItem>
                    <IonItem>
                        <IonIcon slot="start" icon={moon} />
                        <IonLabel>Enable Dark Mode</IonLabel>
                        <IonToggle checked={darkMode} onIonChange={e => {
                            setDarkMode(e.detail.checked);
                            handleSaveSetting('darkMode', e.detail.checked.toString());
                        }} />
                    </IonItem>
                    <IonItem>
                        <IonLabel slot="start">Player Name</IonLabel>
                        <IonInput placeholder="Enter your name" value={playerName} onIonChange={e => {
                            setPlayerName(e.detail.value!);
                            handleSaveSetting('playerName', e.detail.value!);
                        }} />
                    </IonItem>
                    <IonItem>
                        <IonLabel slot="start">Difficulty</IonLabel>
                        <IonSelect placeholder="Select Difficulty" value={difficulty} onIonChange={e => {
                            setDifficulty(e.detail.value);
                            handleSaveSetting('difficulty', e.detail.value);
                        }}>
                            <IonSelectOption style={{ color: 'green' }} value="easy">Easy</IonSelectOption>
                            <IonSelectOption style={{ color: 'yellow' }} value="medium">Medium</IonSelectOption>
                            <IonSelectOption style={{ color: 'red' }} value="hard">Hard</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default SettingsPage;
