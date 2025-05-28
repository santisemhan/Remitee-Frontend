import endpoints from "@/constants/endpoints"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const deleteBook = async (id: string): Promise<void> => {
  const response = await fetch(`${endpoints.books}/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
}

export const useDeleteBook = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] })
    },
  })
}