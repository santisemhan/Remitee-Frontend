import { createBookSchema } from "@/schemas/books/create-book-schema"
import { CreateBookDTO } from "@/types/books/create-book-dto"
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
import { useCreateBook } from "@/hooks/books/use-create-book"

interface CreateBookModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CreateBookModal({
  isOpen,
  onClose
}: CreateBookModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty }
  } = useForm<CreateBookDTO>({
    resolver: zodResolver(createBookSchema),
    mode: "onChange"
  })

  const { mutate: createBook, isPending } = useCreateBook()

  const onSubmit: SubmitHandler<CreateBookDTO> = async (formValues) => {
    try {
      await createBook(formValues)
      addToast({
        title: "Success",
        description: "Book created successfully!",
        color: "success"
      })
      onClose()
      reset()
    } catch {
      addToast({
        title: "Error",
        description: "Failed to create book. Please try again.",
        color: "danger"
      })
    }
  }

  useEffect(() => {
    if (!isOpen) {
      reset()
    }
  }, [isOpen, reset])

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <Form
        className="w-full flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ModalContent>
          <ModalHeader>Add a new book</ModalHeader>
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
