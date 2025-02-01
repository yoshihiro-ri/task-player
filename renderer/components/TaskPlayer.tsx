import React, { useState } from "react";
import CancelTaskButton from "./Button/CancelTaskButton";
import PauseTaskButton from "./Button/PauseTaskButton";
import PlayTaskButton from "./Button/PlayTaskButton";
import DoneButton from "./Button/CompleteTaskButton";
import TaskTitle from "./TaskTitle";
import { ElapsedTime } from "./ElapsedTime";
import ScheduledTime from "./ScheduledTime";
import { Task } from "../models/Task";
import ProgressBar from "./ProgressBar";
import { useTaskState } from "../hooks/useTaskState";
import { format } from "date-fns";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { mainWindow } from "../../main/background";
import { updateBoundsActive } from "../../main/helpers/update-bounds";

interface TaskPlayerProps {
  task: Task;
  onTaskUpdate: (task: Task) => void;
}

declare global {
  interface Window {
    electron: {
      updateBounds: (status: string) => void;
    }
  }
}

const TaskPlayer: React.FC<TaskPlayerProps> = ({
  task,
  onTaskUpdate,
}: TaskPlayerProps) => {
  const [scheduledTime, setScheduledTime] = useState(15);
  const {
    elapsedTime,
    isRunning,
    startTimer,
    stopTimer,
    completeTask,
    cancelTask,
    progressionRate,
    isCompleted,
  } = useTaskState({
    task,
    scheduledTime,
    onTaskUpdate, // タスクの更新を親コンポーネントに通知
  });

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
  });

  const handleUpdateTitle = (newTitle: string) => {
    task.title = newTitle;
  };

  const formatTime = (second: number) => {
    return format(new Date(second * 1000), "mm:ss");
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className="relative"
    >
      <ProgressBar progressionRate={progressionRate} />
      <div
        className="absolute inset-0 cursor-pointer z-10"
        onClick={() => window.electron.updateBounds('active')}

      />
      <div className="flex bg-gray-500 p-4 gap-x-5 relative">
        <div className="z-20">
          <CancelTaskButton onClick={cancelTask} />
        </div>
        <div className="px-2 z-20">
          {isRunning ? (
            <PauseTaskButton onClick={isRunning ? stopTimer : startTimer} />
          ) : (
            <PlayTaskButton onClick={isRunning ? stopTimer : startTimer} />
          )}
        </div>
        <div className="z-20">
          <DoneButton onClick={completeTask} />
        </div>
        <div className="z-20">
          <ScheduledTime
            scheduledTime={scheduledTime}
            onTimeChange={setScheduledTime}
          />
        </div>
        <ElapsedTime elapsedTime={formatTime(elapsedTime)} />
        <div className="z-20">
          <TaskTitle title={task.title} onUpdate={handleUpdateTitle} />
        </div>
        <div
          {...attributes}
          {...listeners}
          className="absolute inset-0 cursor-move"
          style={{ pointerEvents: "none" }}
        >
          <div className="absolute inset-0 pointer-events-auto" />
        </div>
      </div>
    </div>
  );
};

export default TaskPlayer;
