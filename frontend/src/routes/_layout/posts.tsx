import {
  Container,
  EmptyState,
  Flex,
  Heading,
  Table,
  VStack,
} from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { FiSearch } from "react-icons/fi"
import { z } from "zod"

import { PostsService } from "@/client"
import { PostActionsMenu } from "@/components/Common/PostActionsMenu"
import AddPost from "@/components/Posts/AddPost"
import PendingPosts from "@/components/Pending/PendingPosts"
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination.tsx"

const postsSearchSchema = z.object({
  page: z.number().catch(1),
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
  validateSearch: (search) => postsSearchSchema.parse(search),
})

function PostsTable() {
  const navigate = useNavigate({ from: Route.fullPath })
  const { page } = Route.useSearch()

  const { data, isLoading, isPlaceholderData } = useQuery({
    ...getPostsQueryOptions({ page }),
    placeholderData: (prevData) => prevData,
  })

  const setPage = (page: number) =>
    navigate({
      search: (prev: { [key: string]: string }) => ({ ...prev, page }),
    })

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
            <FiSearch />
          </EmptyState.Indicator>
          <VStack textAlign="center">
            <EmptyState.Title>You don't have any posts yet</EmptyState.Title>
            <EmptyState.Description>
              Add a new post to get started
            </EmptyState.Description>
          </VStack>
        </EmptyState.Content>
      </EmptyState.Root>
    )
  }

  return (
    <>
      <Table.Root size={{ base: "sm", md: "md" }}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader w="20%">ID</Table.ColumnHeader>
            <Table.ColumnHeader w="30%">Title</Table.ColumnHeader>
            <Table.ColumnHeader w="40%">Description</Table.ColumnHeader>
            <Table.ColumnHeader w="10%">Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {posts?.map((post) => (
            <Table.Row key={post.id} opacity={isPlaceholderData ? 0.5 : 1}>
              <Table.Cell truncate maxW="20%">
                {post.id}
              </Table.Cell>
              <Table.Cell truncate maxW="30%">
                {post.title}
              </Table.Cell>
              <Table.Cell
                color={!post.description ? "gray" : "inherit"}
                truncate
                maxW="40%"
              >
                {post.description || "N/A"}
              </Table.Cell>
              <Table.Cell width="10%">
                <PostActionsMenu post={post} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Flex justifyContent="flex-end" mt={4}>
        <PaginationRoot
          count={count}
          pageSize={PER_PAGE}
          onPageChange={({ page }) => setPage(page)}
        >
          <Flex>
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </Flex>
        </PaginationRoot>
      </Flex>
    </>
  )
}

function Posts() {
  return (
    <Container maxW="full">
      <Heading size="lg" pt={12}>
        Posts Management
      </Heading>
      <AddPost />
      <PostsTable />
    </Container>
  )
}