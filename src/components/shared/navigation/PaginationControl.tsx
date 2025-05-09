'use client'

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import PageNumbers from "./PageNumbers";
import { useBreakpointStore } from "@/stores/useBreakpointStore";
import { cn } from "@/utils/classes/merge";

export default function PaginationControl({
    page,
    setPage,
    totalPages,
    nextPage,
    className,
}: {
    page: number;
    setPage: (page: number) => void;
    totalPages: number;
    nextPage?: number;
    className?: string;
}) {
    const isSm = useBreakpointStore((s) => s.isSm)

    return (
        <Pagination className={cn(className)}>
            <PaginationContent>
                {/* Previous Button */}
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => setPage(Math.max(page - 1, 1))}
                        disabled={page === 1}
                    />
                </PaginationItem>

                {/* Page Numbers */}
                <PageNumbers
                    page={page}
                    totalPages={totalPages}
                    setPage={setPage}
                    maxPages={isSm ? 1 : 5}
                />

                {/* Next Button */}
                <PaginationItem>
                    <PaginationNext
                        disabled={!nextPage}
                        onClick={() => setPage(page + 1)}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
