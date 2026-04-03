import type { IMetricRepository } from "../interfaces/IMetricRepository";
import type { MetricEntity } from "../types";
import { GenericCrudRepository } from "./GenericCrudRepository";

export class PrismaMetricRepository
  extends GenericCrudRepository<MetricEntity>
  implements IMetricRepository
{
  protected get modelName() { return "metric" as const; }
}
