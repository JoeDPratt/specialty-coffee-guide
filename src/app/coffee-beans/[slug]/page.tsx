import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query";
import ProductPage from "@/components/product/ProductPage";
import { getFullProductBySlug } from "@/lib/queries/products";
import { getBreadcrumbsFromPath } from "@/utils/navigation/breadcrumbs";
import { BreadcrumbStructuredData } from "@/components/shared/navigation/BreadcrumbStructuredData";
import { notFound } from "next/navigation";
import { getProductPath } from "@/utils/navigation/paths";
import { BreadcrumbsClientWrapper } from "@/components/shared/navigation/BreadcrumbsClientWrapper";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const product = await getFullProductBySlug(slug);
    return {
        title: product?.meta_title || "Product",
        description: product?.meta_description || "",
    };
}

// Page component
export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const queryClient = new QueryClient();
    const product = await getFullProductBySlug(slug);

    if (!product) {
        notFound();
    }

    await queryClient.prefetchQuery({
        queryKey: ["product", slug],
        queryFn: () => getFullProductBySlug(slug),
    });

    const path = getProductPath(slug);
    const breadcrumbs = getBreadcrumbsFromPath(path, product.product_name);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <BreadcrumbsClientWrapper
                crumbs={breadcrumbs}
            />
            <BreadcrumbStructuredData items={breadcrumbs} />
            <ProductPage slug={slug} />
        </HydrationBoundary>
    );
}
