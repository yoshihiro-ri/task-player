import React from "react";
import { ButtonProps } from "../../types";
import DoneIcon from "../../public/images/done-icon.svg";

const CompleteTaskButton: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <div onClick={onClick}>
      <DoneIcon className="w-4 h-4" />
    </div>
  );
};

export default CompleteTaskButton;
