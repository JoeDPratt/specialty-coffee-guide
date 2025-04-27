import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import PageNumbers from "./PageNumbers";

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
    return (
        <Pagination className="mt-8">
            <PaginationContent>
                {/* Previous Button */}
                {page > 1 && (
                    <PaginationItem>
                        <PaginationPrevious
                            className="bg-white cursor-pointer"
                            onClick={() => setPage(Math.max(page - 1, 1))}
                        />
                    </PaginationItem>
                )}

                {/* Page Numbers */}
                <PageNumbers
                    page={page}
                    totalPages={totalPages}
                    setPage={setPage}
                />

                {/* Next Button */}
                {nextPage && (
                    <PaginationItem>
                        <PaginationNext
                            className="bg-white cursor-pointer"
                            onClick={() => setPage(page + 1)}
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
}
