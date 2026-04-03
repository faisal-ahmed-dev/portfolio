import type { TestimonialEntity } from "../types";

export interface ITestimonialRepository {
  findAll(): Promise<TestimonialEntity[]>;
  findById(id: string): Promise<TestimonialEntity | null>;
  create(data: Record<string, unknown>): Promise<TestimonialEntity>;
  update(id: string, data: Record<string, unknown>): Promise<TestimonialEntity>;
  delete(id: string): Promise<void>;
}
