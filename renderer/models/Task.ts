export class Task {
  hash_id: string;
  title: string;
  isCompleted: boolean;
  scheduledTime: number;

  constructor() {
    this.hash_id = Math.random().toString(36).substring(7);
    this.title = "新しいタスク";
    this.isCompleted = false;
    this.scheduledTime = 15;
  }
}