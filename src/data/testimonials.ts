export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  quote: string;
}

export const TESTIMONIALS: Testimonial[] = [
  // Add real testimonials from colleagues or clients here
  // Example structure:
  // {
  //   id: "john-doe",
  //   name: "John Doe",
  //   role: "CTO",
  //   company: "3S Software",
  //   quote: "Faisal delivered production-quality code consistently and took full ownership of complex systems.",
  // },
];
