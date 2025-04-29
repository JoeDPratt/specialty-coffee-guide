import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import PageNumbers from "./PageNumbers";
import { useBreakpointStore } from "@/stores/useBreakpointStore";

export default function PaginationControl({
    page,
    setPage,
    totalPages,
    nextPage,
}: {
    page: number;
    setPage: (page: number) => void;
    totalPages: number;
    nextPage?: number;
}) {
    const isSm = useBreakpointStore((s) => s.isSm)
    return (
        <Pagination className="mt-8">
            <PaginationContent>
                {/* Previous Button */}
                <PaginationItem>
                    <PaginationPrevious
                        // className="bg-whicursor-pointer"
                        onClick={() => setPage(Math.max(page - 1, 1))}
                        disabled={page === 1}
                    />
                </PaginationItem>

                {/* Page Numbers */}
                {!isSm && <PageNumbers
                    page={page}
                    totalPages={totalPages}
                    setPage={setPage}
                />}

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
