'use client';

import { useQuery } from '@tanstack/react-query';
import { ProductCard } from '@/types/product';
import { getSearchResults } from '@/lib/queries/products/getSearchResults';
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSearchResults } from '@/hooks/useSearchResults';

export default function SearchPage({
    dehydratedState,
    queryParams,
}: {
    dehydratedState: unknown;
    queryParams: {
        q?: string;
        is_organic?: boolean;
        is_decaf?: boolean;
        is_mycotoxin_free?: boolean;
        is_single_origin?: boolean;
    };
}) {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={dehydratedState}>
                <SearchResults queryParams={queryParams} />
            </HydrationBoundary>
        </QueryClientProvider>
    );
}

function SearchResults({ queryParams }: { queryParams: Record<string, any> }) {
    const { data, isLoading } = useSearchResults(queryParams);

    if (isLoading) return <div>Loading...</div>;
    if (!data?.length) return <div>No results</div>;

    return (
        <div className="p-20">
            <ul>
                {data.map(product => (
                    <li key={product.slug}>{product.product_name}</li>
                ))}
            </ul>
        </div>

    );
}
