import type { ProjectEntity } from "../types";

export interface IProjectRepository {
  findAll(): Promise<ProjectEntity[]>;
  findById(id: string): Promise<ProjectEntity | null>;
  create(data: Record<string, unknown>): Promise<ProjectEntity>;
  update(id: string, data: Record<string, unknown>): Promise<ProjectEntity>;
  delete(id: string): Promise<void>;
}
