import { updateBookSchema } from "@/schemas/books/update-book-schema"
import { UpdateBookDTO } from "@/types/books/update-book-dto"
import {
  addToast,
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea
} from "@heroui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useEffect } from "react"
import { useUpdateBook } from "@/hooks/books/use-update-book"

interface UpdateBookModalProps {
  isOpen: boolean
  onClose: () => void
  bookData: UpdateBookDTO & { id: string }
}

export default function UpdateBookModal({
  isOpen,
  onClose,
  bookData
}: UpdateBookModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty }
  } = useForm<UpdateBookDTO>({
    resolver: zodResolver(updateBookSchema),
    mode: "onChange",
    defaultValues: bookData
  })

  const { mutate: updateBook, isPending } = useUpdateBook()

  const onSubmit: SubmitHandler<UpdateBookDTO> = async (formValues) => {
    try {
      await updateBook({ ...formValues, id: bookData.id })
      addToast({
        title: "Success",
        description: "Book updated successfully!",
        color: "success"
      })
      onClose()
    } catch {
      addToast({
        title: "Error",
        description: "Failed to update book. Please try again.",
        color: "danger"
      })
    }
  }

  useEffect(() => {
    if (isOpen) {
      reset(bookData)
    }
  }, [isOpen, reset, bookData])

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <Form
        className="w-full flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ModalContent>
          <ModalHeader>Update book</ModalHeader>
          <ModalBody>
            <Controller
              name="author"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Author"
                  placeholder="Enter the author name"
                  type="text"
                  errorMessage={errors.author?.message}
                  isInvalid={!!errors.author}
                />
              )}
            />

            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Title"
                  placeholder="Enter the title"
                  type="text"
                  errorMessage={errors.title?.message}
                  isInvalid={!!errors.title}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Description"
                  placeholder="Enter the description"
                  errorMessage={errors.description?.message}
                  isInvalid={!!errors.description}
                />
              )}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              color="primary"
              isLoading={isPending}
              isDisabled={!isValid || !isDirty}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Form>
    </Modal>
  )
}
