import React from "react";
import { ButtonProps } from "../../types";
import  PlayIcon  from "../../public/images/play-icon.svg";
const PlayTaskButton : React.FC<ButtonProps> = ({onClick}) =>{
  return (<div onClick={onClick}>
    <PlayIcon className="w-4 h-full h-4"/>
    </div>);
};

export default PlayTaskButton;
