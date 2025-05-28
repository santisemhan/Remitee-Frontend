import endpoints from "@/constants/endpoints"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateBookDTO } from "@/types/books/create-book-dto"
import { BookDTO } from "@/types/books/book-dto"

const createBook = async (bookData: CreateBookDTO): Promise<BookDTO> => {
  const response = await fetch(endpoints.books, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookData),
  })
  
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }

  return response.json()
}

export const useCreateBook = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] })
    },
  })
}