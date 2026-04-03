import { GenericCrudService } from "./GenericCrudService";
import { certificationRepository } from "@/repositories";
import { createCertificationSchema, updateCertificationSchema } from "@/lib/entity-schemas";
import type { CertificationEntity } from "@/repositories/types";
import { CERTIFICATIONS } from "@/data/certifications";
import { withDbFallback } from "@/lib/api-utils";

export class CertificationService extends GenericCrudService<CertificationEntity> {
  constructor() {
    super(certificationRepository, createCertificationSchema, updateCertificationSchema);
  }

  override async findAll(): Promise<CertificationEntity[]> {
    return withDbFallback(
      this.repo.findAll(),
      CERTIFICATIONS.map((c, i) => ({ ...c, credentialId: c.credentialId ?? null, order: i, updatedAt: new Date().toISOString() }))
    );
  }
}

export const certificationService = new CertificationService();
