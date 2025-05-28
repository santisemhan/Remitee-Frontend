import ActionsBooksHeader from "@/components/books/actions-books-header"
import Books from "@/components/books/books"

export default async function App() {
  return (
    <div className="flex flex-col gap-8 h-full">
      <ActionsBooksHeader />
      <Books />
    </div>
  )
}
