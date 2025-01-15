import { useState, useEffect } from "react";

export const useTaskState = (scheduledTime: number) => {
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
  };

  const cancelTask = () => {
    setIsCanceled(true);
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
        // calcProgressionRate();
        // console.log(elapsedTime);
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
    progressionRate
  };
};
