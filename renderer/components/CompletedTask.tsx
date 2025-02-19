import React from "react";
type Props = {
  title: string;
  elapsedTime: string;
  scheduledTime: number;
};

const CompletedTask = ({ title, elapsedTime, scheduledTime }: Props) => {
  return (
    <tr>
      <td className="border border-gray-300 p-2">{title}</td>
      {/* <td className="border border-gray-300 p-2">{scheduledTime}min</td> */}
      <td className="border border-gray-300 p-2">{elapsedTime}</td>
    </tr>
  );
};

export default CompletedTask;
