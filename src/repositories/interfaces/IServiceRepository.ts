import type { ServiceEntity } from "../types";

export interface IServiceRepository {
  findAll(): Promise<ServiceEntity[]>;
  findById(id: string): Promise<ServiceEntity | null>;
  create(data: Record<string, unknown>): Promise<ServiceEntity>;
  update(id: string, data: Record<string, unknown>): Promise<ServiceEntity>;
  delete(id: string): Promise<void>;
}
