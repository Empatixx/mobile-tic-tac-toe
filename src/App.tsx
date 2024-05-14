import { Redirect, Route } from 'react-router-dom';
import {
  IonApp, IonContent,
  IonIcon,
  IonLabel,
  IonRouterOutlet, IonSplitPane,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import { liveQuery } from 'dexie';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import { addIcons } from 'ionicons';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

// import '@ionic/react/css/palettes/dark.always.css';
import '@ionic/react/css/palettes/dark.class.css';
//import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import React, {useEffect, useState} from "react";
import StartPage from "./pages/StartPage";
import SettingsPage from "./pages/SettingsPage";
import MainPage from "./pages/MenuPage";
import HistoryPage from "./pages/HistoryPage";
import {t} from "vitest/dist/reporters-5f784f42";
import {db} from "./db/SettingsDB";

setupIonicReact();

const App: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false);
    useEffect(() => {
        const subscription = liveQuery(() => db.getSetting('darkMode'))
            .subscribe({
                next: (darkModeSetting) => {
                    console.log('Dark mode setting changed:', darkModeSetting);
                    setDarkMode(darkModeSetting === 'true');
                },
                error: (err) => {
                    console.error('Failed to subscribe to dark mode setting:', err);
                }
            });

        // Cleanup function to unsubscribe when the component unmounts
        return () => subscription.unsubscribe();
    }, []);

    return (
      <IonApp className={darkMode ? 'ion-palette-dark' : ''}>
        <IonReactRouter>
            <IonRouterOutlet>
              <Route path="/" component={MainPage} exact />
              <Route path="/start" component={StartPage} />
              <Route path="/settings" component={SettingsPage} />
              <Route path="/history" component={HistoryPage} />
              <Redirect to="/" />
            </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
  );
};
export default App;
