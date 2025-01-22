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

interface TaskPlayerProps {
  task: Task;
  onTaskUpdate: (task: Task) => void;
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
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
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
        <ScheduledTime
          scheduledTime={scheduledTime}
          onTimeChange={setScheduledTime}
        />
        <ElapsedTime elapsedTime={formatTime(elapsedTime)} />
        <TaskTitle title={task.title} onUpdate={handleUpdateTitle} />
      </div>
    </div>
  );
};

export default TaskPlayer;
