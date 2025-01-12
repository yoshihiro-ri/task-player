import { Task } from "./Task"
export class Tasks {
  private _items: Task[] = [];

  constructor(tasks: Task[] = []) {
    this._items = tasks;
  }

  // ゲッター
  get items() {
    return [...this._items]; // 配列のコピーを返す
  }

  // メソッド
  add(task: Task): Tasks {
    return new Tasks([...this._items, task]);
  }

  remove(id: number) {
    this._items = this._items.filter(task => task.id !== id);
  }

  find(id: number) {
    return this._items.find(task => task.id === id);
  }

  update(id: number, updater: (task: Task) => void) {
    const task = this.find(id);
    if (task) {
      updater(task);
    }
  }

  // 未完了タスクのみ取得
  getActiveTasks() {
    return this._items.filter(task => !task.is_done && !task.is_deleted);
  }

  // 完了タスクのみ取得
  getCompletedTasks() {
    return this._items.filter(task => task.is_done && !task.is_deleted);
  }

  // DBからデータを読み込む
  static fromDB(data: any[]): Tasks {
    const tasks = data.map(item => Task.fromDB(item));
    return new Tasks(tasks);
  }
}