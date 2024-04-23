import React from 'react';
import {IonIcon} from "@ionic/react";
import icon from "./tic.svg";

interface TicIconProps {
    slot?: string;
    style?: React.CSSProperties;
}

const TicIcon: React.FC<TicIconProps> = (props) => (
    <IonIcon {...props} src={icon}/>
);

export default TicIcon;