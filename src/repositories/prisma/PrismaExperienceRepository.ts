import type { IExperienceRepository } from "../interfaces/IExperienceRepository";
import type { ExperienceEntity } from "../types";
import { GenericCrudRepository } from "./GenericCrudRepository";

export class PrismaExperienceRepository
  extends GenericCrudRepository<ExperienceEntity>
  implements IExperienceRepository
{
  protected get modelName() { return "experience" as const; }
}
