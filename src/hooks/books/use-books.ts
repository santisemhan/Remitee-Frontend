import endpoints from "@/constants/endpoints"
import { BookDTO } from "@/types/books/book-dto"
import { PagedQueryResult } from "@/types/pagination/paged-query-result"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

const fetchBooks = async (
  params: UseBooksProps
): Promise<PagedQueryResult<BookDTO>> => {
  const url =
    `${endpoints.books}?pageNumber=${params.page}` +
    `&pageSize=${params.pageSize}` +
    `&Filter.Author=${encodeURIComponent(params.filter?.author || "")}` +
    `&Filter.Title=${encodeURIComponent(params.filter?.title || "")}` +
    `&Filter.Description=${encodeURIComponent(
      params.filter?.description || ""
    )}` +
    `&sortField=${encodeURIComponent(params.filter?.orderBy || "")}` +
    `&sortOrder=${encodeURIComponent(params.filter?.orderByDirection || "ASC")}`

  const response = await fetch(url)
  if (response.status === 404) {
    return {
      items: [],
      totalItems: 0,
      pageNumber: 1,
      pageSize: params.pageSize,
      totalPages: 1,
      hasPreviousPage: false,
      hasNextPage: false,
      firstItemIndex: -1,
      lastItemIndex: -1
    }
  }

  if (!response.ok) {
    throw new Error("Network response was not ok")
  }

  return response.json()
}

interface UseBooksProps {
  page: number
  pageSize: number
  filter?: {
    author?: string
    title?: string
    description?: string
    orderBy?: string
    orderByDirection?: "ASC" | "DESC"
  }
}

export const useBooks = (params: UseBooksProps) => {
  return useQuery({
    queryKey: ["books", params.page, params.pageSize],
    queryFn: () => fetchBooks(params),
    placeholderData: keepPreviousData
  })
}
