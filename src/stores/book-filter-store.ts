import { create } from "zustand"

type BookFilterState = {
  title?: string
  orderBy?: string
  orderByDirection?: "ASC" | "DESC"
}

type BookFilterAction = {
  updateTitle: (title: BookFilterState["title"]) => void
  updateOrderBy: (orderBy: BookFilterState["orderBy"]) => void
  updateOrderByDirection: (orderByDirection: BookFilterState["orderByDirection"]) => void
}

export const useBookFilterStore = create<BookFilterState & BookFilterAction>(
  (set) => ({
    title: undefined,
    updateTitle: (title) => set(() => ({ title })),

    orderBy: undefined,
    updateOrderBy: (orderBy) => set(() => ({ orderBy })),

    orderByDirection: undefined,
    updateOrderByDirection: (orderByDirection) => set(() => ({ orderByDirection }))
  })
)
