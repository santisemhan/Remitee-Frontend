interface PaginatorResultsProps {
    firstItem: number
    lastItem: number
    totalItems: number
}

export default function PaginatorResults({ firstItem, lastItem, totalItems }: PaginatorResultsProps) {
  return (
    <span className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
      Showing{" "}
      <span className="text-neutral-700 dark:text-neutral-200 font-semibold">
        {firstItem}
      </span>{" "}
      to{" "}
      <span className="text-neutral-700 dark:text-neutral-200 font-semibold">
        {lastItem}
      </span>{" "}
      of{" "}
      <span className="text-neutral-700 dark:text-neutral-200 font-semibold">
        {totalItems}
      </span>{" "}
      items
    </span>
  )
}
