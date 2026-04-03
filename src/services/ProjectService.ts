import { GenericCrudService } from "./GenericCrudService";
import { projectRepository } from "@/repositories";
import { createProjectSchema, updateProjectSchema } from "@/lib/entity-schemas";
import type { ProjectEntity } from "@/repositories/types";
import { PROJECTS } from "@/data/projects";
import { withDbFallback } from "@/lib/api-utils";

export class ProjectService extends GenericCrudService<ProjectEntity> {
  constructor() {
    super(projectRepository, createProjectSchema, updateProjectSchema);
  }

  override async findAll(): Promise<ProjectEntity[]> {
    return withDbFallback(
      this.repo.findAll(),
      PROJECTS.map((p, i) => ({ ...p, simulatorKey: p.simulatorKey ?? null, featured: p.featured ?? false, order: i, updatedAt: new Date().toISOString() }))
    );
  }
}

export const projectService = new ProjectService();
