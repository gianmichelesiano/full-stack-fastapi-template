"use client"

import * as React from "react"
import { HiChevronLeft, HiChevronRight, HiMiniEllipsisHorizontal } from "react-icons/hi2"

import { cn } from "../../utils"
import { Button } from "./button"
import { LinkButton } from "./link-button"

// Context for pagination state
const PaginationContext = React.createContext<{
  page: number
  totalPages: number
  pageSize: number
  count: number
  pageRange: { start: number; end: number }
  nextPage: number | null
  previousPage: number | null
  setPage: (page: number) => void
  pages: Array<{ type: "page" | "ellipsis"; value: number }>
}>({
  page: 1,
  totalPages: 1,
  pageSize: 10,
  count: 0,
  pageRange: { start: 0, end: 0 },
  nextPage: null,
  previousPage: null,
  setPage: () => {},
  pages: []
})

// Context for root props
const RootPropsContext = React.createContext<{
  size: "default" | "sm" | "lg" | "icon"
  variant: "outline" | "solid" | "subtle"
  getHref?: (page: number) => string
}>({
  size: "sm",
  variant: "outline",
  getHref: undefined,
})

const useRootProps = () => React.useContext(RootPropsContext)
const usePaginationContext = () => React.useContext(PaginationContext)

export interface PaginationRootProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  page?: number
  defaultPage?: number
  pageSize?: number
  siblingCount?: number
  boundaryCount?: number
  count: number
  onChange?: (page: number) => void
  size?: "default" | "sm" | "lg" | "icon"
  variant?: "outline" | "solid" | "subtle"
  getHref?: (page: number) => string
}

export const PaginationRoot = React.forwardRef<HTMLDivElement, PaginationRootProps>(
  function PaginationRoot(props, ref) {
    const {
      page: controlledPage,
      defaultPage = 1,
      pageSize = 10,
      siblingCount = 1,
      boundaryCount = 1,
      count,
      onChange,
      size = "sm",
      variant = "outline",
      getHref,
      className,
      children,
      ...rest
    } = props

    // State for controlled/uncontrolled page
    const [uncontrolledPage, setUncontrolledPage] = React.useState(defaultPage)
    const page = controlledPage !== undefined ? controlledPage : uncontrolledPage
    
    // Calculate total pages
    const totalPages = Math.max(1, Math.ceil(count / pageSize))
    
    // Calculate page range
    const start = (page - 1) * pageSize
    const end = Math.min(start + pageSize, count)
    
    // Calculate next and previous pages
    const nextPage = page < totalPages ? page + 1 : null
    const previousPage = page > 1 ? page - 1 : null
    
    // Handle page change
    const setPage = React.useCallback(
      (newPage: number) => {
        if (newPage === page) return
        if (controlledPage === undefined) {
          setUncontrolledPage(newPage)
        }
        onChange?.(newPage)
      },
      [controlledPage, onChange, page]
    )
    
    // Generate array of pages to display
    const getPages = React.useCallback(() => {
      const range = (start: number, end: number) => {
        const length = end - start + 1
        return Array.from({ length }, (_, i) => ({ type: "page" as const, value: start + i }))
      }
      
      const startPages = range(1, Math.min(boundaryCount, totalPages))
      const endPages = range(
        Math.max(totalPages - boundaryCount + 1, boundaryCount + 1),
        totalPages
      )
      
      const siblingsStart = Math.max(
        Math.min(
          page - siblingCount,
          totalPages - boundaryCount - siblingCount * 2 - 1
        ),
        boundaryCount + 2
      )
      
      const siblingsEnd = Math.min(
        Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
        endPages.length > 0 ? endPages[0].value - 2 : totalPages - 1
      )
      
      const itemList = [
        ...startPages,
        ...(siblingsStart > boundaryCount + 2
          ? [{ type: "ellipsis" as const, value: -1 }]
          : boundaryCount + 1 < totalPages - boundaryCount
          ? [{ type: "page" as const, value: boundaryCount + 1 }]
          : []),
        ...range(siblingsStart, siblingsEnd),
        ...(siblingsEnd < totalPages - boundaryCount - 1
          ? [{ type: "ellipsis" as const, value: -1 }]
          : totalPages - boundaryCount > boundaryCount
          ? [{ type: "page" as const, value: totalPages - boundaryCount }]
          : []),
        ...endPages,
      ]
      
      return itemList
    }, [boundaryCount, page, siblingCount, totalPages])
    
    const pages = React.useMemo(() => getPages(), [getPages])
    
    // Pagination context value
    const contextValue = React.useMemo(
      () => ({
        page,
        totalPages,
        pageSize,
        count,
        pageRange: { start, end },
        nextPage,
        previousPage,
        setPage,
        pages
      }),
      [page, totalPages, pageSize, count, start, end, nextPage, previousPage, setPage, pages]
    )
    
    // Root props context value
    const rootPropsValue = React.useMemo(
      () => ({
        size,
        variant,
        getHref,
      }),
      [size, variant, getHref]
    )
    
    return (
      <RootPropsContext.Provider value={rootPropsValue}>
        <PaginationContext.Provider value={contextValue}>
          <div ref={ref} className={cn("flex items-center", className)} {...rest}>
            {children}
          </div>
        </PaginationContext.Provider>
      </RootPropsContext.Provider>
    )
  }
)

export const PaginationEllipsis = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(function PaginationEllipsis(props, ref) {
  const { size, variant } = useRootProps()
  const buttonVariant = variant === "solid" ? "outline" : "ghost"
  
  return (
    <span ref={ref} {...props}>
      <Button
        variant={buttonVariant}
        size={size}
        className="cursor-default"
        disabled
      >
        <HiMiniEllipsisHorizontal className="h-4 w-4" />
      </Button>
    </span>
  )
})

export const PaginationItem = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { value: number }
>(function PaginationItem(props, ref) {
  const { value, ...rest } = props
  const { page, setPage } = usePaginationContext()
  const { size, variant, getHref } = useRootProps()
  
  const isCurrent = page === value
  
  // Determine button variant based on current state and pagination variant
  let buttonVariant: "default" | "outline" | "ghost" | "secondary"
  if (variant === "outline") {
    buttonVariant = isCurrent ? "outline" : "ghost"
  } else if (variant === "solid") {
    buttonVariant = isCurrent ? "default" : "outline"
  } else { // subtle
    buttonVariant = isCurrent ? "secondary" : "ghost"
  }
  
  if (getHref) {
    return (
      <LinkButton
        href={getHref(value)}
        variant={buttonVariant}
        size={size}
        className={cn(isCurrent && "pointer-events-none")}
      >
        {value}
      </LinkButton>
    )
  }
  
  return (
    <Button
      ref={ref}
      variant={buttonVariant}
      size={size}
      onClick={() => setPage(value)}
      {...rest}
    >
      {value}
    </Button>
  )
})

export const PaginationPrevTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(function PaginationPrevTrigger(props, ref) {
  const { previousPage, setPage } = usePaginationContext()
  const { size, variant, getHref } = useRootProps()
  
  const buttonVariant = variant === "solid" ? "outline" : "ghost"
  const disabled = previousPage === null
  
  if (getHref && previousPage !== null) {
    return (
      <LinkButton
        href={getHref(previousPage)}
        variant={buttonVariant}
        size={size}
        className={cn(disabled && "pointer-events-none opacity-50")}
      >
        <HiChevronLeft className="h-4 w-4" />
      </LinkButton>
    )
  }
  
  return (
    <Button
      ref={ref}
      variant={buttonVariant}
      size={size}
      onClick={() => previousPage !== null && setPage(previousPage)}
      disabled={disabled}
      {...props}
    >
      <HiChevronLeft className="h-4 w-4" />
    </Button>
  )
})

export const PaginationNextTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(function PaginationNextTrigger(props, ref) {
  const { nextPage, setPage } = usePaginationContext()
  const { size, variant, getHref } = useRootProps()
  
  const buttonVariant = variant === "solid" ? "outline" : "ghost"
  const disabled = nextPage === null
  
  if (getHref && nextPage !== null) {
    return (
      <LinkButton
        href={getHref(nextPage)}
        variant={buttonVariant}
        size={size}
        className={cn(disabled && "pointer-events-none opacity-50")}
      >
        <HiChevronRight className="h-4 w-4" />
      </LinkButton>
    )
  }
  
  return (
    <Button
      ref={ref}
      variant={buttonVariant}
      size={size}
      onClick={() => nextPage !== null && setPage(nextPage)}
      disabled={disabled}
      {...props}
    >
      <HiChevronRight className="h-4 w-4" />
    </Button>
  )
})

export const PaginationItems = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { className, ...rest } = props
  const { pages } = usePaginationContext()
  
  return (
    <div className={cn("flex items-center gap-1", className)} {...rest}>
      {pages.map((page: { type: "page" | "ellipsis"; value: number }, index: number) => {
        return page.type === "ellipsis" ? (
          <PaginationEllipsis key={`ellipsis-${index}`} />
        ) : (
          <PaginationItem
            key={`page-${page.value}`}
            value={page.value}
          />
        )
      })}
    </div>
  )
}

interface PageTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  format?: "short" | "compact" | "long"
}

export const PaginationPageText = React.forwardRef<
  HTMLParagraphElement,
  PageTextProps
>(function PaginationPageText(props, ref) {
  const { format = "compact", className, ...rest } = props
  const { page, totalPages, pageRange, count } = usePaginationContext()
  
  const content = React.useMemo(() => {
    if (format === "short") return `${page} / ${totalPages}`
    if (format === "compact") return `${page} of ${totalPages}`
    return `${pageRange.start + 1} - ${Math.min(
      pageRange.end,
      count,
    )} of ${count}`
  }, [format, page, totalPages, pageRange, count])
  
  return (
    <p
      ref={ref}
      className={cn("text-sm font-medium", className)}
      {...rest}
    >
      {content}
    </p>
  )
})
