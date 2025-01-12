import { v4 as uuidv4 } from 'uuid';

export class Task {
  public hash_id: string;

  constructor(
    public title: string = "undefined",
    public expected_cost: number = 15,
    public actual_used_cost: number = 0,
    public is_done: boolean = false,
    public is_deleted: boolean = false,
    public created_at: Date = new Date(),
    public updated_at: Date = new Date(),
    public order: number = 0
  ) {
    this.hash_id = uuidv4();  // コンストラクタでハッシュを自動生成
  }

  // メソッド
  start() {
    this.actual_used_cost = 0;
  }

  stop() {
    // 停止時の処理
  }

  done() {
    this.is_done = true;
    this.updated_at = new Date();
  }

  delete() {
    this.is_deleted = true;
    this.updated_at = new Date();
  }

  static fromDB(data: any): Task {
    return new Task(
      data.title,
      data.expected_cost,
      data.actual_used_cost,
      data.is_done,
      data.is_deleted,
      new Date(data.created_at),
      new Date(data.updated_at),
      data.order
    );
  }
}