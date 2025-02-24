import { Skeleton, Table } from "@chakra-ui/react"

const PendingPosts = () => {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader w="20%">ID</Table.ColumnHeader>
          <Table.ColumnHeader w="30%">Title</Table.ColumnHeader>
          <Table.ColumnHeader w="40%">Content</Table.ColumnHeader>
          <Table.ColumnHeader w="10%">Actions</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {Array.from({ length: 5 }).map((_, i) => (
          <Table.Row key={i}>
            <Table.Cell>
              <Skeleton h="20px" w="100%" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton h="20px" w="100%" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton h="20px" w="100%" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton h="20px" w="100%" />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

export default PendingPosts