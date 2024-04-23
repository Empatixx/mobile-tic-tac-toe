// GameResultModal.tsx
import React from 'react';
import {
    IonModal,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonText,
    IonButton
} from '@ionic/react';
import { trophyOutline, sadOutline, timeOutline } from 'ionicons/icons';
import { Icon } from 'ionicons/dist/types/components/icon/icon';
import './GameResultModal.css';

interface GameResultModalProps {
    isOpen: boolean;
    onDismiss: () => void;
    result: 'Win' | 'Loss' | 'Draw' | '';
}

const GameResultModal: React.FC<GameResultModalProps> = ({ isOpen, onDismiss, result }) => {
    interface ModalContent {
        icon: any;
        message: string;
        color: string;
    }

    const getModalContent = (): ModalContent => {
        switch (result) {
            case 'Win':
                return {
                    icon: trophyOutline,
                    message: "Congratulations! You've won!",
                    color: 'gold'
                };
            case 'Loss':
                return {
                    icon: sadOutline,
                    message: "Sorry! You've lost.",
                    color: 'silver'
                };
            case 'Draw':
                return {
                    icon: timeOutline,
                    message: "It's a draw.",
                    color: 'grey'
                };
            default:
                return {
                    icon: timeOutline,
                    message: "Game Over!",
                    color: 'grey'
                };
        }
    };

    const { icon, message, color } = getModalContent();

    return (
        <IonModal isOpen={isOpen} onDidDismiss={onDismiss} className="small-modal">
            <IonGrid className="ion-padding" style={{ maxWidth: '400px', margin: 'auto' }}>
                <IonRow style={{ alignItems: 'center' }}>
                    <IonCol size="12" style={{ textAlign: 'center' }}>
                        <IonIcon icon={icon} style={{ fontSize: '72px', color: color }} />
                        <IonText>
                            <h1>{message}</h1>
                        </IonText>
                        <IonButton onClick={onDismiss}>Close</IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonModal>
    );
};

export default GameResultModal;
