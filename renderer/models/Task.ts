import { UniqueIdentifier } from '@dnd-kit/core';

export class Task {
  id: UniqueIdentifier;
  hash_id: string;
  title: string;
  isCompleted: boolean;
  isCanceled: boolean;
  scheduledTime: number;

  constructor() {
    this.id = Math.random().toString(36).substring(7);
    this.hash_id = this.id;
    this.title = "new task title";
    this.isCompleted = false;
    this.isCanceled = false;
    this.scheduledTime = 15;
  }
}