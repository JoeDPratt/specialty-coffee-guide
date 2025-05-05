"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProductsByRoaster } from "@/lib/fetchers/products";
import type { JSX } from "react";
import ProductCard from "@/components/shared/product/ProductCard";
import { motion } from "framer-motion";
import { staggerContainer, fadeUpItem } from "@/utils/animation/index";
import SkeletonHome from "./SkeletonHome";

export default function HomePage({
    roasterSlug,
}: {
    roasterSlug: string;
}): JSX.Element {

    const { data: products, isLoading } = useQuery({
        queryKey: ["by-roaster", roasterSlug],
        queryFn: () => fetchProductsByRoaster(roasterSlug),
    });

    if (isLoading) return <SkeletonHome />;

    console.log("Products:", products);
    products?.forEach((p) => {
        if (!p.roaster || !p.roaster.alt_text) {
            console.warn(
                "Missing roaster or alt_text in product:",
                p.slug,
                p.roaster,
            );
        }
    });

    const roasterName = products?.[0]?.roaster?.name ?? "Featured Roaster";

    return (
        <main className="pb-50">
            <motion.div
                className="flex flex-col z-1 relative w-full items-center justify-center gap-4 h-130"
                variants={fadeUpItem}
            >
                {/* Background + Content Layer */}
                <div
                    className="absolute inset-0 -top-50 z-0 opacity-90"
                    style={{
                        backgroundImage: `url('/images/latte-coffee-grainy.webp')`,
                        backgroundPosition: 'top center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}
                />
            </motion.div>
            <div className="px-3 sm:px-6 mt-20" >
                <h2>Specialty Coffee by {roasterName}</h2>
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </main>
    );
}
