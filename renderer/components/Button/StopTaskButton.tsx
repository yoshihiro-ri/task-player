import React from "react";
import { ButtonProps } from "../../types";

const StopTaskButton: React.FC<ButtonProps> = ({onClick}) => {
  return <div onClick={onClick}>
stop
  </div>;
};

export default StopTaskButton;
