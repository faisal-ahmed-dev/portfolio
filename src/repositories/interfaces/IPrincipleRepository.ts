import type { PrincipleEntity } from "../types";

export interface IPrincipleRepository {
  findAll(): Promise<PrincipleEntity[]>;
  findById(id: string): Promise<PrincipleEntity | null>;
  create(data: Record<string, unknown>): Promise<PrincipleEntity>;
  update(id: string, data: Record<string, unknown>): Promise<PrincipleEntity>;
  delete(id: string): Promise<void>;
}
