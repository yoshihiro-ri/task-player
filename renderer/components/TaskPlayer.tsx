import React, { useState } from "react";
import CancelTaskButton from "./Button/CancelTaskButton";
import PauseTaskButton from "./Button/PauseTaskButton";
import PlayTaskButton from "./Button/PlayTaskButton";
import DoneButton from "./Button/DoneTaskButton";
import TaskTitle from "./TaskTitle";
import TimeDifference from "./TimeDifference";
import { ProgressTime } from "./ProgressTime";
import { Task } from "../models/Task";

interface TaskPlayerProps {
  task: Task;
}

const TaskPlayer: React.FC<TaskPlayerProps> = ({ task }: TaskPlayerProps) => {
  const [taskStatus, setTaskStatus] = useState<
    "stopped" | "playing" | "done" | "cancel"
  >("stopped");

  const handleTaskPlay = () => {
    setTaskStatus("playing");
  };

  const handleTaskStop = () => {
    setTaskStatus("stopped");
  };

  const handleTaskDone = () => {
    setTaskStatus("done");
  };

  const handleTaskCancel = () => {
    setTaskStatus("cancel");
  };

  const handleUpdateTitle = (newTitle: string) => {
    task.title = newTitle;
  };

  return (
    <div>
      <p>Current Status : {taskStatus}</p>
      <div className="flex bg-gray-500 p-4 gap-x-5">
        <CancelTaskButton onClick={handleTaskCancel} />
        <div className="px-2">
          {taskStatus === "stopped" ? (
            <PlayTaskButton onClick={handleTaskPlay} />
          ) : null}
          {taskStatus === "playing" ? (
            <PauseTaskButton onClick={handleTaskStop} />
          ) : null}
        </div>
        <DoneButton onClick={handleTaskDone} />
        <ProgressTime />
        <TimeDifference />
        <TaskTitle
          title={task.title}
          onUpdate={handleUpdateTitle}
        />
      </div>
    </div>
  );
};

export default TaskPlayer;
