'use client';

import { useQuery } from '@tanstack/react-query';
// import type { ProductCard } from '@/types/product';
import { getSearchResults } from '@/lib/queries/products/getSearchResults';
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSearchResults } from '@/hooks/useSearchResults';
import { fadeUpItem, staggerContainer } from '@/utils/animation';
import { motion } from "framer-motion";
import ProductCard from "@/components/shared/product/ProductCard";


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
        <div className="px-3 sm:px-6 mt-20 pb-50" >
            <h2>{data.length} search result{data.length === 1 ? "" : "s"}</h2>
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                {data?.map((product) => (
                    <motion.div
                        key={product.slug}
                        variants={fadeUpItem}
                        className="flex flex-col h-full"
                    >
                        <ProductCard product={product} />
                    </motion.div>
                ))}
            </motion.div>
        </div>

    );
}
