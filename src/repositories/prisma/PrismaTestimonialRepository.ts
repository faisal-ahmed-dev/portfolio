import type { ITestimonialRepository } from "../interfaces/ITestimonialRepository";
import type { TestimonialEntity } from "../types";
import { GenericCrudRepository } from "./GenericCrudRepository";

export class PrismaTestimonialRepository
  extends GenericCrudRepository<TestimonialEntity>
  implements ITestimonialRepository
{
  protected get modelName() { return "testimonial" as const; }
}
