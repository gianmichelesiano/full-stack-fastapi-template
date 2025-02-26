import { SkeletonText } from "../ui/skeleton"
import {
  TableBody,
  TableCell,
  TableColumnHeader,
  TableHeader,
  TableRoot,
  TableRow,
} from "../ui/table"

const PendingItems = () => (
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
      {[...Array(5)].map((_, index) => (
        <TableRow key={index}>
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

export default PendingItems
