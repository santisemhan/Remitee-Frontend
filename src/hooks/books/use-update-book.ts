import endpoints from "@/constants/endpoints"
import { UpdateBookDTO } from "@/types/books/update-book-dto"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const updateBook = async ({ id, ...bookData }: UpdateBookDTO & { id: string }): Promise<void> => {
  const response = await fetch(`${endpoints.books}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookData),
  })
  
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
}

export const useUpdateBook = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] })
    },
  })
}