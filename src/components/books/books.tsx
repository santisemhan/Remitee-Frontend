"use client"

import { useEffect, useState } from "react"
import BookCard, { BookCardLoading } from "@/components/books/book-card"
import { Pagination } from "@heroui/react"
import { useBooks } from "@/hooks/books/use-books"
import { useBookFilterStore } from "@/stores/book-filter-store"
import PaginatorResults from "@/components/ui/paginator-results"

export default function Books() {
  const [page, setPage] = useState(1)

  const { title, orderBy, orderByDirection } = useBookFilterStore()

  const { data, isLoading, isError, isFetching, refetch } = useBooks({
    page,
    pageSize: 6,
    filter: {
      title,
      orderBy,
      orderByDirection
    }
  })

  useEffect(() => {
    setPage(1)
    refetch()
  }, [title, orderBy, orderByDirection, refetch])

  const loadingState = isLoading || isFetching ? "loading" : "idle"

  if (isError) {
    return (
      <div className="w-full flex justify-center">
        <span>Oops, something went wrong. Please try again later.</span>
      </div>
    )
  }

  if (loadingState === "loading") {
    return (
      <div className="h-full flex flex-col gap-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, i) => (
            <BookCardLoading key={i} />
          ))}
        </div>
      </div>
    )
  }

  if (!data || data?.items.length <= 0) {
    return (
      <div className="w-full flex justify-center">
        <span>Book not found.</span>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col gap-8 items-end">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {data.items.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      <PaginatorResults
        firstItem={data.firstItemIndex}
        lastItem={data.lastItemIndex}
        totalItems={data.totalItems}
      />
      <Pagination
        showControls
        page={page}
        onChange={setPage}
        total={data.totalPages}
      />
    </div>
  )
}
