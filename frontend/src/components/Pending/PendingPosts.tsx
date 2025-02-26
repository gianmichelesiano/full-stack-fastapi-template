import { SkeletonText } from "../ui/skeleton"
import {
  TableBody,
  TableCell,
  TableColumnHeader,
  TableHeader,
  TableRoot,
  TableRow,
} from "../ui/table"

const PendingPosts = () => {
  return (
    <TableRoot size="md">
      <TableHeader>
        <TableRow>
          <TableColumnHeader w="20%">ID</TableColumnHeader>
          <TableColumnHeader w="30%">Title</TableColumnHeader>
          <TableColumnHeader w="40%">Content</TableColumnHeader>
          <TableColumnHeader w="10%">Actions</TableColumnHeader>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, i) => (
          <TableRow key={i}>
            <TableCell>
              <SkeletonText noOfLines={1} />
            </TableCell>
            <TableCell>
              <SkeletonText noOfLines={1} />
            </TableCell>
            <TableCell>
              <SkeletonText noOfLines={1} />
            </TableCell>
            <TableCell>
              <SkeletonText noOfLines={1} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableRoot>
  )
}

export default PendingPosts
