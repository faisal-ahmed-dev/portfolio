import type { WritingEntity } from "../types";

export interface IWritingRepository {
  findAll(): Promise<WritingEntity[]>;
  findById(id: string): Promise<WritingEntity | null>;
  create(data: Record<string, unknown>): Promise<WritingEntity>;
  update(id: string, data: Record<string, unknown>): Promise<WritingEntity>;
  delete(id: string): Promise<void>;
}
