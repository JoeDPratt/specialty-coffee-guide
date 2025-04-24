'use client';

import { useQuery } from '@tanstack/react-query';
// import type { ProductCard } from '@/types/product';
import { getSearchResults } from '@/lib/queries/products/getSearchResults';
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSearchResults } from '@/hooks/useSearchResults';
import { fadeUpItem, staggerContainer } from '@/utils/animation';
import { motion } from "framer-motion";
import ProductCard from "@/components/shared/product/ProductCard";
import { cn } from '@/utils/classes/merge';
import ProductListItem from '../shared/product/ProductListItem';


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

    const products = data.sort((a, b) => {
        return Number(b?.is_instock === true) - Number(a?.is_instock === true);
    });


    const resultsView = "list"
    console.log("PRODUCTS", products)

    return (
        <div className={cn(
            "flex flex-col sm:flex-row flex-nowrap",
            "mt-20 pb-50 max-w-[1920px] mx-auto",
            "px-3 md:px-4 lg:px-6",
            "gap-3 sm:gap-6")} >
            <div className="hidden lg:flex flex-col w-full lg:w-1/4 bg-card-100 rounded-md p-10 h-max">
                Filter section
            </div>
            <div className="@container/grid flex flex-col flex-1">
                <h2>{products.length} search result{products.length === 1 ? "" : "s"}</h2>
                <motion.div
                    className={cn(
                        resultsView === "list"
                            ? "gap-8 sm:gap-4 flex flex-col "
                            : "gap-4 grid grid-cols-1 @min-search-2-col/grid:grid-cols-2 @min-search-3-col/grid:grid-cols-3 @min-search-4-col/grid:grid-cols-4"
                    )}
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {products?.map((product) => (
                        <motion.div
                            key={product.slug}
                            variants={fadeUpItem}
                            className="flex flex-col h-full"
                        >
                            {resultsView === "list"
                                ? <ProductListItem product={product} />
                                : <ProductCard product={product} />}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>

    );
}
