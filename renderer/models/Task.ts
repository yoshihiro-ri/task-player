import { UniqueIdentifier } from '@dnd-kit/core';

export class Task {
  id: UniqueIdentifier;
  hash_id: string;
  title: string;
  isCompleted: boolean;
  scheduledTime: number;

  constructor() {
    this.id = Math.random().toString(36).substring(7);
    this.hash_id = this.id;
    this.title = "新しいタスク";
    this.isCompleted = false;
    this.scheduledTime = 15;
  }
}