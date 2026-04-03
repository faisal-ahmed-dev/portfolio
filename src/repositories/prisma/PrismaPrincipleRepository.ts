import type { IPrincipleRepository } from "../interfaces/IPrincipleRepository";
import type { PrincipleEntity } from "../types";
import { GenericCrudRepository } from "./GenericCrudRepository";

export class PrismaPrincipleRepository
  extends GenericCrudRepository<PrincipleEntity>
  implements IPrincipleRepository
{
  protected get modelName() { return "principle" as const; }
}
