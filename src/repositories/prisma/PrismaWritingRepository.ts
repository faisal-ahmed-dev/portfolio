import type { IWritingRepository } from "../interfaces/IWritingRepository";
import type { WritingEntity } from "../types";
import { GenericCrudRepository } from "./GenericCrudRepository";

export class PrismaWritingRepository
  extends GenericCrudRepository<WritingEntity>
  implements IWritingRepository
{
  protected get modelName() { return "writing" as const; }
}
