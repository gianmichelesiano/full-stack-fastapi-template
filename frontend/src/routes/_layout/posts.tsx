import { useQuery } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { FiSearch } from "react-icons/fi"
import { z } from "zod"

import { PostsService } from "@/client"
import { PostActionsMenu } from "@/components/Common/PostActionsMenu"
import AddPost from "@/components/Posts/AddPost"
import PendingPosts from "@/components/Pending/PendingPosts"
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

function getPostsQueryOptions({ page }: { page: number }) {
  return {
    queryFn: () =>
      PostsService.readPosts({ skip: (page - 1) * PER_PAGE, limit: PER_PAGE }),
    queryKey: ["posts", { page }],
  }
}

export const Route = createFileRoute("/_layout/posts")({
  component: Posts,
  validateSearch: (search) => searchSchema.parse(search),
})

function PostsTable() {
  const navigate = useNavigate({ from: Route.fullPath })
  
  // Get raw search params and parse them
  const rawSearch = Route.useSearch()
  // Default to page 1 if not present
  const currentPage = rawSearch && typeof rawSearch === 'object' && 'page' in rawSearch 
    ? Number(rawSearch.page) 
    : 1

  const { data, isLoading, isPlaceholderData } = useQuery({
    ...getPostsQueryOptions({ page: currentPage }),
    placeholderData: (prevData) => prevData,
  })

  // Navigate with the updated page
  const setPage = (newPage: number) => {
    // Use a different approach for navigation
    navigate({
      to: "/_layout/posts",
      search: () => ({ page: String(newPage) }),
      replace: true
    })
  }

  const posts = data?.data.slice(0, PER_PAGE) ?? []
  const count = data?.count ?? 0

  if (isLoading) {
    return <PendingPosts />
  }

  if (posts.length === 0) {
    return (
      <EmptyState.Root>
        <EmptyState.Content>
          <EmptyState.Indicator>
            <FiSearch className="h-6 w-6" />
          </EmptyState.Indicator>
          <div className="flex flex-col items-center">
            <EmptyState.Title>You don't have any posts yet</EmptyState.Title>
            <EmptyState.Description>
              Add a new post to get started
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
            <TableColumnHeader w="20%">ID</TableColumnHeader>
            <TableColumnHeader w="30%">Title</TableColumnHeader>
            <TableColumnHeader w="40%">Description</TableColumnHeader>
            <TableColumnHeader w="10%">Actions</TableColumnHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts?.map((post) => (
            <TableRow key={post.id} className={isPlaceholderData ? "opacity-50" : ""}>
              <TableCell truncate maxW="20%">
                {post.id}
              </TableCell>
              <TableCell truncate maxW="30%">
                {post.title}
              </TableCell>
              <TableCell
                className={!post.description ? "text-muted-foreground" : ""}
                truncate
                maxW="40%"
              >
                {post.description || "N/A"}
              </TableCell>
              <TableCell>
                <PostActionsMenu post={post} />
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

function Posts() {
  return (
    <div className="container max-w-full">
      <h1 className="text-2xl font-bold pt-12">
        Posts Management
      </h1>
      <AddPost />
      <PostsTable />
    </div>
  )
}

export default Posts
