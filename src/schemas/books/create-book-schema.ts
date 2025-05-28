import { z } from 'zod';

export const createBookSchema = z.object({
  title: z.string()
    .min(2, { message: "Title must be at least 2 characters long" })
    .max(200, { message: "Title cannot exceed 200 characters" })
    .nonempty({ message: "Title is required" }),
    
  author: z.string()
    .max(150, { message: "Author name cannot exceed 150 characters" })
    .nonempty({ message: "Author is required" }),
    
  description: z.string()
    .max(1000, { message: "Description cannot exceed 1000 characters" })
    .nonempty({ message: "Description is required" })
});