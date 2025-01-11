import React from "react";
import { ButtonProps } from "../../types";
import  PlayIcon  from "../../public/images/play-icon.svg";
const PlayTaskButton : React.FC<ButtonProps> = ({onClick}) =>{
  return (<div onClick={onClick}>
    PlayTaskButton
    <PlayIcon/>

    </div>);
};

export default PlayTaskButton;
