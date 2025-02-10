import React, { useState, useEffect } from "react";
import TaskPlayer from "./TaskPlayer";
import AddTaskButton from "./Button/AddTaskButton";
import { Tasks } from "../models/Tasks";
import { Task } from "../models/Task";
import CompletedTask from "./CompletedTask";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const TaskPlayers = () => {
  const initialTasks = new Tasks().add(new Task());
  const [tasks, setTasks] = useState(initialTasks);
  const [isTaskPlayerOpened, setIsTaskPlayerOpened] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (typeof window !== "undefined" && window.electron) {
      const initStatus = async () => {
        const status = await window.electron.getStatus();
        if (isMounted) {
          setIsTaskPlayerOpened(status);
        }
      };
      initStatus();

      const handleStatusChange = (_event: any, status: boolean) => {
        if (isMounted) {
          setIsTaskPlayerOpened(status);
        }
      };

      window.electron.on("task-player-status-changed", handleStatusChange);

      return () => {
        isMounted = false;
        window.electron.off("task-player-status-changed", handleStatusChange);
      };
    }
  }, []);

  const addTask = () => {
    const task = new Task();
    setTasks(tasks.add(task));
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(tasks.updateTask(updatedTask));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setTasks((tasks) => {
        const tasksArray = tasks.toArray();
        const oldIndex = tasksArray.findIndex((item) => item.id === active.id);
        const newIndex = tasksArray.findIndex((item) => item.id === over.id);
        const newArray = arrayMove(tasksArray, oldIndex, newIndex);
        return Tasks.fromArray(newArray);
      });
    }
  };

  const activeTasks = tasks.activeTasks();
  const completedTasks = tasks.completedTasks();

  return (
    <div className="overflow-hidden w-full">
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext
          items={activeTasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {activeTasks.map((task) => (
            <TaskPlayer
              key={task.id}
              task={task}
              onTaskUpdate={handleTaskUpdate}
              isTaskPlayerOpened={isTaskPlayerOpened}
              setIsTaskPlayerOpened={setIsTaskPlayerOpened}
            />
          ))}
        </SortableContext>
        <AddTaskButton onClick={addTask} />
      </DndContext>
      <p>========完了したタスク========</p>
      {completedTasks.map((task) => (
        <CompletedTask key={task.id} title={task.title} />
      ))}
    </div>
  );
};

export default TaskPlayers;
