import React,{useState} from "react";
import CancelTaskButton from "./Button/CancelTaskButton";
import StopButton from "./Button/StopTaskButton";
import PlayButton from "./Button/PlayTaskButton";
import DoneButton from "./Button/DoneTaskButton";
import TaskTitle from "./TaskTitle";
import TimeDifference from "./TimeDifference";
import { ProgressTime } from "./ProgressTime";

const TaskPlayer = () => {
  const [taskStatus, setTaskStatus] = useState<'stopped' | 'playing' | 'done' | 'cancel'>('stopped');

  const handleTaskPlay = () => {
    setTaskStatus('playing')
  }

  const handleTaskStop = () => {
    setTaskStatus('stopped')
  }

  const handleTaskDone = () => {
    setTaskStatus('done')
  }

  const handleTaskCancel = () => {
    setTaskStatus('cancel')
  }

  return (
  <div>
    <p>Current Status : {taskStatus}</p>
    TaskPlayer
    <CancelTaskButton onClick={handleTaskCancel}/>
    {taskStatus === 'stopped' ? <PlayButton onClick={handleTaskPlay}/> :null}
    {taskStatus === 'playing' ? <StopButton onClick={handleTaskStop}/> :null}
    <DoneButton onClick={handleTaskDone}/>
    <ProgressTime/>
    <TimeDifference/>
    <TaskTitle/>
  </div>
  );
};


export default TaskPlayer;
