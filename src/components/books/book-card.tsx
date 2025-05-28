import { BookDTO } from "@/types/books/book-dto"
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  ScrollShadow,
  Tooltip,
  Button,
  useDisclosure,
  Skeleton
} from "@heroui/react"
import { DotsThreeVerticalIcon } from "@/components/icons/regular/dots-three-vertical-icon"
import DeleteConfirmationModal from "@/components/modal/delete-confirmation-modal"
import { useDeleteBook } from "@/hooks/books/use-delete-book"
import UpdateBookModal from "@/components/modal/books/update-book-modal"
import { DeleteIcon } from "@/components/icons/regular/delete-icon"
import { EditIcon } from "@/components/icons/regular/edit-icon"

interface BookCardProps {
  book: BookDTO
}

export default function BookCard({ book }: BookCardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isEditModeOpen,
    onOpen: onOpenEdit,
    onClose: onCloseEdit
  } = useDisclosure()
  const { mutate: deleteBook, isPending } = useDeleteBook()

  const handleConfirmDelete = () => {
    deleteBook(book.id)
    onClose()
  }

  return (
    <>
      <Card className="w-full">
        <CardHeader className="flex gap-3">
          <div className="flex-shrink-0">
            <Image
              alt={`Portada de ${book.title}`}
              height={40}
              width={40}
              radius="sm"
              src="/remitee.png"
              className="h-10 w-10 object-cover"
            />
          </div>

          <div className="min-w-0 flex-1">
            <Tooltip content={book.title} placement="top-start">
              <p className="text-md truncate w-full">{book.title}</p>
            </Tooltip>
            <Tooltip content={book.author} placement="bottom-start">
              <p className="text-small text-default-500 truncate w-full">
                {book.author}
              </p>
            </Tooltip>
          </div>

          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light">
                <DotsThreeVerticalIcon />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Book actions">
              <DropdownItem
                key="update"
                color="primary"
                onPress={onOpenEdit}
                startContent={<EditIcon />}
              >
                Edit
              </DropdownItem>
              <DropdownItem
                key="delete"
                className="text-danger"
                color="danger"
                onPress={onOpen}
                startContent={<DeleteIcon />}
              >
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardHeader>

        <Divider />

        <CardBody>
          <ScrollShadow hideScrollBar className="h-[100px]">
            <p className="whitespace-pre-line">{book.description}</p>
          </ScrollShadow>
        </CardBody>
      </Card>

      <DeleteConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleConfirmDelete}
        isLoading={isPending}
      />

      <UpdateBookModal
        bookData={book}
        isOpen={isEditModeOpen}
        onClose={onCloseEdit}
      />
    </>
  )
}

export function BookCardLoading() {
  return (
    <Card className="w-sm">
      <CardHeader className="flex gap-3">
        <div className="flex-shrink-0">
          <Skeleton className="rounded-lg">
            <div className="h-10 w-10 rounded-lg bg-default-300" />
          </Skeleton>
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <Skeleton className="w-3/4 rounded-lg">
            <div className="h-4 w-3/4 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-1/2 rounded-lg">
            <div className="h-3 w-1/2 rounded-lg bg-default-300" />
          </Skeleton>
        </div>
      </CardHeader>

      <Divider />

      <CardBody className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="w-full rounded-lg">
            <div className="h-3 w-full rounded-lg bg-default-200" />
          </Skeleton>
        ))}
        <Skeleton className="w-2/3 rounded-lg">
          <div className="h-3 w-2/3 rounded-lg bg-default-200" />
        </Skeleton>
      </CardBody>
    </Card>
  )
}
