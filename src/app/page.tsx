// src/app/page.tsx

import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query";
import HomePage from "@/components/home/HomePage";
import { getProductsByRoasterSlug } from "@/lib/queries/products/getProductsByRoasterSlug";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

// export async function generateMetadata() {
//     return {
//         title: 'Espressolert — Discover UK Coffee Roasters',
//         description: 'Explore top-rated coffee beans from the best independent UK roasters.',
//     };
// }

export default async function Page() {
    console.log("Home Page Loading...");

    const queryClient = new QueryClient();
    const roasterSlug = "extract-coffee-roasters";

    await queryClient.prefetchQuery({
        queryKey: ["products-by-roaster", roasterSlug],
        queryFn: () => getProductsByRoasterSlug(roasterSlug, 4),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <HomePage roasterSlug={roasterSlug} />
        </HydrationBoundary>
    );
}
