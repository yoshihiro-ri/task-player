import React, { useState, useEffect } from "react";
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

declare global {
  interface Window {
    electron: {
      updateStatus: (status: boolean) => void;
      getStatus: () => Promise<boolean>;
      on: (channel: string, callback: Function) => void;
      off: (channel: string, callback: Function) => void;
    };
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

  const [isWindowReady, setIsWindowReady] = useState(false);
  const [isTaskPlayerOpened, setIsTaskPlayerOpened] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.electron) {
      setIsWindowReady(true);

      // 初期状態を取得
      const initStatus = async () => {
        const status = await window.electron.getStatus();
        setIsTaskPlayerOpened(status);
      };
      initStatus();

      const handleStatusChange = (_event: any, status: boolean) => {
        setIsTaskPlayerOpened(status);
      };

      window.electron.on("task-player-status-changed", handleStatusChange);

      return () => {
        window.electron.off("task-player-status-changed", handleStatusChange);
      };
    }
  }, []);

  const handleUpdateTitle = (newTitle: string) => {
    task.title = newTitle;
  };

  const formatTime = (second: number) => {
    const timeInMilliseconds = second * 1000;
    return second >= 3600
      ? format(new Date(timeInMilliseconds), "HH:mm:ss")
      : format(new Date(timeInMilliseconds), "mm:ss");
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

      {isWindowReady && !isTaskPlayerOpened && (
        <div
          className="absolute inset-0 cursor-pointer z-10"
          onClick={() => {
            window.electron.updateStatus(true);
            setIsTaskPlayerOpened(true);
          }}
        />
      )}

      <div className="flex bg-gray-500 p-4 relative items-center">
          <div className="z-20">
            <CancelTaskButton onClick={cancelTask} />
          </div>
          <div className="px-6 z-20">
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
        <div className="z-20 ml-5">
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
