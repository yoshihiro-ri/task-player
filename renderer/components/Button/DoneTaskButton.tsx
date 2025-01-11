import React from "react";
import { ButtonProps } from "../../types";

const DoneTaskButton: React.FC<ButtonProps> = ({onClick}) => {
  return <div onClick={onClick}>DoneTaskButton</div>;
};

export default DoneTaskButton;
