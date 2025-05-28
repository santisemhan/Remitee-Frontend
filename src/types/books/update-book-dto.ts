import { updateBookSchema } from "@/schemas/books/update-book-schema";
import { z } from "zod"

export type UpdateBookDTO = z.infer<typeof updateBookSchema>;