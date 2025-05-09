// components/search/SearchResults.tsx
'use client';

import { usePaginationStore } from '@/stores/usePaginationStore';
import PaginationControl from "@/components/shared/navigation/PaginationControl";
import { useSearchQuery } from '@/hooks/useSearchQuery';
import ResultsContent from './ResultsContent';
import { cn } from '@/utils/classes/merge';

export default function SearchResults({ className }: { className?: string; }) {

    const {
        page,
        setPage
    } = usePaginationStore((s) => ({
        page: s.page,
        setPage: s.setPage
    }));

    const {
        data,
        isLoading,
        isFetching,
        isError,
    } = useSearchQuery();

    const showPagination = !!data?.results?.length && (data.totalPages ?? 0) > 1;

    return (
        <div className={cn(className)}>
            <div className={cn("overflow-y-auto overscroll-contain h-full scrollbar-thin pt-6 pb-10 px-3 sm:px-4 lg:px-6 m-0", className)}>
                <ResultsContent
                    results={data?.results || []}
                    isLoading={isLoading || isFetching}
                    isError={isError}
                />
            </div>

            {showPagination && (
                <div className="fixed w-full bottom-0 z-100 justify-center py-3">
                    <PaginationControl
                        page={page}
                        setPage={setPage}
                        totalPages={data.totalPages ?? 0}
                        nextPage={data.nextPage}
                        className="flex bg-pr-300/60 rounded-full max-w-min items-center"
                    />
                </div>
            )}
        </div>
    );
}
