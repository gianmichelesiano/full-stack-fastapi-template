import { FiSearch } from "react-icons/fi"
import { z } from "zod"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"

import { ItemsService } from "@/client"
import { ItemActionsMenu } from "@/components/Common/ItemActionsMenu"
import AddItem from "@/components/Items/AddItem"
import PendingItems from "@/components/Pending/PendingItems"
import { EmptyState } from "@/components/ui/empty-state"
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination"
import {
  TableBody,
  TableCell,
  TableColumnHeader,
  TableHeader,
  TableRoot,
  TableRow,
} from "@/components/ui/table"

// Define a schema for validation
const searchSchema = z.object({
  page: z.coerce.number().default(1),
})

const PER_PAGE = 5

function getItemsQueryOptions({ page }: { page: number }) {
  return {
    queryFn: () =>
      ItemsService.readItems({ skip: (page - 1) * PER_PAGE, limit: PER_PAGE }),
    queryKey: ["items", { page }],
  }
}

export const Route = createFileRoute("/_layout/items")({
  component: Items,
  validateSearch: (search) => searchSchema.parse(search),
})

function ItemsTable() {
  const navigate = useNavigate({ from: Route.fullPath })
  
  // Get raw search params and parse them
  const rawSearch = Route.useSearch()
  // Default to page 1 if not present
  const currentPage = rawSearch && typeof rawSearch === 'object' && 'page' in rawSearch 
    ? Number(rawSearch.page) 
    : 1

  const { data, isLoading, isPlaceholderData } = useQuery({
    ...getItemsQueryOptions({ page: currentPage }),
    placeholderData: (prevData) => prevData,
  })

  // Navigate with the updated page
  const setPage = (newPage: number) => {
    // Use a different approach for navigation
    navigate({
      to: "/_layout/items",
      search: () => ({ page: String(newPage) }),
      replace: true
    })
  }

  const items = data?.data.slice(0, PER_PAGE) ?? []
  const count = data?.count ?? 0

  if (isLoading) {
    return <PendingItems />
  }

  if (items.length === 0) {
    return (
      <EmptyState.Root>
        <EmptyState.Content>
          <EmptyState.Indicator>
            <FiSearch className="h-6 w-6" />
          </EmptyState.Indicator>
          <div className="flex flex-col items-center">
            <EmptyState.Title>You don't have any items yet</EmptyState.Title>
            <EmptyState.Description>
              Add a new item to get started
            </EmptyState.Description>
          </div>
        </EmptyState.Content>
      </EmptyState.Root>
    )
  }

  return (
    <>
      <TableRoot size="md">
        <TableHeader>
          <TableRow>
            <TableColumnHeader w="sm">ID</TableColumnHeader>
            <TableColumnHeader w="sm">Title</TableColumnHeader>
            <TableColumnHeader w="sm">Description</TableColumnHeader>
            <TableColumnHeader w="sm">Actions</TableColumnHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items?.map((item) => (
            <TableRow key={item.id} className={isPlaceholderData ? "opacity-50" : ""}>
              <TableCell truncate maxW="sm">
                {item.id}
              </TableCell>
              <TableCell truncate maxW="sm">
                {item.title}
              </TableCell>
              <TableCell
                className={!item.description ? "text-muted-foreground" : ""}
                truncate
                maxW="30%"
              >
                {item.description || "N/A"}
              </TableCell>
              <TableCell>
                <ItemActionsMenu item={item} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>
      <div className="flex justify-end mt-4">
        <PaginationRoot
          count={count}
          pageSize={PER_PAGE}
          onChange={(page) => setPage(page)}
        >
          <div className="flex">
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </div>
        </PaginationRoot>
      </div>
    </>
  )
}

function Items() {
  return (
    <div className="container max-w-full">
      <h1 className="text-2xl font-bold pt-12">
        Items Management
      </h1>
      <AddItem />
      <ItemsTable />
    </div>
  )
}
