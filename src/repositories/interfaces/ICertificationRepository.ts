import type { CertificationEntity } from "../types";

export interface ICertificationRepository {
  findAll(): Promise<CertificationEntity[]>;
  findById(id: string): Promise<CertificationEntity | null>;
  create(data: Record<string, unknown>): Promise<CertificationEntity>;
  update(id: string, data: Record<string, unknown>): Promise<CertificationEntity>;
  delete(id: string): Promise<void>;
}
