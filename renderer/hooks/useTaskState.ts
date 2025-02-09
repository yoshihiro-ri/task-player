import { useState, useEffect } from "react";
import { Task } from "../models/Task";

interface UseTaskStateProps {
  task: Task;
  scheduledTime: number;
  onTaskUpdate: (task: Task) => void;
}

export const useTaskState = ({ task, scheduledTime, onTaskUpdate }: UseTaskStateProps) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, SetIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);
  const [progressionRate, setProgressionRate] = useState(0);

  const startTimer = () => {
    SetIsRunning(true);
  };
  const stopTimer = async () => {
    SetIsRunning(false);
    // await taskService.updateTime(taskId, elapsedTime);
  };

  const completeTask = () => {
    setIsCompleted(true);
    task.isCompleted = true;
    onTaskUpdate(task);
  };

  const cancelTask = () => {
    setIsCanceled(true);
    task.isCanceled = true;
    onTaskUpdate(task);
  };

  const calcProgressionRate = () => {
    const rate = (elapsedTime / scheduledTime) * 100;
    setProgressionRate(rate);
  }

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    const rate = (elapsedTime / scheduledTime) * 100;
    setProgressionRate(rate);
  }, [elapsedTime, scheduledTime]);

  return {
    isRunning,
    elapsedTime,
    startTimer,
    stopTimer,
    completeTask,
    cancelTask,
    progressionRate,
    isCompleted
  };
};
