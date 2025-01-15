import React, { useState } from "react";
import CancelTaskButton from "./Button/CancelTaskButton";
import PauseTaskButton from "./Button/PauseTaskButton";
import PlayTaskButton from "./Button/PlayTaskButton";
import DoneButton from "./Button/DoneTaskButton";
import TaskTitle from "./TaskTitle";
import TimeDifference from "./TimeDifference";
import { ProgressTime } from "./ProgressTime";
import { Task } from "../models/Task";
import ProgressBar from "./ProgressBar";
import { useTaskState } from "../hooks/useTaskState";
import { format } from "date-fns";

interface TaskPlayerProps {
  task: Task;
}

const TaskPlayer: React.FC<TaskPlayerProps> = ({ task }: TaskPlayerProps) => {
  const handleUpdateTitle = (newTitle: string) => {
    task.title = newTitle;
  };

  const formatTime = (second: number) => {
    return format(new Date(second * 1000), "mm:ss");
  };
  const scheduledTime = 60;

  const {
    elapsedTime,
    isRunning,
    startTimer,
    stopTimer,
    completeTask,
    cancelTask,
    progressionRate,
  } = useTaskState(scheduledTime);
  return (
    <div>
      <ProgressBar progressionRate={progressionRate} />
      <div className="flex bg-gray-500 p-4 gap-x-5">
        <CancelTaskButton onClick={cancelTask} />
        <div className="px-2">
          {isRunning ? (
            <PauseTaskButton onClick={isRunning ? stopTimer : startTimer} />
          ) : (
            <PlayTaskButton onClick={isRunning ? stopTimer : startTimer} />
          )}
        </div>
        <DoneButton onClick={completeTask} />
        <ProgressTime
          scheduledTime={formatTime(scheduledTime)}
          elapsedTime={formatTime(elapsedTime)}
        />
        <TimeDifference />
        <TaskTitle title={task.title} onUpdate={handleUpdateTitle} />
      </div>
    </div>
  );
};

export default TaskPlayer;
