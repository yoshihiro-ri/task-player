import React from "react";

interface ProgressTimeProps {
  scheduledTime: string;
  elapsedTime: string;
}

export const ProgressTime: React.FC<ProgressTimeProps> = ({ scheduledTime, elapsedTime }) => {
  return <div>{`${scheduledTime} / ${elapsedTime}`}</div>;
};
