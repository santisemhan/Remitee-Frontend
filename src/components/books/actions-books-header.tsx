"use client"

import { Button, Input, Select, SelectItem, useDisclosure } from "@heroui/react"
import { PlusBoldIcon } from "@/components/icons/bold/plus-bold-icon"
import CreateBookModal from "@/components/modal/books/create-book-modal"
import { useBookFilterStore } from "@/stores/book-filter-store"
import { useEffect, useState, useCallback } from "react"

export default function BooksHeaderActions() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const {
    title,
    orderBy,
    orderByDirection,
    updateTitle,
    updateOrderBy,
    updateOrderByDirection
  } = useBookFilterStore()

  const [localTitle, setLocalTitle] = useState(title || "")
  
  useEffect(() => {
    const timer = setTimeout(() => {
      updateTitle(localTitle || undefined)
    }, 500) 

    return () => clearTimeout(timer)
  }, [localTitle, updateTitle])

  const handleOrderByChange = useCallback((value: string) => {
    updateOrderBy(value || undefined)
  }, [updateOrderBy])

  const handleDirectionChange = useCallback((value: string) => {
    updateOrderByDirection(value as "ASC" | "DESC" || undefined)
  }, [updateOrderByDirection])

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Books</h1>
        
        <div className="w-full flex justify-end">
          <Button
            color="primary"
            startContent={<PlusBoldIcon size={16} />}
            onPress={onOpen}
          >
            Add book
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <Input
            label="Title"
            placeholder="Enter the name of the book"
            type="text"
            value={localTitle}
            onChange={(e) => setLocalTitle(e.target.value)}
          />
          
          <Select 
            label="Order by" 
            placeholder="Select an option"
            selectedKeys={orderBy ? [orderBy] : []}
            onChange={(e) => handleOrderByChange(e.target.value)}
          >
            <SelectItem key="author">Author</SelectItem>
            <SelectItem key="title">Title</SelectItem>
            <SelectItem key="description">Description</SelectItem>
          </Select>
          
          <Select
            label="Direction"
            placeholder="Select an option"
            className="w-full md:w-42"
            selectedKeys={orderByDirection ? [orderByDirection] : []}
            onChange={(e) => handleDirectionChange(e.target.value)}
          >
            <SelectItem key="ASC">ASC</SelectItem>
            <SelectItem key="DESC">DESC</SelectItem>
          </Select>
        </div>
      </div>

      <CreateBookModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}