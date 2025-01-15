import React from "react";

type Props = {
  progressionRate: number;
};
const ProgressBar = ({ progressionRate }: Props) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{ width:`${progressionRate}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
