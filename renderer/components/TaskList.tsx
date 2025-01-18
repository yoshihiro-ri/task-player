import React, { useState } from "react";
import { Tasks } from "../models/Tasks";
import { Task } from "../models/Task";
import TaskPlayers from "./TaskPlayers";
import CompletedTasks from "./CompletedTasks";

const TaskList = () => {
  const initialTask = new Task();
  const initialTasks = new Tasks();
  initialTasks.items = [initialTask];
  
  const [tasks, setTasks] = useState<Tasks>(initialTasks);

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(tasks.updateTask(updatedTask));
  };

  return (
    <div>
      <TaskPlayers tasks={tasks} onTaskUpdate={handleTaskUpdate} />
      <CompletedTasks tasks={tasks} />
    </div>
  );
};

export default TaskList; 