import React from "react";
import { ButtonProps } from "../../types";
import CancelIcon from "../../public/images/cancel-icon.svg";
const CancelTaskButton: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <div onClick={onClick}>
      <CancelIcon className="w-4 h-full h-4" />
    </div>
  );
};

export default CancelTaskButton;
