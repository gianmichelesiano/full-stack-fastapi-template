import { Container, Heading } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { z } from "zod"

// Schema di validazione per i parametri di ricerca
const testSearchSchema = z.object({
  page: z.coerce.number().catch(1),
})

// Componente principale
export function Test() {
  return (
    <Container maxW="full">
      <Heading size="lg" textAlign={{ base: "center", md: "left" }} pt={12}>
        Test Page
      </Heading>
    </Container>
  )
}

// Definizione della route
export const Route = createFileRoute("/_layout/test")({
  component: Test,
  validateSearch: (search) => testSearchSchema.parse(search),
})