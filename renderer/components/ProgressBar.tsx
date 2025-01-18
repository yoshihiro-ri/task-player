import React from "react";

type Props = {
  progressionRate: number;
};
const ProgressBar = ({ progressionRate }: Props) => {
  return (
    <div className="w-full bg-gray-200  h-2.5 dark:bg-gray-700">
      <div
        className={`h-2.5 ${
          progressionRate > 100 ? 'bg-yellow-600' : 'bg-blue-600'
        }`}
        style={{ width:`${progressionRate}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
