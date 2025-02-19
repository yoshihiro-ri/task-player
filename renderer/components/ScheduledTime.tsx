import React from "react";

type Props = {
  scheduledTime: number;
  onTimeChange: (time: number) => void;
};

const ScheduledTime = ({ scheduledTime, onTimeChange }: Props) => {
  const timeOptions = [
    { value: 5, label: "5:00" },
    { value: 10, label: "10:00" },
    { value: 15, label: "15:00" },
    { value: 25, label: "25:00" },
    { value: 40, label: "40:00" },
  ];

  return (
    <select
      value={scheduledTime}
      onChange={(e) => onTimeChange(Number(e.target.value))}
      className="bg-gray-500 text-white ml-5 rounded text-right"
    >
      {timeOptions.map((option) => (
        <option key={option.value} value={option.value * 60}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default ScheduledTime;
