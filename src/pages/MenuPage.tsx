import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import MainMenu from "../components/MainMenu";

const MainPage: React.FC = () => {
    return (
        <IonPage>
            <MainMenu/>
        </IonPage>
    );
};

export default MainPage;
