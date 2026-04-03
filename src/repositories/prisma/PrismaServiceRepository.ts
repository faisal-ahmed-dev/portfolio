import type { IServiceRepository } from "../interfaces/IServiceRepository";
import type { ServiceEntity } from "../types";
import { GenericCrudRepository } from "./GenericCrudRepository";

export class PrismaServiceRepository
  extends GenericCrudRepository<ServiceEntity>
  implements IServiceRepository
{
  protected get modelName() { return "service" as const; }
}
