import React from "react";
import { Tasks } from "../models/Tasks";
import CompletedTask from "./CompletedTask";

interface CompletedTasksProps {
  tasks: Tasks;
}

const CompletedTasks: React.FC<CompletedTasksProps> = ({ tasks }) => {
  const completedTasks = tasks?.filter((task) => task.isCompleted) || [];

  return (
    <div>
      <p>CompletedTasks</p>
      {completedTasks.map((task) => (
        <CompletedTask
          key={task.hash_id}
          title={task.title}
        />
      ))}
    </div>
  );
};

export default CompletedTasks;
