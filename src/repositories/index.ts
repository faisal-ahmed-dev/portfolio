import { PrismaBlogPostRepository } from "./prisma/PrismaBlogPostRepository";
import { PrismaLinkedInPostRepository } from "./prisma/PrismaLinkedInPostRepository";
import type { IBlogPostRepository } from "./interfaces/IBlogPostRepository";
import type { ILinkedInPostRepository } from "./interfaces/ILinkedInPostRepository";

export const blogPostRepository: IBlogPostRepository =
  new PrismaBlogPostRepository();

export const linkedInPostRepository: ILinkedInPostRepository =
  new PrismaLinkedInPostRepository();

export type { IBlogPostRepository, ILinkedInPostRepository };
export * from "./types";
