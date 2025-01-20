import React, { useState } from "react";
import TaskPlayer from "./TaskPlayer";
import AddTaskButton from "./Button/AddTaskButton";
import { Tasks } from "../models/Tasks";
import { Task } from "../models/Task";
import CompletedTask from "./CompletedTask";
const TaskPlayers = () => {
  const initialTasks = new Tasks().add(new Task());
  const [tasks, setTasks] = useState(initialTasks);

  const addTask = () => {
    const task = new Task();
    setTasks(tasks.add(task));
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(tasks.updateTask(updatedTask));
  };

  const activeTasks = tasks.filter((task) => !task.isCompleted);
  const completedTasks = tasks.filter((task) => task.isCompleted);


  return (
    <div>
      {activeTasks.map((task) => (
        <TaskPlayer
          key={task.hash_id}
          task={task}
          onTaskUpdate={handleTaskUpdate}
        />
      ))}
      <AddTaskButton onClick={addTask} />
      <p>========完了したタスク========</p>
      {completedTasks.map((task) => (
        <CompletedTask
          title={task.title}
        />
      ))}
    </div>
  );
};

export default TaskPlayers;
