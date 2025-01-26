import { Task } from "./Task";

export class Tasks {
  private items: Task[];

  constructor() {
    this.items = [];
  }

  toArray(): Task[] {
    return [...this.items];
  }

  static fromArray(tasks: Task[]): Tasks {
    const newTasks = new Tasks();
    newTasks.items = tasks;
    return newTasks;
  }

  add(task: Task): Tasks {
    const newTasks = new Tasks();
    newTasks.items = [...this.items, task];
    return newTasks;
  }

  updateTask(updatedTask: Task): Tasks {
    const newTasks = new Tasks();
    newTasks.items = this.items.map((task) =>
      task.hash_id === updatedTask.hash_id ? updatedTask : task
    );
    return newTasks;
  }

  filter(predicate: (task: Task) => boolean): Task[] {
    return this.items.filter(predicate);
  }

  map<T>(callback: (task: Task) => T): T[] {
    return this.items.map(callback);
  }

  activeTasks(): Task[] {
    console.log('%o',this.items)
    return this.items.filter((task) => !task.isCompleted);
  }

  completedTasks(): Task[] {
    return this.items.filter((task) => task.isCompleted);
  }
}
