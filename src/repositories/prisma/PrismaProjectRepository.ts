import type { IProjectRepository } from "../interfaces/IProjectRepository";
import type { ProjectEntity } from "../types";
import { GenericCrudRepository } from "./GenericCrudRepository";

export class PrismaProjectRepository
  extends GenericCrudRepository<ProjectEntity>
  implements IProjectRepository
{
  protected get modelName() { return "project" as const; }
}
