import React, { useState } from "react";
import TaskPlayer from "./TaskPlayer";
import AddTaskButton from "./Button/AddTaskButton";
import { Tasks } from "../models/Tasks";
import { Task } from "../models/Task";
import CompletedTask from "./CompletedTask";
import { DndContext } from "@dnd-kit/core";
import { SortableContext, arrayMove ,verticalListSortingStrategy } from "@dnd-kit/sortable";

const TaskPlayers = () => {
  const initialTasks = new Tasks().add(new Task());
  const [tasks, setTasks] = useState(initialTasks);

  const addTask = () => {
    const task = new Task();
    setTasks(tasks.add(task));
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(tasks.updateTask(updatedTask));
    console.log("updatedTask")
  };

  const activeTasks = tasks.activeTasks()
  const completedTasks = tasks.completedTasks()

  return (
    <div className="overflow-hidden w-full">
      <DndContext
        onDragEnd={(event) => {
          const { active, over } = event;
          if (over == null) {
            return;
          }
          if (active.id !== over.id) {
            setTasks((tasks) => {
              const tasksArray = tasks.toArray();
              const oldIndex = tasksArray.findIndex(
                (item) => item.id === active.id
              );
              const newIndex = tasksArray.findIndex(
                (item) => item.id === over.id
              );
              const newArray = arrayMove(tasksArray, oldIndex, newIndex);
              console.log(newArray)
              return Tasks.fromArray(newArray);
            });
          }
        }}
      >
        <SortableContext items={activeTasks} strategy={verticalListSortingStrategy}>
          {activeTasks.map((task) => (
            <TaskPlayer
              key={task.id}
              task={task}
              onTaskUpdate={handleTaskUpdate}
            />
          ))}
        </SortableContext>

        <AddTaskButton onClick={addTask} />
      </DndContext>
      <p>========完了したタスク========</p>
      {completedTasks.map((task) => (
        <CompletedTask 
          key={task.id}
          title={task.title} 
        />
      ))}
    </div>
  );
};

export default TaskPlayers;
