import React from "react";
import {IonIcon} from "@ionic/react";
import icon from "./tac.svg";
interface TicIconProps {
    slot?: string;
    style?: React.CSSProperties;
}

const TacIcon: React.FC<TicIconProps> = (props) => (
    <IonIcon {...props} src={icon} />
);

export default TacIcon;
