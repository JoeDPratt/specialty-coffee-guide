import {
    PaginationItem,
    PaginationLink,
    PaginationEllipsis,
} from '@/components/ui/pagination'; // your shadcn pagination bits

export default function PageNumbers({
    page,
    totalPages,
    setPage,
    maxPages = 5
}: {
    page: number;
    totalPages: number;
    setPage: (page: number) => void;
    maxPages?: number;
}) {

    const pages: (number | 'ellipsis')[] = [];

    if (maxPages === 1) {
        pages.push(page);
    } else if (totalPages <= maxPages && maxPages !== 1) {
        // simple case: show all pages
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
    } else if (maxPages !== 1) {
        const siblings = 1;

        const startPage = Math.max(2, page - siblings);
        const endPage = Math.min(totalPages - 1, page + siblings);

        pages.push(1);

        if (startPage > 2) {
            pages.push('ellipsis');
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (endPage < totalPages - 1) {
            pages.push('ellipsis');
        }

        pages.push(totalPages);
    }

    return pages.map((p, idx) => {
        if (p === 'ellipsis') {
            return (
                <PaginationItem key={`ellipsis-${idx}`}>
                    <PaginationEllipsis />
                </PaginationItem>
            );
        }

        return (
            <PaginationItem key={p}>
                <PaginationLink
                    isActive={p === page}
                    onClick={() => setPage(p)}
                    size={maxPages === 1 ? "default" : "icon"}
                >
                    {maxPages === 1 ? p + " of " + totalPages : p}
                </PaginationLink>
            </PaginationItem>
        );
    });
}
