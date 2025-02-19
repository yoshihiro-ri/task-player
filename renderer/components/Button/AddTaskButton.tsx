import React from "react";
import { ButtonProps } from "../../types";
import AddIcon from "../../public/images/add-icon.svg";
const AddTaskButton: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <div onClick={onClick} className="h-12 w-12 p-3">
      <AddIcon className="w-4 h-full h-4" />
    </div>
  );
};

export default AddTaskButton;
