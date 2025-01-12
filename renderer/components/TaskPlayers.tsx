import React, { useState } from "react";
import TaskPlayer from "./TaskPlayer";
import AddTaskButton from "./Button/AddTaskButton";
import { Tasks } from "../models/Tasks";
import { Task } from "../models/Task";

const TaskPlayers = () => {
  const initialTasks = new Tasks().add(new Task());
  const [tasks, setTasks] = useState(initialTasks);

  const addTask = () => {
    const task = new Task();
    setTasks(tasks.add(task));
  };

  const activeTask = tasks.getActiveTasks();

  return (
    <div>
      {activeTask.map((task) => (
        <TaskPlayer key={task.hash_id} task={task} />
      ))}
      <AddTaskButton onClick={addTask}/>
    </div>
  );
};

export default TaskPlayers;
