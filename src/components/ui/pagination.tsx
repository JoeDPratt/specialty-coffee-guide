import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon, EllipsisHorizontalIcon } from "@heroicons/react/16/solid"

import { cn } from "@/utils/classes/merge"
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button"
import { Nunito } from "next/font/google"

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
    <nav
        role="navigation"
        aria-label="pagination"
        className={cn("mx-auto flex w-full justify-center", className)}
        {...props}
    />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
    HTMLUListElement,
    React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
    <ul
        ref={ref}
        className={cn("flex flex-row items-center gap-1.5 min-w-[432px] justify-between", className)}
        {...props}
    />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
    HTMLLIElement,
    React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
    <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
    isActive?: boolean
    disabled?: boolean
    isNumber?: boolean
    size?: ButtonProps["size"]
} & React.ComponentProps<typeof Button>

const PaginationLink = ({
    className,
    isActive,
    disabled,
    size = "icon",
    isNumber = true,
    ...props
}: PaginationLinkProps) => (
    <Button
        variant={isActive
            ? "default"
            : isNumber ? "ghost" : "secondary"}
        size={size}
        disabled={disabled}
        className={className}
        {...props}
    />
)

PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
    className,
    disabled,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        aria-label="Go to previous page"
        size="iconLg"
        className={cn("[&_svg]:size-10", className)}
        disabled={disabled}
        isNumber={false}
        {...props}
    >
        <ChevronLeftIcon />
    </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
    className,
    disabled,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        aria-label="Go to next page"
        size="iconLg"
        className={cn("[&_svg]:size-10", className)}
        disabled={disabled}
        isNumber={false}
        {...props}
    >
        <ChevronRightIcon />
    </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = ({
    className,
    ...props
}: React.ComponentProps<"span">) => (
    <span
        aria-hidden
        className={cn("flex h-9 w-9 items-center justify-center", className)}
        {...props}
    >
        <EllipsisHorizontalIcon className="h-4 w-4" />
        <span className="sr-only">More pages</span>
    </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
    Pagination,
    PaginationContent,
    PaginationLink,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
}
