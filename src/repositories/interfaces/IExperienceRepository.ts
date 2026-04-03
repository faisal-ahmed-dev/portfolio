import type { ExperienceEntity } from "../types";

export interface IExperienceRepository {
  findAll(): Promise<ExperienceEntity[]>;
  findById(id: string): Promise<ExperienceEntity | null>;
  create(data: Record<string, unknown>): Promise<ExperienceEntity>;
  update(id: string, data: Record<string, unknown>): Promise<ExperienceEntity>;
  delete(id: string): Promise<void>;
}
