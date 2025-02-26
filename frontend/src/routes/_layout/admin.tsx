import { useQuery, useQueryClient } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { z } from "zod"

import { type UserPublic, UsersService } from "@/client"
import AddUser from "@/components/Admin/AddUser"
import { UserActionsMenu } from "@/components/Common/UserActionsMenu"
import PendingUsers from "@/components/Pending/PendingUsers"
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

const PER_PAGE = 5

function getUsersQueryOptions({ page }: { page: number }) {
  return {
    queryFn: () =>
      UsersService.readUsers({ skip: (page - 1) * PER_PAGE, limit: PER_PAGE }),
    queryKey: ["users", { page }],
  }
}

// Define a schema for validation
const searchSchema = z.object({
  page: z.coerce.number().default(1),
})

export const Route = createFileRoute("/_layout/admin")({
  component: Admin,
  validateSearch: (search) => searchSchema.parse(search),
})

function UsersTable() {
  const queryClient = useQueryClient()
  const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"])
  const navigate = useNavigate({ from: Route.fullPath })
  
  // Get raw search params and parse them
  const rawSearch = Route.useSearch()
  // Default to page 1 if not present
  const currentPage = rawSearch && typeof rawSearch === 'object' && 'page' in rawSearch 
    ? Number(rawSearch.page) 
    : 1
  
  const { data, isLoading, isPlaceholderData } = useQuery({
    ...getUsersQueryOptions({ page: currentPage }),
    placeholderData: (prevData) => prevData,
  })

  // Navigate with the updated page
  const setPage = (newPage: number) => {
    // Use a different approach for navigation
    navigate({
      to: "/_layout/admin",
      search: () => ({ page: String(newPage) }),
      replace: true
    })
  }

  const users = data?.data.slice(0, PER_PAGE) ?? []
  const count = data?.count ?? 0

  if (isLoading) {
    return <PendingUsers />
  }

  return (
    <>
      <TableRoot size="md">
        <TableHeader>
          <TableRow>
            <TableColumnHeader w="sm">Full name</TableColumnHeader>
            <TableColumnHeader w="sm">Email</TableColumnHeader>
            <TableColumnHeader w="sm">Role</TableColumnHeader>
            <TableColumnHeader w="sm">Status</TableColumnHeader>
            <TableColumnHeader w="sm">Actions</TableColumnHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id} className={isPlaceholderData ? "opacity-50" : ""}>
              <TableCell className={!user.full_name ? "text-muted-foreground" : ""}>
                {user.full_name || "N/A"}
                {currentUser?.id === user.id && (
                  <span className="ml-1 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                    You
                  </span>
                )}
              </TableCell>
              <TableCell truncate maxW="sm">
                {user.email}
              </TableCell>
              <TableCell>
                {user.is_superuser ? "Superuser" : "User"}
              </TableCell>
              <TableCell>{user.is_active ? "Active" : "Inactive"}</TableCell>
              <TableCell>
                <UserActionsMenu
                  user={user}
                  disabled={currentUser?.id === user.id}
                />
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

function Admin() {
  return (
    <div className="container max-w-full">
      <h1 className="text-2xl font-bold pt-12">
        Users Management
      </h1>

      <AddUser />
      <UsersTable />
    </div>
  )
}

export default Admin
