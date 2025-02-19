import React from "react";
import { ButtonProps } from "../../types";
import PauseIcon from "../../public/images/pause-icon.svg";
const PauseTaskButton: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <div onClick={onClick}>
      <PauseIcon className="w-4 h-full h-4" />
    </div>
  );
};

export default PauseTaskButton;
