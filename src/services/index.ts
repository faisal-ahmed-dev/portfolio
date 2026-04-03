import { blogPostRepository, linkedInPostRepository } from "@/repositories";
import { BlogPostService } from "./BlogPostService";
import { LinkedInPostService } from "./LinkedInPostService";

export const blogPostService = new BlogPostService(blogPostRepository);
export const linkedInPostService = new LinkedInPostService(linkedInPostRepository);

export { BlogPostService, LinkedInPostService };

export { projectService } from "./ProjectService";
export { experienceService } from "./ExperienceService";
export { serviceService } from "./ServiceService";
export { testimonialService } from "./TestimonialService";
export { certificationService } from "./CertificationService";
export { writingService } from "./WritingService";
export { principleService } from "./PrincipleService";
export { metricService } from "./MetricService";
export { openSourceService } from "./OpenSourceService";
export { portfolioInfoService } from "./PortfolioInfoService";
export { jobVariantService } from "./JobVariantService";
export { visitService } from "./VisitService";
