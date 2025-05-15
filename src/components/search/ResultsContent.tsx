import { useBreakpointStore } from "@/stores/useBreakpointStore";
import { SearchState, useSearchStore } from "@/stores/useSearchStore";
import { fadeUpItem, staggerContainer } from "@/utils/animation";
import { motion } from "framer-motion";
import ProductListItem from '@/components/shared/product/ProductListItem';
import ProductCard from '@/components/shared/product/ProductCard';
import { cn } from "@/utils/classes/merge";
import type { ProductCard as ProductCardType } from "@/types/product";
import SkeletonSearchResults from "../skeleton/SkeletonSearchResults";
import NoSearchResults from "./NoSearchResults";

export default function ResultsContent({
    results,
    isLoading,
    isError,
}: {
    results: ProductCardType[];
    isLoading: boolean;
    isError: boolean;
}) {
    const resultsView = useSearchStore((s: SearchState) => s.selectedView);
    const isSm = useBreakpointStore((s) => s.isSm);

    if (isLoading) return <SkeletonSearchResults view={resultsView} />;
    if (isError) return <div>Error loading results</div>;
    if (!results.length) return <NoSearchResults />;

    return (
        <motion.div
            className={cn("",
                resultsView === 'list' && !isSm
                    ? 'gap-8 sm:gap-4 flex flex-col'
                    : 'gap-6 grid grid-cols-1 @min-search-2-col/grid:grid-cols-2 @min-search-3-col/grid:grid-cols-3 @min-search-4-col/grid:grid-cols-4'
            )}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
        >
            {results.map((product) => (
                <motion.div
                    key={product.slug}
                    variants={fadeUpItem}
                    className="flex flex-col h-full"
                >
                    {resultsView === 'list' && !isSm
                        ? <ProductListItem product={product} />
                        : <ProductCard product={product} />}
                </motion.div>
            ))}
        </motion.div>
    );
}
