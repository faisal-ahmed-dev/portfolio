import type { ICertificationRepository } from "../interfaces/ICertificationRepository";
import type { CertificationEntity } from "../types";
import { GenericCrudRepository } from "./GenericCrudRepository";

export class PrismaCertificationRepository
  extends GenericCrudRepository<CertificationEntity>
  implements ICertificationRepository
{
  protected get modelName() { return "certification" as const; }
}
