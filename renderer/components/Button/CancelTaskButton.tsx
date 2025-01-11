import React from "react";
import { ButtonProps } from "../../types";

const CancelTaskButton: React.FC<ButtonProps> = ({onClick}) => {
  return <div onClick={onClick}>CancelTaskButton</div>;
};

export default CancelTaskButton;
