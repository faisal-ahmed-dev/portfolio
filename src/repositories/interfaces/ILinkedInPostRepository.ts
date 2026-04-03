import type {
  LinkedInPostEntity,
  CreateLinkedInPostInput,
  UpdateLinkedInPostInput,
} from "../types";

export interface ILinkedInPostRepository {
  findAll(options?: { featuredOnly?: boolean }): Promise<LinkedInPostEntity[]>;
  findById(id: string): Promise<LinkedInPostEntity | null>;
  create(data: CreateLinkedInPostInput): Promise<LinkedInPostEntity>;
  update(id: string, data: UpdateLinkedInPostInput): Promise<LinkedInPostEntity>;
  delete(id: string): Promise<void>;
}
