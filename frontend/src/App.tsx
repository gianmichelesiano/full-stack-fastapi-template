import { ThemeProvider } from './components/theme-provider'
import { Button } from './components/ui/button'

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-5">shadcn/ui + Vite</h1>
        <Button>Click me</Button>
      </div>
    </ThemeProvider>
  )
}

export default App