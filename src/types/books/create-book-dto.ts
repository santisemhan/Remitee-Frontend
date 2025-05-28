import { createBookSchema } from "@/schemas/books/create-book-schema";
import { z } from "zod"

export type CreateBookDTO = z.infer<typeof createBookSchema>;