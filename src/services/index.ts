import { blogPostRepository, linkedInPostRepository } from "@/repositories";
import { BlogPostService } from "./BlogPostService";
import { LinkedInPostService } from "./LinkedInPostService";

export const blogPostService = new BlogPostService(blogPostRepository);
export const linkedInPostService = new LinkedInPostService(linkedInPostRepository);

export { BlogPostService, LinkedInPostService };
