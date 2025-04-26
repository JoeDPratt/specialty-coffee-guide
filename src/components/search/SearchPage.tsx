'use client';

import { useRouter, usePathname } from "next/navigation";
import { serializeQueryParams } from "@/utils/navigation/serializeQueryParams";
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSearchResults } from '@/hooks/useSearchResults';
import { useSyncUrlParams } from "@/hooks/useSyncUrlParams";
import { fadeUpItem, staggerContainer } from '@/utils/animation';
import { motion } from "framer-motion";
import ProductCard from "@/components/shared/product/ProductCard";
import { cn } from '@/utils/classes/merge';
import ProductListItem from '../shared/product/ProductListItem';
import { useSearchStore } from '@/stores/useSearchStore';
import { SeacrhViewMenu } from './SearchViewMenu';
import { useEffect, useMemo } from 'react';

const queryClient = new QueryClient();

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

    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={dehydratedState}>
                <SearchResults queryParams={queryParams} />
            </HydrationBoundary>
        </QueryClientProvider>
    );
}

function SearchResults({ queryParams }: { queryParams: Record<string, any> }) {
    console.count("SearchResults render");
    const router = useRouter();
    const pathname = usePathname();
    const resultsView = useSearchStore((s) => s.selectedView);
    // const selectedWeight = useSearchStore((s) => s.selectedWeight);
    const sortedBy = useSearchStore((s) => s.sortedBy);
    const page = useSearchStore((s) => s.page);
    const pageSize = useSearchStore((s) => s.pageSize);
    const setPage = useSearchStore((s) => s.setPage);


    // whenever the filter queryParams object changes, reset to page 1
    useEffect(() => {
        setPage(1);
    }, [queryParams.q,
    queryParams.is_organic,
    queryParams.is_decaf,
    queryParams.is_mycotoxin_free,
    queryParams.is_single_origin,
        setPage]);

    // merge server filters + client sort & pagination
    const fullParams = useMemo(
        () => ({
            ...queryParams,
            sort_by: sortedBy,
            page,
            page_size: pageSize,
        }),
        [
            queryParams.q,
            queryParams.is_organic,
            queryParams.is_decaf,
            queryParams.is_mycotoxin_free,
            queryParams.is_single_origin,
            sortedBy,
            page,
            pageSize,
        ]
    );

    // console.log("FULL PARAMS", fullParams)

    // Sync the URL Params
    useSyncUrlParams(fullParams);

    const { data, isLoading } = useSearchResults(fullParams);

    if (isLoading) return <div>Loading...</div>;
    if (!data?.length) return <div>No results</div>;

    //     const filtered = data.filter((card) => 
    //         card.product_variants.weight === Number(selectedWeight)
    // );

    // console.log("PRODUCTS", data)

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
                <div className="flex justify-between items-center w-full mb-4">
                    <h2 className="leading-7 mt-2.5 mb-0.5">{data.length} result{data.length === 1 ? "" : "s"}</h2>
                    <SeacrhViewMenu />
                </div>

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
                    {data?.map((product) => (
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
